"use client"

import { useRouter } from "next/navigation"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createContext, useCallback, useEffect, type ReactNode } from "react"

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
  const logAuthStatus = useCallback(async (label: string) => {
    if (process.env.NEXT_PUBLIC_DEBUG_LOGS !== "true") {
      return
    }
    try {
      const response = await fetch("/api/auth-status?debugAuth=1", { cache: "no-store" })
      const data = await response.json()
      console.log("[auth] auth-status", { label, ...data })
    } catch (error) {
      console.log("[auth] auth-status failed", { label, error })
    }
  }, [])

  const currentUserQuery = useQuery<User | null>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      try {
        if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
          console.log("[auth] loading current user")
        }
        const user = await authApi.getCurrentUser()
        if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
          console.log("[auth] current user ok", { hasUser: !!user, user })
        }
        return user
      } catch (error) {
        // Silent fail - user is just not authenticated
        // Don't log error for public pages
        if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
          console.log("[auth] current user failed", { error })
        }
        return null
      }
    },
    retry: false,
  })

  const user = currentUserQuery.data ?? null
  const loading = currentUserQuery.isLoading
  const isAuthenticated = !!user

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
      console.log("[auth] state", {
        loading,
        isAuthenticated,
        hasUser: !!user,
        userId: user?.id ?? null,
        email: user?.email ?? null,
      })
    }
  }, [loading, isAuthenticated, user])

  const refreshAuth = useCallback(async () => {
    if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
      console.log("[auth] refresh start")
    }
    await queryClient.invalidateQueries({ queryKey: ["auth", "me"] })
    if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
      console.log("[auth] refresh done")
    }
    await logAuthStatus("refreshAuth")
  }, [logAuthStatus, queryClient])

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
      try {
        if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
          console.log("[auth] login start", { email, redirectTo })
        }
        const response = await loginMutation.mutateAsync({ email, password })
        setAccessToken(response.access_token)
        if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
          console.log("[auth] token stored", {
            tokenLength: response.access_token.length,
          })
        }
        await logAuthStatus("after-login-token")

        // Fetch user data after login and store it directly to avoid race conditions
        const me = await authApi.getCurrentUser()
        queryClient.setQueryData(["auth", "me"], me)
        if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
          console.log("[auth] current user set", { hasUser: !!me })
        }

        if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
          console.log("[auth] navigate", { to: redirectTo })
        }
        await logAuthStatus("before-login-redirect")
        router.replace(redirectTo)
      } catch (error: unknown) {
        console.error("Login failed:", error)
        if (error instanceof Error) {
          throw error
        }
        throw new Error("Login failed")
      }
    },
    [logAuthStatus, loginMutation, queryClient, router]
  )

  const register = useCallback(
    async (data: RegisterData) => {
      try {
        if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
          console.log("[auth] register start", { email: data.email })
        }
        await registerMutation.mutateAsync(data)
        // Don't auto-login after registration
        // User should verify email or login manually
        if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
          console.log("[auth] register ok")
        }
      } catch (error: unknown) {
        console.error("Registration failed:", error)
        throw new Error("Registration failed. Email may already be in use.")
      }
    },
    [registerMutation]
  )

  const logout = useCallback(async () => {
    try {
      if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
        console.log("[auth] logout start")
      }
      await logoutMutation.mutateAsync()
      if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
        console.log("[auth] logout ok")
      }
    } catch (error) {
      console.error("Logout failed:", error)
      if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
        console.log("[auth] logout failed", { error })
      }
    } finally {
      if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
        console.log("[auth] clearing local auth and redirecting", { to: "/" })
      }
      removeAccessToken()
      queryClient.setQueryData(["auth", "me"], null)
      router.push("/")
    }
  }, [logoutMutation, queryClient, router])

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
