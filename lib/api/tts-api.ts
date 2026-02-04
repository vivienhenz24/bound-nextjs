import { apiClient } from "../api-client"
import type {
  CreateDatasetData,
  CreateJobData,
  InferenceRequest,
  InferenceResponse,
  ModelDownloadResponse,
  QueueStatus,
  TTSDataset,
  TTSDatasetListItem,
  TTSModel,
  TTSModelListItem,
  TTSTrainingJob,
  TTSTrainingJobListItem,
  UpdateModelData,
} from "../types/tts"

// ============================================================================
// Dataset API
// ============================================================================

export const datasetsApi = {
  create: async (data: CreateDatasetData): Promise<TTSDataset> => {
    const formData = new FormData()
    formData.append("name", data.name)
    if (data.description) {
      formData.append("description", data.description)
    }
    formData.append("transcript_type", data.transcript_type)
    formData.append("audio", data.audio)
    formData.append("transcript", data.transcript)

    return await apiClient.post<TTSDataset>("/tts/datasets", formData)
  },

  list: async (): Promise<TTSDatasetListItem[]> => {
    return await apiClient.get<TTSDatasetListItem[]>("/tts/datasets")
  },

  get: async (id: string): Promise<TTSDataset> => {
    return await apiClient.get<TTSDataset>(`/tts/datasets/${id}`)
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/tts/datasets/${id}`)
  },

  process: async (id: string): Promise<TTSDataset> => {
    return await apiClient.post<TTSDataset>(`/tts/datasets/${id}/process`)
  },
}

// ============================================================================
// Jobs API
// ============================================================================

export const jobsApi = {
  create: async (data: CreateJobData): Promise<TTSTrainingJob> => {
    return await apiClient.post<TTSTrainingJob>("/tts/jobs", data)
  },

  list: async (): Promise<TTSTrainingJobListItem[]> => {
    return await apiClient.get<TTSTrainingJobListItem[]>("/tts/jobs")
  },

  get: async (id: string): Promise<TTSTrainingJob> => {
    return await apiClient.get<TTSTrainingJob>(`/tts/jobs/${id}`)
  },

  cancel: async (id: string): Promise<TTSTrainingJob> => {
    return await apiClient.post<TTSTrainingJob>(`/tts/jobs/${id}/cancel`)
  },

  getQueueStatus: async (): Promise<QueueStatus> => {
    return await apiClient.get<QueueStatus>("/tts/jobs/queue")
  },
}

// ============================================================================
// Models API
// ============================================================================

export const modelsApi = {
  list: async (): Promise<TTSModelListItem[]> => {
    return await apiClient.get<TTSModelListItem[]>("/tts/models")
  },

  get: async (id: string): Promise<TTSModel> => {
    return await apiClient.get<TTSModel>(`/tts/models/${id}`)
  },

  update: async (id: string, data: UpdateModelData): Promise<TTSModel> => {
    return await apiClient.patch<TTSModel>(`/tts/models/${id}`, data)
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/tts/models/${id}`)
  },

  getDownloadUrl: async (id: string): Promise<ModelDownloadResponse> => {
    return await apiClient.get<ModelDownloadResponse>(`/tts/models/${id}/download`)
  },

  infer: async (id: string, data: InferenceRequest): Promise<InferenceResponse> => {
    return await apiClient.post<InferenceResponse>(`/tts/models/${id}/infer`, data)
  },
}

// Combined TTS API export
export const ttsApi = {
  datasets: datasetsApi,
  jobs: jobsApi,
  models: modelsApi,
}
