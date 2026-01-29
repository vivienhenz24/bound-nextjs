import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if user has refresh token (indicates authenticated session)
  const refreshToken = request.cookies.get("refresh_token")?.value
  const isAuthenticated = !!refreshToken
  const debugEnabled =
    request.nextUrl.searchParams.get("debugAuth") === "1" ||
    process.env.NEXT_PUBLIC_DEBUG_LOGS === "true"

  if (debugEnabled) {
    console.log("[proxy] request", {
      pathname,
      method: request.method,
      search: request.nextUrl.search,
      isAuthenticated,
      refreshPresent: !!refreshToken,
      refreshLength: refreshToken?.length ?? 0,
    })
  }

  const addDebugHeaders = (response: NextResponse, action = "next") => {
    if (!debugEnabled) {
      return response
    }
    response.headers.set("x-bound-auth", isAuthenticated ? "auth" : "noauth")
    response.headers.set("x-bound-refresh-present", isAuthenticated ? "true" : "false")
    response.headers.set("x-bound-path", pathname)
    response.headers.set("x-bound-action", action)
    return response
  }

  // Auth-based routing for root path
  if (pathname === "/") {
    if (isAuthenticated) {
      if (debugEnabled) {
        console.log("[proxy] decision", { action: "rewrite", from: "/", to: "/dashboard" })
      }
      // Rewrite to dashboard, URL stays /
      return addDebugHeaders(
        NextResponse.rewrite(new URL("/dashboard", request.url)),
        "rewrite:/dashboard"
      )
    }
    // If not authenticated, continue to marketing home page
    if (debugEnabled) {
      console.log("[proxy] decision", { action: "next", reason: "marketing home" })
    }
  }

  // Redirect authenticated users away from login/signup pages
  if (pathname === "/login" || pathname === "/signup") {
    if (isAuthenticated) {
      if (debugEnabled) {
        console.log("[proxy] decision", { action: "redirect", from: pathname, to: "/" })
      }
      return addDebugHeaders(NextResponse.redirect(new URL("/", request.url)), "redirect:/")
    }
    if (debugEnabled) {
      console.log("[proxy] decision", { action: "next", reason: "unauthenticated auth page" })
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
      if (debugEnabled) {
        console.log("[proxy] decision", {
          action: "redirect",
          from: pathname,
          to: loginUrl.pathname + loginUrl.search,
        })
      }
      return addDebugHeaders(NextResponse.redirect(loginUrl), "redirect:/login")
    }
    if (debugEnabled) {
      console.log("[proxy] decision", { action: "next", reason: "authenticated app route" })
    }
  }

  if (debugEnabled) {
    console.log("[proxy] decision", { action: "next", reason: "default" })
  }
  return addDebugHeaders(NextResponse.next(), "next")
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
