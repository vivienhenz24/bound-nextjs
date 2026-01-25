import Link from "next/link"
import { Download } from "lucide-react"

const models = [
  {
    name: "wolof-tts-v2",
    author: "RFM Sénégal",
    description: "Natural Wolof speech trained on 25 hours of broadcast audio.",
    downloads: 12400,
    size: "890 MB",
    tags: ["Wolof", "West Africa"],
  },
  {
    name: "quechua-voice",
    author: "Radio Tawantinsuyo",
    description: "Southern Quechua TTS from decades of Andean community radio.",
    downloads: 8900,
    size: "920 MB",
    tags: ["Quechua", "Andean"],
  },
  {
    name: "welsh-clara",
    author: "BBC Radio Cymru",
    description: "Female Welsh voice with accurate mutation handling and natural prosody.",
    downloads: 34200,
    size: "850 MB",
    tags: ["Welsh", "Celtic"],
  },
  {
    name: "maori-rangi",
    author: "Māori Radio Network",
    description: "Te Reo Māori voice trained on iwi radio broadcasts.",
    downloads: 15600,
    size: "870 MB",
    tags: ["Māori", "Pacific"],
  },
  {
    name: "yoruba-ade",
    author: "Fresh FM Ibadan",
    description: "Tonal Yoruba TTS with proper pitch accent from radio archives.",
    downloads: 21300,
    size: "910 MB",
    tags: ["Yoruba", "West Africa"],
  },
  {
    name: "basque-aitor",
    author: "Euskadi Irratia",
    description: "Euskara voice covering all major dialects with natural intonation.",
    downloads: 18700,
    size: "880 MB",
    tags: ["Basque", "European"],
  },
  {
    name: "navajo-dine",
    author: "KTNN Radio",
    description: "Navajo TTS preserving tonal distinctions and nasal vowels.",
    downloads: 9400,
    size: "940 MB",
    tags: ["Navajo", "Indigenous"],
  },
  {
    name: "tagalog-maya",
    author: "DZRH Manila",
    description: "Filipino TTS with code-switching support for Taglish contexts.",
    downloads: 45800,
    size: "860 MB",
    tags: ["Tagalog", "Southeast Asia"],
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
        <h3 className="text-xl font-semibold text-primary">Featured voices</h3>
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
