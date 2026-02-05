"use client"

import * as React from "react"
import Link from "next/link"
import { formatDistanceToNow, format } from "date-fns"
import { Cpu, Clock, CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { jobsApi } from "@/lib/api/tts-api"
import type { TTSTrainingJob, JobStatus } from "@/lib/types/tts"

function StatusIcon({ status }: { status: JobStatus }) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case "failed":
    case "cancelled":
      return <XCircle className="h-5 w-5 text-destructive" />
    default:
      return <Loader2 className="h-5 w-5 animate-spin text-primary" />
  }
}

interface JobProgressProps {
  jobId: string
  initialJob?: TTSTrainingJob
}

export function JobProgress({ jobId, initialJob }: JobProgressProps) {
  const [job, setJob] = React.useState<TTSTrainingJob | null>(initialJob || null)
  const [isLoading, setIsLoading] = React.useState(!initialJob)
  const [error, setError] = React.useState<string | null>(null)

  const fetchJob = React.useCallback(async () => {
    try {
      const data = await jobsApi.get(jobId)
      setJob(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch job")
    } finally {
      setIsLoading(false)
    }
  }, [jobId])

  React.useEffect(() => {
    if (!initialJob) {
      fetchJob()
    }

    // Poll for updates if job is active
    const isActive = job && ["queued", "preparing", "training"].includes(job.status)
    if (isActive) {
      const interval = setInterval(fetchJob, 3000)
      return () => clearInterval(interval)
    }
  }, [job, fetchJob, initialJob])

  const handleCancel = async () => {
    if (!job || !confirm("Are you sure you want to cancel this job?")) return

    try {
      await jobsApi.cancel(job.id)
      fetchJob()
    } catch (err) {
      console.error("Failed to cancel job:", err)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (error || !job) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <XCircle className="h-12 w-12 mx-auto text-destructive mb-4" />
          <p className="text-destructive">{error || "Job not found"}</p>
        </CardContent>
      </Card>
    )
  }

  const progress = job.current_epoch && job.epochs ? (job.current_epoch / job.epochs) * 100 : 0
  const isActive = ["queued", "preparing", "training"].includes(job.status)
  const isComplete = job.status === "completed"
  const isFailed = job.status === "failed" || job.status === "cancelled"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <StatusIcon status={job.status} />
              <div>
                <CardTitle>{job.name}</CardTitle>
                <CardDescription className="capitalize">{job.status}</CardDescription>
              </div>
            </div>
            {isActive && (
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress */}
          {job.status === "training" && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Training Progress</span>
                <span className="text-muted-foreground">
                  Epoch {job.current_epoch}/{job.epochs}
                </span>
              </div>
              <Progress value={progress} className="h-3" />
              {job.current_step && job.total_steps && (
                <p className="text-xs text-muted-foreground">
                  Step {job.current_step.toLocaleString()} / {job.total_steps.toLocaleString()}
                </p>
              )}
            </div>
          )}

          {/* Queue Position */}
          {job.queue_position && (
            <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Queue position: #{job.queue_position}</span>
            </div>
          )}

          {/* Loss */}
          {job.loss && (
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span className="text-sm text-muted-foreground">Current Loss</span>
              <span className="font-mono font-medium">{job.loss.toFixed(6)}</span>
            </div>
          )}

          {/* Error Message */}
          {job.error_message && (
            <div className="p-3 bg-destructive/10 text-destructive rounded-lg text-sm">
              {job.error_message}
            </div>
          )}

          {/* Timestamps */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Created</p>
              <p>{format(new Date(job.created_at), "PPp")}</p>
            </div>
            {job.started_at && (
              <div>
                <p className="text-muted-foreground">Started</p>
                <p>{format(new Date(job.started_at), "PPp")}</p>
              </div>
            )}
            {job.completed_at && (
              <div>
                <p className="text-muted-foreground">Completed</p>
                <p>{format(new Date(job.completed_at), "PPp")}</p>
              </div>
            )}
          </div>

          {/* Training Parameters */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-3">Training Parameters</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Epochs</p>
                <p className="font-medium">{job.epochs}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Learning Rate</p>
                <p className="font-medium font-mono">{job.learning_rate.toExponential(0)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Batch Size</p>
                <p className="font-medium">{job.batch_size}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {isComplete && job.model_id && (
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Training Complete!</h4>
                <p className="text-sm text-muted-foreground">
                  Your model is ready to use for inference.
                </p>
              </div>
              <Button asChild>
                <Link href={`/my-models/${job.model_id}`}>
                  View Model
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
