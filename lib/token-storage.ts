// Token storage in memory for security, with sessionStorage as fallback
let accessToken: string | null = null

export const getAccessToken = (): string | null => {
  if (accessToken) {
    return accessToken
  }

  // Fallback to sessionStorage (survives page refreshes)
  if (typeof window !== "undefined") {
    const stored = sessionStorage.getItem("access_token")
    return stored
  }

  return null
}

export const setAccessToken = (token: string) => {
  accessToken = token
  if (typeof window !== "undefined") {
    sessionStorage.setItem("access_token", token)
  }
}

export const removeAccessToken = () => {
  accessToken = null
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("access_token")
  }
}
