"use client"

import type React from "react"

import { type ReactNode, useRef } from "react"

export default function Card3D({
  children,
  className = "",
  intensity = 12,
}: {
  children: ReactNode
  className?: string
  intensity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rx = ((y - rect.height / 2) / rect.height) * -intensity
    const ry = ((x - rect.width / 2) / rect.width) * intensity
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
    el.style.setProperty("--mx", `${x}px`)
    el.style.setProperty("--my", `${y}px`)
  }

  function reset() {
    const el = ref.current
    if (!el) return
    el.style.transform = "rotateX(0deg) rotateY(0deg)"
  }

  return (
    <div onMouseMove={onMove} onMouseLeave={reset} className={`[perspective:1000px] ${className}`}>
      <div
        ref={ref}
        className="relative will-change-transform transition-transform duration-300 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Shiny highlight that follows the cursor */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(200px 200px at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.35), transparent 60%)",
            mixBlendMode: "overlay",
          }}
        />
        {children}
      </div>
    </div>
  )
}
