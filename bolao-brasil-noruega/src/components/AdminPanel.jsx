import { useState } from 'react'
import { APP_CONFIG } from '../config'
import { atualizarStatusPagamento } from '../services/palpites'

function LoginGate({ onEntrar }) {
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (senha === APP_CONFIG.adminPassword) {
      setErro(false)
      onEntrar()
    } else {
      setErro(true)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white border border-line p-6 shadow-card max-w-sm mx-auto"
    >
      <h3 className="font-display text-lg text-ink tracking-wide mb-3">Painel Adm</h3>
      <label className="block">
        <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
          Senha
        </span>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="mt-2 w-full rounded-flap border border-line bg-cream px-4 py-2.5 text-ink"
          autoFocus
        />
      </label>
      {erro && <p className="text-noruega-red text-sm mt-2">Senha incorreta.</p>}
      <button
        type="submit"
        className="mt-4 w-full rounded-flap bg-ink py-2.5 font-semibold text-white hover:bg-ink-soft transition"
      >
        Entrar
      </button>
    </form>
  )
}

export default function AdminPanel({ palpites, isAuthed, onAuth, onLogout }) {
  const [atualizando, setAtualizando] = useState(null)

  async function alternarStatus(p) {
    setAtualizando(p.id)
    const novoStatus = p.statusPagamento === 'confirmado' ? 'aguardando' : 'confirmado'
    try {
      await atualizarStatusPagamento(p.id, novoStatus)
    } catch (err) {
      console.error(err)
    } finally {
      setAtualizando(null)
    }
  }

  if (!isAuthed) {
    return <LoginGate onEntrar={onAuth} />
  }

  return (
    <div className="rounded-2xl bg-white border border-line shadow-card overflow-hidden">
      <div className="px-6 py-4 flex items-center justify-between">
        <h3 className="font-display text-lg text-ink tracking-wide">Painel administrativo</h3>
        <button
          onClick={onLogout}
          className="text-xs font-semibold text-muted hover:text-ink"
        >
          Sair
        </button>
      </div>
      <ul className="divide-y divide-line max-h-[28rem] overflow-y-auto">
        {palpites.length === 0 && (
          <p className="text-center text-muted text-sm py-8">Nenhum palpite ainda.</p>
        )}
        {palpites.map((p) => (
          <li key={p.id} className="flex items-center justify-between gap-3 px-6 py-3">
            <div className="min-w-0">
              <p className="font-semibold text-ink truncate">{p.nome}</p>
              <p className="text-sm text-ink-soft font-mono">
                Brasil {p.brasilGols} x {p.adversarioGols} {APP_CONFIG.adversario}
              </p>
            </div>
            <button
              onClick={() => alternarStatus(p)}
              disabled={atualizando === p.id}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-50 ${
                p.statusPagamento === 'confirmado'
                  ? 'bg-brasil-green text-white hover:bg-brasil-green-deep'
                  : 'bg-brasil-gold-soft text-brasil-green-deep hover:bg-brasil-gold'
              }`}
            >
              {atualizando === p.id
                ? 'Salvando...'
                : p.statusPagamento === 'confirmado'
                ? '🟢 Confirmado'
                : '🟡 Aguardando Pix'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
