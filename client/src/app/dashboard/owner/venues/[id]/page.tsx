"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function Page() {
  const { id } = useParams<{ id: string }>()
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Edit Venue {id}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input placeholder="Venue name" />
          </div>
          <div className="grid gap-2">
            <Label>Address</Label>
            <Input placeholder="123 Main St" />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <Label>Amenities</Label>
            <Input placeholder="Parking, Locker rooms…" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Courts</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          {["Court 1 - $35/hr", "Court 2 - $35/hr"].map((c) => (
            <div key={c} className="rounded-md border p-3 text-sm">
              {c}
            </div>
          ))}
          <Button className="w-fit bg-emerald-600 hover:bg-emerald-700">Add New Court</Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
