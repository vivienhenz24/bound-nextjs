"use client"

import * as React from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { modelsApi } from "@/lib/api/tts-api"
import type { TTSModel } from "@/lib/types/tts"
import { InferencePlayground } from "@/components/(app)/my-models/inference-playground"

export default function InferencePage() {
  const params = useParams()
  const modelId = params.id as string

  const [model, setModel] = React.useState<TTSModel | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    modelsApi
      .get(modelId)
      .then(setModel)
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [modelId])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!model) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Model not found</p>
        <Button asChild className="mt-4">
          <Link href="/my-models">Back to Models</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/my-models/${model.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Inference</h1>
          <p className="text-muted-foreground">Generate speech using {model.name}</p>
        </div>
      </div>

      <div className="max-w-2xl">
        <InferencePlayground model={model} />
      </div>
    </div>
  )
}
