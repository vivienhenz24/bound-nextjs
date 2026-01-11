export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Upload",
      description: "Send your repository to our secure cloud infrastructure for model training.",
    },
    {
      number: "02",
      title: "Train",
      description:
        "We fine-tune a model on your codebase using cloud GPUs, learning your patterns and conventions.",
    },
    {
      number: "03",
      title: "Deploy",
      description:
        "Download your personalized model to run locally. Fast autocomplete with no ongoing cloud dependency.",
    },
  ]

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-4 text-center tracking-tight">
            How it works*
          </h2>
          <p className="text-sm md:text-base text-muted-foreground text-center mb-12 md:mb-16 tracking-tight">
            *We&apos;re not actually going to tell you how it works because that&apos;s our secret
            sauce ;-)
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col gap-4 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-semibold text-primary tracking-tight">
                  {step.title}
                </h3>
                <p className="text-base md:text-lg text-foreground/80 tracking-tight leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
