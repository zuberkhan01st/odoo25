import type React from "react"
import { AdminShell } from "@/components/admin/admin-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>
}
