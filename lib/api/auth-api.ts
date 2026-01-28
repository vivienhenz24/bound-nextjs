import { apiClient } from "../api-client"
import type { LoginData, LoginResponse, RegisterData, User } from "../types/auth"

export const authApi = {
  register: async (data: RegisterData): Promise<{ message: string }> => {
    const response = await apiClient.post("/auth/register", data)
    return response.data
  },

  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await apiClient.post("/auth/login", data)
    return response.data
  },

  logout: async (): Promise<{ message: string }> => {
    const response = await apiClient.post("/auth/logout")
    return response.data
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get("/auth/me")
    return response.data
  },

  refreshToken: async (): Promise<LoginResponse> => {
    const response = await apiClient.post("/auth/refresh")
    return response.data
  },
}
