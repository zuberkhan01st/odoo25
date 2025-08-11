"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const rows = Array.from({ length: 12 }).map((_, i) => ({
  name: `Venue ${i + 1}`,
  owner: `Owner ${i + 1}`,
  sports: ["Tennis", "Badminton", "Football"][i % 3],
  location: ["San Jose", "Palo Alto", "Sunnyvale"][i % 3],
}))

export default function Page() {
  const [q, setQ] = useState("")
  const data = useMemo(() => rows.filter((r) => r.name.toLowerCase().includes(q.toLowerCase())), [q])
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4">
      <div className="flex items-center gap-2">
        <Input placeholder="Search venues…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pending venues</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Sport Types</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((r) => (
                <TableRow key={r.name}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.owner}</TableCell>
                  <TableCell>{r.sports}</TableCell>
                  <TableCell>{r.location}</TableCell>
                  <TableCell className="space-x-2 text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{r.name}</DialogTitle>
                        </DialogHeader>
                        <div className="text-sm text-muted-foreground">
                          Owner: {r.owner} • Sports: {r.sports} • Location: {r.location}
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      Approve
                    </Button>
                    <Button size="sm" variant="destructive">
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
