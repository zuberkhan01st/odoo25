"use client"

import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { CardContent } from "@/components/ui/card"
import Card3D from "./card-3d"
import BentoItem from "./bento-item"
import ShinyCard from "../shiny-card"
import StatsGraph from "../stats-graph"
import { sportCategories } from "@/lib/sport-categories"

export default function BentoSkillsSection() {
  return (
    <section className="relative z-10 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 text-5xl font-bold tracking-tighter md:text-6xl">EXPLORE SPORTS BY CATEGORY</h2>
          <p className="text-xl tracking-wide text-gray-600 dark:text-gray-400">
            DISCOVER COURTS AND CLUBS ACROSS YOUR CITY
          </p>
        </motion.div>

        {/* Top overlays */}
        <div className="relative mb-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="relative overflow-hidden rounded-xl border-2 border-zinc-200 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-black/60">
            <div className="mb-2 text-sm text-muted-foreground">Weekly searches</div>
            <StatsGraph />
            <div className="mt-3 text-xs text-muted-foreground">Trending sports based on user interest</div>
            <div className="pointer-events-none absolute -right-6 -top-6 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-400/25 to-transparent blur-2xl dark:from-emerald-500/20" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["Verified venues", "New this week", "Top rated", "Community picks"].map((t, i) => (
              <div
                key={t}
                className="rounded-xl border-2 border-zinc-200 bg-white/70 p-4 text-sm font-medium shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-black/60"
                style={{ animation: `fadeIn 0.6s ease ${0.05 * i}s both` }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sportCategories.map((category, index) => (
            <BentoItem key={category.name} delay={index * 0.06}>
              <Card3D>
                <ShinyCard>
                  <CardContent className="flex h-full flex-col justify-between p-8">
                    <div>
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg border-2 border-black dark:border-white">
                        <category.icon className="h-8 w-8" />
                      </div>
                      <h3 className="mb-2 text-2xl font-bold tracking-tight">{category.name.toUpperCase()}</h3>
                      <p className="mb-4 text-sm tracking-wide text-gray-600 dark:text-gray-400">
                        {category.description.toUpperCase()}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold tracking-tight">{category.count}</span>
                      <ChevronRight className="h-6 w-6 text-gray-400" />
                    </div>
                  </CardContent>
                </ShinyCard>
              </Card3D>
            </BentoItem>
          ))}
        </div>
      </div>
    </section>
  )
}
