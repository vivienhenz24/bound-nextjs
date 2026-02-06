// Token storage in memory for security, with sessionStorage as fallback
let accessToken: string | null = null

export const getAccessToken = (): string | null => {
  if (accessToken) {
    console.log("[TOKEN] getAccessToken: found in memory")
    return accessToken
  }

  // Fallback to sessionStorage (survives page refreshes)
  if (typeof window !== "undefined") {
    const stored = sessionStorage.getItem("access_token")
    console.log("[TOKEN] getAccessToken: sessionStorage lookup", {
      found: !!stored,
      tokenPreview: stored ? `${stored.slice(0, 20)}...` : null,
    })
    return stored
  }

  console.log("[TOKEN] getAccessToken: no token found")
  return null
}

export const setAccessToken = (token: string) => {
  console.log("[TOKEN] setAccessToken:", {
    tokenPreview: `${token.slice(0, 20)}...`,
    length: token.length,
  })
  accessToken = token
  if (typeof window !== "undefined") {
    sessionStorage.setItem("access_token", token)
    console.log("[TOKEN] setAccessToken: saved to sessionStorage")
  }
}

export const removeAccessToken = () => {
  console.log("[TOKEN] removeAccessToken: clearing token")
  accessToken = null
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("access_token")
    console.log("[TOKEN] removeAccessToken: removed from sessionStorage")
  }
}
