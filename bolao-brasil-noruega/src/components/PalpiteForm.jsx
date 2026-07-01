import { useState } from 'react'
import GolStepper from './GolStepper'
import { registrarPalpite } from '../services/palpites'
import { APP_CONFIG } from '../config'

export default function PalpiteForm({ disabled, palpitesExistentes, onSucesso }) {
  const [nome, setNome] = useState('')
  const [brasilGols, setBrasilGols] = useState(0)
  const [adversarioGols, setAdversarioGols] = useState(0)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  const placarOcupado = palpitesExistentes.filter(
    (p) => p.brasilGols === brasilGols && p.adversarioGols === adversarioGols
  ).length

  const placarEsgotado = placarOcupado >= APP_CONFIG.limitePorPlacar

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')

    if (!nome.trim()) {
      setErro('Digite seu nome completo para continuar.')
      return
    }

    setEnviando(true)
    try {
      const id = await registrarPalpite({ nome, brasilGols, adversarioGols })
      onSucesso({ id, nome: nome.trim(), brasilGols, adversarioGols })
      setNome('')
      setBrasilGols(0)
      setAdversarioGols(0)
    } catch (err) {
      if (err.message === 'LIMITE_ATINGIDO') {
        setErro(
          `Esse placar já foi escolhido por ${APP_CONFIG.limitePorPlacar} pessoas. Escolha outro placar.`
        )
      } else {
        console.error(err)
        setErro('Não foi possível registrar seu palpite agora. Tente novamente.')
      }
    } finally {
      setEnviando(false)
    }
  }

  if (disabled) {
    return (
      <div className="rounded-2xl bg-white border border-line p-6 text-center shadow-card">
        <p className="font-display text-xl text-ink">Palpites encerrados</p>
        <p className="text-ink-soft mt-1">
          O prazo para enviar palpites já passou. Confira o placar final abaixo.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white border border-line p-6 sm:p-8 shadow-card"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl sm:text-2xl text-ink tracking-wide">
          Registre seu palpite
        </h2>
        <span className="rounded-full bg-brasil-gold-soft text-brasil-green-deep text-xs font-bold px-3 py-1 uppercase tracking-wide">
          R$ {APP_CONFIG.valorAposta.toFixed(2).replace('.', ',')}
        </span>
      </div>

      <label className="block mb-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
          Nome completo
        </span>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Ex: Maria Silva"
          className="mt-2 w-full rounded-flap border border-line bg-cream px-4 py-3 text-ink placeholder:text-muted focus:bg-white transition"
          required
        />
      </label>

      <div className="flex items-center justify-center gap-4 sm:gap-8 mb-2">
        <div className="text-center">
          <p className="font-display text-sm sm:text-base text-brasil-green-deep tracking-wide">
            BRASIL
          </p>
          <GolStepper label="gols" value={brasilGols} onChange={setBrasilGols} accent="green" />
        </div>
        <span className="font-display text-2xl text-muted pt-6">X</span>
        <div className="text-center">
          <p className="font-display text-sm sm:text-base text-noruega-blue tracking-wide">
            {APP_CONFIG.adversario.toUpperCase()}
          </p>
          <GolStepper
            label="gols"
            value={adversarioGols}
            onChange={setAdversarioGols}
            accent="blue"
          />
        </div>
      </div>

      {placarEsgotado && (
        <p className="text-center text-noruega-red text-sm font-medium mt-4">
          ⚠️ Esse placar já tem {placarOcupado} palpite(s) — o limite é{' '}
          {APP_CONFIG.limitePorPlacar}. Escolha outro placar para poder confirmar.
        </p>
      )}

      {erro && (
        <p className="text-center text-noruega-red text-sm font-medium mt-4">{erro}</p>
      )}

      <button
        type="submit"
        disabled={enviando || placarEsgotado}
        className="mt-6 w-full rounded-flap bg-brasil-green py-3 font-display tracking-wide text-lg text-white shadow-flap hover:bg-brasil-green-deep transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {enviando ? 'Enviando...' : 'Confirmar palpite'}
      </button>
    </form>
  )
}
