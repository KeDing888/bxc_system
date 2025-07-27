// 定义统一的API响应格式
export interface ApiResponse<T = any> {
    code: number
    message: string
    data: T
    [key: string]: any
  }