import { http } from '@/utils/request';
export const LayoutAPI = {
    // 生成工艺布局
    generateLayout: (data) => http.post('/layouts/generate', data),
    // 更新布局参数
    updateParams: (layoutId, passes) => http.patch(`/layouts/${layoutId}/params`, { passes }),
    // 获取布局详情
    getLayout: (id) => http.get(`/layouts/${id}`)
};
//# sourceMappingURL=processLayout.js.map