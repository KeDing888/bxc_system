import { reactive } from 'vue';
const props = defineProps();
const emit = defineEmits(['submit']);
// 初始化表单数据
const formData = reactive(props.device.attributes.reduce((acc, attr) => {
    acc[attr.name] = attr.defaultValue || '';
    return acc;
}, {}));
const submitForm = () => {
    emit('submit', formData);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    model: (__VLS_ctx.formData),
}));
const __VLS_2 = __VLS_1({
    model: (__VLS_ctx.formData),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
for (const [attr] of __VLS_getVForSourceType((__VLS_ctx.device.attributes))) {
    const __VLS_5 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
        key: (attr.name),
        label: (attr.name),
    }));
    const __VLS_7 = __VLS_6({
        key: (attr.name),
        label: (attr.name),
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    __VLS_8.slots.default;
    if (attr.type === 'number') {
        const __VLS_9 = {}.ElInputNumber;
        /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
        // @ts-ignore
        const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
            modelValue: (__VLS_ctx.formData[attr.name]),
            precision: (2),
        }));
        const __VLS_11 = __VLS_10({
            modelValue: (__VLS_ctx.formData[attr.name]),
            precision: (2),
        }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    }
    if (attr.type === 'boolean') {
        const __VLS_13 = {}.ElSwitch;
        /** @type {[typeof __VLS_components.ElSwitch, typeof __VLS_components.elSwitch, ]} */ ;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
            modelValue: (__VLS_ctx.formData[attr.name]),
        }));
        const __VLS_15 = __VLS_14({
            modelValue: (__VLS_ctx.formData[attr.name]),
        }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    }
    if (attr.type === 'string') {
        const __VLS_17 = {}.ElInput;
        /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
        // @ts-ignore
        const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
            modelValue: (__VLS_ctx.formData[attr.name]),
        }));
        const __VLS_19 = __VLS_18({
            modelValue: (__VLS_ctx.formData[attr.name]),
        }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    }
    var __VLS_8;
}
const __VLS_21 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_23 = __VLS_22({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
let __VLS_25;
let __VLS_26;
let __VLS_27;
const __VLS_28 = {
    onClick: (__VLS_ctx.submitForm)
};
__VLS_24.slots.default;
var __VLS_24;
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            formData: formData,
            submitForm: submitForm,
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
//# sourceMappingURL=DeviceParamForm.vue.js.map