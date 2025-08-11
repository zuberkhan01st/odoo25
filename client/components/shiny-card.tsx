"use client"

import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"

export default function ShinyCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`relative rounded-xl p-[2px] transition-transform ${className}`}>
      <div
        aria-hidden
        className="absolute inset-0 rounded-xl bg-[conic-gradient(from_180deg_at_50%_50%,rgba(16,185,129,0.2),transparent,rgba(0,0,0,0.05),transparent,rgba(16,185,129,0.2))] blur-[2px]"
      />
      <Card className="relative rounded-xl border-2 border-zinc-200 bg-white shadow-sm transition-colors dark:border-zinc-800 dark:bg-black">
        {children}
      </Card>
    </div>
  )
}
