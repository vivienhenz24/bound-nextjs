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

  console.log("[AUTH-SYNC] POST: Setting auth_synced cookie")
  console.log(
    "[AUTH-SYNC] Existing cookies:",
    cookieStore.getAll().map((c) => c.name)
  )

  cookieStore.set("auth_synced", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days, matching refresh token expiry
    path: "/",
  })

  console.log("[AUTH-SYNC] POST: auth_synced cookie set successfully")
  return NextResponse.json({ synced: true })
}

/**
 * DELETE endpoint to clear the sync cookie on logout
 */
export async function DELETE() {
  const cookieStore = await cookies()
  console.log("[AUTH-SYNC] DELETE: Clearing auth_synced cookie")
  console.log(
    "[AUTH-SYNC] Cookies before delete:",
    cookieStore.getAll().map((c) => c.name)
  )
  cookieStore.delete("auth_synced")
  console.log("[AUTH-SYNC] DELETE: auth_synced cookie cleared")
  return NextResponse.json({ cleared: true })
}
