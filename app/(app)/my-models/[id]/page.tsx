"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { formatDistanceToNow, format } from "date-fns"
import {
  ArrowLeft,
  Download,
  Mic,
  Trash2,
  Globe,
  Lock,
  Loader2,
  Pencil,
  Save,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { modelsApi } from "@/lib/api/tts-api"
import type { TTSModel } from "@/lib/types/tts"

export default function ModelDetailPage() {
  const params = useParams()
  const router = useRouter()
  const modelId = params.id as string

  const [model, setModel] = React.useState<TTSModel | null>(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const [isEditing, setIsEditing] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)

  const [editName, setEditName] = React.useState("")
  const [editDescription, setEditDescription] = React.useState("")
  const [editIsPublic, setEditIsPublic] = React.useState(false)

  React.useEffect(() => {
    modelsApi
      .get(modelId)
      .then((data) => {
        setModel(data)
        setEditName(data.name)
        setEditDescription(data.description || "")
        setEditIsPublic(data.is_public)
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }, [modelId])

  const handleSave = async () => {
    if (!model) return

    setIsSaving(true)
    try {
      const updated = await modelsApi.update(model.id, {
        name: editName,
        description: editDescription || undefined,
        is_public: editIsPublic,
      })
      setModel(updated)
      setIsEditing(false)
    } catch (err) {
      console.error("Failed to update model:", err)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDownload = async () => {
    if (!model) return
    try {
      const { download_url } = await modelsApi.getDownloadUrl(model.id)
      window.open(download_url, "_blank")
    } catch (err) {
      console.error("Failed to get download URL:", err)
    }
  }

  const handleDelete = async () => {
    if (!model || !confirm("Are you sure you want to delete this model?")) return

    try {
      await modelsApi.delete(model.id)
      router.push("/my-models")
    } catch (err) {
      console.error("Failed to delete model:", err)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!model) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Model not found</p>
        <Button asChild className="mt-4">
          <Link href="/my-models">Back to Models</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/my-models">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          {isEditing ? (
            <Input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="text-2xl font-bold h-auto py-1"
            />
          ) : (
            <h1 className="text-3xl font-bold tracking-tight text-primary">{model.name}</h1>
          )}
          <div className="flex items-center gap-2 mt-1">
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
            <span className="text-sm text-muted-foreground">
              Created {formatDistanceToNow(new Date(model.created_at), { addSuffix: true })}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isSaving}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button asChild>
                <Link href={`/my-models/${model.id}/infer`}>
                  <Mic className="mr-2 h-4 w-4" />
                  Try Inference
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Model Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Add a description..."
                    rows={3}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Public Model</Label>
                    <p className="text-xs text-muted-foreground">
                      Allow others to use this model for inference
                    </p>
                  </div>
                  <Switch checked={editIsPublic} onCheckedChange={setEditIsPublic} />
                </div>
              </>
            ) : (
              <>
                {model.description && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Description</p>
                    <p>{model.description}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Base Model</p>
                    <p className="font-medium">{model.base_model.split("/").pop()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Model Size</p>
                    <p className="font-medium">
                      {model.model_size_bytes
                        ? `${(model.model_size_bytes / 1024 / 1024).toFixed(1)} MB`
                        : "-"}
                    </p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Training Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Epochs</p>
                <p className="font-medium">{model.training_epochs || "-"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Training Samples</p>
                <p className="font-medium">{model.training_samples?.toLocaleString() || "-"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Final Loss</p>
                <p className="font-medium font-mono">{model.final_loss?.toFixed(6) || "-"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Inferences</p>
                <p className="font-medium">{model.inference_count.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Actions</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Model
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Model
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
