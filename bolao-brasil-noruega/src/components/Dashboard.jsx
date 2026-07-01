import { APP_CONFIG } from '../config'

function StatusBadge({ status }) {
  const isConfirmado = status === 'confirmado'
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        isConfirmado
          ? 'bg-brasil-green/10 text-brasil-green-deep'
          : 'bg-brasil-gold-soft text-brasil-green-deep'
      }`}
    >
      <span className={isConfirmado ? 'text-brasil-green' : 'text-brasil-gold'}>●</span>
      {isConfirmado ? 'Confirmado' : 'Aguardando Pix'}
    </span>
  )
}

export default function Dashboard({ palpites }) {
  const confirmados = palpites.filter((p) => p.statusPagamento === 'confirmado').length
  const totalConfirmado = confirmados * APP_CONFIG.valorAposta

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white border border-line p-6 shadow-card flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted font-semibold">
            Total confirmado no bolão
          </p>
          <p className="font-display text-4xl text-brasil-green-deep mt-1">
            R$ {totalConfirmado.toFixed(2).replace('.', ',')}
          </p>
        </div>
        <div className="flex gap-4 text-center">
          <div>
            <p className="font-display text-2xl text-ink">{palpites.length}</p>
            <p className="text-xs text-muted uppercase tracking-wide">palpites</p>
          </div>
          <div className="w-px bg-line" />
          <div>
            <p className="font-display text-2xl text-brasil-green">{confirmados}</p>
            <p className="text-xs text-muted uppercase tracking-wide">confirmados</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-line shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-line stitch-divider" />
        <div className="px-6 pt-4 pb-2">
          <h3 className="font-display text-lg text-ink tracking-wide">Palpites cadastrados</h3>
          <p className="text-xs text-muted mt-1">
            Confira os placares já escolhidos — cada placar aceita no máximo{' '}
            {APP_CONFIG.limitePorPlacar} pessoas.
          </p>
        </div>

        {palpites.length === 0 ? (
          <p className="text-center text-muted text-sm py-10">
            Ninguém enviou palpite ainda. Seja a primeira pessoa!
          </p>
        ) : (
          <ul className="divide-y divide-line max-h-96 overflow-y-auto">
            {palpites.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-3 px-6 py-3 hover:bg-cream/60 transition"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-ink truncate">{p.nome}</p>
                  <p className="text-sm text-ink-soft font-mono">
                    Brasil {p.brasilGols} x {p.adversarioGols} {APP_CONFIG.adversario}
                  </p>
                </div>
                <StatusBadge status={p.statusPagamento} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
