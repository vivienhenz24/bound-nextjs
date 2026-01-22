import Link from "next/link"
import { Download } from "lucide-react"

const models = [
  {
    name: "react-copilot-7b",
    author: "vercel",
    description: "Fine-tuned for React, Next.js, and modern frontend patterns.",
    downloads: 124500,
    size: "4.2 GB",
    tags: ["React", "TypeScript"],
  },
  {
    name: "rustacean-13b",
    author: "oxide",
    description: "Specialized in Rust with deep knowledge of async patterns and memory safety.",
    downloads: 89200,
    size: "7.8 GB",
    tags: ["Rust", "Systems"],
  },
  {
    name: "py-scientific-7b",
    author: "fastai",
    description: "Trained on NumPy, Pandas, and scientific Python workflows.",
    downloads: 203000,
    size: "4.1 GB",
    tags: ["Python", "Data Science"],
  },
  {
    name: "go-backend-7b",
    author: "hashicorp",
    description: "Optimized for Go microservices, APIs, and cloud infrastructure.",
    downloads: 67800,
    size: "4.0 GB",
    tags: ["Go", "Backend"],
  },
  {
    name: "swift-ios-7b",
    author: "apple",
    description: "Built for Swift and SwiftUI with UIKit compatibility patterns.",
    downloads: 54300,
    size: "4.3 GB",
    tags: ["Swift", "iOS"],
  },
  {
    name: "sql-wizard-7b",
    author: "supabase",
    description: "Expert in PostgreSQL, query optimization, and database design.",
    downloads: 98700,
    size: "3.9 GB",
    tags: ["SQL", "Postgres"],
  },
  {
    name: "vue-master-7b",
    author: "evan",
    description: "Deep knowledge of Vue 3, Nuxt, and the Vue ecosystem.",
    downloads: 71200,
    size: "4.1 GB",
    tags: ["Vue", "JavaScript"],
  },
  {
    name: "devops-pro-13b",
    author: "gitlab",
    description: "Trained on Kubernetes, Terraform, Docker, and CI/CD pipelines.",
    downloads: 112400,
    size: "7.6 GB",
    tags: ["DevOps", "Infra"],
  },
]

function formatDownloads(num: number): string {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(num >= 10000 ? 0 : 1)}k`
  }
  return num.toString()
}

export function FeaturedModels() {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-primary">Trending models</h3>
        <Link
          href="/models"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Browse all →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {models.map((model) => (
          <Link
            key={model.name}
            href={`/models/${model.name}`}
            className="group block p-5 rounded-lg border border-border bg-card hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {model.name}
                </span>
                <span className="text-muted-foreground text-sm ml-2">by {model.author}</span>
              </div>
              <span className="text-xs text-muted-foreground">{model.size}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{model.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {model.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Download className="h-3 w-3" />
                {formatDownloads(model.downloads)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
