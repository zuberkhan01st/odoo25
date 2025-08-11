"use client"

import Link from "next/link"
import AppHeader from "@/components/app-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Page() {
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
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14">
                  <AvatarImage src="/placeholder-user.jpg" alt="User avatar" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">Jordan Doe</div>
                  <div className="text-sm text-muted-foreground">jordan@example.com</div>
                </div>
              </div>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/profile/edit">Edit profile</Link>
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Upcoming bookings</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {["SRR Badminton Arena - Aug 20, 7:00 PM", "Westside Tennis - Aug 26, 6:30 PM"].map((t) => (
                  <div key={t} className="rounded-lg border p-3 text-sm">
                    {t}
                  </div>
                ))}
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
