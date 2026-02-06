import { apiClient } from "../api-client"
import type { LoginData, LoginResponse, RegisterData, User } from "../types/auth"

export const authApi = {
  register: async (data: RegisterData): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>("/auth/register", data)
    console.log("[AUTH API] register response:", response)
    return response
  },

  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/auth/login", data)
    console.log("[AUTH API] login response:", response)
    return response
  },

  logout: async (): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>("/auth/logout")
    console.log("[AUTH API] logout response:", response)
    return response
  },

  getCurrentUser: async (): Promise<User | null> => {
    const response = await apiClient.get<User | null>("/auth/me")
    console.log("[AUTH API] getCurrentUser response:", response)
    return response ?? null
  },

  refreshToken: async (): Promise<LoginResponse> => {
    return await apiClient.post<LoginResponse>("/auth/refresh")
  },

  verifyEmail: async (token: string): Promise<{ message: string }> => {
    return await apiClient.post<{ message: string }>("/auth/verify-email", { token })
  },

  resendVerification: async (email: string): Promise<{ message: string }> => {
    return await apiClient.post<{ message: string }>("/auth/resend-verification", { email })
  },

  googleComplete: async (exchangeCode: string): Promise<LoginResponse> => {
    return await apiClient.post<LoginResponse>("/auth/google/complete", {
      exchange_code: exchangeCode,
    })
  },
}
