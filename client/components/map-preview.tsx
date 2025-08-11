"use client"

import { useEffect, useMemo, useState } from "react"
import { MapPin } from "lucide-react"

type Coords = { lat: number; lon: number }

async function geolocate(): Promise<Coords> {
  // Try browser geolocation first
  const geo = await new Promise<Coords | null>((resolve) => {
    if (!navigator.geolocation) return resolve(null)
    navigator.geolocation.getCurrentPosition(
      (p) => resolve({ lat: p.coords.latitude, lon: p.coords.longitude }),
      () => resolve(null),
      { enableHighAccuracy: true, maximumAge: 60_000, timeout: 5_000 },
    )
  })
  if (geo) return geo
  // Fallback to IP-based lookup
  try {
    const res = await fetch("https://ipapi.co/json/")
    const data = await res.json()
    if (data && typeof data.latitude === "number" && typeof data.longitude === "number") {
      return { lat: data.latitude, lon: data.longitude }
    }
  } catch {}
  // Default to San Jose
  return { lat: 37.3382, lon: -121.8863 }
}

export default function MapPreview({
  height = 300,
  className = "",
  zoom = 13,
}: {
  height?: number
  className?: string
  zoom?: number
}) {
  const [coords, setCoords] = useState<Coords | null>(null)

  useEffect(() => {
    geolocate().then(setCoords)
  }, [])

  const { bbox, marker } = useMemo(() => {
    const c = coords ?? { lat: 37.3382, lon: -121.8863 }
    const span = 0.02
    const bboxVal = `${c.lon - span},${c.lat - span},${c.lon + span},${c.lat + span}`
    const markerVal = `${c.lat}%2C${c.lon}`
    return { bbox: bboxVal, marker: markerVal }
  }, [coords])

  return (
    <div className={`relative overflow-hidden rounded-xl border bg-background ${className}`} style={{ height }}>
      <iframe
        title="Location map"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&marker=${marker}&layer=mapnik`}
        className="h-full w-full"
      />
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-zinc-200 dark:ring-zinc-800" />
      <div className="absolute left-3 top-3 z-10 rounded-md bg-background/80 px-2 py-1 text-xs backdrop-blur">
        <span className="flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-emerald-600" />
          {coords ? `${coords.lat.toFixed(3)}, ${coords.lon.toFixed(3)}` : "Locating..."}
        </span>
      </div>
    </div>
  )
}
