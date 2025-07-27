import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
const props = defineProps({
    deviceId: String,
    deviceData: Object,
    devices: Array
});
const emit = defineEmits();
const formRef = ref();
const formData = ref({
    name: '',
    image: '',
    attributes: []
});
const showFullView = ref(false);
// 初始化表单
const initForm = (data) => {
    formData.value = {
        name: data.name || '',
        image: data.image || '',
        attributes: data.attributes?.map((attr) => ({
            name: attr.name || '',
            type: attr.type || 'number',
            required: attr.required || false
        })) || []
    };
};
// 监听props变化
watch(() => props.deviceData, (newVal) => {
    if (newVal) {
        initForm(newVal);
    }
}, { immediate: true });
// 添加属性
const addAttribute = () => {
    formData.value.attributes.push({
        name: '',
        type: 'number',
        required: false
    });
};
// 移除属性
const removeAttribute = (index) => {
    formData.value.attributes.splice(index, 1);
};
// 处理图片上传
const handleImageUpload = (file) => {
    const rawFile = file.raw;
    if (!rawFile)
        return;
    // 检查文件类型
    if (!rawFile.type.match('image.*')) {
        ElMessage.error('请选择图片文件');
        return;
    }
    // 检查文件大小（限制为5MB）
    if (rawFile.size > 20 * 1024 * 1024) {
        ElMessage.error('图片大小不能超过5MB');
        return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
        formData.value.image = e.target?.result;
    };
    reader.readAsDataURL(rawFile);
};
// 显示大图
const showFullImage = () => {
    if (formData.value.image) {
        showFullView.value = true;
    }
};
// 清除图片
const clearImage = () => {
    formData.value.image = '';
};
// 提交表单
const submit = () => {
    try {
        // 验证设备名称
        if (!formData.value.name.trim()) {
            throw new Error('设备名称不能为空');
        }
        // 验证属性名称
        for (const attr of formData.value.attributes) {
            if (!attr.name.trim()) {
                throw new Error('所有属性名称必须填写');
            }
        }
        emit('submit', {
            id: props.deviceId,
            name: formData.value.name,
            image: formData.value.image,
            attributes: formData.value.attributes
        });
    }
    catch (error) {
        throw error;
    }
};
const __VLS_exposed = {
    submit,
    initForm
};
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['attribute-row']} */ ;
/** @type {__VLS_StyleScopedClasses['attribute-row']} */ ;
/** @type {__VLS_StyleScopedClasses['attribute-row']} */ ;
// CSS variable injection 
// CSS variable injection end 
const __VLS_0 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    model: (__VLS_ctx.formData),
    ref: "formRef",
    labelWidth: "120px",
}));
const __VLS_2 = __VLS_1({
    model: (__VLS_ctx.formData),
    ref: "formRef",
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
    rules: ([{ required: true, message: '设备名称不能为空', trigger: 'blur' }]),
}));
const __VLS_8 = __VLS_7({
    label: "设备名称",
    prop: "name",
    rules: ([{ required: true, message: '设备名称不能为空', trigger: 'blur' }]),
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
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "image-upload-container" },
});
const __VLS_18 = {}.ElUpload;
/** @type {[typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, ]} */ ;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({
    autoUpload: (false),
    showFileList: (false),
    onChange: (__VLS_ctx.handleImageUpload),
}));
const __VLS_20 = __VLS_19({
    autoUpload: (false),
    showFileList: (false),
    onChange: (__VLS_ctx.handleImageUpload),
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
__VLS_21.slots.default;
const __VLS_22 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_23 = __VLS_asFunctionalComponent(__VLS_22, new __VLS_22({
    type: "primary",
}));
const __VLS_24 = __VLS_23({
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_23));
__VLS_25.slots.default;
var __VLS_25;
var __VLS_21;
if (__VLS_ctx.formData.image) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "image-preview-container" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
        ...{ onClick: (__VLS_ctx.showFullImage) },
        src: (__VLS_ctx.formData.image),
        ...{ class: "preview-image" },
        alt: "设备图片预览",
    });
    const __VLS_26 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
        ...{ 'onClick': {} },
        ...{ class: "clear-button" },
        size: "small",
        type: "danger",
    }));
    const __VLS_28 = __VLS_27({
        ...{ 'onClick': {} },
        ...{ class: "clear-button" },
        size: "small",
        type: "danger",
    }, ...__VLS_functionalComponentArgsRest(__VLS_27));
    let __VLS_30;
    let __VLS_31;
    let __VLS_32;
    const __VLS_33 = {
        onClick: (__VLS_ctx.clearImage)
    };
    __VLS_29.slots.default;
    var __VLS_29;
}
var __VLS_17;
const __VLS_34 = {}.ElDivider;
/** @type {[typeof __VLS_components.ElDivider, typeof __VLS_components.elDivider, typeof __VLS_components.ElDivider, typeof __VLS_components.elDivider, ]} */ ;
// @ts-ignore
const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({}));
const __VLS_36 = __VLS_35({}, ...__VLS_functionalComponentArgsRest(__VLS_35));
__VLS_37.slots.default;
var __VLS_37;
for (const [attr, index] of __VLS_getVForSourceType((__VLS_ctx.formData.attributes))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (index),
        ...{ class: "attribute-item" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "attribute-row" },
    });
    const __VLS_38 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
        label: "属性名称",
        prop: (`attributes[${index}].name`),
        rules: ({ required: true, message: '属性名不能为空', trigger: 'blur' }),
        ...{ class: "attribute-name" },
    }));
    const __VLS_40 = __VLS_39({
        label: "属性名称",
        prop: (`attributes[${index}].name`),
        rules: ({ required: true, message: '属性名不能为空', trigger: 'blur' }),
        ...{ class: "attribute-name" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    __VLS_41.slots.default;
    const __VLS_42 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({
        modelValue: (attr.name),
        placeholder: "请输入属性名",
    }));
    const __VLS_44 = __VLS_43({
        modelValue: (attr.name),
        placeholder: "请输入属性名",
    }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    var __VLS_41;
    const __VLS_46 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
        label: "类型",
        prop: (`attributes[${index}].type`),
        rules: ({ required: true, message: '请选择属性类型', trigger: 'change' }),
        ...{ class: "attribute-type" },
    }));
    const __VLS_48 = __VLS_47({
        label: "类型",
        prop: (`attributes[${index}].type`),
        rules: ({ required: true, message: '请选择属性类型', trigger: 'change' }),
        ...{ class: "attribute-type" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    __VLS_49.slots.default;
    const __VLS_50 = {}.ElSelect;
    /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
    // @ts-ignore
    const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
        modelValue: (attr.type),
    }));
    const __VLS_52 = __VLS_51({
        modelValue: (attr.type),
    }, ...__VLS_functionalComponentArgsRest(__VLS_51));
    __VLS_53.slots.default;
    const __VLS_54 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
        label: "数值",
        value: "number",
    }));
    const __VLS_56 = __VLS_55({
        label: "数值",
        value: "number",
    }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    const __VLS_58 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_59 = __VLS_asFunctionalComponent(__VLS_58, new __VLS_58({
        label: "布尔值",
        value: "boolean",
    }));
    const __VLS_60 = __VLS_59({
        label: "布尔值",
        value: "boolean",
    }, ...__VLS_functionalComponentArgsRest(__VLS_59));
    const __VLS_62 = {}.ElOption;
    /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
    // @ts-ignore
    const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({
        label: "字符串",
        value: "string",
    }));
    const __VLS_64 = __VLS_63({
        label: "字符串",
        value: "string",
    }, ...__VLS_functionalComponentArgsRest(__VLS_63));
    var __VLS_53;
    var __VLS_49;
    const __VLS_66 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({
        label: "必填",
        ...{ class: "attribute-required" },
    }));
    const __VLS_68 = __VLS_67({
        label: "必填",
        ...{ class: "attribute-required" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_67));
    __VLS_69.slots.default;
    const __VLS_70 = {}.ElSwitch;
    /** @type {[typeof __VLS_components.ElSwitch, typeof __VLS_components.elSwitch, ]} */ ;
    // @ts-ignore
    const __VLS_71 = __VLS_asFunctionalComponent(__VLS_70, new __VLS_70({
        modelValue: (attr.required),
    }));
    const __VLS_72 = __VLS_71({
        modelValue: (attr.required),
    }, ...__VLS_functionalComponentArgsRest(__VLS_71));
    var __VLS_69;
    const __VLS_74 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({
        ...{ 'onClick': {} },
        type: "danger",
        ...{ class: "attribute-delete" },
    }));
    const __VLS_76 = __VLS_75({
        ...{ 'onClick': {} },
        type: "danger",
        ...{ class: "attribute-delete" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_75));
    let __VLS_78;
    let __VLS_79;
    let __VLS_80;
    const __VLS_81 = {
        onClick: (...[$event]) => {
            __VLS_ctx.removeAttribute(index);
        }
    };
    __VLS_77.slots.default;
    var __VLS_77;
}
const __VLS_82 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent(__VLS_82, new __VLS_82({
    ...{ 'onClick': {} },
}));
const __VLS_84 = __VLS_83({
    ...{ 'onClick': {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_83));
let __VLS_86;
let __VLS_87;
let __VLS_88;
const __VLS_89 = {
    onClick: (__VLS_ctx.addAttribute)
};
__VLS_85.slots.default;
var __VLS_85;
const __VLS_90 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({
    modelValue: (__VLS_ctx.showFullView),
    title: "图片预览",
    width: "80%",
    top: "5vh",
    customClass: "full-image-dialog",
}));
const __VLS_92 = __VLS_91({
    modelValue: (__VLS_ctx.showFullView),
    title: "图片预览",
    width: "80%",
    top: "5vh",
    customClass: "full-image-dialog",
}, ...__VLS_functionalComponentArgsRest(__VLS_91));
__VLS_93.slots.default;
__VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
    src: (__VLS_ctx.formData.image),
    ...{ class: "full-image" },
});
var __VLS_93;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['image-upload-container']} */ ;
/** @type {__VLS_StyleScopedClasses['image-preview-container']} */ ;
/** @type {__VLS_StyleScopedClasses['preview-image']} */ ;
/** @type {__VLS_StyleScopedClasses['clear-button']} */ ;
/** @type {__VLS_StyleScopedClasses['attribute-item']} */ ;
/** @type {__VLS_StyleScopedClasses['attribute-row']} */ ;
/** @type {__VLS_StyleScopedClasses['attribute-name']} */ ;
/** @type {__VLS_StyleScopedClasses['attribute-type']} */ ;
/** @type {__VLS_StyleScopedClasses['attribute-required']} */ ;
/** @type {__VLS_StyleScopedClasses['attribute-delete']} */ ;
/** @type {__VLS_StyleScopedClasses['full-image']} */ ;
// @ts-ignore
var __VLS_5 = __VLS_4;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            formRef: formRef,
            formData: formData,
            showFullView: showFullView,
            addAttribute: addAttribute,
            removeAttribute: removeAttribute,
            handleImageUpload: handleImageUpload,
            showFullImage: showFullImage,
            clearImage: clearImage,
        };
    },
    __typeEmits: {},
    props: {
        deviceId: String,
        deviceData: Object,
        devices: Array
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    __typeEmits: {},
    props: {
        deviceId: String,
        deviceData: Object,
        devices: Array
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=DeviceForm.vue.js.map