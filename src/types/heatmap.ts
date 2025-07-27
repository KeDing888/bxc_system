// 热力图数据点类型
export interface HeatmapDataPoint {
    x: number
    y: number
    temperature: number
  }
  
  // 网格数据类型
  export interface GridPoint {
    x: number
    y: number
    value: number
  }
  
  // Web Worker 消息类型
  export interface WorkerMessage {
    grid: GridPoint[]
    xRange: [number, number]
    yRange: [number, number]
  }