export default function GolStepper({ label, value, onChange, accent = 'green' }) {
  const accentClasses =
    accent === 'green'
      ? 'from-brasil-green to-brasil-green-deep'
      : 'from-noruega-blue to-ink'

  const dec = () => onChange(Math.max(0, value - 1))
  const inc = () => onChange(Math.min(20, value + 1))

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={dec}
          aria-label={`Diminuir gols de ${label}`}
          className="h-9 w-9 rounded-full border border-line bg-white text-ink font-bold text-lg leading-none hover:bg-cream active:scale-95 transition"
        >
          −
        </button>
        <div
          className={`flap-digit w-14 sm:w-16 bg-gradient-to-b ${accentClasses}`}
        >
          <span className="flap-enter" key={value}>{value}</span>
        </div>
        <button
          type="button"
          onClick={inc}
          aria-label={`Aumentar gols de ${label}`}
          className="h-9 w-9 rounded-full border border-line bg-white text-ink font-bold text-lg leading-none hover:bg-cream active:scale-95 transition"
        >
          +
        </button>
      </div>
    </div>
  )
}
