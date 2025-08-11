"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, DollarSign } from "lucide-react"
import type { Facility } from "@/lib/mock-data"

export default function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/facilities/${facility.id}`}>
        <img
          src={`/abstract-geometric-shapes.png?height=220&width=400&query=${encodeURIComponent(facility.sportLabel + " indoor court")}`}
          alt={`${facility.name} cover`}
          className="aspect-[16/10] w-full object-cover"
        />
      </Link>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="line-clamp-1 text-base">{facility.name}</CardTitle>
          <Badge variant="secondary" className="shrink-0">
            {facility.sportLabel}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span className="line-clamp-1">{facility.location.city}</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-emerald-500 text-emerald-600" />
            {facility.rating.toFixed(1)}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            {facility.pricePerHour.toFixed(0)} / hr
          </span>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/facilities/${facility.id}`}>Details</Link>
          </Button>
          <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Link href={`/book/${facility.id}`}>Book</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
