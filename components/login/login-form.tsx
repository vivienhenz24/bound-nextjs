"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"

export function LoginForm() {
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("Invalid email or password. Please check your credentials and try again.")
  }

  const handleGoogleSignIn = (e: React.MouseEvent) => {
    e.preventDefault()
    setError("Unable to authenticate with Google. Please try again or use email/password.")
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-primary">Welcome Back</h1>
        <p className="text-sm font-medium text-muted-foreground/60 tracking-tight">
          Enter your credentials to access your account
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
          <p className="text-sm font-medium text-destructive tracking-tight">{error}</p>
        </div>
      )}

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
                className="h-11 bg-secondary/30 border-border/50 focus-visible:ring-0 focus-visible:border-primary transition-colors rounded-[var(--radius)]"
              />
            </Field>
            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel
                  htmlFor="password"
                  className="text-[13px] font-medium text-foreground/70 uppercase tracking-wider"
                >
                  Password
                </FieldLabel>
                <Link
                  href="#"
                  className="text-[13px] font-medium text-muted-foreground/60 hover:text-primary transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="h-11 bg-secondary/30 border-border/50 focus-visible:ring-0 focus-visible:border-primary transition-colors rounded-[var(--radius)]"
              />
            </Field>
            <Field orientation="horizontal" className="gap-2.5">
              <Checkbox id="remember" className="rounded-[2px]" />
              <FieldLabel
                htmlFor="remember"
                className="text-sm font-medium text-foreground/70 cursor-pointer"
              >
                Keep me logged in
              </FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>

        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full h-11">
            Continue
          </Button>
          <Button variant="outline" className="w-full h-11" onClick={handleGoogleSignIn}>
            Sign in with Google
          </Button>
        </div>
      </form>

      <div className="text-center text-[13px] font-medium text-muted-foreground/60">
        Don&apos;t have an account?{" "}
        <Link href="/waitlist" className="text-primary hover:underline underline-offset-4">
          Join the waitlist
        </Link>
      </div>
    </div>
  )
}
