"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import {
  Cpu,
  MessageSquare,
  Globe,
  Lock,
  MoreHorizontal,
  Download,
  Mic,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { modelsApi } from "@/lib/api/tts-api"
import type { TTSModelListItem } from "@/lib/types/tts"

interface ModelCardProps {
  model: TTSModelListItem
  onDelete?: () => void
}

export function ModelCard({ model, onDelete }: ModelCardProps) {
  const handleDownload = async () => {
    try {
      const { download_url } = await modelsApi.getDownloadUrl(model.id)
      window.open(download_url, "_blank")
    } catch (err) {
      console.error("Failed to get download URL:", err)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this model?")) return

    try {
      await modelsApi.delete(model.id)
      onDelete?.()
    } catch (err) {
      console.error("Failed to delete model:", err)
    }
  }

  return (
    <Card className="group hover:border-primary/50 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">
              <Link href={`/my-models/${model.id}`} className="hover:underline">
                {model.name}
              </Link>
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {model.is_public ? (
              <Badge variant="secondary" className="gap-1">
                <Globe className="h-3 w-3" />
                Public
              </Badge>
            ) : (
              <Badge variant="outline" className="gap-1">
                <Lock className="h-3 w-3" />
                Private
              </Badge>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/my-models/${model.id}/infer`}>
                    <Mic className="mr-2 h-4 w-4" />
                    Try Inference
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownload}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Model
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete} className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {model.description && (
          <CardDescription className="line-clamp-2">{model.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Base Model</p>
            <p className="font-medium truncate" title={model.base_model}>
              {model.base_model.split("/").pop() || model.base_model}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Training</p>
            <p className="font-medium">
              {model.training_epochs ? `${model.training_epochs} epochs` : "-"}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Final Loss</p>
            <p className="font-medium font-mono">{model.final_loss?.toFixed(4) || "-"}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            {model.inference_count.toLocaleString()} inferences
          </div>
          <span>{formatDistanceToNow(new Date(model.created_at), { addSuffix: true })}</span>
        </div>
      </CardContent>
    </Card>
  )
}
