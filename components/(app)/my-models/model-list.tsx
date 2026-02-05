"use client"

import * as React from "react"
import Link from "next/link"
import { Cpu, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { modelsApi } from "@/lib/api/tts-api"
import type { TTSModelListItem } from "@/lib/types/tts"
import { ModelCard } from "./model-card"

interface ModelListProps {
  initialModels?: TTSModelListItem[]
}

export function ModelList({ initialModels = [] }: ModelListProps) {
  const [models, setModels] = React.useState<TTSModelListItem[]>(initialModels)
  const [isLoading, setIsLoading] = React.useState(!initialModels.length)

  const fetchModels = React.useCallback(async () => {
    try {
      const data = await modelsApi.list()
      setModels(data)
    } catch (err) {
      console.error("Failed to fetch models:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    if (!initialModels.length) {
      fetchModels()
    }
  }, [fetchModels, initialModels.length])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (models.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <Cpu className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No models yet</h3>
        <p className="text-muted-foreground mb-4">Train your first TTS model to get started.</p>
        <Button asChild>
          <Link href="/my-models/new">Train New Model</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {models.map((model) => (
        <ModelCard key={model.id} model={model} onDelete={fetchModels} />
      ))}
    </div>
  )
}
