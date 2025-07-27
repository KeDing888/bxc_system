import { computed } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';
const props = defineProps();
const emit = defineEmits(['deviceClick']);
const deviceStore = useDeviceStore();
// 设备映射数据
const deviceMap = computed(() => new Map(deviceStore.devices.map(d => [d.id, d])));
// 设备点击处理
const handleDeviceClick = (index) => {
    emit('deviceClick', index);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "process-canvas" },
});
for (const [pass, index] of __VLS_getVForSourceType((__VLS_ctx.layout.passes))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.handleDeviceClick(index);
            } },
        key: (index),
        ...{ class: "device-item" },
        ...{ style: ({
                left: `${pass.startX}px`,
                width: `${pass.endX - pass.startX}px`
            }) },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.deviceMap.get(pass.deviceId)?.image),
        ...{ class: "device-image" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "device-name" },
    });
    (__VLS_ctx.deviceMap.get(pass.deviceId)?.name);
}
/** @type {__VLS_StyleScopedClasses['process-canvas']} */ ;
/** @type {__VLS_StyleScopedClasses['device-item']} */ ;
/** @type {__VLS_StyleScopedClasses['device-image']} */ ;
/** @type {__VLS_StyleScopedClasses['device-name']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            deviceMap: deviceMap,
            handleDeviceClick: handleDeviceClick,
        };
    },
    emits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=ProcessCanvas.vue.js.map