// src/stores/device.store.ts
import { defineStore } from 'pinia'
import { DeviceAPI } from '@/api/device'
import type { 
  Device, 
  DeviceCreateDTO,
  DeviceUpdateDTO 
} from '@/types/device'

export const useDeviceStore = defineStore('device', {
  state: () => ({
    devices: [] as Device[],
    loading: false,
    error: null as string | null
  }),
  
  actions: {
    // 获取设备列表
    async fetchDevices() {
      try {
        this.loading = true
        const { data } = await DeviceAPI.getDevices()
        this.devices = data
      } catch (error) {
        this.error = (error as Error).message
        throw error
      } finally {
        this.loading = false
      }
    },

    // 创建设备
    async createDevice(payload: DeviceCreateDTO) {
      try {
        const { data } = await DeviceAPI.createDevice(payload)
        this.devices.push(data)
        return data
      } catch (error) {
        this.error = (error as Error).message
        throw error
      }
    },

    // 更新设备
    async updateDevice(payload: DeviceUpdateDTO) {
      try {
        const { data } = await DeviceAPI.updateDevice(payload.id, payload)
        const index = this.devices.findIndex(d => d.id === payload.id)
        if (index >= 0) this.devices.splice(index, 1, data)
        return data
      } catch (error) {
        this.error = (error as Error).message
        throw error
      }
    },

    // 删除设备
    async deleteDevice(id: string) {
      try {
        await DeviceAPI.deleteDevice(id)
        this.devices = this.devices.filter(d => d.id !== id)
      } catch (error) {
        this.error = (error as Error).message
        throw error
      }
    }
  },
  
  getters: {
    // 通过ID获取设备
    getDeviceById: (state) => (id: string) => {
      return state.devices.find(d => d.id === id)
    }
  }
})