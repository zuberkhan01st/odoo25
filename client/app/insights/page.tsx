"use client"

import AppHeader from "@/components/app-header"
import StatsGraph from "@/components/stats-graph"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
  const blocks = [
    { title: "Bookings this week", value: "324", data: [8, 10, 9, 12, 14, 18, 22, 20, 26, 32] },
    { title: "Avg rating", value: "4.6", data: [4.2, 4.3, 4.5, 4.4, 4.6, 4.7, 4.6, 4.8, 4.7, 4.6] },
    { title: "New users", value: "189", data: [2, 3, 4, 6, 7, 9, 7, 8, 10, 12] },
  ]
  return (
    <main>
      <AppHeader />
      <section className="relative z-10 mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold tracking-tight">Insights</h1>
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {blocks.map((b) => (
            <Card key={b.title} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-base">{b.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-end justify-between">
                <div className="text-3xl font-semibold">{b.value}</div>
                <StatsGraph data={b.data} className="-mr-4" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="relative overflow-hidden">
            <CardHeader>
              <CardTitle className="text-base">Conversion funnel</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              {["Visit", "View facility", "Pick slot", "Confirm"].map((s, i) => (
                <div key={s} className="flex items-center gap-2">
                  <div className="h-3 flex-1 rounded bg-zinc-200 dark:bg-zinc-800">
                    <div className="h-3 rounded bg-emerald-600" style={{ width: `${100 - i * 18}%` }} />
                  </div>
                  <span className="w-24 text-right text-xs text-muted-foreground">{s}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Activity heatmap</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-14 gap-1">
              {Array.from({ length: 98 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-4 rounded-sm bg-emerald-600/20 dark:bg-emerald-500/20"
                  style={{ opacity: 0.3 + ((i % 14) / 14) * 0.7 }}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
