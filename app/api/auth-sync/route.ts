import { NextResponse } from "next/server"
import { cookies } from "next/headers"

/**
 * This endpoint syncs auth state from backend to frontend domain.
 * Called after login to set a cookie that the middleware can see.
 *
 * In development, backend cookies (localhost:8000) aren't accessible
 * to middleware (localhost:3000), so we need this sync mechanism.
 */
export async function POST() {
  // Set a simple auth flag cookie on the frontend domain that middleware can read
  // This doesn't contain sensitive data, just indicates "user is authenticated"
  // We trust that this endpoint is only called after successful login
  const cookieStore = await cookies()
  cookieStore.set("auth_synced", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days, matching refresh token expiry
    path: "/",
  })

  return NextResponse.json({ synced: true })
}

/**
 * DELETE endpoint to clear the sync cookie on logout
 */
export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete("auth_synced")
  return NextResponse.json({ cleared: true })
}
