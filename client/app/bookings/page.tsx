"use client"

import AppHeader from "@/components/app-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Clock, MapPin } from "lucide-react"
import BookingsCalendar from "@/components/bookings-calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function Page() {
  const items = [
    {
      id: "1",
      name: "SRR Badminton Arena",
      city: "Palo Alto",
      date: "Aug 20, 2025",
      iso: "2025-08-20",
      time: "7:00 PM",
      sport: "badminton",
      status: "Upcoming",
    },
    {
      id: "2",
      name: "Westside Tennis",
      city: "San Jose",
      date: "Aug 14, 2025",
      iso: "2025-08-14",
      time: "6:00 PM",
      sport: "tennis",
      status: "Completed",
    },
  ]
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
            <BookingsCalendar bookedISO={items.map((i) => i.iso)} />
            <div className="mt-2 text-xs text-muted-foreground">Dates with a green dot have at least one booking.</div>
          </CardContent>
        </Card>

        <div className="grid gap-3">
          {items.map((b) => (
            <Card key={b.id}>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-base">{b.name}</CardTitle>
                <Badge variant={b.status === "Upcoming" ? "default" : "secondary"} className="capitalize">
                  {b.status}
                </Badge>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {b.city}
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {b.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {b.time}
                  </span>
                </div>
                <div className="pt-2">
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
                          <span className="font-medium">{b.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>City</span>
                          <span className="font-medium">{b.city}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Date</span>
                          <span className="font-medium">{b.date}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Time</span>
                          <span className="font-medium">{b.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Total</span>
                          <span className="font-semibold">$42.00</span>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
