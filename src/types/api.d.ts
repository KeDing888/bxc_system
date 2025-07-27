import { HeatmapDataPoint } from './heatmap'

declare module 'axios' {
  interface AxiosRequestConfig {
    showError?: boolean
  }

  // 修复点：添加完整类型声明
  export function create(config: {
    baseURL: string
    timeout: number
    headers: Record<string, string>
  }): import('axios').AxiosInstance
}  

// 基础响应类型
export interface BaseResponse<T> {
  code: number
  message: string
  data: T
  timestamp: number
}

// 热力图数据响应类型
export interface HeatmapDataResponse {
  simulationId: string
  points: HeatmapDataPoint[]
  metadata: {
    dataCount: number
    xRange: [number, number]
    yRange: [number, number]
    temperatureRange: [number, number]
  }
}