"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const rows = Array.from({ length: 16 }).map((_, i) => ({
  id: `BKG-${1000 + i}`,
  venue: ["SRR Badminton", "Westside Tennis", "City Squash"][i % 3],
  court: `Court ${1 + (i % 4)}`,
  user: `user${i + 1}@example.com`,
  date: `2025-08-${10 + (i % 18)}`,
  time: ["6:00 PM", "7:30 PM", "8:00 AM"][i % 3],
  status: ["Confirmed", "Pending", "Cancelled"][i % 3],
}))

export default function Page() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4">
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Bookings</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-muted-foreground">
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>Hover status to see details</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Court</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Date/Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>{r.id}</TableCell>
                  <TableCell>{r.venue}</TableCell>
                  <TableCell>{r.court}</TableCell>
                  <TableCell>{r.user}</TableCell>
                  <TableCell>
                    {r.date} &middot; {r.time}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        r.status === "Confirmed"
                          ? "bg-emerald-600 hover:bg-emerald-700"
                          : r.status === "Pending"
                            ? "bg-zinc-600 hover:bg-zinc-700"
                            : "bg-red-600 hover:bg-red-700"
                      }
                    >
                      {r.status}
                    </Badge>
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
