"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, LineChart, Line } from "recharts"
import { Button } from "@/components/ui/button"

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
const series = months.map((m, i) => ({ month: m, rev: 3000 + i * 800, peak: 12 + i * 2 }))

export default function Page() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6">
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
              <BarChart data={series}>
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
              <LineChart data={series}>
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
