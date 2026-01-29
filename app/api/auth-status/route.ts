import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function GET(request: NextRequest) {
  const refreshToken = request.cookies.get("refresh_token")?.value
  const debugEnabled =
    request.nextUrl.searchParams.get("debugAuth") === "1" ||
    process.env.NEXT_PUBLIC_DEBUG_LOGS === "true"

  if (debugEnabled) {
    console.log("[auth-status] cookie", {
      refreshPresent: !!refreshToken,
      cookieLength: refreshToken?.length ?? 0,
    })
    console.log("[auth-status] request", {
      host: request.headers.get("host"),
      origin: request.headers.get("origin"),
      referer: request.headers.get("referer"),
      forwardedHost: request.headers.get("x-forwarded-host"),
      forwardedProto: request.headers.get("x-forwarded-proto"),
    })
  }
  return NextResponse.json({
    refreshPresent: !!refreshToken,
    cookieLength: refreshToken?.length ?? 0,
  })
}
