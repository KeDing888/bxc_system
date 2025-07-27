// stores/heatmap.ts
import { defineStore } from 'pinia'
import type { HeatmapDataPoint } from '@/types/heatmap'
import { HeatmapAPI } from '@/api/heatmap'

interface HeatmapState {
  rawData: HeatmapDataPoint[]
  loading: boolean
  error: string | null
  gridSize: number
  sigma: number
}

export const useHeatmapStore = defineStore('heatmap', {
  state: (): HeatmapState => ({
    rawData: [],
    loading: false,
    error: null,
    gridSize: 200,
    sigma: 0.005
  }),

  actions: {
    resetState() {
      this.$reset()
    },

    async loadData(simulationId: string) {
      this.resetState()
      this.loading = true
      
      try {
        const data = await HeatmapAPI.fetchRawData(simulationId)
        this.rawData = data.points
      } catch (err) {
        this.handleError(err)
      } finally {
        this.loading = false
      }
    },

    updateParams(params: Partial<Pick<HeatmapState, 'gridSize' | 'sigma'>>) {
      Object.assign(this, params)
    },

    handleError(error: unknown) { 
      if (error instanceof Error) {
        this.error = error.message
      } else {
        this.error = '发生未知错误'
      }
      this.rawData = []
    }
  }
})