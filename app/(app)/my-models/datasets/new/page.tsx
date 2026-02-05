import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DatasetUploadForm } from "@/components/(app)/my-models/dataset-upload-form"

export default function NewDatasetPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/my-models/datasets">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Upload Dataset</h1>
          <p className="text-muted-foreground">
            Upload audio and transcript files to create a new training dataset.
          </p>
        </div>
      </div>

      <div className="max-w-2xl">
        <DatasetUploadForm />
      </div>
    </div>
  )
}
