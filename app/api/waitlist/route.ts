import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
    try {
        const { email } = await request.json()

        if (!email || typeof email !== "string") {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            )
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            )
        }

        const { error } = await supabase
            .from("waitlist")
            .insert({ email })

        if (error) {
            if (error.code === "23505") {
                return NextResponse.json(
                    { error: "This email is already on the waitlist" },
                    { status: 409 }
                )
            }
            throw error
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Waitlist error:", error)
        return NextResponse.json(
            { error: "Failed to join waitlist" },
            { status: 500 }
        )
    }
}
