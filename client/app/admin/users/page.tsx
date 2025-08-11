"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const rows = Array.from({ length: 20 }).map((_, i) => ({
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 5 === 0 ? "Owner" : "User",
  status: i % 7 === 0 ? "Banned" : "Active",
}))

export default function Page() {
  const [q, setQ] = useState("")
  const data = useMemo(
    () => rows.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()) || r.email.includes(q)),
    [q],
  )
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4">
      <Input placeholder="Search users…" value={q} onChange={(e) => setQ(e.target.value)} />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Users</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((r) => (
                <TableRow key={r.email}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.email}</TableCell>
                  <TableCell>{r.role}</TableCell>
                  <TableCell>
                    <Badge variant={r.status === "Active" ? "default" : "secondary"}>{r.status}</Badge>
                  </TableCell>
                  <TableCell className="space-x-2 text-right">
                    {r.status === "Active" ? (
                      <Button size="sm" variant="destructive">
                        Ban
                      </Button>
                    ) : (
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        Unban
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}
