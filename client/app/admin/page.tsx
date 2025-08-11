"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, Line, LineChart, CartesianGrid, XAxis, YAxis, Bar, BarChart } from "recharts"
import { DollarSign, TicketCheck, Building2, Loader } from "lucide-react"
import { useEffect, useState } from "react"

interface DashboardStats {
  totalVenues: number
  totalBookings: number
  pendingApprovals: number
  totalRevenue: number
  bookingsOverTime: { month: string; count: number }[]
  monthlyRevenue: { month: string; revenue: number }[]
}

export default function Page() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${typeof window !== "undefined" ? localStorage.getItem("adminToken") : ""}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStats(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to fetch dashboard stats")
        setLoading(false)
      })
  }, [])

  const kpis = [
    { title: "Total Venues", value: stats?.totalVenues ?? 0, icon: Building2 },
    { title: "Total Bookings", value: stats?.totalBookings ?? 0, icon: TicketCheck },
    { title: "Pending Approvals", value: stats?.pendingApprovals ?? 0, icon: Loader },
    { title: "Total Revenue", value: `₹${stats?.totalRevenue?.toLocaleString() ?? 0}`, icon: DollarSign },
  ]

  const bookings = stats?.bookingsOverTime ?? []
  const monthlyRevenue = stats?.monthlyRevenue ?? []

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6">
      {loading && <div>Loading dashboard...</div>}
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid gap-4 md:grid-cols-4">
        {kpis.map((k, idx) => (
          <motion.div
            key={k.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * idx }}
          >
            <Card className="overflow-hidden">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-sm">{k.title}</CardTitle>
                <k.icon className="h-5 w-5 text-emerald-600" />
              </CardHeader>
              <CardContent className="text-3xl font-semibold">{k.value}</CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Bookings over time</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              count: { label: "Bookings", color: "hsl(var(--chart-1))" },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bookings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="count" stroke="var(--color-count)" strokeWidth={3} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Monthly revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: { label: "Revenue", color: "hsl(var(--chart-2))" },
            }}
            className="h-[280px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
