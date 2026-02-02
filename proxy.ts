import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for auth sync cookie (set by /api/auth-sync after login)
  // This cookie is on the frontend domain, so middleware can access it
  const authSynced = request.cookies.get("auth_synced")?.value
  const isAuthenticated = authSynced === "true"

  console.log("🛡️ [MIDDLEWARE]", {
    pathname,
    authSynced,
    isAuthenticated,
    allCookies: request.cookies.getAll().map((c) => c.name),
  })

  // Auth-based routing for root path - show different content while keeping URL as "/"
  if (pathname === "/") {
    if (isAuthenticated) {
      console.log("🛡️ [MIDDLEWARE] Rewriting / to /home")
      // Rewrite to home page, URL stays "/"
      return NextResponse.rewrite(new URL("/home", request.url))
    }
    console.log("🛡️ [MIDDLEWARE] Showing marketing page at /")
    // If not authenticated, continue to marketing home page
  }

  // Redirect authenticated users away from login/signup pages
  if (pathname === "/login" || pathname === "/signup") {
    if (isAuthenticated) {
      console.log(`🛡️ [MIDDLEWARE] REDIRECT: ${pathname} -> / (user is authenticated)`)
      return NextResponse.redirect(new URL("/", request.url))
    }
    console.log(`🛡️ [MIDDLEWARE] Allowing access to ${pathname} (not authenticated)`)
  }

  // Protect app routes - redirect to login if not authenticated
  if (
    pathname.startsWith("/home") ||
    pathname.startsWith("/library") ||
    pathname.startsWith("/libary") ||
    pathname.startsWith("/my-models") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings")
  ) {
    if (!isAuthenticated) {
      console.log(`🛡️ [MIDDLEWARE] REDIRECT: ${pathname} -> /login?redirect=/ (not authenticated)`)
      const loginUrl = new URL("/login", request.url)
      // Add redirect param so they can return after login (but always use "/" as target)
      loginUrl.searchParams.set("redirect", "/")
      return NextResponse.redirect(loginUrl)
    }
    console.log(`🛡️ [MIDDLEWARE] Allowing access to ${pathname} (authenticated)`)
  }

  console.log(`🛡️ [MIDDLEWARE] Passing through: ${pathname}`)
  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/home/:path*",
    "/library/:path*",
    "/libary/:path*",
    "/my-models/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/misc/:path*",
  ],
}
