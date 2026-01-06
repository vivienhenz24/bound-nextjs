export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Train",
      description:
        "We fine-tune a model directly on your repository. Your code, your patterns, your conventions.",
    },
    {
      number: "02",
      title: "Deploy",
      description:
        "The model runs locally on your machine. Your data never leaves your environment.",
    },
    {
      number: "03",
      title: "Use",
      description:
        "Navigate, edit, and understand your codebase with a model that already knows how it works.",
    },
  ]

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-12 md:mb-16 text-center tracking-tight">
            How it works
          </h2>

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
