"use client"

import AppHeader from "@/components/app-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, MapPin } from "lucide-react"
import BookingsCalendar from "@/components/bookings-calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useEffect, useState } from "react"

interface Booking {
  _id: string
  venue?: { name: string; location?: { city?: string } }
  court?: { name?: string; sportType?: string }
  date: string
  timeSlot: string
  status: string
  price?: number
  createdAt?: string
}

export default function Page() {
  const [items, setItems] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("http://localhost:5000/api/bookings/my", {
      headers: {
        // If you use JWT auth, add token here
        Authorization: `Bearer ${typeof window !== "undefined" ? localStorage.getItem("token") : ""}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to fetch bookings")
        setLoading(false)
      })
  }, [])

  return (
    <main>
      <AppHeader />
      <section className="mx-auto max-w-5xl px-4 py-6">
        <h1 className="mb-4 text-xl font-semibold">My Bookings</h1>

        <Card className="mb-6">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-base">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <BookingsCalendar bookedISO={items.map((i) => i.date)} />
            <div className="mt-2 text-xs text-muted-foreground">Dates with a green dot have at least one booking.</div>
          </CardContent>
        </Card>

        {loading && <div>Loading bookings...</div>}
        {error && <div className="text-red-500">{error}</div>}
        <div className="grid gap-3">
          {items.length === 0 && !loading && <div className="text-gray-500">No bookings found.</div>}
          {items.map((b) => (
            <Card key={b._id}>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-base">{b.venue?.name || "Unknown Venue"}</CardTitle>
                <Badge variant={b.status === "confirmed" ? "default" : "secondary"} className="capitalize">
                  {b.status || "Unknown"}
                </Badge>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {b.venue?.location?.city || "-"}
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {b.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {b.timeSlot}
                  </span>
                </div>
                <div className="pt-2 flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        View receipt
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Booking receipt</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span>Facility</span>
                          <span className="font-medium">{b.venue?.name || "-"}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>City</span>
                          <span className="font-medium">{b.venue?.location?.city || "-"}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Date</span>
                          <span className="font-medium">{b.date}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Time</span>
                          <span className="font-medium">{b.timeSlot}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Total</span>
                          <span className="font-semibold">₹{b.price || 0}</span>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  {b.status === "confirmed" && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={async () => {
                        try {
                          const res = await fetch(`http://localhost:5000/api/bookings/${b._id}/cancel`, {
                            method: "PATCH",
                            headers: {
                              Authorization: `Bearer ${typeof window !== "undefined" ? localStorage.getItem("token") : ""}`,
                            },
                          })
                          if (res.ok) {
                            setItems((prev) => prev.filter((item) => item._id !== b._id))
                          }
                        } catch (err) {
                          // Optionally show error
                        }
                      }}
                    >
                      Cancel Booking
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
