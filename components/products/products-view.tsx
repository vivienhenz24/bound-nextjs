"use client"

export default function ProductsView() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-12 tracking-tight">
          Own your AI
        </h1>

        <div className="space-y-8 text-lg md:text-xl text-foreground tracking-tight">
          <p>
            Bound fine-tunes a model specifically on your repository using cloud GPUs, then delivers
            that personalized model to run locally on your machine. You get autocomplete suggestions
            that reflect your patterns, naming conventions, and architecture.
          </p>

          <p>
            Once trained, the model runs entirely on your machine. No ongoing cloud subscription for
            inference, no code leaving your environment during daily use, and no latency from
            network calls. Fast, predictable autocomplete that works offline.
          </p>

          <p>Because it&apos;s trained on your specific repo, Bound excels at:</p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>following your naming conventions and code style</li>
            <li>understanding your internal abstractions and patterns</li>
            <li>completing with your project-specific APIs and types</li>
            <li>maintaining consistency across your codebase</li>
          </ul>

          <p>
            Think Cursor&apos;s tab completion, but personalized to your repo and usable offline.
            The goal isn&apos;t to replace large cloud models—it&apos;s to beat them on one narrow
            thing: fast, accurate autocomplete for your specific codebase.
          </p>

          <p>
            Especially effective for teams with established codebases who want autocomplete that
            reflects their actual development patterns, not generic GitHub code.
          </p>
        </div>
      </div>
    </div>
  )
}
