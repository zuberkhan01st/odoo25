"use client"

export default function StatsGraph({
  data = [8, 12, 7, 15, 16, 13, 18, 22, 19, 24],
  className = "",
  stroke = "rgb(16 185 129)",
}: {
  data?: number[]
  className?: string
  stroke?: string
}) {
  const w = 240
  const h = 72
  const max = Math.max(...data) || 1
  const min = Math.min(...data) || 0
  const range = Math.max(1, max - min)
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w
      const y = h - ((v - min) / range) * h
      return `${x},${y}`
    })
    .join(" ")
  return (
    <svg width={w} height={h} className={`overflow-visible ${className}`} role="img" aria-label="Trend">
      <defs>
        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.6" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={points} fill="none" stroke={stroke} strokeWidth="2.5" />
      <polygon points={`${points} ${w},${h} 0,${h}`} fill="url(#g1)" stroke="none" opacity={0.3} />
    </svg>
  )
}
