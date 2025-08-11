"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BookingSummary({
  facilityName = "Facility",
  date = new Date(),
  durationMinutes = 60,
  pricePerHour = 30,
  slot = null,
}: {
  facilityName?: string
  date?: Date
  durationMinutes?: number
  pricePerHour?: number
  slot?: string | null
}) {
  const hours = Math.max(1, Math.round(durationMinutes / 60))
  const subtotal = hours * pricePerHour
  const fees = Math.round(subtotal * 0.08)
  const total = subtotal + fees

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Booking summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span>Facility</span>
          <span className="font-medium">{facilityName}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Date</span>
          <span className="font-medium">{date.toDateString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Time</span>
          <span className="font-medium">{slot ?? "Select a slot"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Duration</span>
          <span className="font-medium">{hours} hr</span>
        </div>
        <hr className="my-2" />
        <div className="flex items-center justify-between">
          <span>Price</span>
          <span>${pricePerHour.toFixed(0)}/hr</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(0)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Fees & taxes</span>
          <span>${fees.toFixed(0)}</span>
        </div>
        <hr className="my-2" />
        <div className="flex items-center justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">${total.toFixed(0)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
