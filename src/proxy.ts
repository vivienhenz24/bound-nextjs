import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  // Add your proxy logic here
  // You can modify headers, rewrite URLs, redirect, etc.

  // Example: You can add security headers
  const response = NextResponse.next()

  // Add custom headers if needed
  // response.headers.set('x-custom-header', 'value')

  return response
}

// Optionally specify which routes this proxy should run on
export const config = {
  // matcher: [
  //   /*
  //    * Match all request paths except for the ones starting with:
  //    * - api (API routes)
  //    * - _next/static (static files)
  //    * - _next/image (image optimization files)
  //    * - favicon.ico (favicon file)
  //    */
  //   '/((?!api|_next/static|_next/image|favicon.ico).*)',
  // ],
}
