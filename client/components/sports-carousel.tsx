"use client"

import { type LucideIcon, Dumbbell } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

type Option = { id: string; label: string; icon?: LucideIcon }

export default function SportsCarousel({
  options = [],
  active = "all",
  onChange = () => {},
}: {
  options: Option[]
  active?: string
  onChange?: (value: string) => void
}) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 py-2">
        {options.map((opt) => {
          const Icon = opt.icon ?? Dumbbell
          const isActive = active === opt.id
          return (
            <Button
              key={opt.id}
              variant={isActive ? "default" : "outline"}
              className={`gap-2 ${isActive ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
              onClick={() => onChange(opt.id)}
              size="sm"
            >
              <Icon className="h-4 w-4" />
              {opt.label}
            </Button>
          )
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
