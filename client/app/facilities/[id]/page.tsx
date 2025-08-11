"use client"

import { notFound, useParams } from "next/navigation"
import AppHeader from "@/components/app-header"
import { facilities } from "@/lib/mock-data"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { MapPin, Star, CheckCircle2, Clock, Phone } from "lucide-react"
import AvailabilityGrid from "@/components/availability-grid"
import ReviewsList from "@/components/reviews-list"
import Link from "next/link"
import { useState } from "react"

export default function Page() {
  const params = useParams<{ id: string }>()
  const facility = facilities.find((f) => f.id === params.id)
  const [date, setDate] = useState<Date | undefined>(new Date())

  if (!facility) return notFound()

  return (
    <main>
      <AppHeader />
      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-6">
            <div className="grid gap-3">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <img
                    key={i}
                    src={`/abstract-geometric-shapes.png?height=320&width=480&query=${encodeURIComponent(
                      facility.sportLabel + " court photo " + (i + 1),
                    )}`}
                    alt="Facility photo"
                    className="aspect-[16/10] w-full rounded-lg border object-cover"
                  />
                ))}
              </div>
              <div>
                <h1 className="text-2xl font-semibold">{facility.name}</h1>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{facility.location.city}</span>
                  <Star className="h-4 w-4 text-emerald-600" />
                  <span className="font-medium text-foreground">{facility.rating.toFixed(1)}</span>
                  <Badge variant="secondary">{facility.sportLabel}</Badge>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">About</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <p className="text-sm text-muted-foreground">
                  Modern courts with proper lighting and changing rooms. Friendly staff and easy access. Equipment
                  rentals available on-site.
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Free parking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    Locker rooms
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-emerald-600" />
                    Open 6am - 11pm
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-emerald-600" />
                    +1 (555) 204-1098
                  </li>
                </ul>
              </CardContent>
            </Card>

            <ReviewsList />
          </div>

          <aside className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Book a slot</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Calendar selected={date} onSelect={setDate} />
                <AvailabilityGrid date={date ?? new Date()} pricePerHour={facility.pricePerHour} />
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    From <span className="font-semibold text-foreground">${facility.pricePerHour.toFixed(0)}</span>
                    <span className="text-muted-foreground">/hr</span>
                  </div>
                  <Button asChild>
                    <Link href={`/book/${facility.id}`}>Continue</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
    </main>
  )
}
