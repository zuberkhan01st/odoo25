"use client"

import AppHeader from "@/components/app-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function Page() {
  const faqs = [
    { q: "How do I reschedule a booking?", a: "Go to My Bookings and choose the booking to reschedule." },
    { q: "What payment methods are supported?", a: "All major cards and wallet payments are supported." },
    { q: "Can I add multiple players?", a: "Yes, add notes while booking or contact the facility." },
  ]
  return (
    <main>
      <AppHeader />
      <section className="relative z-10 mx-auto max-w-4xl px-4 py-10">
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search help articles" />
          </div>
        </div>
        <div className="grid gap-4">
          {faqs.map((f) => (
            <Card key={f.q}>
              <CardHeader>
                <CardTitle className="text-base">{f.q}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{f.a}</CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
