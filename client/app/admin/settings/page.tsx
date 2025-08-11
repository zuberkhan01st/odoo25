"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Admin profile</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input placeholder="Admin Name" />
          </div>
          <div className="grid gap-2">
            <Label>Email</Label>
            <Input type="email" placeholder="admin@example.com" />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <Label>New password</Label>
            <Input type="password" placeholder="••••••••" />
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button className="bg-emerald-600 shadow-[0_0_0_2px_rgba(16,185,129,0.2)] hover:bg-emerald-700">Save</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Platform settings</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="maint">Maintenance mode</Label>
            <Switch id="maint" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="maxd">Limit booking duration to 2 hours</Label>
            <Switch id="maxd" defaultChecked />
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="outline">Reset</Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
