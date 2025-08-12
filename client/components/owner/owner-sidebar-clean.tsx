"use client";

import type React from "react";
import Link from "next/link";
import { BarChart2, CalendarDays, Home, Settings, Building2 } from "lucide-react";

export function OwnerSidebar() {
  const items = [
    { href: "/owner", label: "Dashboard", icon: Home },
    { href: "/owner/venues", label: "My Venues", icon: Building2 },
    { href: "/owner/bookings", label: "Bookings", icon: CalendarDays },
    { href: "/owner/analytics", label: "Analytics", icon: BarChart2 },
    { href: "/owner/settings", label: "Settings", icon: Settings },
  ];
  const avatar = "/placeholder-user.jpg";
  return (
    <aside className="bg-white border-r min-h-screen w-60 flex flex-col shadow-sm">
      <div className="flex flex-col items-center py-8 gap-2 border-b">
        <img src={avatar} alt="Owner avatar" className="w-16 h-16 rounded-full border shadow" />
        <span className="font-semibold text-lg">Owner</span>
      </div>
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-1">
          {items.map((it) => (
            <li key={it.href}>
              <Link
                href={it.href}
                className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition group font-medium"
                style={{ transition: 'background 0.2s, color 0.2s' }}
              >
                <it.icon className="h-5 w-5 text-emerald-600 group-hover:text-emerald-700 transition" />
                <span>{it.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto p-4 border-t flex items-center justify-between">
        <span className="text-xs text-gray-400">QuickCourt</span>
        <Link href="/" className="text-xs text-emerald-600 hover:underline">Home</Link>
      </div>
    </aside>
  );
}
