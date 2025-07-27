import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
const props = defineProps();
const emit = defineEmits(['submit']);
const formRef = ref();
const formData = reactive({
    ...props.device,
    attributes: props.device.attributes ? [...props.device.attributes] : []
});
// 新增类型标签映射
const typeLabels = {
    number: '数值型',
    boolean: '布尔型',
    string: '字符串型'
};
// 新增类型显示方法
const getTypeLabel = (type) => {
    return typeLabels[type] || '未知类型';
};
// 文件上传处理（修复版本）
const handleImageUpload = (file) => {
    const rawFile = file.raw;
    if (!rawFile) {
        ElMessage.error('文件读取失败');
        return;
    }
    if (!rawFile.type.startsWith('image/')) {
        ElMessage.error('仅支持图片文件');
        return;
    }
    const reader = new FileReader();
    reader.onload = () => {
        formData.image = reader.result;
    };
    reader.onerror = () => {
        ElMessage.error('图片读取失败');
    };
    reader.readAsDataURL(rawFile);
};
// 提交验证（优化版本）
const handleSubmit = () => {
    formRef.value.validate((valid) => {
        if (valid) {
            // 清理空属性
            const cleanedData = {
                ...formData,
                attributes: formData.attributes?.filter(attr => attr.name && attr.type)
            };
            emit('submit', cleanedData);
        }
        else {
            ElMessage.warning('请完善表单信息');
        }
    });
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['attribute-item']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ref: "formRef",
    model: (__VLS_ctx.formData),
    labelWidth: "120px",
}));
const __VLS_2 = __VLS_1({
    ref: "formRef",
    model: (__VLS_ctx.formData),
    labelWidth: "120px",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {typeof __VLS_ctx.formRef} */ ;
var __VLS_4 = {};
__VLS_3.slots.default;
const __VLS_6 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
    label: "设备名称",
    prop: "name",
    rules: ([{ required: true, message: '设备名称不能为空' }]),
}));
const __VLS_8 = __VLS_7({
    label: "设备名称",
    prop: "name",
    rules: ([{ required: true, message: '设备名称不能为空' }]),
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
__VLS_9.slots.default;
const __VLS_10 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(__VLS_10, new __VLS_10({
    modelValue: (__VLS_ctx.formData.name),
    placeholder: "请输入设备名称",
}));
const __VLS_12 = __VLS_11({
    modelValue: (__VLS_ctx.formData.name),
    placeholder: "请输入设备名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
var __VLS_9;
const __VLS_14 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
    label: "设备图片",
    prop: "image",
}));
const __VLS_16 = __VLS_15({
    label: "设备图片",
    prop: "image",
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
__VLS_17.slots.default;
const __VLS_18 = {}.ElUpload;
/** @type {[typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    autoUpload: (false),
    showFileList: (false),
    onChange: (__VLS_ctx.handleImageUpload),
    accept: "image/*",
}));
const __VLS_20 = __VLS_19({
    autoUpload: (false),
    showFileList: (false),
    onChange: (__VLS_ctx.handleImageUpload),
    accept: "image/*",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
{
    const { trigger: __VLS_thisSlot } = __VLS_21.slots;
    const __VLS_22 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({}));
    const __VLS_24 = __VLS_23({}, ...__VLS_functionalComponentArgsRest(__VLS_23));
    __VLS_25.slots.default;
    var __VLS_25;
}
if (__VLS_ctx.formData.image) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "preview-container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        src: (__VLS_ctx.formData.image),
        ...{ class: "preview-image" },
    });
}
var __VLS_21;
var __VLS_17;
const __VLS_26 = {}.ElDivider;
/** @type {[typeof __VLS_components.ElDivider, typeof __VLS_components.elDivider, typeof __VLS_components.ElDivider, typeof __VLS_components.elDivider, ]} */ ;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({}));
const __VLS_28 = __VLS_27({}, ...__VLS_functionalComponentArgsRest(__VLS_27));
__VLS_29.slots.default;
var __VLS_29;
for (const [attr, index] of __VLS_getVForSourceType((__VLS_ctx.formData.attributes))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (index),
        ...{ class: "attribute-item" },
    });
    const __VLS_30 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({
        prop: (`attributes[${index}].name`),
        rules: ({ required: true, message: '属性名不能为空' }),
    }));
    const __VLS_32 = __VLS_31({
        prop: (`attributes[${index}].name`),
        rules: ({ required: true, message: '属性名不能为空' }),
    }, ...__VLS_functionalComponentArgsRest(__VLS_31));
    __VLS_33.slots.default;
    const __VLS_34 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
        modelValue: (attr.name),
        placeholder: "属性名称",
    }));
    const __VLS_36 = __VLS_35({
        modelValue: (attr.name),
        placeholder: "属性名称",
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    var __VLS_33;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "type-select-group" },
    });
    const __VLS_38 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
        prop: (`attributes[${index}].type`),
        rules: ({ required: true, message: '请选择属性类型' }),
    }));
    const __VLS_40 = __VLS_39({
        prop: (`attributes[${index}].type`),
        rules: ({ required: true, message: '请选择属性类型' }),
    }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    __VLS_41.slots.default;
    const __VLS_42 = {}.ElSelect;
    /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
        modelValue: (attr.type),
        placeholder: "选择类型",
    }));
    const __VLS_44 = __VLS_43({
        modelValue: (attr.type),
        placeholder: "选择类型",
    }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    __VLS_45.slots.default;
    const __VLS_46 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
        label: "数值型",
        value: "number",
    }));
    const __VLS_48 = __VLS_47({
        label: "数值型",
        value: "number",
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    const __VLS_50 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
        label: "布尔型",
        value: "boolean",
    }));
    const __VLS_52 = __VLS_51({
        label: "布尔型",
        value: "boolean",
    }, ...__VLS_functionalComponentArgsRest(__VLS_51));
    const __VLS_54 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
        label: "字符串型",
        value: "string",
    }));
    const __VLS_56 = __VLS_55({
        label: "字符串型",
        value: "string",
    }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    var __VLS_45;
    var __VLS_41;
    const __VLS_58 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
        ...{ 'onClick': {} },
        type: "danger",
    }));
    const __VLS_60 = __VLS_59({
        ...{ 'onClick': {} },
        type: "danger",
    }, ...__VLS_functionalComponentArgsRest(__VLS_59));
    let __VLS_62;
    let __VLS_63;
    let __VLS_64;
    const __VLS_65 = {
        onClick: (...[$event]) => {
            __VLS_ctx.formData.attributes.splice(index, 1);
        }
    };
    __VLS_61.slots.default;
    var __VLS_61;
}
const __VLS_66 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_68 = __VLS_67({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
let __VLS_70;
let __VLS_71;
let __VLS_72;
const __VLS_73 = {
    onClick: (...[$event]) => {
        __VLS_ctx.formData.attributes.push({ name: '', type: 'number' });
    }
};
__VLS_69.slots.default;
var __VLS_69;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-actions" },
});
const __VLS_74 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_76 = __VLS_75({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_75));
let __VLS_78;
let __VLS_79;
let __VLS_80;
const __VLS_81 = {
    onClick: (__VLS_ctx.handleSubmit)
};
__VLS_77.slots.default;
var __VLS_77;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['preview-container']} */ ;
/** @type {__VLS_StyleScopedClasses['preview-image']} */ ;
/** @type {__VLS_StyleScopedClasses['attribute-item']} */ ;
/** @type {__VLS_StyleScopedClasses['type-select-group']} */ ;
/** @type {__VLS_StyleScopedClasses['form-actions']} */ ;
// @ts-ignore
var __VLS_5 = __VLS_4;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            formRef: formRef,
            formData: formData,
            handleImageUpload: handleImageUpload,
            handleSubmit: handleSubmit,
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
//# sourceMappingURL=DeviceForm.vue.js.map