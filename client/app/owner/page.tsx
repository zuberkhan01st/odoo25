"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { Plus, DollarSign, Building2, ClipboardList } from "lucide-react"
import { useEffect, useState } from "react"

function getAuthHeaders() {
  const token = typeof window !== "undefined" ? localStorage.getItem("ownerToken") : null
  return token ? { Authorization: `Bearer ${token}` } : undefined
}

export default function Page() {
  const [kpis, setKpis] = useState([
    { title: "Total Bookings", value: "-", icon: ClipboardList },
    { title: "Revenue (30d)", value: "-", icon: DollarSign },
    { title: "Active Venues", value: "-", icon: Building2 },
    { title: "Pending Requests", value: "-", icon: Plus },
  ])
  const [days, setDays] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchKPIs() {
      setLoading(true)
      setError("")
      try {
        const res = await fetch("http://localhost:5000/api/owner/dashboard", {
          headers: {
            ...getAuthHeaders(),
          },
        })
        if (!res.ok) throw new Error("Failed to fetch dashboard KPIs")
        const data = await res.json()
        setKpis([
          { title: "Total Bookings", value: data.totalBookings, icon: ClipboardList },
          { title: "Revenue (30d)", value: `$${data.revenue30d || 0}`, icon: DollarSign },
          { title: "Active Venues", value: data.activeVenues, icon: Building2 },
          { title: "Pending Requests", value: data.pendingRequests, icon: Plus },
        ])
        setDays(data.bookingsPerDay || [])
      } catch (e) {
        setError((e as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchKPIs()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      {error && <div className="text-red-500">{error}</div>}

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {kpis.map((k, idx) => (
          <motion.div
            key={k.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx }}
          >
            <Card>
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-sm">{k.title}</CardTitle>
                <k.icon className="h-5 w-5 text-emerald-600" />
              </CardHeader>
              <CardContent className="text-3xl font-semibold">{k.value}</CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bookings (last 30 days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              v: { label: "Bookings", color: "hsl(var(--chart-1))" },
            }}
            className="h-[280px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={days}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="d" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="v" stroke="var(--color-v)" strokeWidth={3} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        {["Add Venue", "View Bookings", "Manage Courts"].map((a) => (
          <Card key={a} className="group overflow-hidden transition">
            <CardHeader>
              <CardTitle className="text-base">{a}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Quick access with shiny hover states and smooth transitions.
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  )
}
