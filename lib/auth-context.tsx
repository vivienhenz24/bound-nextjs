"use client"

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
  const queryClient = useQueryClient()

  const currentUserQuery = useQuery<User | null>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      try {
        const user = await authApi.getCurrentUser()
        return user
      } catch (error) {
        try {
          const refreshed = await authApi.refreshToken()
          setAccessToken(refreshed.access_token)
          const user = await authApi.getCurrentUser()
          return user
        } catch (refreshError) {
          removeAccessToken()
          await fetch("/api/auth-sync", {
            method: "DELETE",
            credentials: "include",
          })
          return null
        }
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
  })

  const user = currentUserQuery.data ?? null
  const loading = currentUserQuery.isLoading
  const isAuthenticated = !!user

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
      try {
        const response = await loginMutation.mutateAsync({ email, password })

        setAccessToken(response.access_token)

        // Fetch user data after login and store it directly to avoid race conditions
        const me = await authApi.getCurrentUser()

        queryClient.setQueryData(["auth", "me"], me)

        // Sync auth state to frontend domain (so middleware can detect it)
        const syncResponse = await fetch("/api/auth-sync", {
          method: "POST",
          credentials: "include",
        })
        await syncResponse.json()

        // Small delay to ensure state updates have propagated
        await new Promise((resolve) => setTimeout(resolve, 100))

        // Use window.location for hard navigation to trigger middleware
        // router.push() does client-side nav which doesn't re-run middleware
        window.location.href = redirectTo
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw error
        }
        throw new Error("Login failed")
      }
    },
    [loginMutation, queryClient]
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
    try {
      await logoutMutation.mutateAsync()
      // Clear the frontend auth sync cookie
      await fetch("/api/auth-sync", {
        method: "DELETE",
        credentials: "include",
      })
    } catch (error) {
    } finally {
      removeAccessToken()
      queryClient.setQueryData(["auth", "me"], null)
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
