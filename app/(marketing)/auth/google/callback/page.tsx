"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"

import { authApi } from "@/lib/api/auth-api"
import { setAccessToken } from "@/lib/token-storage"

const LoadingFallback = () => (
  <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
)

const CallbackContent = () => {
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)
  const exchangeCode = searchParams?.get("code")
  const redirectParam = searchParams?.get("redirect")
  const redirectTarget = redirectParam && redirectParam.startsWith("/") ? redirectParam : "/"

  useEffect(() => {
    if (!exchangeCode) {
      return
    }

    const completeLogin = async () => {
      try {
        const response = await authApi.googleComplete(exchangeCode)
        setAccessToken(response.access_token)

        const me = await authApi.getCurrentUser()
        queryClient.setQueryData(["auth", "me"], me)

        await fetch("/api/auth-sync", { method: "POST", credentials: "include" })
        await new Promise((resolve) => setTimeout(resolve, 100))

        window.location.href = redirectTarget
      } catch (err) {
        setError(err instanceof Error ? err.message : "Google sign-in failed.")
      }
    }

    completeLogin()
  }, [exchangeCode, redirectTarget, queryClient])

  if (!exchangeCode) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="max-w-md rounded-lg border border-border/60 bg-card p-6 text-center">
          <h1 className="text-lg font-semibold text-primary">Google sign-in failed</h1>
          <p className="mt-2 text-sm text-muted-foreground">Missing Google authorization code.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="max-w-md rounded-lg border border-border/60 bg-card p-6 text-center">
          <h1 className="text-lg font-semibold text-primary">Google sign-in failed</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return <LoadingFallback />
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CallbackContent />
    </Suspense>
  )
}
