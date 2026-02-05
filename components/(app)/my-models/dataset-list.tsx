"use client"

import * as React from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import {
  Database,
  Clock,
  FileAudio,
  MoreHorizontal,
  Trash2,
  RefreshCw,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { datasetsApi } from "@/lib/api/tts-api"
import type { TTSDatasetListItem, DatasetStatus } from "@/lib/types/tts"

function formatDuration(seconds: number | null): string {
  if (!seconds) return "-"
  const mins = Math.floor(seconds / 60)
  const secs = Math.round(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

function StatusBadge({ status }: { status: DatasetStatus }) {
  const variants: Record<DatasetStatus, "default" | "secondary" | "destructive" | "outline"> = {
    pending: "outline",
    processing: "secondary",
    ready: "default",
    failed: "destructive",
  }

  return (
    <Badge variant={variants[status]} className="capitalize">
      {status === "processing" && <Loader2 className="mr-1 h-3 w-3 animate-spin" />}
      {status}
    </Badge>
  )
}

interface DatasetListProps {
  initialDatasets?: TTSDatasetListItem[]
}

export function DatasetList({ initialDatasets = [] }: DatasetListProps) {
  const [datasets, setDatasets] = React.useState<TTSDatasetListItem[]>(initialDatasets)
  const [isLoading, setIsLoading] = React.useState(!initialDatasets.length)

  const fetchDatasets = React.useCallback(async () => {
    try {
      const data = await datasetsApi.list()
      setDatasets(data)
    } catch (err) {
      console.error("Failed to fetch datasets:", err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    if (!initialDatasets.length) {
      fetchDatasets()
    }

    // Poll for updates if any dataset is processing
    const hasProcessing = datasets.some((d) => d.status === "processing")
    if (hasProcessing) {
      const interval = setInterval(fetchDatasets, 5000)
      return () => clearInterval(interval)
    }
  }, [datasets, fetchDatasets, initialDatasets.length])

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this dataset?")) return

    try {
      await datasetsApi.delete(id)
      setDatasets((prev) => prev.filter((d) => d.id !== id))
    } catch (err) {
      console.error("Failed to delete dataset:", err)
    }
  }

  const handleReprocess = async (id: string) => {
    try {
      await datasetsApi.process(id)
      fetchDatasets()
    } catch (err) {
      console.error("Failed to reprocess dataset:", err)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (datasets.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <Database className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No datasets yet</h3>
        <p className="text-muted-foreground mb-4">Upload audio and transcripts to get started.</p>
        <Button asChild>
          <Link href="/my-models/datasets/new">Upload Dataset</Link>
        </Button>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Segments</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="w-[50px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {datasets.map((dataset) => (
          <TableRow key={dataset.id}>
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                <FileAudio className="h-4 w-4 text-muted-foreground" />
                {dataset.name}
              </div>
              {dataset.description && (
                <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                  {dataset.description}
                </p>
              )}
            </TableCell>
            <TableCell>
              <Badge variant="outline" className="uppercase text-xs">
                {dataset.transcript_type}
              </Badge>
            </TableCell>
            <TableCell>
              <StatusBadge status={dataset.status} />
            </TableCell>
            <TableCell>{dataset.segment_count ?? "-"}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                {formatDuration(dataset.total_duration_seconds)}
              </div>
            </TableCell>
            <TableCell className="text-muted-foreground">
              {formatDistanceToNow(new Date(dataset.created_at), { addSuffix: true })}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {dataset.status === "failed" && (
                    <DropdownMenuItem onClick={() => handleReprocess(dataset.id)}>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Retry Processing
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => handleDelete(dataset.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
