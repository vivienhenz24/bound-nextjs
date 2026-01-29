import { Button } from "@/components/ui/button"

const CALENDLY_URL = "https://calendly.com/vikrambhamre/meeting"

export function Hero() {
  return (
    <section className="px-6 pt-24 pb-4 md:px-10 md:pt-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-12 md:grid-cols-2">
        <div className="flex flex-col items-start text-left">
          <h2 className="mb-6 text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-7xl">
            Let your model do the talking.
          </h2>
          <p className="mb-8 max-w-3xl text-lg font-normal tracking-tight md:text-xl lg:text-2xl">
            The simplest way to fine-tune speech models from just a few hours of audio while keeping
            full ownership of your model and data.
          </p>
          <div className="flex items-center gap-4">
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg">Contact Us</Button>
            </a>
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
