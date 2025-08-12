interface VenueInput {
  name: string;
  location: { city: string; area: string };
  description?: string;
}

interface VenueFormProps {
  onSubmit: (venue: VenueInput) => void;
  onCancel: () => void;
}
"use client"

import { useEffect, useState } from "react"

interface Venue {
  _id?: string;
  id?: string;
  name: string;
  location?: { city?: string; area?: string };
  city?: string;
  area?: string;
  description?: string;
  status?: string;
  rating?: number;
}

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

function getAuthHeaders() {
  return {
    Authorization: `Bearer ${typeof window !== "undefined" ? localStorage.getItem("ownerToken") : ""}`,
  }
}


export default function Page() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function fetchVenues() {
      setLoading(true)
      setError("")
      try {
        const res = await fetch("http://localhost:5000/api/owner/facility", {
          headers: getAuthHeaders(),
          credentials: "include",
        })
        if (!res.ok) throw new Error("Failed to fetch facilities")
        const data = await res.json()
        setVenues(data.facilities || [])
      } catch (e) {
        setError((e as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchVenues()
  }, [])

  // Add new venue handler
  async function handleAddVenue(newVenue: VenueInput) {
    setError("")
    try {
      const res = await fetch("http://localhost:5000/api/owner/facility", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(newVenue),
        credentials: "include",
      })
      if (!res.ok) throw new Error("Failed to add venue")
      const data = await res.json()
      // If backend returns { facility: {...} }, use that, else fallback to data
      setVenues((prev) => [...prev, data.facility || data])
      setOpen(false)
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6">
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">Add New Venue</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Venue</DialogTitle>
            </DialogHeader>
            <VenueForm onSubmit={handleAddVenue} onCancel={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid gap-4 md:grid-cols-3">
        {loading ? (
          <div className="col-span-full text-center text-gray-500">Loading venues...</div>
        ) : venues.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No venues found.</div>
        ) : (
          venues.map((v: any) => (
            <Card key={v._id || v.id} className="overflow-hidden">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-base">{v.name}</CardTitle>
                <Badge variant={v.status === "Approved" ? "default" : "secondary"}>{v.status}</Badge>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {v.city} • {v.rating ? v.rating.toFixed(1) : "-"} ★
              </CardContent>
              <CardFooter className="gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={`/owner/venues/${v._id || v.id}`}>Edit</a>
                </Button>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  View
                </Button>
                <Button size="sm" variant="destructive">
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </motion.div>
  )
}

// VenueForm component (simple form for demo)
interface VenueFormProps {
  onSubmit: (venue: VenueInput) => void;
  onCancel: () => void;
}

function VenueForm({ onSubmit, onCancel }: VenueFormProps) {
  const [name, setName] = useState("")
  const [city, setCity] = useState("")
  const [area, setArea] = useState("")
  const [description, setDescription] = useState("")
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ name, location: { city, area }, description })
      }}
      className="grid gap-4"
    >
      <input
        className="border p-2 rounded"
        placeholder="Venue Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="border p-2 rounded"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <input
        className="border p-2 rounded"
        placeholder="Area"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        required
      />
      <textarea
        className="border p-2 rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
          Add
        </Button>
      </div>
    </form>
  )
}
