import { useEffect, useState } from 'react'

function getTimeParts(targetDate) {
  const diff = Math.max(0, targetDate.getTime() - Date.now())
  const totalSeconds = Math.floor(diff / 1000)
  return {
    dias: Math.floor(totalSeconds / (3600 * 24)),
    horas: Math.floor((totalSeconds % (3600 * 24)) / 3600),
    minutos: Math.floor((totalSeconds % 3600) / 60),
    segundos: totalSeconds % 60,
    encerrado: diff <= 0,
  }
}

function FlapPair({ value, label }) {
  const padded = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1">
        {padded.split('').map((digit, i) => (
          <div key={i} className="flap-digit w-9 sm:w-12">
            <span key={digit} className="flap-enter">{digit}</span>
          </div>
        ))}
      </div>
      <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brasil-gold-soft font-semibold">
        {label}
      </span>
    </div>
  )
}

export default function CountdownTimer({ targetDate, onExpire }) {
  const [parts, setParts] = useState(() => getTimeParts(targetDate))

  useEffect(() => {
    const interval = setInterval(() => {
      const next = getTimeParts(targetDate)
      setParts(next)
      if (next.encerrado) {
        clearInterval(interval)
        onExpire?.()
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate, onExpire])

  if (parts.encerrado) {
    return (
      <div className="rounded-flap bg-brasil-green-deep px-6 py-4 text-center">
        <p className="font-display tracking-wide text-brasil-gold text-lg sm:text-xl">
          PALPITES ENCERRADOS
        </p>
      </div>
    )
  }

  return (
    <div className="inline-flex flex-col items-center gap-3 rounded-2xl bg-brasil-green-deep px-5 py-5 sm:px-8 sm:py-6 shadow-card">
      <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-brasil-gold font-semibold">
        Tempo até a bola rolar
      </p>
      <div className="flex items-start gap-3 sm:gap-4">
        <FlapPair value={parts.dias} label="dias" />
        <span className="text-brasil-gold font-display text-2xl sm:text-3xl pt-1">:</span>
        <FlapPair value={parts.horas} label="horas" />
        <span className="text-brasil-gold font-display text-2xl sm:text-3xl pt-1">:</span>
        <FlapPair value={parts.minutos} label="min" />
        <span className="text-brasil-gold font-display text-2xl sm:text-3xl pt-1">:</span>
        <FlapPair value={parts.segundos} label="seg" />
      </div>
    </div>
  )
}
