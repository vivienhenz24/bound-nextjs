import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if user has refresh token (indicates authenticated session)
  const refreshToken = request.cookies.get("refresh_token")?.value
  const isAuthenticated = !!refreshToken
  const debugEnabled = request.nextUrl.searchParams.get("debugAuth") === "1"

  const addDebugHeaders = (response: NextResponse) => {
    if (!debugEnabled) {
      return response
    }
    response.headers.set("x-bound-auth", isAuthenticated ? "auth" : "noauth")
    response.headers.set("x-bound-refresh-present", isAuthenticated ? "true" : "false")
    response.headers.set("x-bound-path", pathname)
    return response
  }

  // Auth-based routing for root path
  if (pathname === "/") {
    if (isAuthenticated) {
      // Rewrite to dashboard, URL stays /
      return addDebugHeaders(NextResponse.rewrite(new URL("/dashboard", request.url)))
    }
    // If not authenticated, continue to marketing home page
  }

  // Redirect authenticated users away from login/signup pages
  if (pathname === "/login" || pathname === "/signup") {
    if (isAuthenticated) {
      return addDebugHeaders(NextResponse.redirect(new URL("/", request.url)))
    }
  }

  // Protect app routes - redirect to login if not authenticated
  if (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/library") ||
    pathname.startsWith("/my-models") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings")
  ) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url)
      // Add redirect param so they can return after login
      loginUrl.searchParams.set("redirect", pathname)
      return addDebugHeaders(NextResponse.redirect(loginUrl))
    }
  }

  return addDebugHeaders(NextResponse.next())
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/dashboard/:path*",
    "/library/:path*",
    "/my-models/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/misc/:path*",
  ],
}
