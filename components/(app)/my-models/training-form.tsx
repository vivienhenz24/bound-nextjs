"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { datasetsApi, jobsApi } from "@/lib/api/tts-api"
import type { TTSDatasetListItem } from "@/lib/types/tts"

interface TrainingFormProps {
  datasetId?: string
}

export function TrainingForm({ datasetId }: TrainingFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const [datasets, setDatasets] = React.useState<TTSDatasetListItem[]>([])
  const [selectedDataset, setSelectedDataset] = React.useState(datasetId || "")
  const [name, setName] = React.useState("")
  const [epochs, setEpochs] = React.useState(3)
  const [learningRate, setLearningRate] = React.useState(1e-5)
  const [batchSize, setBatchSize] = React.useState(4)

  React.useEffect(() => {
    datasetsApi.list().then((data) => {
      const readyDatasets = data.filter((d) => d.status === "ready")
      setDatasets(readyDatasets)
    })
  }, [])

  const selectedDatasetInfo = datasets.find((d) => d.id === selectedDataset)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDataset || !name) return

    setIsLoading(true)
    setError(null)

    try {
      await jobsApi.create({
        dataset_id: selectedDataset,
        name,
        epochs,
        learning_rate: learningRate,
        batch_size: batchSize,
      })

      router.push("/my-models/jobs")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create training job")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Start Training</CardTitle>
        <CardDescription>Configure and start a new TTS model training job.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">{error}</div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Model Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My TTS Model"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Dataset</Label>
            <Select value={selectedDataset} onValueChange={setSelectedDataset}>
              <SelectTrigger>
                <SelectValue placeholder="Select a dataset" />
              </SelectTrigger>
              <SelectContent>
                {datasets.length === 0 ? (
                  <SelectItem value="none" disabled>
                    No ready datasets available
                  </SelectItem>
                ) : (
                  datasets.map((dataset) => (
                    <SelectItem key={dataset.id} value={dataset.id}>
                      {dataset.name} ({dataset.segment_count} segments)
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {selectedDatasetInfo && (
              <p className="text-xs text-muted-foreground">
                {selectedDatasetInfo.segment_count} segments,{" "}
                {Math.round((selectedDatasetInfo.total_duration_seconds || 0) / 60)} minutes of
                audio
              </p>
            )}
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h4 className="text-sm font-medium">Training Parameters</h4>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Epochs</Label>
                <span className="text-sm text-muted-foreground">{epochs}</span>
              </div>
              <Slider
                value={[epochs]}
                onValueChange={([v]) => setEpochs(v)}
                min={1}
                max={20}
                step={1}
              />
              <p className="text-xs text-muted-foreground">
                More epochs = longer training, potentially better quality
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Learning Rate</Label>
                <span className="text-sm text-muted-foreground">
                  {learningRate.toExponential(0)}
                </span>
              </div>
              <Select
                value={learningRate.toString()}
                onValueChange={(v) => setLearningRate(parseFloat(v))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.0001">1e-4 (Fast)</SelectItem>
                  <SelectItem value="0.00005">5e-5</SelectItem>
                  <SelectItem value="0.00001">1e-5 (Default)</SelectItem>
                  <SelectItem value="0.000005">5e-6</SelectItem>
                  <SelectItem value="0.000001">1e-6 (Slow)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Batch Size</Label>
                <span className="text-sm text-muted-foreground">{batchSize}</span>
              </div>
              <Slider
                value={[batchSize]}
                onValueChange={([v]) => setBatchSize(v)}
                min={1}
                max={16}
                step={1}
              />
              <p className="text-xs text-muted-foreground">
                Larger batches use more GPU memory but train faster
              </p>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !selectedDataset || !name}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Starting Training...
              </>
            ) : (
              "Start Training"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
