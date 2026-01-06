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
            Bound is fine-tuned directly on your repository: your source code, architecture,
            patterns, and conventions. The result is a small, fast model that understands how your
            system works—not how software works in general.
          </p>

          <p>
            You own the model. Bound runs locally on your machine. There&apos;s no data leaving your
            environment, no recurring cloud bill, and no dependency on external vendors. You control
            the model, the training data, and the deployment.
          </p>

          <p>
            Because Bound is specialized, it performs better on repo-specific tasks than large cloud
            models:
          </p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>navigating unfamiliar parts of the codebase</li>
            <li>making safe, consistent edits</li>
            <li>following internal abstractions and style</li>
            <li>understanding project-specific APIs and invariants</li>
          </ul>

          <p>
            Bound is not trying to be a general assistant. It&apos;s built to be the best possible
            model for one thing: your codebase.
          </p>

          <p>
            This makes it especially effective for teams with large or long-lived repositories,
            strict correctness requirements, or sensitivity around IP and cost. Instead of prompting
            a general model and hoping it infers context, you start with a model that already has
            it.
          </p>
        </div>
      </div>
    </div>
  )
}
