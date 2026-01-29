"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authApi } from "@/lib/api/auth-api"

type Status = "idle" | "loading" | "success" | "error"

export default function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = useMemo(() => searchParams?.get("token") ?? "", [searchParams])
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")
  const [resendLoading, setResendLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("Missing verification token.")
      return
    }

    let isMounted = true
    setStatus("loading")

    authApi
      .verifyEmail(token)
      .then((response) => {
        if (!isMounted) return
        setStatus("success")
        setMessage(response.message || "Email verified successfully.")
      })
      .catch((error) => {
        if (!isMounted) return
        setStatus("error")
        setMessage(error instanceof Error ? error.message : "Verification failed.")
      })

    return () => {
      isMounted = false
    }
  }, [token])

  const handleResend = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!email.trim()) {
      setMessage("Enter the email address you signed up with.")
      return
    }

    setResendLoading(true)
    try {
      const response = await authApi.resendVerification(email.trim())
      setMessage(response.message)
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to resend email.")
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background">
      <div className="w-full max-w-[520px] px-4 md:px-6 py-8 md:py-12">
        <div className="rounded-2xl border border-border/60 bg-card p-6 md:p-8 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight text-primary">Verify email</h1>
          <p className="mt-2 text-sm font-medium text-muted-foreground/70 tracking-tight">
            We’re confirming your email address.
          </p>

          <div className="mt-6 min-h-[56px]">
            {status === "loading" && (
              <p className="text-sm font-medium text-muted-foreground/80 tracking-tight">
                Verifying your email...
              </p>
            )}
            {status !== "loading" && message && (
              <p className="text-sm font-medium text-foreground/80 tracking-tight">{message}</p>
            )}
          </div>

          {status === "success" && (
            <div className="mt-6">
              <Button onClick={() => router.push("/login?verified=true")} className="w-full">
                Continue to sign in
              </Button>
            </div>
          )}

          {status === "error" && (
            <form onSubmit={handleResend} className="mt-6 space-y-3">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 bg-secondary/30 border-border/50 focus-visible:ring-0 focus-visible:border-primary transition-colors rounded-[var(--radius)]"
              />
              <Button type="submit" className="w-full h-11" disabled={resendLoading}>
                {resendLoading ? "Sending..." : "Resend verification email"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
