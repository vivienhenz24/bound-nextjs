import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if user has refresh token (indicates authenticated session)
  const refreshToken = request.cookies.get("refresh_token")?.value
  const isAuthenticated = !!refreshToken

  // Auth-based routing for root path
  if (pathname === "/") {
    if (isAuthenticated) {
      // Rewrite to dashboard, URL stays /
      return NextResponse.rewrite(new URL("/dashboard", request.url))
    }
    // If not authenticated, continue to marketing home page
  }

  // Redirect authenticated users away from login/signup pages
  if (pathname === "/login" || pathname === "/signup") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
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
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
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
