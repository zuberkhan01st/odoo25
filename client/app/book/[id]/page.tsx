"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useMemo, useState } from "react"
import AppHeader from "@/components/app-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import AvailabilityGrid from "@/components/availability-grid"
import BookingSummary from "@/components/booking-summary"
import { facilities, sports } from "@/lib/mock-data"

export default function Page() {
  const params = useParams<{ id: string }>()
  const facility = useMemo(() => facilities.find((f) => f.id === params.id), [params.id])
  const [sport, setSport] = useState(facility?.sport ?? "badminton")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [duration, setDuration] = useState<number>(60)
  const [courtType, setCourtType] = useState<string>("standard")
  const [slot, setSlot] = useState<string | null>(null)

  if (!facility) {
    return (
      <main>
        <AppHeader />
        <div className="mx-auto max-w-4xl px-4 py-10">Facility not found.</div>
      </main>
    )
  }

  return (
    <main>
      <AppHeader />
      <section className="mx-auto max-w-5xl px-4 py-6">
        <h1 className="mb-4 text-xl font-semibold">Court Booking</h1>
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{facility.name}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Sport</Label>
                  <Select value={sport} onValueChange={setSport}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sports.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Duration</Label>
                  <RadioGroup
                    value={String(duration)}
                    onValueChange={(v) => setDuration(Number.parseInt(v))}
                    className="flex flex-wrap gap-3"
                  >
                    {[60, 90, 120].map((d) => (
                      <Label
                        key={d}
                        htmlFor={`dur-${d}`}
                        className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                          duration === d ? "border-emerald-600 ring-1 ring-emerald-600" : ""
                        }`}
                      >
                        <RadioGroupItem id={`dur-${d}`} value={String(d)} className="sr-only" />
                        {d} mins
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label>Date</Label>
                  <Calendar selected={date} onSelect={setDate} />
                </div>
                <div className="grid gap-2">
                  <Label>Available slots</Label>
                  <AvailabilityGrid
                    date={date ?? new Date()}
                    pricePerHour={facility.pricePerHour}
                    selected={slot}
                    onSelect={setSlot}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Court type</Label>
                <RadioGroup value={courtType} onValueChange={setCourtType} className="flex flex-wrap gap-3">
                  {["standard", "premium"].map((t) => (
                    <Label
                      key={t}
                      htmlFor={`ct-${t}`}
                      className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm capitalize ${
                        courtType === t ? "border-emerald-600 ring-1 ring-emerald-600" : ""
                      }`}
                    >
                      <RadioGroupItem id={`ct-${t}`} value={t} className="sr-only" />
                      {t}
                    </Label>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Input id="notes" placeholder="Add a message for the facility" />
              </div>
            </CardContent>
          </Card>

          <aside className="grid gap-4">
            <BookingSummary
              date={date ?? new Date()}
              durationMinutes={duration}
              pricePerHour={facility.pricePerHour}
              slot={slot}
              facilityName={facility.name}
            />
            <Button disabled={!slot} asChild>
              <Link href="/bookings">Confirm & Pay</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/facilities/${facility.id}`}>Back to details</Link>
            </Button>
          </aside>
        </div>
      </section>
    </main>
  )
}
