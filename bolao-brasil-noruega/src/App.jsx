import { useEffect, useState } from 'react'
import CountdownTimer from './components/CountdownTimer'
import PalpiteForm from './components/PalpiteForm'
import PaymentModal from './components/PaymentModal'
import Dashboard from './components/Dashboard'
import AdminPanel from './components/AdminPanel'
import ClosingCard from './components/ClosingCard'
import Footer from './components/Footer'
import { APP_CONFIG } from './config'
import { subscribeToPalpites } from './services/palpites'
import { subscribeToResultado } from './services/resultado'

const DATA_JOGO = new Date(APP_CONFIG.dataJogoISO)

export default function App() {
  const [palpites, setPalpites] = useState([])
  const [resultado, setResultado] = useState(null)
  const [expirado, setExpirado] = useState(() => Date.now() >= DATA_JOGO.getTime())
  const [palpiteConfirmado, setPalpiteConfirmado] = useState(null)
  const [aba, setAba] = useState('palpitar')
  const [adminAuthed, setAdminAuthed] = useState(false)

  useEffect(() => {
    const unsubPalpites = subscribeToPalpites(setPalpites)
    const unsubResultado = subscribeToResultado(setResultado)
    return () => {
      unsubPalpites()
      unsubResultado()
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <header className="bg-gradient-to-b from-brasil-green to-brasil-green-deep pb-8 pt-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brasil-gold-soft text-xs sm:text-sm uppercase tracking-[0.3em] font-semibold mb-2">
            Bolão da Família
          </p>
          <h1 className="font-display text-3xl sm:text-5xl text-white tracking-wide leading-tight">
            BRASIL <span className="text-brasil-gold">x</span> {APP_CONFIG.adversario.toUpperCase()}
          </h1>
          <p className="text-brasil-gold-soft text-sm mt-2">
            05 / 06 / 2026 · 17h (horário de Brasília)
          </p>

          <div className="mt-6 flex justify-center">
            <CountdownTimer targetDate={DATA_JOGO} onExpire={() => setExpirado(true)} />
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 space-y-8">
        {expirado ? (
          <ClosingCard palpites={palpites} resultado={resultado} isAdminAuthed={adminAuthed} />
        ) : (
          <PalpiteForm
            disabled={expirado}
            palpitesExistentes={palpites}
            onSucesso={setPalpiteConfirmado}
          />
        )}

        <div className="rounded-full bg-white border border-line p-1 flex shadow-card max-w-xs mx-auto">
          {[
            { id: 'palpitar', label: 'Palpites' },
            { id: 'admin', label: 'Organizadora' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAba(tab.id)}
              className={`flex-1 rounded-full py-2 text-sm font-semibold transition ${
                aba === tab.id
                  ? 'bg-brasil-green text-white shadow-flap'
                  : 'text-ink-soft hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {aba === 'palpitar' ? (
          <Dashboard palpites={palpites} />
        ) : (
          <AdminPanel
            palpites={palpites}
            isAuthed={adminAuthed}
            onAuth={() => setAdminAuthed(true)}
            onLogout={() => setAdminAuthed(false)}
          />
        )}
      </main>

      <PaymentModal palpite={palpiteConfirmado} onClose={() => setPalpiteConfirmado(null)} />

      <Footer />
    </div>
  )
}
