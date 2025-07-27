// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                redirect: '/device'
            },
            // ==================== 设备管理模块 ====================
            {
                path: '/device',
                component: () => import('@/modules/device/DeviceList.vue'),
                meta: { title: '设备管理' }
            },
            // ==================== 热力图模块 ====================
            {
                path: '/heatmap',
                name: 'Heatmap',
                component: () => import('@/views/HeatmapView.vue'),
                meta: {
                    title: '热力分析'
                }
            },
            // ==================== 工艺布局模块 ====================
            {
                path: '/layout',
                component: () => import('@/modules/processlayout/LayoutList.vue'),
                meta: { title: '工艺布局列表' }
            },
            {
                path: '/layout/new',
                name: 'CreateLayout',
                component: () => import('@/modules/processlayout/LayoutCreator.vue')
            },
            {
                path: '/layout/edit',
                name: 'EditLayout',
                component: () => import('@/modules/processlayout/LayoutCreator.vue'),
                props: (route) => ({
                    editData: route.query.data ? JSON.parse(decodeURIComponent(route.query.data)) : null
                })
            }
        ]
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;
//# sourceMappingURL=index.js.map