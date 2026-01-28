import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PricingView() {
  return (
    <div className="px-4 py-20">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-6 tracking-tight">
          Pricing
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground tracking-tight">
          One setup fee for creators. Pay per voice for buyers.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-5xl gap-6 md:grid-cols-2">
        <div className="rounded-sm border border-border bg-card p-8 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            For voice actors
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">Create a model</h2>
          <div className="mt-6 space-y-4 text-sm">
            <div className="flex items-end justify-between border-b border-border/60 pb-3">
              <span className="text-muted-foreground">Setup fee</span>
              <span className="text-2xl font-semibold text-primary">$49</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-muted-foreground">Creator share</span>
              <span className="text-2xl font-semibold text-primary">75%</span>
            </div>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Bound keeps 25% per purchase or usage.
          </p>
        </div>

        <div className="rounded-sm border border-border bg-card p-8 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            For buyers
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">Access a voice</h2>
          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
            <div className="rounded-sm border border-border/60 bg-background px-4 py-4">
              <p className="text-muted-foreground">Hobby</p>
              <p className="mt-2 text-lg font-semibold text-primary">Set by actor</p>
            </div>
            <div className="rounded-sm border border-border/60 bg-background px-4 py-4">
              <p className="text-muted-foreground">Premium</p>
              <p className="mt-2 text-lg font-semibold text-primary">Set by actor</p>
            </div>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Pricing is per voice model and set by the voice actor. Enterprise is custom.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/signup" className="inline-flex">
          <Button size="lg">Get Started</Button>
        </Link>
        <p className="text-sm text-muted-foreground mt-4">
          Create your account and start building voice models today.
        </p>
      </div>
    </div>
  )
}
