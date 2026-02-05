"use client"

import Link from "next/link"
import { useCallback, useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ttsApi } from "@/lib/api/tts-api"
import type { DatasetListItem, DatasetStatus } from "@/lib/types/tts"
import { cn } from "@/lib/utils"
import { Database } from "lucide-react"

const statusLabels: Record<DatasetStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  ready: "Ready",
  failed: "Failed",
}

const statusStyles: Record<DatasetStatus, string> = {
  pending: "bg-muted text-muted-foreground",
  processing: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
  ready: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
  failed: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200",
}

const formatDuration = (seconds?: number | null) => {
  if (!seconds && seconds !== 0) {
    return "—"
  }
  const total = Math.round(seconds)
  const minutes = Math.floor(total / 60)
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  const remainingSeconds = total % 60

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`
  }

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`
  }

  return `${remainingSeconds}s`
}

const formatDate = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return "—"
  }
  return date.toLocaleDateString()
}

export default function DatasetsView() {
  const [datasets, setDatasets] = useState<DatasetListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [busyIds, setBusyIds] = useState<Record<string, boolean>>({})

  const fetchDatasets = useCallback(
    async (options?: { silent?: boolean }) => {
      const silent = options?.silent ?? false
      if (!silent) {
        setLoading(true)
      }
      try {
        const data = await ttsApi.listDatasets()
        setDatasets(data)
        setError(null)
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load datasets."
        setError(message)
      } finally {
        if (!silent) {
          setLoading(false)
        }
      }
    },
    [setDatasets]
  )

  useEffect(() => {
    fetchDatasets()
  }, [fetchDatasets])

  const hasProcessing = useMemo(
    () => datasets.some((dataset) => dataset.status === "processing"),
    [datasets]
  )

  useEffect(() => {
    if (!hasProcessing) {
      return
    }

    const interval = setInterval(() => {
      fetchDatasets({ silent: true })
    }, 7000)

    return () => clearInterval(interval)
  }, [hasProcessing, fetchDatasets])

  const handleProcess = async (datasetId: string) => {
    setBusyIds((prev) => ({ ...prev, [datasetId]: true }))
    setError(null)
    try {
      await ttsApi.processDataset(datasetId)
      await fetchDatasets({ silent: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to process dataset."
      setError(message)
    } finally {
      setBusyIds((prev) => ({ ...prev, [datasetId]: false }))
    }
  }

  const handleDelete = async (datasetId: string) => {
    setBusyIds((prev) => ({ ...prev, [datasetId]: true }))
    setError(null)
    try {
      await ttsApi.deleteDataset(datasetId)
      await fetchDatasets({ silent: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete dataset."
      setError(message)
    } finally {
      setBusyIds((prev) => ({ ...prev, [datasetId]: false }))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Datasets</h1>
          <p className="text-muted-foreground">
            Upload audio and transcripts to prepare training data for your models.
          </p>
        </div>
        <Button asChild>
          <Link href="/datasets/new">Upload dataset</Link>
        </Button>
      </div>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading datasets...</p>
      ) : datasets.length === 0 ? (
        <Empty className="bg w-full">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Database className="size-5" />
            </EmptyMedia>
            <EmptyTitle>No datasets yet</EmptyTitle>
            <EmptyDescription>
              Upload your first dataset to start preprocessing audio for training.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild size="lg">
              <Link href="/datasets/new">Upload a dataset</Link>
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Transcript</TableHead>
              <TableHead>Segments</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {datasets.map((dataset) => {
              const canProcess = dataset.status === "pending" || dataset.status === "failed"
              const isBusy = Boolean(busyIds[dataset.id])

              return (
                <TableRow key={dataset.id}>
                  <TableCell className="font-medium">{dataset.name}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
                        statusStyles[dataset.status]
                      )}
                    >
                      {statusLabels[dataset.status]}
                    </span>
                  </TableCell>
                  <TableCell>{dataset.transcript_type.toUpperCase()}</TableCell>
                  <TableCell>{dataset.segment_count ?? "—"}</TableCell>
                  <TableCell>{formatDuration(dataset.total_duration_seconds)}</TableCell>
                  <TableCell>{formatDate(dataset.created_at)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {canProcess ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleProcess(dataset.id)}
                          disabled={isBusy}
                        >
                          Reprocess
                        </Button>
                      ) : null}
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(dataset.id)}
                        disabled={isBusy}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
