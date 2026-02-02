"use client"

import { useRouter } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext, useCallback, type ReactNode } from "react"

import { authApi } from "./api/auth-api"
import { removeAccessToken, setAccessToken } from "./token-storage"
import type { AuthContextType, RegisterData, User } from "./types/auth"

export const AuthContext = createContext<AuthContextType | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const currentUserQuery = useQuery<User | null>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      console.log("🔐 [AUTH QUERY] Fetching current user...")
      try {
        const user = await authApi.getCurrentUser()
        console.log(
          "🔐 [AUTH QUERY] User fetched:",
          user ? { id: user.id, email: user.email } : null
        )
        return user
      } catch (error) {
        console.log("🔐 [AUTH QUERY] Failed to fetch user (user not authenticated):", error)
        return null
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  })

  const user = currentUserQuery.data ?? null
  const loading = currentUserQuery.isLoading
  const isAuthenticated = !!user

  console.log("🔐 [AUTH CONTEXT] State:", {
    user: user ? { id: user.id, email: user.email } : null,
    loading,
    isAuthenticated,
    queryStatus: currentUserQuery.status,
  })

  const refreshAuth = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ["auth", "me"] })
  }, [queryClient])

  const loginMutation = useMutation({
    mutationFn: authApi.login,
  })

  const registerMutation = useMutation({
    mutationFn: authApi.register,
  })

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
  })

  const login = useCallback(
    async (email: string, password: string, redirectTo = "/") => {
      console.log("🔐 [AUTH] Login started", { email, redirectTo })
      try {
        console.log("🔐 [AUTH] Calling backend login API...")
        const response = await loginMutation.mutateAsync({ email, password })
        console.log("🔐 [AUTH] Login API response:", { hasAccessToken: !!response.access_token })

        setAccessToken(response.access_token)
        console.log("🔐 [AUTH] Access token stored in sessionStorage")

        // Fetch user data after login and store it directly to avoid race conditions
        console.log("🔐 [AUTH] Fetching user data...")
        const me = await authApi.getCurrentUser()
        console.log("🔐 [AUTH] User data fetched:", { userId: me?.id, email: me?.email })

        queryClient.setQueryData(["auth", "me"], me)
        console.log("🔐 [AUTH] User data cached in React Query")

        // Sync auth state to frontend domain (so middleware can detect it)
        console.log("🔐 [AUTH] Syncing auth state to frontend domain...")
        const syncResponse = await fetch("/api/auth-sync", {
          method: "POST",
          credentials: "include",
        })
        const syncData = await syncResponse.json()
        console.log("🔐 [AUTH] Auth sync response:", syncData)

        // Small delay to ensure state updates have propagated
        await new Promise((resolve) => setTimeout(resolve, 100))

        // Use window.location for hard navigation to trigger middleware
        // router.push() does client-side nav which doesn't re-run middleware
        console.log("🔐 [AUTH] Redirecting to:", redirectTo, "(hard navigation)")
        window.location.href = redirectTo
      } catch (error: unknown) {
        console.error("🔐 [AUTH] Login failed:", error)
        if (error instanceof Error) {
          throw error
        }
        throw new Error("Login failed")
      }
    },
    [loginMutation, queryClient, router]
  )

  const register = useCallback(
    async (data: RegisterData) => {
      try {
        await registerMutation.mutateAsync(data)
        // Don't auto-login after registration
        // User should verify email or login manually
      } catch {
        throw new Error("Registration failed. Email may already be in use.")
      }
    },
    [registerMutation]
  )

  const logout = useCallback(async () => {
    console.log("🔐 [AUTH] Logout started")
    try {
      await logoutMutation.mutateAsync()
      console.log("🔐 [AUTH] Backend logout successful")
      // Clear the frontend auth sync cookie
      await fetch("/api/auth-sync", {
        method: "DELETE",
        credentials: "include",
      })
      console.log("🔐 [AUTH] Auth sync cookie cleared")
    } catch (error) {
      console.error("🔐 [AUTH] Logout error:", error)
    } finally {
      removeAccessToken()
      queryClient.setQueryData(["auth", "me"], null)
      console.log("🔐 [AUTH] Redirecting to / (hard navigation)")
      window.location.href = "/"
    }
  }, [logoutMutation, queryClient])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
