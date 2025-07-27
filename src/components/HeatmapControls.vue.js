import { toRefs } from 'vue';
const props = defineProps();
const emit = defineEmits();
const { gridSize, sigma } = toRefs(props);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElCard;
/** @type {[typeof __VLS_components.ElCard, typeof __VLS_components.elCard, typeof __VLS_components.ElCard, typeof __VLS_components.elCard, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ class: "controls" },
}));
const __VLS_2 = __VLS_1({
    ...{ class: "controls" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
{
    const { header: __VLS_thisSlot } = __VLS_3.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "control-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
}
const __VLS_5 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    labelWidth: "100px",
}));
const __VLS_7 = __VLS_6({
    labelWidth: "100px",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    label: "网格密度",
}));
const __VLS_11 = __VLS_10({
    label: "网格密度",
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
const __VLS_13 = {}.ElSlider;
/** @type {[typeof __VLS_components.ElSlider, typeof __VLS_components.elSlider, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    modelValue: (__VLS_ctx.gridSize),
    min: (50),
    max: (500),
    step: (50),
    showStops: true,
}));
const __VLS_15 = __VLS_14({
    modelValue: (__VLS_ctx.gridSize),
    min: (50),
    max: (500),
    step: (50),
    showStops: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
var __VLS_12;
const __VLS_17 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
    label: "平滑系数",
}));
const __VLS_19 = __VLS_18({
    label: "平滑系数",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
__VLS_20.slots.default;
const __VLS_21 = {}.ElSlider;
/** @type {[typeof __VLS_components.ElSlider, typeof __VLS_components.elSlider, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    modelValue: (__VLS_ctx.sigma),
    min: (0.001),
    max: (0.1),
    step: (0.001),
    formatTooltip: ((val) => val.toFixed(3)),
}));
const __VLS_23 = __VLS_22({
    modelValue: (__VLS_ctx.sigma),
    min: (0.001),
    max: (0.1),
    step: (0.001),
    formatTooltip: ((val) => val.toFixed(3)),
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
var __VLS_20;
var __VLS_8;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
/** @type {__VLS_StyleScopedClasses['control-header']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            gridSize: gridSize,
            sigma: sigma,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=HeatmapControls.vue.js.map