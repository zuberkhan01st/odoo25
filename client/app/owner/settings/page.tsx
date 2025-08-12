"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

function getAuthHeaders() {
  return {
    Authorization: `Bearer ${typeof window !== "undefined" ? localStorage.getItem("ownerToken") : ""}`,
  }
}

export default function Page() {
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true)
      setError("")
      try {
        const res = await fetch("http://localhost:5000/api/owner/profile", {
          headers: getAuthHeaders(),
        })
        if (!res.ok) throw new Error("Failed to fetch profile")
        const data = await res.json()
        setProfile({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
        })
      } catch (e) {
        setError((e as Error).message)
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setSuccess("")
    try {
      const res = await fetch("http://localhost:5000/api/owner/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(profile),
      })
      if (!res.ok) throw new Error("Failed to update profile")
      setSuccess("Profile updated successfully")
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Owner profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {error && <div className="text-red-500 md:col-span-2">{error}</div>}
          {success && <div className="text-green-600 md:col-span-2">{success}</div>}
          <form onSubmit={handleSave} className="contents">
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} placeholder="Jordan Owner" />
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} placeholder="owner@example.com" />
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <Input value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} placeholder="+1 555 000 0000" />
            </div>
            <div className="md:col-span-2 flex items-center justify-between">
              <Label>Notify via Email/SMS</Label>
              <Switch defaultChecked />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit" className="bg-emerald-600 shadow-[0_0_0_2px_rgba(16,185,129,0.2)] hover:bg-emerald-700">Save</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
