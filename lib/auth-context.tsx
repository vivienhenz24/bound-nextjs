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
      try {
        return await authApi.getCurrentUser()
      } catch (error) {
        // Silent fail - user is just not authenticated
        // Don't log error for public pages
        removeAccessToken()
        return null
      }
    },
    retry: false,
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
    async (email: string, password: string) => {
      try {
        const response = await loginMutation.mutateAsync({ email, password })
        setAccessToken(response.access_token)

        // Fetch user data after login
        await queryClient.invalidateQueries({ queryKey: ["auth", "me"] })

        router.push("/dashboard")
      } catch (error: unknown) {
        console.error("Login failed:", error)
        throw new Error("Invalid email or password")
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
      } catch (error: unknown) {
        console.error("Registration failed:", error)
        throw new Error("Registration failed. Email may already be in use.")
      }
    },
    [registerMutation]
  )

  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync()
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      removeAccessToken()
      queryClient.setQueryData(["auth", "me"], null)
      router.push("/login")
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
