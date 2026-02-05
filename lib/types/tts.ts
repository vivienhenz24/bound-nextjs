export type DatasetStatus = "pending" | "processing" | "ready" | "failed"

export type TranscriptType = "text" | "srt"

export type DatasetListItem = {
  id: string
  name: string
  description?: string | null
  transcript_type: TranscriptType
  status: DatasetStatus
  segment_count?: number | null
  total_duration_seconds?: number | null
  created_at: string
}

export type DatasetDetail = DatasetListItem & {
  user_id: string
  audio_s3_key: string
  transcript_s3_key: string
  training_data_s3_key?: string | null
  error_message?: string | null
  updated_at: string
}
