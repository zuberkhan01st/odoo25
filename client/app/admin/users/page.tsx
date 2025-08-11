"use client"

import { useEffect, useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function Page() {
  const [q, setQ] = useState("")
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/users", {
      headers: {
        Authorization: `Bearer ${typeof window !== "undefined" ? localStorage.getItem("adminToken") : ""}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users || [])
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to fetch users")
        setLoading(false)
      })
  }, [])
  const data = useMemo(
    () => users.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()) || r.email.includes(q)),
    [q, users],
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
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={async () => {
                          await fetch(`http://localhost:5000/api/admin/users/${r._id}/ban`, {
                            method: "POST",
                            headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
                          })
                          setUsers((prev) => prev.map((user) => (user._id === r._id ? { ...user, status: "Banned" } : user)))
                        }}
                      >
                        Ban
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700"
                        onClick={async () => {
                          await fetch(`http://localhost:5000/api/admin/users/${r._id}/unban`, {
                            method: "POST",
                            headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
                          })
                          setUsers((prev) => prev.map((user) => (user._id === r._id ? { ...user, status: "Active" } : user)))
                        }}
                      >
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
