"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import AppHeader from "@/components/app-header"
import Link from "next/link"

export default function Page() {
  return (
    <main>
      <AppHeader />
      <section className="mx-auto grid max-w-md gap-6 px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl">Sign in</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input placeholder="you@example.com" />
              </div>
              <div className="grid gap-2">
                <Label>Password</Label>
                <Input type="password" />
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Sign in</Button>
              <div className="text-sm text-muted-foreground">
                New here?{" "}
                <Link className="underline" href="/signup">
                  Create account
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </main>
  )
}
