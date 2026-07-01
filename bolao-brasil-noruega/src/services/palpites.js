import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../firebase'
import { APP_CONFIG } from '../config'

const PALPITES_COL = 'palpites'
const SCORE_COUNTS_COL = 'scoreCounts'

function scoreKey(brasilGols, adversarioGols) {
  return `${brasilGols}-${adversarioGols}`
}

/**
 * Escuta a lista de palpites em tempo real, ordenados do mais recente para o mais antigo.
 */
export function subscribeToPalpites(callback) {
  const q = query(collection(db, PALPITES_COL), orderBy('timestamp', 'desc'))
  return onSnapshot(q, (snapshot) => {
    const palpites = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
    callback(palpites)
  })
}

/**
 * Registra um novo palpite de forma atômica, respeitando o limite de
 * pessoas por placar (via documento contador em scoreCounts).
 * Lança um erro com a mensagem 'LIMITE_ATINGIDO' se o placar já tiver
 * o número máximo de participantes.
 */
export async function registrarPalpite({ nome, brasilGols, adversarioGols }) {
  const key = scoreKey(brasilGols, adversarioGols)
  const counterRef = doc(db, SCORE_COUNTS_COL, key)
  const novoPalpiteRef = doc(collection(db, PALPITES_COL))

  await runTransaction(db, async (transaction) => {
    const counterSnap = await transaction.get(counterRef)
    const contagemAtual = counterSnap.exists() ? counterSnap.data().count || 0 : 0

    if (contagemAtual >= APP_CONFIG.limitePorPlacar) {
      throw new Error('LIMITE_ATINGIDO')
    }

    transaction.set(
      counterRef,
      { count: contagemAtual + 1, brasilGols, adversarioGols },
      { merge: true }
    )

    transaction.set(novoPalpiteRef, {
      nome: nome.trim(),
      brasilGols,
      adversarioGols,
      statusPagamento: 'aguardando',
      timestamp: serverTimestamp(),
    })
  })

  return novoPalpiteRef.id
}

/**
 * Atualiza o status de pagamento de um palpite (uso do administrador).
 */
export async function atualizarStatusPagamento(palpiteId, novoStatus) {
  const ref = doc(db, PALPITES_COL, palpiteId)
  await updateDoc(ref, { statusPagamento: novoStatus })
}
