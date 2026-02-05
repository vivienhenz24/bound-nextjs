import { apiClient } from "../api-client"
import type { DatasetDetail, DatasetListItem } from "../types/tts"

export const ttsApi = {
  createDataset: async (formData: FormData): Promise<DatasetDetail> => {
    return await apiClient.post<DatasetDetail>("/tts/datasets", formData)
  },

  listDatasets: async (): Promise<DatasetListItem[]> => {
    return await apiClient.get<DatasetListItem[]>("/tts/datasets")
  },

  getDataset: async (datasetId: string): Promise<DatasetDetail> => {
    return await apiClient.get<DatasetDetail>(`/tts/datasets/${datasetId}`)
  },

  processDataset: async (datasetId: string): Promise<DatasetDetail> => {
    return await apiClient.post<DatasetDetail>(`/tts/datasets/${datasetId}/process`)
  },

  deleteDataset: async (datasetId: string): Promise<void> => {
    await apiClient.delete<void>(`/tts/datasets/${datasetId}`)
  },
}
