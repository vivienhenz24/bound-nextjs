import { Upload, Sparkles, Cpu, Rocket } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload your audio",
    description:
      "Bring a few hours of audio and choose a base model to fine-tune. We support the leading open-source speech architectures out of the box.",
  },
  {
    icon: Sparkles,
    title: "We clean and prepare your data",
    description:
      "Our pipeline processes, cleans, and formats your audio so it's ready for fine-tuning — no manual preprocessing required.",
  },
  {
    icon: Cpu,
    title: "We handle the training",
    description:
      "GPU allocation, training jobs, evaluations, and parameter tuning are all managed for you. Sit back while we optimize your model.",
  },
  {
    icon: Rocket,
    title: "Deploy on your terms",
    description:
      "Run the model locally on your own infrastructure or deploy through our platform, where we guarantee the fastest latency to our servers.",
  },
]

export function Pipeline() {
  return (
    <section className="px-4 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
          How it works
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-muted-foreground">
          From raw audio to a production-ready voice model in four steps.
        </p>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-border bg-muted">
                <step.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Step {i + 1}</p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
