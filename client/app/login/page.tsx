"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import AppHeader from "@/components/app-header"


import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    console.log("Login form submitted", { email, password });
    try {
      const res = await fetch("http://localhost:5000/api/auth/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      console.log("API response status:", res.status);
      const data = await res.json();
      console.log("API response data:", data);
      if (!res.ok) throw new Error(data.error || "Login failed");
      // Store JWT token in localStorage
      localStorage.setItem("token", data.token);
      // Optionally store user info
      localStorage.setItem("user", JSON.stringify(data.user));
      // Redirect or show success
      router.push("/");
    } catch (err: any) {
      setError(err.message);
      console.error("Login error:", err);
    }
  };

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
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
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
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Button className="w-full" type="submit">Sign in</Button>
            </form>
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
  );
}
