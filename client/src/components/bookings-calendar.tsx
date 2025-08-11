"use client"

import { useMemo, useState } from "react"
import { Calendar } from "@/components/ui/calendar"

export default function BookingsCalendar({
  bookedISO = [],
  className = "",
}: {
  bookedISO?: string[]
  className?: string
}) {
  const [selected, setSelected] = useState<Date | undefined>(new Date())
  const bookedDates = useMemo(() => bookedISO.map((d) => new Date(d + "T00:00:00")), [bookedISO])

  return (
    <div className={className}>
      <Calendar
        mode="single"
        selected={selected}
        onSelect={setSelected}
        showOutsideDays
        captionLayout="buttons"
        modifiers={{ booked: bookedDates }}
        modifiersClassNames={{ booked: "has-booking" }}
        className="[&_button]:rounded-md"
      />
      {/* Global styles for booking dots */}
      <style jsx global>{`
        .has-booking {
          position: relative;
        }
        .has-booking::after {
          content: "";
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 6px;
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: rgb(16 185 129);
        }
        /* Higher-contrast selected day in both themes */
        .rdp-day_selected,
        .rdp-day_selected:focus-visible {
          outline: none;
          box-shadow: inset 0 0 0 2px rgba(16, 185, 129, 0.8);
        }
      `}</style>
    </div>
  )
}
