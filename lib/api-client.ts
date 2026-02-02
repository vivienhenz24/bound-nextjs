"use client"

import { API_BASE_URL } from "./api-config"
import { getAccessToken, removeAccessToken, setAccessToken } from "./token-storage"

type JsonValue = string | number | boolean | null | { [key: string]: JsonValue } | JsonValue[]
type JsonBody = JsonValue | FormData | object

type RequestOptions = {
  method?: string
  body?: JsonBody
  headers?: HeadersInit
  signal?: AbortSignal
}

const isFormData = (body: RequestOptions["body"]): body is FormData => {
  return typeof FormData !== "undefined" && body instanceof FormData
}

const buildRequestInit = (options: RequestOptions, token?: string | null): RequestInit => {
  const headers = new Headers(options.headers)

  if (token) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  const init: RequestInit = {
    method: options.method ?? (options.body ? "POST" : "GET"),
    headers,
    credentials: "include",
    signal: options.signal,
  }

  if (options.body !== undefined) {
    if (isFormData(options.body)) {
      init.body = options.body
    } else {
      headers.set("Content-Type", "application/json")
      init.body = JSON.stringify(options.body)
    }
  }

  return init
}

const parseResponse = async <T>(response: Response): Promise<T> => {
  if (response.status === 204) {
    return undefined as T
  }

  const contentType = response.headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    return (await response.json()) as T
  }

  return (await response.text()) as T
}

const getErrorMessage = (errorData: unknown): string => {
  if (typeof errorData === "string") {
    return errorData
  }

  if (errorData && typeof errorData === "object") {
    const maybeDetail = (errorData as { detail?: unknown }).detail
    if (typeof maybeDetail === "string") {
      return maybeDetail
    }

    const maybeMessage = (errorData as { message?: unknown }).message
    if (typeof maybeMessage === "string") {
      return maybeMessage
    }
  }

  return "Request failed."
}

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    })

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as { access_token?: string }
    if (data.access_token) {
      setAccessToken(data.access_token)
      return data.access_token
    }
  } catch {
    // Refresh failed - fall through to return null
  }

  return null
}

const request = async <T>(
  path: string,
  options: RequestOptions = {},
  retried = false
): Promise<T> => {
  const token = getAccessToken()
  const init = buildRequestInit(options, token)
  const response = await fetch(`${API_BASE_URL}${path}`, init)

  // Handle 401 Unauthorized - try to refresh token
  if (response.status === 401 && !retried) {
    const refreshedToken = await refreshAccessToken()
    if (refreshedToken) {
      // Retry the original request with the new token
      const retryInit = buildRequestInit(options, refreshedToken)
      const retryResponse = await fetch(`${API_BASE_URL}${path}`, retryInit)
      if (!retryResponse.ok) {
        const errorData = await parseResponse<unknown>(retryResponse)
        const errorMessage = getErrorMessage(errorData)
        // If retry also fails with 401, clear token and throw
        if (retryResponse.status === 401) {
          removeAccessToken()
          throw new Error("Session expired. Please log in again.")
        }
        throw new Error(errorMessage)
      }
      return await parseResponse<T>(retryResponse)
    }

    // Refresh failed, clear token
    removeAccessToken()
    throw new Error("Session expired. Please log in again.")
  }

  if (!response.ok) {
    const errorData = await parseResponse<unknown>(response)
    throw new Error(getErrorMessage(errorData))
  }

  return await parseResponse<T>(response)
}

export const apiClient = {
  get: <T>(path: string, options?: Omit<RequestOptions, "body" | "method">) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, body?: RequestOptions["body"], options?: Omit<RequestOptions, "body">) =>
    request<T>(path, { ...options, method: "POST", body }),
  put: <T>(path: string, body?: RequestOptions["body"], options?: Omit<RequestOptions, "body">) =>
    request<T>(path, { ...options, method: "PUT", body }),
  patch: <T>(path: string, body?: RequestOptions["body"], options?: Omit<RequestOptions, "body">) =>
    request<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(path: string, options?: Omit<RequestOptions, "body">) =>
    request<T>(path, { ...options, method: "DELETE" }),
}
