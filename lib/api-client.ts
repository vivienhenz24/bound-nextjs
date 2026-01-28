import axios from "axios"

import { API_BASE_URL } from "./api-config"
import { getAccessToken, removeAccessToken, setAccessToken } from "./token-storage"

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies with requests
})

// Request interceptor - add access token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - handle 401 and refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If 401 and we haven't retried yet, try to refresh the token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // Try to refresh the access token
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          {
            withCredentials: true, // Send refresh token cookie
          }
        )

        const newAccessToken = refreshResponse.data.access_token
        setAccessToken(newAccessToken)

        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        // Refresh failed, clear tokens
        removeAccessToken()

        // DON'T redirect here - let the page/layout handle it
        // The protected routes use useRequireAuth which will redirect
        // Public pages should just fail gracefully

        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
