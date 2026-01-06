export function ProblemSolution() {
  return (
    <section className="py-20 md:py-32 bg-secondary-bg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-5xl mx-auto">
          {/* Problem */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl md:text-3xl font-semibold text-primary tracking-tight">
              The Problem
            </h3>
            <p className="text-base md:text-lg text-foreground tracking-tight leading-relaxed">
              General AI models know thousands of languages and frameworks—but they don&apos;t know
              your codebase. Every prompt requires context. Every suggestion needs validation.
            </p>
          </div>

          {/* Solution */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl md:text-3xl font-semibold text-primary tracking-tight">
              The Solution
            </h3>
            <p className="text-base md:text-lg text-foreground tracking-tight leading-relaxed">
              Bound is trained on your repository. A small, fast model that runs locally. No context
              window limits. No recurring costs. Just a model that knows your system.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
