"use client"

import { SignupForm } from "@/components/signup/signup-form"
import { useAuth } from "@/hooks/use-auth"

export default function SignupPage() {
  const { loading } = useAuth()

  // NOTE: Removed redirect logic to avoid race conditions
  // Users can access signup even if authenticated (they'll be redirected by auth context if needed)

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background">
      <div className="w-full max-w-[440px] px-4 md:px-6 py-8 md:py-12">
        <SignupForm />
      </div>
    </div>
  )
}
