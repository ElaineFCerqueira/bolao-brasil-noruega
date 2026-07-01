import { useState } from 'react'
import { APP_CONFIG } from '../config'

export default function PaymentModal({ palpite, onClose }) {
  const [copiado, setCopiado] = useState(false)

  if (!palpite) return null

  function copiarChave() {
    navigator.clipboard?.writeText(APP_CONFIG.chavePix).then(() => {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white shadow-card overflow-hidden">
        <div className="bg-brasil-green-deep px-6 py-5 text-center">
          <p className="text-brasil-gold text-xs uppercase tracking-[0.25em] font-semibold">
            Palpite confirmado
          </p>
          <p id="payment-modal-title" className="font-display text-2xl text-white mt-1">
            Brasil {palpite.brasilGols} x {palpite.adversarioGols} {APP_CONFIG.adversario}
          </p>
          <p className="text-brasil-gold-soft text-sm mt-1">{palpite.nome}</p>
        </div>

        <div className="p-6 sm:p-7">
          <p className="text-ink-soft text-sm leading-relaxed">
            Para validar seu palpite, faça o Pix de{' '}
            <strong className="text-ink">
              R$ {APP_CONFIG.valorAposta.toFixed(2).replace('.', ',')}
            </strong>{' '}
            para a chave abaixo e envie o comprovante para quem organiza o bolão.
          </p>

          <div className="mt-4 rounded-flap border border-line bg-cream px-4 py-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted font-semibold">
                Chave Pix (telefone)
              </p>
              <p className="font-mono text-lg text-ink">{APP_CONFIG.chavePix}</p>
              <p className="text-xs text-ink-soft">{APP_CONFIG.nomeRecebedor}</p>
            </div>
            <button
              type="button"
              onClick={copiarChave}
              className="shrink-0 rounded-full bg-brasil-green px-4 py-2 text-xs font-bold text-white hover:bg-brasil-green-deep transition"
            >
              {copiado ? 'Copiado!' : 'Copiar'}
            </button>
          </div>

          <p className="text-xs text-muted mt-4">
            Seu status vai aparecer como <strong>🟡 Aguardando Pix</strong> até o pagamento ser
            identificado e confirmado.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 w-full rounded-flap border border-line py-3 font-semibold text-ink hover:bg-cream transition"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  )
}
