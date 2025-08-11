"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"

function generateSlots() {
  // 6:00 to 22:00 every 30 minutes
  const out: string[] = []
  for (let h = 6; h <= 21; h++) {
    out.push(`${String(h).padStart(2, "0")}:00`)
    out.push(`${String(h).padStart(2, "0")}:30`)
  }
  out.push("22:00")
  return out
}

export default function AvailabilityGrid({
  date,
  pricePerHour = 30,
  selected = null,
  onSelect = () => {},
}: {
  date: Date
  pricePerHour?: number
  selected?: string | null
  onSelect?: (slot: string) => void
}) {
  const slots = useMemo(() => generateSlots(), [])
  const disabledIndices = useMemo(() => {
    // Mock: disable some slots based on date seed
    const seed = (date.getDate() + date.getMonth()) % 5
    return new Set(slots.map((_, i) => ((i + seed) % 7 === 0 ? i : -1)).filter((i) => i >= 0))
  }, [date, slots])

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {slots.map((s, idx) => {
        const disabled = disabledIndices.has(idx)
        const active = selected === s
        return (
          <Button
            key={s}
            size="sm"
            variant={active ? "default" : "outline"}
            disabled={disabled}
            onClick={() => onSelect(s)}
            className={`${active ? "bg-emerald-600 hover:bg-emerald-700" : ""} justify-center`}
          >
            {s}
          </Button>
        )
      })}
    </div>
  )
}
