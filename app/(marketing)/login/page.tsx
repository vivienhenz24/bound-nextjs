"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { LoginForm } from "@/components/login/login-form"
import { useAuth } from "@/hooks/use-auth"

const LoadingFallback = () => (
  <div className="flex min-h-[calc(100vh-64px)] items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
)

const LoginContent = () => {
  const searchParams = useSearchParams()
  const registered = searchParams?.get("registered")
  const verified = searchParams?.get("verified")
  const redirectParam = searchParams?.get("redirect")
  const { loading } = useAuth()

  // NOTE: Removed redirect logic from here to avoid race condition with auth-context login redirect
  // The login function in auth-context handles the redirect after successful login

  // Show loading state while checking auth
  if (loading) {
    return <LoadingFallback />
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background">
      <div className="w-full max-w-[440px] px-4 md:px-6 py-8 md:py-12">
        {registered && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
            <p className="text-sm font-medium text-green-800 dark:text-green-200 tracking-tight">
              Registration successful! Please verify your email before signing in.
            </p>
          </div>
        )}
        {verified && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
            <p className="text-sm font-medium text-green-800 dark:text-green-200 tracking-tight">
              Email verified. You can sign in now.
            </p>
          </div>
        )}
        <LoginForm
          redirectTo={redirectParam && redirectParam.startsWith("/") ? redirectParam : "/"}
        />
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LoginContent />
    </Suspense>
  )
}
