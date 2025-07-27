import { defineStore } from 'pinia'
import { LayoutAPI } from '@/api/processLayout'
import type { LayoutGenerateParams, ProcessLayout } from '@/types/processLayout'

export const usePRLayoutStore = defineStore('layout', {
  state: () => ({
    currentLayout: null as ProcessLayout | null,
    isLoading: false
  }),

  actions: {
    // 生成新布局
    async generateLayout(params: LayoutGenerateParams) {
      this.isLoading = true
      try {
        const { data } = await LayoutAPI.generateLayout(params)
        this.currentLayout = data
        return data
      } finally {
        this.isLoading = false
      }
    },

    // 更新设备参数
    async updateDeviceParams(passIndex: number, params: Record<string, any>) {
      if (!this.currentLayout) return
        
      const updatedPasses = [...this.currentLayout.passes]
      updatedPasses[passIndex].parameters = params
      
      const { data } = await LayoutAPI.updateParams(
        this.currentLayout.id, 
        updatedPasses
      )
      this.currentLayout = data
    }
  }
})