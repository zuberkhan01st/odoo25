"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Search, Star } from "lucide-react"
import AppHeader from "@/components/app-header"
import FacilityCard from "@/components/facility-card"
import { facilities, type Facility } from "@/lib/mock-data"
import BentoSkillsSection from "@/components/bento/bento-skills-section"
import GlassBox from "@/components/glass-box"
import MapPreview from "@/components/map-preview"

export default function Page() {
  const [query, setQuery] = useState("")
  const [activeSport, setActiveSport] = useState<string>("all")

  const filtered = useMemo(() => {
    return facilities.filter((f) => {
      const matchesSport = activeSport === "all" ? true : f.sport === activeSport
      const matchesQuery =
        query.trim().length === 0 ||
        f.name.toLowerCase().includes(query.toLowerCase()) ||
        f.location.city.toLowerCase().includes(query.toLowerCase())
      return matchesSport && matchesQuery
    })
  }, [query, activeSport])

  return (
    <main className="min-h-screen">
      <AppHeader />
      <BentoSkillsSection />

      {/* Map near me */}
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Nearby map</h2>
          <span className="text-xs text-muted-foreground">Based on device/IP location</span>
        </div>
        <MapPreview height={320} className="mb-6" />
      </section>

      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Discover courts near you</span>
            </div>
            <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center md:gap-2 md:pl-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name or city"
                  className="pl-9"
                />
              </div>
              <Tabs defaultValue="popular" className="md:ml-auto">
                <TabsList>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="nearby">Nearby</TabsTrigger>
                  <TabsTrigger value="deals">Deals</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <GlassBox>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Available Facilities</h2>
            <div className="text-sm text-muted-foreground">{filtered.length} results</div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((f: Facility) => (
              <FacilityCard key={f.id} facility={f} />
            ))}
          </div>

          <div className="mt-10 grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Popular nearby</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                {filtered.slice(0, 6).map((f) => (
                  <Link
                    key={f.id + "-pop"}
                    href={`/facilities/${f.id}`}
                    className="group relative overflow-hidden rounded-lg border"
                  >
                    <img
                      src={`/modern-research-facility.png?height=160&width=220&query=facility%20${encodeURIComponent(
                        f.sport,
                      )}%20card`}
                      alt={`${f.name} cover`}
                      className="aspect-[10/7] w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="p-2">
                      <div className="line-clamp-1 text-sm font-medium">{f.name}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-emerald-500 text-emerald-500" />
                        {f.rating.toFixed(1)}
                        <Badge variant="secondary" className="ml-auto">
                          {f.sportLabel}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </GlassBox>
      </section>
    </main>
  )
}
