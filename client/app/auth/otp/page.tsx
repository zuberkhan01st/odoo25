"use client"

import { useState } from "react"
import AppHeader from "@/components/app-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Page() {
  const [code, setCode] = useState("")
  return (
    <main>
      <AppHeader />
      <section className="mx-auto grid max-w-md gap-6 px-4 py-10">
        <Card>
          <CardHeader>
            <CardTitle>Enter verification code</CardTitle>
            <CardDescription>We sent a 6-digit code to your email</CardDescription>
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
            <Button className="w-full">Verify</Button>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
