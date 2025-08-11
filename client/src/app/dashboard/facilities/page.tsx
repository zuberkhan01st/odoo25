"use client"

import { useMemo, useState } from "react"
import AppHeader from "@/components/app-header"
import FacilityCard from "@/components/facility-card"
import FiltersSidebar from "@/components/filters-sidebar"
import { facilities, type Facility } from "@/lib/mock-data"

export default function Page() {
  const [sport, setSport] = useState<string>("all")
  const [price, setPrice] = useState<[number, number]>([0, 100])
  const [rating, setRating] = useState<number>(0)

  const filtered = useMemo(() => {
    return facilities.filter((f) => {
      const sOk = sport === "all" ? true : f.sport === sport
      const pOk = f.pricePerHour >= price[0] && f.pricePerHour <= price[1]
      const rOk = f.rating >= rating
      return sOk && pOk && rOk
    })
  }, [sport, price, rating])

  return (
    <main>
      <AppHeader />
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[260px_1fr]">
        <FiltersSidebar
          sport={sport}
          onSportChange={setSport}
          price={price}
          onPriceChange={setPrice}
          rating={rating}
          onRatingChange={setRating}
        />
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((f: Facility) => (
              <FacilityCard key={f.id} facility={f} />
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground">End of results</div>
        </div>
      </section>
    </main>
  )
}
