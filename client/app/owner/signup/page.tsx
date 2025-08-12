"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import AppHeader from "@/components/app-header"

export default function OwnerSignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      const res = await fetch("http://localhost:5000/api/owner/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone })
      })
      const data = await res.json()
      if (res.ok && data.token) {
        localStorage.setItem("ownerToken", data.token)
        router.push("/owner")
      } else {
        setError(data.error || "Signup failed")
      }
    } catch {
      setError("Signup failed. Please try again.")
    }
  }

  return (
    <main>
      <AppHeader />
      <section className="mx-auto grid max-w-md gap-6 px-4 py-10">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle>Owner Signup</CardTitle>
            <CardDescription>Create an account to manage your venues</CardDescription>
          </CardHeader>
          <form onSubmit={handleSignup}>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" placeholder="Jane Doe" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="1234567890" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button className="w-full" type="submit">Sign up</Button>
            </CardContent>
          </form>
          <CardFooter>
            <div className="text-sm">
              Already have an account? <Link className="underline" href="/owner/login">Sign in</Link>
            </div>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}
