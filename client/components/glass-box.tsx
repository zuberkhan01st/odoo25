"use client"

import type { ReactNode } from "react"

export default function GlassBox({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border-2 border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-black/60 ${className}`}
    >
      {children}
    </div>
  )
}
