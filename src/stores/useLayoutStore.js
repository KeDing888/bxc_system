// src/modules/process-layout/stores/useLayoutStore.ts
import { defineStore } from 'pinia';
import { LayoutAPI } from '@/api/layout';
export const useLayoutStore = defineStore('layout', {
    state: () => ({
        layouts: [],
        currentLayout: null,
        devices: [],
        isLoading: false
    }),
    actions: {
        // 加载布局列表
        async loadLayouts() {
            this.isLoading = true;
            try {
                const { data } = await LayoutAPI.getAll();
                this.layouts = data;
            }
            finally {
                this.isLoading = false;
            }
        },
        // 创建新布局
        async createLayout(layout) {
            const { data } = await LayoutAPI.create(layout);
            this.layouts.push(data);
            return data;
        },
        // 更新道次属性
        async updatePassAttributes(payload) {
            if (!this.currentLayout)
                return;
            // 定位需要更新的道次
            const passIndex = this.currentLayout.passes.findIndex(p => p.order === payload.passOrder);
            if (passIndex >= 0) {
                // 合并属性更新
                this.currentLayout.passes[passIndex].attributes = {
                    ...this.currentLayout.passes[passIndex].attributes,
                    ...payload.attributes
                };
                // API 更新并刷新当前布局
                const { data } = await LayoutAPI.update(this.currentLayout.id, this.currentLayout);
                this.currentLayout = data;
            }
        },
        // 删除布局
        async deleteLayout(id) {
            try {
                await LayoutAPI.delete(id);
                this.layouts = this.layouts.filter(l => l.id !== id);
            }
            catch (error) {
                throw new Error(`删除失败: ${error}`);
            }
        }
    },
    getters: {
        // 获取当前布局道次列表
        currentPasses() {
            return this.currentLayout?.passes || [];
        }
    }
});
//# sourceMappingURL=useLayoutStore.js.map