import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { useContext, useEffect } from "react"

import { AuthContext } from "@/lib/auth-context"

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}

export function useRequireAuth(redirectUrl = "/login") {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(redirectUrl)
      return
    }
  }, [isAuthenticated, loading, router, redirectUrl, pathname])

  return { isAuthenticated, loading }
}
