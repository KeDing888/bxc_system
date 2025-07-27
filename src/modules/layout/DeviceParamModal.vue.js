import { computed, reactive } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';
const props = defineProps();
const emit = defineEmits(['save', 'close']);
const deviceStore = useDeviceStore();
const visible = defineModel('visible');
// 获取设备属性
const device = computed(() => deviceStore.getDeviceById(props.pass.deviceId));
// 表单数据初始化
const formData = reactive(device.value?.attributes.reduce((acc, attr) => {
    acc[attr.name] = props.pass.parameters[attr.name] ?? attr.defaultValue;
    return acc;
}, {}) || {});
// 设备属性定义
const deviceAttributes = computed(() => device.value?.attributes || []);
// 保存参数
const handleSave = () => {
    emit('save', formData);
    visible.value = false;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = {};
const __VLS_modelEmit = defineEmits();
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.visible),
    title: (`设备参数配置 - ${__VLS_ctx.device?.name}`),
    width: "600px",
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.visible),
    title: (`设备参数配置 - ${__VLS_ctx.device?.name}`),
    width: "600px",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_5 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    model: (__VLS_ctx.formData),
}));
const __VLS_7 = __VLS_6({
    model: (__VLS_ctx.formData),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
for (const [attr] of __VLS_getVForSourceType((__VLS_ctx.deviceAttributes))) {
    const __VLS_9 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
        key: (attr.name),
        label: (attr.name),
        rules: ({ required: attr.required }),
    }));
    const __VLS_11 = __VLS_10({
        key: (attr.name),
        label: (attr.name),
        rules: ({ required: attr.required }),
    }, ...__VLS_functionalComponentArgsRest(__VLS_10));
    __VLS_12.slots.default;
    if (attr.type === 'number') {
        const __VLS_13 = {}.ElInputNumber;
        /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
            modelValue: (__VLS_ctx.formData[attr.name]),
            precision: (2),
        }));
        const __VLS_15 = __VLS_14({
            modelValue: (__VLS_ctx.formData[attr.name]),
            precision: (2),
        }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    }
    if (attr.type === 'boolean') {
        const __VLS_17 = {}.ElSwitch;
        /** @type {[typeof __VLS_components.ElSwitch, typeof __VLS_components.elSwitch, ]} */ ;
        // @ts-ignore
        const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
            modelValue: (__VLS_ctx.formData[attr.name]),
        }));
        const __VLS_19 = __VLS_18({
            modelValue: (__VLS_ctx.formData[attr.name]),
        }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    }
    if (attr.type === 'string') {
        const __VLS_21 = {}.ElInput;
        /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
        // @ts-ignore
        const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
            modelValue: (__VLS_ctx.formData[attr.name]),
        }));
        const __VLS_23 = __VLS_22({
            modelValue: (__VLS_ctx.formData[attr.name]),
        }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    }
    var __VLS_12;
}
const __VLS_25 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_27 = __VLS_26({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
let __VLS_29;
let __VLS_30;
let __VLS_31;
const __VLS_32 = {
    onClick: (__VLS_ctx.handleSave)
};
__VLS_28.slots.default;
var __VLS_28;
var __VLS_8;
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            visible: visible,
            device: device,
            formData: formData,
            deviceAttributes: deviceAttributes,
            handleSave: handleSave,
        };
    },
    emits: {
        ...{},
        ...{},
    },
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    emits: {
        ...{},
        ...{},
    },
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=DeviceParamModal.vue.js.map