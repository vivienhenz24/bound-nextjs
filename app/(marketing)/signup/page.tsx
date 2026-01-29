"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SignupForm } from "@/components/signup/signup-form"
import { useAuth } from "@/hooks/use-auth"

export default function SignupPage() {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  // Redirect if already authenticated
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, loading, router])

  // Show nothing while checking or if authenticated (prevent flash)
  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background">
      <div className="w-full max-w-[440px] px-4 md:px-6 py-8 md:py-12">
        <SignupForm />
      </div>
    </div>
  )
}
