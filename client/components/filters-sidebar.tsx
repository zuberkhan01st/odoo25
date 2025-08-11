"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { sports } from "@/lib/mock-data"

export default function FiltersSidebar({
  sport,
  onSportChange,
  price,
  onPriceChange,
  rating,
  onRatingChange,
}: {
  sport: string
  onSportChange: (v: string) => void
  price: [number, number]
  onPriceChange: (v: [number, number]) => void
  rating: number
  onRatingChange: (v: number) => void
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Filters</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label>Sport</Label>
          <RadioGroup value={sport} onValueChange={onSportChange} className="grid gap-2">
            <Label htmlFor="all" className="flex items-center gap-2 text-sm">
              <RadioGroupItem id="all" value="all" />
              All
            </Label>
            {sports.map((s) => (
              <Label key={s.id} htmlFor={`s-${s.id}`} className="flex items-center gap-2 text-sm capitalize">
                <RadioGroupItem id={`s-${s.id}`} value={s.id} />
                {s.label}
              </Label>
            ))}
          </RadioGroup>
        </div>
        <div className="grid gap-2">
          <Label>
            Price range (${price[0]} - ${price[1]})
          </Label>
          <Slider
            defaultValue={[price[0], price[1]]}
            min={0}
            max={100}
            step={5}
            onValueChange={(v) => onPriceChange([v[0], v[1]] as [number, number])}
          />
        </div>
        <div className="grid gap-2">
          <Label>Min rating: {rating}+</Label>
          <Slider defaultValue={[rating]} min={0} max={5} step={0.5} onValueChange={(v) => onRatingChange(v[0])} />
        </div>
      </CardContent>
    </Card>
  )
}
