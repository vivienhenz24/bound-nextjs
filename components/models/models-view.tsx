import { Button } from "@/components/ui/button"
import Link from "next/link"

const models = [
  {
    name: "CodeLlama-7B-Python",
    description:
      "Fine-tuned for Python development with strong understanding of modern frameworks.",
    tags: ["Python", "7B", "Code"],
    downloads: "12.4k",
  },
  {
    name: "DeepSeek-Coder-6.7B",
    description: "Specialized for full-stack TypeScript and JavaScript development.",
    tags: ["TypeScript", "6.7B", "Full-stack"],
    downloads: "8.2k",
  },
  {
    name: "StarCoder-3B-Rust",
    description: "Optimized for Rust systems programming and memory-safe code.",
    tags: ["Rust", "3B", "Systems"],
    downloads: "5.1k",
  },
  {
    name: "Phi-2-SQL",
    description: "Compact model fine-tuned for SQL query generation and optimization.",
    tags: ["SQL", "2.7B", "Database"],
    downloads: "9.7k",
  },
  {
    name: "CodeGemma-7B-React",
    description: "Built for React and Next.js development with component patterns.",
    tags: ["React", "7B", "Frontend"],
    downloads: "11.3k",
  },
  {
    name: "Mistral-7B-DevOps",
    description: "Trained on infrastructure-as-code, CI/CD pipelines, and cloud configs.",
    tags: ["DevOps", "7B", "Infrastructure"],
    downloads: "4.8k",
  },
]

export default function ModelsView() {
  return (
    <div className="px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-6 tracking-tight">
            Browse models
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground tracking-tight max-w-2xl mx-auto">
            Discover specialized local models built for your stack. Run locally, no API limits.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {models.map((model) => (
            <div
              key={model.name}
              className="rounded-sm border border-border bg-card p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-foreground">{model.name}</h3>
                <span className="text-xs text-muted-foreground">{model.downloads} downloads</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{model.description}</p>
              <div className="flex flex-wrap gap-2">
                {model.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-sm bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">More models coming soon.</p>
          <Link href="/waitlist">
            <Button>Join waitlist for early access</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
