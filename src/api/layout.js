// src/modules/process-layout/api/layout.ts
import { http } from '@/utils/request';
import axios from 'axios';
export const LayoutAPI = {
    // 创建工艺布局
    create: (data) => http.post('/layouts', data),
    //删除工艺布局
    delete: (id) => axios.delete(`/layouts/${id}`),
    // 更新工艺布局
    update: (id, data) => http.patch(`/layouts/${id}`, data),
    // 获取所有工艺布局
    getAll: () => http.get('/layouts'),
    // 获取设备列表（复用设备模块类型）
    getDevices: () => http.get('/devices'),
};
//# sourceMappingURL=layout.js.map