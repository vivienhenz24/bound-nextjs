import { SearchBar } from "@/components/landing/search-bar"

export function Hero() {
  return (
    <section className="flex flex-col items-center text-center px-4 pt-32 md:pt-40 pb-20">
      <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-primary mb-6 max-w-3xl tracking-tight">
        Go local or go home.
      </h2>
      <p className="text-lg md:text-xl lg:text-2xl font-normal text-foreground max-w-3xl mb-8 tracking-tight">
        Bound is a marketplace for specialized local coding models. Monetize your fine-tuned model
        or find one built for your stack.
      </p>
      <SearchBar />
    </section>
  )
}
