import { Button } from "@/components/ui/button"

const CALENDLY_URL = "https://calendly.com/vikrambhamre/meeting"

export default function PricingView() {
  return (
    <div className="px-4 py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-6 tracking-tight">
          Get a Quote
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground tracking-tight mb-10">
          Every project is different. Reach out to us and we&apos;ll put together custom pricing
          tailored to your language, data, and deployment needs.
        </p>
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex">
          <Button size="lg">Contact Us</Button>
        </a>
      </div>
    </div>
  )
}
