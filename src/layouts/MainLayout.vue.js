import NavBar from '@/components/NavBar.vue';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
// 添加路由变化监听（调试用）
watch(() => route.fullPath, (newPath) => {
    console.log('路由变化:', newPath);
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "main-layout" },
});
/** @type {[typeof NavBar, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(NavBar, new NavBar({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "content-container" },
});
const __VLS_3 = {}.RouterView;
/** @type {[typeof __VLS_components.RouterView, typeof __VLS_components.routerView, typeof __VLS_components.RouterView, typeof __VLS_components.routerView, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(__VLS_3, new __VLS_3({}));
const __VLS_5 = __VLS_4({}, ...__VLS_functionalComponentArgsRest(__VLS_4));
{
    const { default: __VLS_thisSlot } = __VLS_6.slots;
    const [{ Component }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_7 = ((Component));
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        key: (__VLS_ctx.route.fullPath),
    }));
    const __VLS_9 = __VLS_8({
        key: (__VLS_ctx.route.fullPath),
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    __VLS_6.slots['' /* empty slot name completion */];
}
var __VLS_6;
/** @type {__VLS_StyleScopedClasses['main-layout']} */ ;
/** @type {__VLS_StyleScopedClasses['content-container']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            NavBar: NavBar,
            route: route,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=MainLayout.vue.js.map