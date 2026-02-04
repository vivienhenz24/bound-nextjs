"use client"

import * as React from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Cpu, Clock, MoreHorizontal, XCircle, Eye, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { jobsApi } from "@/lib/api/tts-api"
import type { TTSTrainingJobListItem, JobStatus } from "@/lib/types/tts"

function StatusBadge({ status }: { status: JobStatus }) {
  const variants: Record<JobStatus, "default" | "secondary" | "destructive" | "outline"> = {
    queued: "outline",
    preparing: "secondary",
    training: "secondary",
    completed: "default",
    failed: "destructive",
    cancelled: "outline",
  }

  const isActive = status === "preparing" || status === "training"

  return (
    <Badge variant={variants[status]} className="capitalize">
      {isActive && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
      {status}
    </Badge>
  )
}

interface JobListProps {
  initialJobs?: TTSTrainingJobListItem[]
}

export function JobList({ initialJobs = [] }: JobListProps) {
  const [jobs, setJobs] = React.useState<TTSTrainingJobListItem[]>(initialJobs)
  const [isLoading, setIsLoading] = React.useState(!initialJobs.length)

  const fetchJobs = React.useCallback(async () => {
    try {
      const data = await jobsApi.list()
      setJobs(data)
    } catch (err) {
      console.error("Failed to fetch jobs:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    if (!initialJobs.length) {
      fetchJobs()
    }

    // Poll for updates if any job is active
    const hasActive = jobs.some((j) =>
      ["queued", "preparing", "training"].includes(j.status)
    )
    if (hasActive) {
      const interval = setInterval(fetchJobs, 5000)
      return () => clearInterval(interval)
    }
  }, [jobs, fetchJobs, initialJobs.length])

  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this job?")) return

    try {
      await jobsApi.cancel(id)
      fetchJobs()
    } catch (err) {
      console.error("Failed to cancel job:", err)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <Cpu className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No training jobs</h3>
        <p className="text-muted-foreground mb-4">Start training to create your first model.</p>
        <Button asChild>
          <Link href="/my-models/new">New Training Job</Link>
        </Button>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Loss</TableHead>
          <TableHead>Started</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => {
          const progress =
            job.current_epoch && job.epochs ? (job.current_epoch / job.epochs) * 100 : 0
          const isActive = ["queued", "preparing", "training"].includes(job.status)
          const canCancel = isActive

          return (
            <TableRow key={job.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                  {job.name}
                </div>
                {job.queue_position && (
                  <p className="text-xs text-muted-foreground">
                    Queue position: #{job.queue_position}
                  </p>
                )}
              </TableCell>
              <TableCell>
                <StatusBadge status={job.status} />
              </TableCell>
              <TableCell>
                {job.status === "training" ? (
                  <div className="space-y-1">
                    <Progress value={progress} className="h-2 w-24" />
                    <p className="text-xs text-muted-foreground">
                      Epoch {job.current_epoch}/{job.epochs}
                    </p>
                  </div>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell>
                {job.loss ? (
                  <span className="font-mono text-sm">{job.loss.toFixed(4)}</span>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {job.started_at ? (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(job.started_at), { addSuffix: true })}
                  </div>
                ) : (
                  formatDistanceToNow(new Date(job.created_at), { addSuffix: true })
                )}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/my-models/jobs/${job.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    {canCancel && (
                      <DropdownMenuItem
                        onClick={() => handleCancel(job.id)}
                        className="text-destructive"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Cancel
                      </DropdownMenuItem>
                    )}
                    {job.model_id && (
                      <DropdownMenuItem asChild>
                        <Link href={`/my-models/${job.model_id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Model
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
