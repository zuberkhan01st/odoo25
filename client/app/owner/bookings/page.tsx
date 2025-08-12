"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react"

interface Booking {
  id: string | number
  venue: string
  user: string
  date: string
  time: string
  status: string
}

export default function Page() {
  const [rows, setRows] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true)
      setError("")
      try {
        const res = await fetch("http://localhost:5000/api/owner/bookings", {
          headers: {
            Authorization: `Bearer ${typeof window !== "undefined" ? localStorage.getItem("ownerToken") : ""}`,
          },
        })
        if (!res.ok) throw new Error("Failed to fetch bookings")
        const data = await res.json()
        setRows(data.bookings || [])
      } catch (e) {
        setError((e as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6">
      <div className="flex gap-2">
        <Select defaultValue="all">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Sport type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="badminton">Badminton</SelectItem>
            <SelectItem value="tennis">Tennis</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bookings</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Venue</TableHead>
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
                  <TableCell>{r.user}</TableCell>
                  <TableCell>
                    {r.date} &middot; {r.time}
                  </TableCell>
                  <TableCell>{r.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
