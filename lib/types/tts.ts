// TTS Dataset types
export type DatasetStatus = "pending" | "processing" | "ready" | "failed"
export type TranscriptType = "text" | "srt"

export interface TTSDataset {
  id: string
  user_id: string
  name: string
  description: string | null
  audio_s3_key: string
  transcript_s3_key: string
  transcript_type: TranscriptType
  status: DatasetStatus
  segment_count: number | null
  total_duration_seconds: number | null
  training_data_s3_key?: string | null
  error_message: string | null
  created_at: string
  updated_at: string
}

export interface TTSDatasetListItem {
  id: string
  name: string
  description: string | null
  transcript_type: TranscriptType
  status: DatasetStatus
  segment_count: number | null
  total_duration_seconds: number | null
  created_at: string
}

export interface CreateDatasetData {
  name: string
  description?: string
  transcript_type: TranscriptType
  audio: File
  transcript: File
  auto_process?: boolean
}

// TTS Training Job types
export type JobStatus = "queued" | "preparing" | "training" | "completed" | "failed" | "cancelled"

export interface TTSTrainingJob {
  id: string
  user_id: string
  dataset_id: string
  name: string
  status: JobStatus
  runpod_job_id: string | null
  queue_position: number | null
  epochs: number
  learning_rate: number
  batch_size: number
  current_epoch: number | null
  current_step: number | null
  total_steps: number | null
  loss: number | null
  model_id: string | null
  error_message: string | null
  created_at: string
  updated_at: string
  started_at: string | null
  completed_at: string | null
}

export interface TTSTrainingJobListItem {
  id: string
  name: string
  status: JobStatus
  queue_position: number | null
  epochs: number
  current_epoch: number | null
  loss: number | null
  model_id: string | null
  created_at: string
  started_at: string | null
  completed_at: string | null
}

export interface CreateJobData {
  dataset_id: string
  name: string
  epochs?: number
  learning_rate?: number
  batch_size?: number
}

export interface QueueStatus {
  total_queued: number
  total_training: number
  jobs: TTSTrainingJobListItem[]
}

// TTS Model types
export interface TTSModel {
  id: string
  user_id: string
  training_job_id: string | null
  name: string
  description: string | null
  model_s3_key: string
  model_size_bytes: number | null
  base_model: string
  training_epochs: number | null
  training_samples: number | null
  final_loss: number | null
  inference_count: number
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface TTSModelListItem {
  id: string
  name: string
  description: string | null
  base_model: string
  training_epochs: number | null
  final_loss: number | null
  inference_count: number
  is_public: boolean
  created_at: string
}

export interface UpdateModelData {
  name?: string
  description?: string
  is_public?: boolean
}

export interface ModelDownloadResponse {
  download_url: string
  expires_in_seconds: number
}

// Inference types
export interface InferenceRequest {
  text: string
  speaker_id?: string
}

export interface InferenceResponse {
  audio_url: string
  duration_seconds: number | null
  expires_in_seconds: number
}
