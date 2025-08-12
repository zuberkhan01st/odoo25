"use client"

import Link from "next/link"
import AppHeader from "@/components/app-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

interface UserProfile {
  name: string
  email: string
  avatar?: string
  skillLevel?: string
  preferredPlayTimes?: string[]
  favoriteSports?: string[]
  location?: {
    city?: string
    area?: string
    coordinates?: { lat: number; lng: number }
  }
}

export default function Page() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("http://localhost:5000/api/owner/profile", {
      headers: {
        Authorization: `Bearer ${
          typeof window !== "undefined" ? localStorage.getItem("token") : ""
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data)
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to fetch profile")
        setLoading(false)
      })
  }, [])

  return (
    <main>
      <AppHeader />
      <section className="mx-auto max-w-5xl px-4 py-6">
        <div className="grid gap-6 md:grid-cols-[280px_1fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">My Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {loading && <div>Loading profile...</div>}
              {error && <div className="text-red-500">{error}</div>}
              {profile && (
                <>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-14 w-14">
                      <AvatarImage
                        src={profile.avatar || "/placeholder-user.jpg"}
                        alt="User avatar"
                      />
                      <AvatarFallback>{profile.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{profile.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {profile.email}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Skill Level:</span>{" "}
                      {profile.skillLevel || "-"}
                    </div>
                    <div>
                      <span className="font-medium">Preferred Play Times:</span>{" "}
                      {profile.preferredPlayTimes?.join(", ") || "-"}
                    </div>
                    <div>
                      <span className="font-medium">Favorite Sports:</span>{" "}
                      {profile.favoriteSports?.join(", ") || "-"}
                    </div>
                    <div>
                      <span className="font-medium">Location:</span>{" "}
                      {profile.location?.city || "-"},{" "}
                      {profile.location?.area || "-"}
                    </div>
                  </div>
                  <Button
                    asChild
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Link href="/profile/edit">Edit profile</Link>
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Upcoming bookings</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                <Button variant="outline" asChild>
                  <Link href="/bookings">View all</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
}
