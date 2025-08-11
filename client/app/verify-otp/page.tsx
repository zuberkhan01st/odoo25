"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import AppHeader from "@/components/app-header"

export default function Page() {
  const [code, setCode] = useState("")
  const [seconds, setSeconds] = useState(30)
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])
  return (
    <main>
      <AppHeader />
      <section className="mx-auto max-w-md px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>Verify code</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-6 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Input
                    key={i}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    className="text-center"
                    value={code[i] ?? ""}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, "")
                      const next = (code.substring(0, i) + val + code.substring(i + 1)).slice(0, 6)
                      setCode(next)
                    }}
                  />
                ))}
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Verify</Button>
              <div className="text-center text-sm text-muted-foreground">
                {seconds > 0 ? `Resend in ${seconds}s` : "Resend available"}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </main>
  )
}
