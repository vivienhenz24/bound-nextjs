import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Block access to dashboard - redirect to home page
  if (pathname.startsWith("/misc")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

// Protect dashboard routes
export const config = {
  matcher: ["/misc/:path*"],
}
