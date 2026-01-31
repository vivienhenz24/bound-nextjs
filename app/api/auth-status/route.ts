import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function GET(request: NextRequest) {
  const refreshToken = request.cookies.get("refresh_token")?.value

  return NextResponse.json({
    refreshPresent: !!refreshToken,
    cookieLength: refreshToken?.length ?? 0,
  })
}
