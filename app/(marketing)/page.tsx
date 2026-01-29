"use client"

import { useEffect } from "react"
import { Hero } from "@/components/landing/hero"
import { useAuth } from "@/hooks/use-auth"

export default function Home() {
  const { isAuthenticated, loading } = useAuth()

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
      console.log("[home] auth state", { isAuthenticated, loading })
      fetch("/api/auth-status")
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
    <>
      <Hero />
      <Pipeline />
    </>
  )
}
