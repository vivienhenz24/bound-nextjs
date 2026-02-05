"use client"

import * as React from "react"
import { Loader2, Play, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { modelsApi } from "@/lib/api/tts-api"
import type { TTSModel } from "@/lib/types/tts"
import { AudioPlayer } from "./audio-player"

interface InferencePlaygroundProps {
  model: TTSModel
}

export function InferencePlayground({ model }: InferencePlaygroundProps) {
  const [text, setText] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null)
  const [duration, setDuration] = React.useState<number | null>(null)

  const handleGenerate = async () => {
    if (!text.trim()) return

    setIsLoading(true)
    setError(null)
    setAudioUrl(null)

    try {
      const response = await modelsApi.infer(model.id, { text: text.trim() })
      setAudioUrl(response.audio_url)
      setDuration(response.duration_seconds)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate speech")
    } finally {
      setIsLoading(false)
    }
  }

  const characterCount = text.length
  const maxCharacters = 5000

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Text-to-Speech</CardTitle>
          <CardDescription>Enter text below to generate speech using {model.name}.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="text">Text to synthesize</Label>
              <span className="text-xs text-muted-foreground">
                {characterCount.toLocaleString()} / {maxCharacters.toLocaleString()}
              </span>
            </div>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, maxCharacters))}
              placeholder="Enter the text you want to convert to speech..."
              rows={6}
              className="resize-none"
            />
          </div>

          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">{error}</div>
          )}

          <Button onClick={handleGenerate} disabled={isLoading || !text.trim()} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Generate Speech
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {audioUrl && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="h-5 w-5" />
              Generated Audio
            </CardTitle>
            {duration && <CardDescription>Duration: {duration.toFixed(1)} seconds</CardDescription>}
          </CardHeader>
          <CardContent>
            <AudioPlayer src={audioUrl} />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Model Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Base Model</p>
              <p className="font-medium truncate" title={model.base_model}>
                {model.base_model.split("/").pop()}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Training Epochs</p>
              <p className="font-medium">{model.training_epochs || "-"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Training Samples</p>
              <p className="font-medium">{model.training_samples?.toLocaleString() || "-"}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Inferences</p>
              <p className="font-medium">{model.inference_count.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
