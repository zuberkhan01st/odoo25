"use client"

import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import AppHeader from "@/components/app-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Page() {
  const { id } = useParams<{ id: string }>()
  return (
    <main>
      <AppHeader />
      <section className="mx-auto max-w-xl px-4 py-12">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Booking Successful</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="rounded-md border p-4 text-sm">
                Your booking <span className="font-medium">{id}</span> is confirmed. Add to calendar or share.
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Add to Calendar</Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700">Share</Button>
                <Button asChild variant="outline" className="ml-auto bg-transparent">
                  <Link href="/bookings">Go to My Bookings</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </main>
  )
}
