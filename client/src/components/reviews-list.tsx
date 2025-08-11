"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export default function ReviewsList() {
  const reviews = [
    { id: "1", name: "Scott", city: "Palo Alto", rating: 5, text: "Great courts and friendly staff." },
    { id: "2", name: "Julie", city: "San Jose", rating: 4, text: "Good lighting and clean facilities." },
    { id: "3", name: "Nicole", city: "Sunnyvale", rating: 5, text: "Easy booking and plenty of parking." },
  ]
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Reviews</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        {reviews.map((r) => (
          <article key={r.id} className="grid gap-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src="/placeholder-user.jpg" alt={`Avatar of ${r.name}`} />
                <AvatarFallback>{r.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.city}</div>
              </div>
              <div className="ml-auto flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-emerald-500 text-emerald-600" : ""}`} />
                ))}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{r.text}</p>
          </article>
        ))}
      </CardContent>
    </Card>
  )
}
