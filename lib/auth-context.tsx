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

  const currentUserQuery = useQuery<User | null>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      try {
        const user = await authApi.getCurrentUser()
        return user
      } catch (error) {
        // Silent fail - user is just not authenticated
        // Don't log error for public pages
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
    async (email: string, password: string, redirectTo = "/") => {
      try {
        const response = await loginMutation.mutateAsync({ email, password })
        setAccessToken(response.access_token)

        // Fetch user data after login and store it directly to avoid race conditions
        const me = await authApi.getCurrentUser()
        queryClient.setQueryData(["auth", "me"], me)

        router.replace(redirectTo)
      } catch (error: unknown) {
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
      } catch (error: unknown) {
        throw new Error("Registration failed. Email may already be in use.")
      }
    },
    [registerMutation]
  )

  const logout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync()
    } catch (error) {
      // Ignore logout errors
    } finally {
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
