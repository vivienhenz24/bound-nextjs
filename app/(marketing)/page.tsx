"use client"

import { useEffect } from "react"
import { Hero } from "@/components/landing/hero"
import { Pipeline } from "@/components/landing/pipeline"
import { useAuth } from "@/hooks/use-auth"

export default function Home() {
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
      console.log("[home] auth state", { isAuthenticated, loading })
      const debugQuery = process.env.NEXT_PUBLIC_DEBUG_LOGS === "true" ? "?debugAuth=1" : ""
      fetch(`/api/auth-status${debugQuery}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("[home] auth-status", data)
        })
        .catch((error) => {
          console.log("[home] auth-status failed", { error })
        })
    }
  }, [isAuthenticated, loading])

  return (
    <div className="mx-auto w-full max-w-6xl">
      <Hero />
      <div
        className="relative left-1/2 right-1/2 -mx-[50vw] w-screen border-t-[0.5px] border-foreground/90"
        aria-hidden="true"
      />
      <Pipeline />
    </div>
  )
}
