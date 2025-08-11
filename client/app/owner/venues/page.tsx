"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const venues = [
  { id: "v1", name: "SRR Badminton", city: "Palo Alto", rating: 4.6, status: "Approved" },
  { id: "v2", name: "Westside Tennis", city: "San Jose", rating: 4.8, status: "Approved" },
  { id: "v3", name: "Community Football", city: "Santa Clara", rating: 4.2, status: "Pending" },
]

export default function Page() {
  const [open, setOpen] = useState(false)
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
            <div className="text-sm text-muted-foreground">Upload photos and enter venue details here.</div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {venues.map((v) => (
          <Card key={v.id} className="overflow-hidden">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="text-base">{v.name}</CardTitle>
              <Badge variant={v.status === "Approved" ? "default" : "secondary"}>{v.status}</Badge>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {v.city} • {v.rating.toFixed(1)} ★
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={`/owner/venues/${v.id}`}>Edit</a>
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                View
              </Button>
              <Button size="sm" variant="destructive">
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}
