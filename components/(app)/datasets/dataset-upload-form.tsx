"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { datasetsApi } from "@/lib/api/tts-api"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  name: z.string().min(2, "Dataset name is required."),
  description: z.string().optional(),
  transcriptType: z.enum(["text", "srt"]),
})

const selectClasses =
  "border-input h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"

export default function DatasetUploadForm() {
  const router = useRouter()
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [transcriptFile, setTranscriptFile] = useState<File | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      transcriptType: "text",
    },
  })

  const transcriptType = form.watch("transcriptType")
  const transcriptAccept = transcriptType === "srt" ? ".srt" : ".txt"

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitError(null)

    if (!audioFile) {
      setSubmitError("Please upload an audio file to continue.")
      return
    }

    if (!transcriptFile) {
      setSubmitError("Please upload a transcript file to continue.")
      return
    }

    const expectedExtension = transcriptType === "srt" ? ".srt" : ".txt"
    if (!transcriptFile.name.toLowerCase().endsWith(expectedExtension)) {
      setSubmitError(
        `Transcript file must be a ${expectedExtension.toUpperCase()} file for this format.`
      )
      return
    }

    try {
      setIsSubmitting(true)
      await datasetsApi.create({
        name: values.name,
        description: values.description || undefined,
        transcript_type: values.transcriptType,
        audio: audioFile,
        transcript: transcriptFile,
        auto_process: true,
      })
      router.push("/datasets")
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed."
      setSubmitError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Upload dataset</h1>
        <p className="text-muted-foreground">
          Provide an audio file and transcript to generate training segments automatically.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dataset name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Narration batch 2024" {...field} />
                </FormControl>
                <FormDescription>Use a short, descriptive label for this upload.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Optional notes about this dataset" {...field} />
                </FormControl>
                <FormDescription>Helpful for tracking versions later on.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transcriptType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transcript format</FormLabel>
                <FormControl>
                  <select {...field} className={cn(selectClasses)}>
                    <option value="text">Plain text (single segment)</option>
                    <option value="srt">SRT with timestamps</option>
                  </select>
                </FormControl>
                <FormDescription>
                  Use SRT for precise timing and multi-segment training data.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <Label>Audio file</Label>
            <Input
              type="file"
              accept="audio/*"
              onChange={(event) => setAudioFile(event.target.files?.[0] ?? null)}
            />
            <p className="text-sm text-muted-foreground">
              Max 500MB. We accept WAV, MP3, FLAC, M4A, OGG, and other common formats.
            </p>
            {audioFile ? (
              <p className="text-xs text-muted-foreground">Selected: {audioFile.name}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label>Transcript file</Label>
            <Input
              type="file"
              accept={transcriptAccept}
              onChange={(event) => setTranscriptFile(event.target.files?.[0] ?? null)}
            />
            <p className="text-sm text-muted-foreground">
              Upload a {transcriptType === "srt" ? ".srt" : ".txt"} file that matches your chosen
              format.
            </p>
            {transcriptFile ? (
              <p className="text-xs text-muted-foreground">Selected: {transcriptFile.name}</p>
            ) : null}
          </div>

          {submitError ? <p className="text-sm text-destructive">{submitError}</p> : null}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Uploading..." : "Upload dataset"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
