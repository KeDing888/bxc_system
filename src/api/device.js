import { http } from '@/utils/request';
export const DeviceAPI = {
    // 获取设备列表
    getDevices: () => http.get('/api/devices'),
    // 创建设备
    createDevice: (data) => http.post('/api/devices', data),
    // 更新设备
    updateDevice: (id, data) => http.patch(`/devices/${id}`, data),
    // 删除设备
    deleteDevice: (id) => http.delete(`/api/devices/${id}`)
};
//# sourceMappingURL=device.js.map