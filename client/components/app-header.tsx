"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Menu, CalendarDays, User, MapPin } from "lucide-react"
import { useState } from "react"
import ThemeToggle from "@/components/theme-toggle"

export default function AppHeader() {
  const pathname = usePathname()
  const [city, setCity] = useState("San Jose")
  const nav = [
    { href: "/", label: "Home" },
    { href: "/venues", label: "Venues" },
    { href: "/bookings", label: "Bookings" },
    { href: "/profile", label: "Profile" },
    { href: "/categories", label: "Categories" },
    { href: "/help", label: "Help" },
    // Admin/Owner portals
    { href: "/admin", label: "Admin" },
    { href: "/owner", label: "Owner" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger className="md:hidden" aria-label="Open navigation">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-1">
                {nav.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={`rounded-md px-2 py-2 text-sm hover:bg-muted ${
                      pathname === n.href ? "font-medium text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="text-base font-semibold tracking-tight">
            QuickCourt
          </Link>

          <div className="ml-2 hidden items-center gap-2 md:flex">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="h-8 w-[140px]">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="San Jose">San Jose</SelectItem>
                <SelectItem value="Palo Alto">Palo Alto</SelectItem>
                <SelectItem value="Sunnyvale">Sunnyvale</SelectItem>
                <SelectItem value="Mountain View">Mountain View</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`relative rounded-md px-3 py-2 text-sm hover:bg-muted ${
                  pathname === n.href
                    ? "font-medium text-foreground after:absolute after:-bottom-[2px] after:left-3 after:right-3 after:h-[2px] after:rounded-full after:bg-emerald-600"
                    : "text-muted-foreground"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-4">
            <ThemeToggle />
            <Button asChild size="sm" variant="outline" className="gap-1 bg-transparent">
              <Link href="/bookings">
                <CalendarDays className="h-4 w-4" />
                <span>My bookings</span>
              </Link>
            </Button>
            <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/login">
                <User className="h-4 w-4" />
                <span>Sign in</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
