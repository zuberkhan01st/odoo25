import type React from "react";
import { OwnerSidebar } from "@/components/owner/owner-sidebar-clean";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <OwnerSidebar />
      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-x-auto">
        {children}
      </main>
    </div>
  );
}
