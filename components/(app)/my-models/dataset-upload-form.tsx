"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Upload, FileAudio, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { datasetsApi } from "@/lib/api/tts-api"
import type { TranscriptType } from "@/lib/types/tts"

export function DatasetUploadForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [transcriptType, setTranscriptType] = React.useState<TranscriptType>("text")
  const [audioFile, setAudioFile] = React.useState<File | null>(null)
  const [transcriptFile, setTranscriptFile] = React.useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!audioFile || !transcriptFile || !name) return

    setIsLoading(true)
    setError(null)

    try {
      const dataset = await datasetsApi.create({
        name,
        description: description || undefined,
        transcript_type: transcriptType,
        audio: audioFile,
        transcript: transcriptFile,
        auto_process: true,
      })

      router.push("/my-models/datasets")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create dataset")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Dataset</CardTitle>
        <CardDescription>
          Upload audio and transcript files to create a new training dataset.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">{error}</div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Dataset Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My TTS Dataset"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your dataset..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transcript-type">Transcript Type</Label>
            <Select
              value={transcriptType}
              onValueChange={(v) => setTranscriptType(v as TranscriptType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Plain Text</SelectItem>
                <SelectItem value="srt">SRT (Subtitles)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {transcriptType === "srt"
                ? "SRT files have timestamps for accurate segmentation"
                : "Plain text will use AI to align transcript with audio"}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Audio File</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="audio-upload"
                />
                <label htmlFor="audio-upload" className="cursor-pointer">
                  {audioFile ? (
                    <div className="flex items-center justify-center gap-2">
                      <FileAudio className="h-5 w-5 text-primary" />
                      <span className="text-sm truncate max-w-[200px]">{audioFile.name}</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Click to upload audio</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Transcript File</Label>
              <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept={transcriptType === "srt" ? ".srt" : ".txt"}
                  onChange={(e) => setTranscriptFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="transcript-upload"
                />
                <label htmlFor="transcript-upload" className="cursor-pointer">
                  {transcriptFile ? (
                    <div className="flex items-center justify-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-sm truncate max-w-[200px]">{transcriptFile.name}</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload {transcriptType === "srt" ? ".srt" : ".txt"}
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !audioFile || !transcriptFile || !name}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Create Dataset"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
