import type { Device, DeviceCreateDTO, DeviceUpdateDTO } from '@/types/device'
import { http } from '@/utils/request'

export const DeviceAPI = {
  // 获取设备列表
  getDevices: () => http.get<Device[]>('/api/devices'),
  
  // 创建设备
  createDevice: (data: DeviceCreateDTO) => 
    http.post<Device>('/api/devices', data),
  
  // 更新设备
  updateDevice: (id: string, data: DeviceUpdateDTO) => 
      http.patch<Device>(`/devices/${id}`, data),
  
  // 删除设备
  deleteDevice: (id: string) => 
    http.delete(`/api/devices/${id}`)
}