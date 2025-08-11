"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import AppHeader from "@/components/app-header"

export default function Page() {
  return (
    <main>
      <AppHeader />
      <section className="mx-auto grid max-w-md gap-6 px-4 py-10">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>Sign in to continue booking courts</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>
              <Link href="#" className="text-sm underline">
                Forgot password?
              </Link>
            </div>
            <Button className="w-full">Sign in</Button>
          </CardContent>
          <CardFooter>
            <div className="text-sm">
              New here?{" "}
              <Link className="underline" href="/auth/signup">
                Create an account
              </Link>
            </div>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}
