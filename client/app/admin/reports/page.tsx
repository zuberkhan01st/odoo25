"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
const revenue = months.map((m, i) => ({
  month: m,
  rev: 10000 + i * 2500 + Math.random() * 2500,
  bookings: 250 + i * 40,
}))

const pie = [
  { name: "Badminton", value: 38 },
  { name: "Tennis", value: 26 },
  { name: "Football", value: 22 },
  { name: "Other", value: 14 },
]
const colors = ["#10b981", "#a3a3a3", "#22c55e", "#525252"]

export default function Page() {
  const [sport, setSport] = useState("all")
  const [range, setRange] = useState("6m")
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6">
      <div className="flex flex-wrap gap-3">
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3m">Last 3 months</SelectItem>
            <SelectItem value="6m">Last 6 months</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sport} onValueChange={setSport}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="badminton">Badminton</SelectItem>
            <SelectItem value="tennis">Tennis</SelectItem>
            <SelectItem value="football">Football</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Revenue and bookings</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <ChartContainer
            config={{
              rev: { label: "Revenue", color: "hsl(var(--chart-2))" },
            }}
            className="h-[280px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="rev" fill="var(--color-rev)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          <ChartContainer
            config={{
              bookings: { label: "Bookings", color: "hsl(var(--chart-1))" },
            }}
            className="h-[280px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="var(--color-bookings)"
                  strokeWidth={3}
                  dot={{ r: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Distribution by sport</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[280px] items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pie} innerRadius={60} outerRadius={100} dataKey="value" nameKey="name" paddingAngle={2}>
                {pie.map((_, i) => (
                  <Cell key={i} fill={colors[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
