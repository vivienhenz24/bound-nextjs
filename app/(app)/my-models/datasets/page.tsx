import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DatasetList } from "@/components/(app)/my-models/dataset-list"

export default function DatasetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Datasets</h1>
          <p className="text-muted-foreground">
            Manage your audio and transcript datasets for TTS training.
          </p>
        </div>
        <Button asChild>
          <Link href="/my-models/datasets/new">
            <Plus className="mr-2 h-4 w-4" />
            Upload Dataset
          </Link>
        </Button>
      </div>

      <DatasetList />
    </div>
  )
}
