import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ModelCard } from "@/components/ui/model-card"
import { LibaryExploreFilterBar } from "@/components/(app)/libary/explore/filter-bar"

const featuredModels = [
  {
    title: "Boreal Voice",
    description: "Warm, studio-grade English voice for long-form narration.",
    tags: ["English", "Studio", "Narration"],
    metrics: [
      { label: "Latency", value: "180ms" },
      { label: "MOS", value: "4.6" },
    ],
  },
  {
    title: "Sahara Wave",
    description: "Expressive Arabic model with rich prosody control.",
    tags: ["Arabic", "Expressive", "Multi-speaker"],
    metrics: [
      { label: "Latency", value: "210ms" },
      { label: "MOS", value: "4.4" },
    ],
  },
  {
    title: "Nordic Crisp",
    description: "Clean Nordic tones tuned for podcast voiceovers.",
    tags: ["Norwegian", "Podcast", "Fast"],
    metrics: [
      { label: "Latency", value: "160ms" },
      { label: "MOS", value: "4.5" },
    ],
  },
]

const tableModels = [
  {
    name: "Atlas Reader",
    language: "English",
    type: "Single-speaker",
    updated: "2 days ago",
    downloads: "12.4k",
    status: "Trending",
  },
  {
    name: "Sakura",
    language: "Japanese",
    type: "Multi-speaker",
    updated: "5 days ago",
    downloads: "9.1k",
    status: "Stable",
  },
  {
    name: "Kasbah",
    language: "Arabic",
    type: "Expressive",
    updated: "1 week ago",
    downloads: "7.8k",
    status: "New",
  },
  {
    name: "Igloo",
    language: "Inuktitut",
    type: "Single-speaker",
    updated: "2 weeks ago",
    downloads: "3.2k",
    status: "Experimental",
  },
]

export default function LibaryExploreView() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Explore</h1>
        <p className="text-muted-foreground">
          Discover new models, compare performance, and build your collection.
        </p>
      </div>

      <LibaryExploreFilterBar />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary">Featured models</h2>
          <p className="text-sm text-muted-foreground">Updated weekly</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featuredModels.map((model) => (
            <ModelCard key={model.title} {...model} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-primary">All models</h2>
          <p className="text-sm text-muted-foreground">Table view</p>
        </div>
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Last updated</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableModels.map((model) => (
                <TableRow key={model.name}>
                  <TableCell className="font-medium">{model.name}</TableCell>
                  <TableCell>{model.language}</TableCell>
                  <TableCell>{model.type}</TableCell>
                  <TableCell>{model.updated}</TableCell>
                  <TableCell>{model.downloads}</TableCell>
                  <TableCell>{model.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  )
}
