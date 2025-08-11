import type React from "react"
import { OwnerShell } from "@/components/owner/owner-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <OwnerShell>{children}</OwnerShell>
}
