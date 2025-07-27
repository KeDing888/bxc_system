import { ref, watch, computed } from 'vue';
import { useLayoutStore } from '@/stores/useLayoutStore';
const props = defineProps();
const emit = defineEmits(['update']);
const store = useLayoutStore();
const visible = ref(true);
const formData = ref({ ...props.pass.attributes });
// 获取设备元数据
const device = computed(() => store.devices.find(d => d.id === props.pass.deviceId));
const deviceName = computed(() => device.value?.name || '');
const attributes = computed(() => device.value?.attributes || []);
// 保存处理
const handleSave = () => {
    emit('update', formData.value);
    visible.value = false;
};
// 监听外部数据变化s
watch(() => props.pass, (newVal) => {
    formData.value = { ...newVal.attributes };
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
const __VLS_0 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.visible),
    title: (`编辑属性 - ${__VLS_ctx.deviceName}`),
    width: "600px",
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.visible),
    title: (`编辑属性 - ${__VLS_ctx.deviceName}`),
    width: "600px",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_4 = {};
__VLS_3.slots.default;
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
for (const [attr] of __VLS_getVForSourceType((__VLS_ctx.attributes))) {
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
    const __VLS_13 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
        modelValue: (__VLS_ctx.formData[attr.name]),
        type: (attr.type === 'number' ? 'number' : 'text'),
        placeholder: (`请输入${attr.name}`),
    }));
    const __VLS_15 = __VLS_14({
        modelValue: (__VLS_ctx.formData[attr.name]),
        type: (attr.type === 'number' ? 'number' : 'text'),
        placeholder: (`请输入${attr.name}`),
    }, ...__VLS_functionalComponentArgsRest(__VLS_14));
    var __VLS_12;
}
var __VLS_8;
{
    const { footer: __VLS_thisSlot } = __VLS_3.slots;
    const __VLS_17 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({
        ...{ 'onClick': {} },
    }));
    const __VLS_19 = __VLS_18({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    let __VLS_21;
    let __VLS_22;
    let __VLS_23;
    const __VLS_24 = {
        onClick: (...[$event]) => {
            __VLS_ctx.visible = false;
        }
    };
    __VLS_20.slots.default;
    var __VLS_20;
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
}
var __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            visible: visible,
            formData: formData,
            deviceName: deviceName,
            attributes: attributes,
            handleSave: handleSave,
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
//# sourceMappingURL=AttributeEditor.vue.js.map