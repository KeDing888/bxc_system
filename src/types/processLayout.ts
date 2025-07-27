// 工艺布局核心类型
export interface ProcessLayout {
  id: string
  name: string
  passes: ProcessPass[]
  createdAt: string
  updatedAt: string
}

export interface ProcessPass {
  order: number       // 道次序号 (1-17)
  deviceId: string    // 设备模板ID
  startX: number      // 设备起点X坐标
  endX: number        // 设备终点X坐标
  parameters: Record<string, any> // 设备参数实例值
}

// 布局生成参数类型
export interface LayoutGenerateParams {
  name: string
  passes: Omit<ProcessPass, 'parameters'>[] // 生成时不需要参数值
}