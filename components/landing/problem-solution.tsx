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
              Cloud-based autocomplete sends your code to external servers every time you type,
              requires ongoing subscriptions, and suggests generic patterns that don&apos;t match
              your codebase.
            </p>
          </div>

          {/* Solution */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl md:text-3xl font-semibold text-primary tracking-tight">
              The Solution
            </h3>
            <p className="text-base md:text-lg text-foreground tracking-tight leading-relaxed">
              Bound fine-tunes on your repository, then runs locally. Get autocomplete suggestions
              that match your patterns and conventions with no ongoing cloud costs or data
              transmission.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
