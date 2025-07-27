import { http } from '@/utils/request'
import type { 
  ProcessLayout,
  LayoutGenerateParams,
  ProcessPass
} from '@/types/processLayout'

export const LayoutAPI = {
  // 生成工艺布局
  generateLayout: (data: LayoutGenerateParams) => 
    http.post<ProcessLayout>('/layouts/generate', data),

  // 更新布局参数
  updateParams: (layoutId: string, passes: ProcessPass[]) =>
    http.patch(`/layouts/${layoutId}/params`, { passes }),

  // 获取布局详情
  getLayout: (id: string) =>
    http.get<ProcessLayout>(`/layouts/${id}`)
}