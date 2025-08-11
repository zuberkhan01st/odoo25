"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import AppHeader from "@/components/app-header"

export default function Page() {
  return (
    <main>
      <AppHeader />
      <section className="mx-auto grid max-w-md gap-6 px-4 py-10">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle>Create account</CardTitle>
            <CardDescription>Join QuickCourt to book local sports facilities</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" placeholder="Jane Doe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button className="w-full" asChild>
              <Link href="/auth/otp">Continue</Link>
            </Button>
          </CardContent>
          <CardFooter>
            <div className="text-sm">
              Already have an account?{" "}
              <Link className="underline" href="/auth/login">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}
