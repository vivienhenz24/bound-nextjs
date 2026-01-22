import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const features = [
  "Unlimited access to all published models",
  "Run everything locally on your machine",
  "No API calls or usage limits",
  "New models added weekly",
  "Priority support",
  "Cancel anytime",
]

export default function PricingView() {
  return (
    <div className="px-4 py-20">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-6 tracking-tight">
          Simple pricing
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground tracking-tight">
          One plan. Full access. No surprises.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="rounded-sm border border-border bg-card p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-medium text-foreground mb-2">Pro</h2>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-5xl font-semibold text-primary">$99</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground">{feature}</span>
              </li>
            ))}
          </ul>

          <Link href="/waitlist" className="block">
            <Button className="w-full" size="lg">
              Join waitlist
            </Button>
          </Link>

          <p className="text-sm text-muted-foreground text-center mt-4">
            We&apos;re launching soon. Join the waitlist to get early access.
          </p>
        </div>
      </div>
    </div>
  )
}
