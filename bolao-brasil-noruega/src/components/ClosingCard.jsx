import { useState } from 'react'
import GolStepper from './GolStepper'
import { APP_CONFIG } from '../config'
import { definirResultadoFinal } from '../services/resultado'

export default function ClosingCard({ resultado, palpites, isAdminAuthed }) {
  const [brasilGols, setBrasilGols] = useState(0)
  const [adversarioGols, setAdversarioGols] = useState(0)
  const [salvando, setSalvando] = useState(false)

  async function handleSalvar() {
    setSalvando(true)
    try {
      await definirResultadoFinal({ brasilGols, adversarioGols })
    } finally {
      setSalvando(false)
    }
  }

  if (!resultado) {
    return (
      <div className="rounded-2xl bg-white border border-line p-6 sm:p-8 shadow-card text-center">
        <h3 className="font-display text-xl text-ink tracking-wide mb-1">
          O jogo acabou — e agora?
        </h3>
        <p className="text-ink-soft text-sm mb-6">
          Assim que o placar final for lançado, os ganhadores aparecem aqui automaticamente.
        </p>

        {isAdminAuthed ? (
          <div className="max-w-xs mx-auto">
            <p className="text-xs uppercase tracking-widest text-muted font-semibold mb-3">
              Lançar placar final
            </p>
            <div className="flex items-center justify-center gap-4">
              <GolStepper label="Brasil" value={brasilGols} onChange={setBrasilGols} accent="green" />
              <span className="font-display text-xl text-muted pt-6">x</span>
              <GolStepper
                label={APP_CONFIG.adversario}
                value={adversarioGols}
                onChange={setAdversarioGols}
                accent="blue"
              />
            </div>
            <button
              onClick={handleSalvar}
              disabled={salvando}
              className="mt-6 w-full rounded-flap bg-brasil-green py-2.5 font-display tracking-wide text-white hover:bg-brasil-green-deep transition disabled:opacity-50"
            >
              {salvando ? 'Salvando...' : 'Salvar placar final'}
            </button>
          </div>
        ) : (
          <p className="text-muted text-sm">Aguardando quem organiza lançar o resultado.</p>
        )}
      </div>
    )
  }

  const ganhadores = palpites.filter(
    (p) => p.brasilGols === resultado.brasilGols && p.adversarioGols === resultado.adversarioGols
  )

  return (
    <div className="rounded-2xl bg-brasil-green-deep p-6 sm:p-8 shadow-card text-center">
      <p className="text-brasil-gold text-xs uppercase tracking-[0.25em] font-semibold mb-2">
        Placar final
      </p>
      <p className="font-display text-3xl sm:text-4xl text-white mb-6">
        Brasil {resultado.brasilGols} x {resultado.adversarioGols} {APP_CONFIG.adversario}
      </p>

      <div className="rounded-xl bg-white/95 p-5">
        <p className="font-display text-lg text-ink tracking-wide mb-3">
          {ganhadores.length > 0 ? '🏆 Ganhadores do bolão' : 'Ninguém acertou o placar exato'}
        </p>
        {ganhadores.length > 0 ? (
          <ul className="space-y-2">
            {ganhadores.map((g) => (
              <li
                key={g.id}
                className="flex items-center justify-between rounded-flap bg-brasil-gold-soft px-4 py-2"
              >
                <span className="font-semibold text-brasil-green-deep">{g.nome}</span>
                <span
                  className={`text-xs font-bold ${
                    g.statusPagamento === 'confirmado' ? 'text-brasil-green-deep' : 'text-noruega-red'
                  }`}
                >
                  {g.statusPagamento === 'confirmado' ? '🟢 Pix confirmado' : '🟡 Pix pendente'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink-soft text-sm">
            Ninguém cravou esse placar exato — o valor pode ser combinado entre o grupo.
          </p>
        )}
      </div>
    </div>
  )
}
