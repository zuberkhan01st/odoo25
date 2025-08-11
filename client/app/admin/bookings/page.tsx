"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useEffect, useState } from "react"

export default function Page() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/bookings", {
      headers: {
        Authorization: `Bearer ${typeof window !== "undefined" ? localStorage.getItem("adminToken") : ""}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to fetch bookings")
        setLoading(false)
      })
  }, [])

  const rows = bookings

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
