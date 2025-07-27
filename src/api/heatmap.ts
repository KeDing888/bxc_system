import axios from 'axios'
import type { BaseResponse, HeatmapDataResponse } from '@/types/api'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const HeatmapAPI = {
  async fetchRawData(simulationId: string): Promise<HeatmapDataResponse> {
    const response = await apiClient.get<BaseResponse<HeatmapDataResponse>>(
      `/heatmap/${simulationId}` 
    )
    
    if (response.data.code !== 200) {
      throw new Error(response.data.message)
    }
    
    return response.data.data
  }
}