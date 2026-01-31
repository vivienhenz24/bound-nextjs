import { Hero } from "@/components/landing/hero"
import { Pipeline } from "@/components/landing/pipeline"

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <Hero />
      <div
        className="relative left-1/2 right-1/2 -mx-[50vw] w-screen border-t-[0.5px] border-foreground/90"
        aria-hidden="true"
      />
      <Pipeline />
    </div>
  )
}
