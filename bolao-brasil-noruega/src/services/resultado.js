import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

const RESULTADO_DOC = doc(db, 'config', 'resultadoFinal')

/**
 * Escuta o placar final em tempo real. Retorna null enquanto não for definido.
 */
export function subscribeToResultado(callback) {
  return onSnapshot(RESULTADO_DOC, (snap) => {
    callback(snap.exists() ? snap.data() : null)
  })
}

/**
 * Define o placar final do jogo (uso do administrador).
 */
export async function definirResultadoFinal({ brasilGols, adversarioGols }) {
  await setDoc(RESULTADO_DOC, { brasilGols, adversarioGols, definidoEm: new Date().toISOString() })
}
