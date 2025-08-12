"use client"

import type React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { BarChart2, CalendarDays, Home, Settings, Building2, HomeIcon as House } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export function OwnerShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <OwnerSidebar />
        <SidebarInset className="flex flex-col flex-1">
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="text-sm text-muted-foreground">Owner Console</div>
            <Button asChild size="sm" variant="outline" className="ml-auto gap-1 bg-transparent">
              <Link href="/">
                <House className="h-4 w-4" />
                Home
              </Link>
            </Button>
          </header>
          <main className="flex-1 p-4">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

export function OwnerSidebar() {
  const items = [
    { href: "/owner", label: "Dashboard", icon: Home },
    { href: "/owner/venues", label: "My Venues", icon: Building2 },
    { href: "/owner/bookings", label: "Bookings", icon: CalendarDays },
    { href: "/owner/analytics", label: "Analytics", icon: BarChart2 },
    { href: "/owner/settings", label: "Settings", icon: Settings },
  ]
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Owner</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((it) => (
                <SidebarMenuItem key={it.href}>
                  <SidebarMenuButton asChild>
                    <Link href={it.href}>
                      <it.icon />
                      <span>{it.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
