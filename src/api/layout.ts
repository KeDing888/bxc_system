// src/modules/process-layout/api/layout.ts
import { http } from '@/utils/request';
import type { ProcessLayout,  LayoutPass } from '../types/layout';
import type {Device, DeviceAttribute } from '@/types/device';
import axios from 'axios';

export const LayoutAPI = {
  // 创建工艺布局
  create: (data: Omit<ProcessLayout, 'id' | 'createdAt' | 'updatedAt'>) => 
    http.post<ProcessLayout>('/layouts', data),

  //删除工艺布局

  delete: (id: string) => axios.delete(`/layouts/${id}`),

  // 更新工艺布局
  update: (id: string, data: ProcessLayout) =>
    http.patch<ProcessLayout>(`/layouts/${id}`, data),

  // 获取所有工艺布局
  getAll: () => http.get<ProcessLayout[]>('/layouts'),

  // 获取设备列表（复用设备模块类型）
  getDevices: () => http.get<Device[]>('/devices'),
};

// 与设备模块保持一致的参数类型
export type { Device } from '@/types/device';