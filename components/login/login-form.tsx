"use client"

import { useState } from "react"
import Link from "next/link"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/hooks/use-auth"
import { authApi } from "@/lib/api/auth-api"

const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
})

interface LoginFormProps {
  redirectTo?: string
}

export function LoginForm({ redirectTo = "/" }: LoginFormProps) {
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [resendMessage, setResendMessage] = useState("")
  const [resendLoading, setResendLoading] = useState(false)
  const [showResend, setShowResend] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setResendMessage("")
    setShowResend(false)
    setLoading(true)

    try {
      const parsed = loginSchema.safeParse({ email, password })
      if (!parsed.success) {
        setError(parsed.error.issues[0]?.message ?? "Invalid form input.")
        setLoading(false)
        return
      }

      await login(parsed.data.email, parsed.data.password, redirectTo)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
        if (err.message.toLowerCase().includes("email not verified")) {
          setShowResend(true)
        }
      } else {
        setError("Invalid email or password. Please check your credentials and try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!email.trim()) {
      setResendMessage("Enter the email address you signed up with.")
      return
    }

    setResendLoading(true)
    setResendMessage("")
    try {
      const response = await authApi.resendVerification(email.trim())
      setResendMessage(response.message)
    } catch (error) {
      setResendMessage(error instanceof Error ? error.message : "Failed to resend email.")
    } finally {
      setResendLoading(false)
    }
  }

  const handleGoogleSignIn = (e: React.MouseEvent) => {
    e.preventDefault()
    setError("Google Sign-In coming soon. Please use email/password for now.")
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-primary">Welcome Back</h1>
        <p className="text-sm font-medium text-muted-foreground/60 tracking-tight">
          Enter your credentials to access your account
        </p>
      </div>

      <div
        aria-live="polite"
        className="min-h-[56px] rounded-lg border border-transparent px-4 py-3 transition-colors"
      >
        {error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 -mx-4 -my-3">
            <p className="text-sm font-medium text-destructive tracking-tight">{error}</p>
          </div>
        )}
        {resendMessage && (
          <div className="rounded-lg bg-secondary/50 border border-border/60 p-4 -mx-4 -my-3 mt-3">
            <p className="text-sm font-medium text-foreground/80 tracking-tight">{resendMessage}</p>
          </div>
        )}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

        {showResend && (
          <div className="rounded-lg border border-border/60 bg-card p-4 space-y-3">
            <p className="text-sm font-medium text-muted-foreground/70 tracking-tight">
              Need a new verification email?
            </p>
            <Button
              type="button"
              variant="outline"
              className="w-full h-11"
              onClick={handleResend}
              disabled={resendLoading}
            >
              {resendLoading ? "Sending..." : "Resend verification email"}
            </Button>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Button type="submit" className="w-full h-11" disabled={loading}>
            {loading ? "Signing in..." : "Continue"}
          </Button>
          <Button
            variant="outline"
            className="w-full h-11"
            onClick={handleGoogleSignIn}
            type="button"
          >
            Sign in with Google
          </Button>
        </div>
      </form>

      <div className="text-center text-[13px] font-medium text-muted-foreground/60">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-primary hover:underline underline-offset-4">
          Sign up
        </Link>
      </div>
    </div>
  )
}
