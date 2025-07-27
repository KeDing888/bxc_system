import { ref } from 'vue';
import { useLayoutStore } from '@/stores/processLayoutStore';
import ProcessCanvas from './ProcessCanvas.vue';
import LayoutForm from '@/LayoutForm.vue';
import DeviceParamModal from ' @/modules/layout/DeviceParaModal.vue';
const store = useLayoutStore();
const selectedPassIndex = ref(null);
// 处理布局生成
const handleGenerate = async (params) => {
    await store.generateLayout(params);
};
// 处理参数保存
const handleSaveParams = (params) => {
    if (selectedPassIndex.value !== null) {
        store.updateDeviceParams(selectedPassIndex.value, params);
        selectedPassIndex.value = null;
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "layout-container" },
});
if (__VLS_ctx.store.currentLayout) {
    /** @type {[typeof ProcessCanvas, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(ProcessCanvas, new ProcessCanvas({
        layout: (__VLS_ctx.store.currentLayout),
        ...{ class: "canvas-section" },
    }));
    const __VLS_1 = __VLS_0({
        layout: (__VLS_ctx.store.currentLayout),
        ...{ class: "canvas-section" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
/** @type {[typeof LayoutForm, ]} */ ;
// @ts-ignore
const __VLS_3 = __VLS_asFunctionalComponent(LayoutForm, new LayoutForm({
    ...{ 'onGenerate': {} },
    ...{ class: "form-section" },
}));
const __VLS_4 = __VLS_3({
    ...{ 'onGenerate': {} },
    ...{ class: "form-section" },
}, ...__VLS_functionalComponentArgsRest(__VLS_3));
let __VLS_6;
let __VLS_7;
let __VLS_8;
const __VLS_9 = {
    onGenerate: (__VLS_ctx.handleGenerate)
};
var __VLS_5;
if (__VLS_ctx.selectedPassIndex !== null) {
    /** @type {[typeof DeviceParamModal, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(DeviceParamModal, new DeviceParamModal({
        ...{ 'onSave': {} },
        ...{ 'onClose': {} },
        pass: (__VLS_ctx.store.currentLayout.passes[__VLS_ctx.selectedPassIndex]),
    }));
    const __VLS_11 = __VLS_10({
        ...{ 'onSave': {} },
        ...{ 'onClose': {} },
        pass: (__VLS_ctx.store.currentLayout.passes[__VLS_ctx.selectedPassIndex]),
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    let __VLS_13;
    let __VLS_14;
    let __VLS_15;
    const __VLS_16 = {
        onSave: (__VLS_ctx.handleSaveParams)
    };
    const __VLS_17 = {
        onClose: (...[$event]) => {
            if (!(__VLS_ctx.selectedPassIndex !== null))
                return;
            __VLS_ctx.selectedPassIndex = null;
        }
    };
    var __VLS_12;
}
/** @type {__VLS_StyleScopedClasses['layout-container']} */ ;
/** @type {__VLS_StyleScopedClasses['canvas-section']} */ ;
/** @type {__VLS_StyleScopedClasses['form-section']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            ProcessCanvas: ProcessCanvas,
            LayoutForm: LayoutForm,
            DeviceParamModal: DeviceParamModal,
            store: store,
            selectedPassIndex: selectedPassIndex,
            handleGenerate: handleGenerate,
            handleSaveParams: handleSaveParams,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=LayoutView.vue.js.map