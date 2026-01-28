import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="min-h-screen px-4 pt-40 pb-96 md:pt-48">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-12 md:grid-cols-2">
        <div className="flex flex-col items-start text-left">
          <h2 className="mb-6 text-4xl font-semibold tracking-tight text-black md:text-5xl lg:text-7xl">
            <span className="block md:whitespace-nowrap">Sell voices big</span>
            <span className="block md:whitespace-nowrap">labs won’t build.</span>
          </h2>
          <p className="mb-8 max-w-3xl text-lg font-normal tracking-tight text-foreground md:text-xl lg:text-2xl">
            Using bound is the easiest way to build and sell local TTS models for underresourced
            languages.
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
        </div>
        <div
          className="hidden md:flex items-center justify-center -translate-y-16"
          aria-hidden="true"
        >
          <img src="/logo-light.svg" alt="" className="h-[28rem] w-auto dark:hidden" />
          <img src="/logo-dark.svg" alt="" className="hidden h-[28rem] w-auto dark:block" />
        </div>
      </div>
    </section>
  )
}
