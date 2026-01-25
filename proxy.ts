import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Auth-based routing for root path
  if (pathname === "/") {
    // Check for auth cookie (use 'session' for real auth, 'dev_authenticated' for simulation)
    const isAuthenticated =
      request.cookies.get("session")?.value || request.cookies.get("dev_authenticated")?.value

    if (isAuthenticated) {
      // Rewrite to dashboard, URL stays /
      return NextResponse.rewrite(new URL("/dashboard", request.url))
    }
  }

  // Block access to misc routes
  if (pathname.startsWith("/misc")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/misc/:path*"],
}
