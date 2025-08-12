"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, LineChart, Line } from "recharts"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

function getAuthHeaders() {
  return {
    Authorization: `Bearer ${typeof window !== "undefined" ? localStorage.getItem("ownerToken") : ""}`,
  }
}

export default function Page() {
  const [revenue, setRevenue] = useState([])
  const [peak, setPeak] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true)
      setError("")
      try {
        const res = await fetch("http://localhost:5000/api/owner/dashboard", {
          headers: getAuthHeaders(),
        })
        if (!res.ok) throw new Error("Failed to fetch analytics")
        const data = await res.json()
        setRevenue(data.revenueByMonth || [])
        setPeak(data.peakHoursByMonth || [])
      } catch (e) {
        setError((e as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchAnalytics()
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6">
      {error && <div className="text-red-500">{error}</div>}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle className="text-base">Revenue (monthly)</CardTitle>
          <Button size="sm" variant="outline">
            Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ rev: { label: "Revenue", color: "hsl(var(--chart-2))" } }} className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="rev" fill="var(--color-rev)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Peak hours</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ peak: { label: "Peak", color: "hsl(var(--chart-1))" } }} className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={peak}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line dataKey="peak" stroke="var(--color-peak)" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
