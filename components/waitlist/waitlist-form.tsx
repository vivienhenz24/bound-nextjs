"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      setStatus("success")
      setMessage("You're on the list! We'll be in touch soon.")
      setEmail("")
    } catch (err) {
      setStatus("error")
      setMessage(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-primary">
            You&apos;re on the list!
          </h1>
          <p className="text-sm font-medium text-muted-foreground/60 tracking-tight">{message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-primary">Join the Waitlist</h1>
        <p className="text-sm font-medium text-muted-foreground/60 tracking-tight">
          Be the first to know when we launch
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <FieldSet>
          <FieldGroup className="gap-5">
            <Field>
              <FieldLabel
                htmlFor="email"
                className="text-[13px] font-medium text-foreground/70 uppercase tracking-wider"
              >
                Email Address
              </FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 bg-secondary/30 border-border/50 focus-visible:ring-0 focus-visible:border-primary transition-colors rounded-[var(--radius)]"
              />
            </Field>
          </FieldGroup>
        </FieldSet>

        {status === "error" && <p className="text-sm text-destructive">{message}</p>}

        <Button type="submit" className="w-full h-11" disabled={status === "loading"}>
          {status === "loading" ? "Joining..." : "Join Waitlist"}
        </Button>
      </form>
    </div>
  )
}
