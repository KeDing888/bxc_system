import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const activeMenu = ref('device');
const menuItems = [
    { name: '设备管理', path: '/device' },
    { name: '工艺布局', path: '/layout' },
    { name: '热力图', path: '/heatmap' }
];
// 初始化同步状态
const updateActiveMenu = () => {
    activeMenu.value = route.path.split('/')[1] || 'device';
};
updateActiveMenu();
// 监听路由变化
watch(() => route.path, (newPath) => {
    updateActiveMenu();
    console.log('当前路由:', newPath); // 调试用
});
const handleMenuSelect = async (path) => {
    if (route.path === path)
        return;
    try {
        await router.push(path);
        console.log('成功导航到:', path); // 调试用
    }
    catch (error) {
        console.error('导航错误:', error);
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElMenu;
/** @type {[typeof __VLS_components.ElMenu, typeof __VLS_components.elMenu, typeof __VLS_components.ElMenu, typeof __VLS_components.elMenu, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onSelect': {} },
    mode: "horizontal",
    defaultActive: (__VLS_ctx.activeMenu),
    ...{ class: "nav-menu" },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onSelect': {} },
    mode: "horizontal",
    defaultActive: (__VLS_ctx.activeMenu),
    ...{ class: "nav-menu" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onSelect: ((index) => __VLS_ctx.handleMenuSelect('/' + index))
};
var __VLS_8 = {};
__VLS_3.slots.default;
for (const [item] of __VLS_getVForSourceType((__VLS_ctx.menuItems))) {
    const __VLS_9 = {}.ElMenuItem;
    /** @type {[typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, typeof __VLS_components.ElMenuItem, typeof __VLS_components.elMenuItem, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
        key: (item.path),
        index: (item.path.split('/')[1]),
    }));
    const __VLS_11 = __VLS_10({
        key: (item.path),
        index: (item.path.split('/')[1]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    __VLS_12.slots.default;
    (item.name);
    var __VLS_12;
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['nav-menu']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            activeMenu: activeMenu,
            menuItems: menuItems,
            handleMenuSelect: handleMenuSelect,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=NavBar.vue.js.map