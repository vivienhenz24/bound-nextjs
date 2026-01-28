import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="flex flex-col items-center text-center px-4 pt-40 md:pt-48 pb-96 min-h-screen">
      <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-primary mb-6 tracking-tight whitespace-nowrap">
        You deserve a voice.
      </h2>
      <p className="text-lg md:text-xl lg:text-2xl font-normal text-foreground max-w-3xl mb-8 tracking-tight">
        The easiest way to build and sell TTS models for underresourced languages.
      </p>
      <div className="flex items-center gap-4">
        <Link href="/waitlist">
          <Button size="lg">Sign Up</Button>
        </Link>
        <Link href="/login">
          <Button size="lg" variant="outline">
            Log In
          </Button>
        </Link>
      </div>
    </section>
  )
}
