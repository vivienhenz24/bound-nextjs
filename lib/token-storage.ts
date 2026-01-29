// Token storage in memory for security, with sessionStorage as fallback
let accessToken: string | null = null

export const getAccessToken = (): string | null => {
  if (accessToken) {
    if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
      console.log("[token] get (memory)", { length: accessToken.length })
    }
    return accessToken
  }

  // Fallback to sessionStorage (survives page refreshes)
  if (typeof window !== "undefined") {
    const stored = sessionStorage.getItem("access_token")
    if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
      console.log("[token] get (session)", { length: stored?.length ?? 0 })
    }
    return stored
  }

  return null
}

export const setAccessToken = (token: string) => {
  accessToken = token
  if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
    console.log("[token] set", { length: token.length })
  }
  if (typeof window !== "undefined") {
    sessionStorage.setItem("access_token", token)
  }
}

export const removeAccessToken = () => {
  if (process.env.NEXT_PUBLIC_DEBUG_LOGS === "true") {
    console.log("[token] remove")
  }
  accessToken = null
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("access_token")
  }
}
