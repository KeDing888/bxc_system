import { reactive } from 'vue';
import { useLayoutStore } from '@/stores/processLayoutStore';
import { useDeviceStore } from '@/stores/deviceStore';
import { ElMessage } from 'element-plus';
const store = useLayoutStore();
const deviceStore = useDeviceStore();
// 表单数据初始化
const formData = reactive({
    name: '',
    passes: Array(17).fill(null).map((_, i) => ({
        order: i + 1,
        deviceId: '',
        startX: 0,
        endX: 0
    }))
});
// 设备选择处理
const handleDeviceChange = (index) => {
    const prevEndX = index > 0 ? formData.passes[index - 1].endX : 0;
    formData.passes[index].startX = prevEndX + 50; // 间距
    formData.passes[index].endX = formData.passes[index].startX + 200; // 设备宽度
};
// 移除道次
const removePass = (index) => {
    if (formData.passes.length <= 1) {
        ElMessage.warning('至少保留一个道次');
        return;
    }
    formData.passes.splice(index, 1);
    // 更新后续道次的 order 和 X 坐标
    formData.passes.forEach((pass, i) => {
        pass.order = i + 1;
        if (i > 0) {
            pass.startX = formData.passes[i - 1].endX + 50;
            pass.endX = pass.startX + 200;
        }
    });
};
// 添加道次
const addPass = () => {
    const lastPass = formData.passes[formData.passes.length - 1];
    formData.passes.push({
        order: formData.passes.length + 1,
        deviceId: '',
        startX: lastPass ? lastPass.endX + 50 : 0,
        endX: lastPass ? lastPass.endX + 250 : 200
    });
};
// 生成布局
const handleGenerate = async () => {
    if (!formData.name) {
        ElMessage.error('请输入布局名称');
        return;
    }
    await store.generateLayout(formData);
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['pass-header']} */ ;
/** @type {__VLS_StyleScopedClasses['form-item-inline']} */ ;
/** @type {__VLS_StyleScopedClasses['form-item-inline']} */ ;
/** @type {__VLS_StyleScopedClasses['pass-row']} */ ;
/** @type {__VLS_StyleScopedClasses['pass-row']} */ ;
/** @type {__VLS_StyleScopedClasses['pass-row']} */ ;
/** @type {__VLS_StyleScopedClasses['el-input-number']} */ ;
// CSS variable injection 
// CSS variable injection end 
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
const __VLS_5 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    label: "布局名称",
    required: true,
}));
const __VLS_7 = __VLS_6({
    label: "布局名称",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    modelValue: (__VLS_ctx.formData.name),
}));
const __VLS_11 = __VLS_10({
    modelValue: (__VLS_ctx.formData.name),
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
var __VLS_8;
for (const [pass] of __VLS_getVForSourceType((__VLS_ctx.formData.passes.length))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (pass),
        ...{ class: "pass-config" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pass-header" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
    (pass);
    if (pass > 1) {
        const __VLS_13 = {}.ElButton;
        /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
        // @ts-ignore
        const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
            ...{ 'onClick': {} },
            type: "danger",
            size: "small",
        }));
        const __VLS_15 = __VLS_14({
            ...{ 'onClick': {} },
            type: "danger",
            size: "small",
        }, ...__VLS_functionalComponentArgsRest(__VLS_14));
        let __VLS_17;
        let __VLS_18;
        let __VLS_19;
        const __VLS_20 = {
            onClick: (...[$event]) => {
                if (!(pass > 1))
                    return;
                __VLS_ctx.removePass(pass - 1);
            }
        };
        __VLS_16.slots.default;
        var __VLS_16;
    }
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "pass-row" },
    });
    const __VLS_21 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        label: "选择设备",
        ...{ class: "form-item-inline" },
    }));
    const __VLS_23 = __VLS_22({
        label: "选择设备",
        ...{ class: "form-item-inline" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    __VLS_24.slots.default;
    const __VLS_25 = {}.ElSelect;
    /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        ...{ 'onChange': {} },
        modelValue: (__VLS_ctx.formData.passes[pass - 1].deviceId),
        placeholder: "请选择设备",
    }));
    const __VLS_27 = __VLS_26({
        ...{ 'onChange': {} },
        modelValue: (__VLS_ctx.formData.passes[pass - 1].deviceId),
        placeholder: "请选择设备",
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    let __VLS_29;
    let __VLS_30;
    let __VLS_31;
    const __VLS_32 = {
        onChange: (...[$event]) => {
            __VLS_ctx.handleDeviceChange(pass - 1);
        }
    };
    __VLS_28.slots.default;
    for (const [device] of __VLS_getVForSourceType((__VLS_ctx.deviceStore.devices))) {
        const __VLS_33 = {}.ElOption;
        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
        // @ts-ignore
        const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
            key: (device.id),
            label: (device.name),
            value: (device.id),
        }));
        const __VLS_35 = __VLS_34({
            key: (device.id),
            label: (device.name),
            value: (device.id),
        }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    }
    var __VLS_28;
    var __VLS_24;
    const __VLS_37 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
        label: "起始X",
        ...{ class: "form-item-inline" },
    }));
    const __VLS_39 = __VLS_38({
        label: "起始X",
        ...{ class: "form-item-inline" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    __VLS_40.slots.default;
    const __VLS_41 = {}.ElInputNumber;
    /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
        modelValue: (__VLS_ctx.formData.passes[pass - 1].startX),
        precision: (2),
        controls: (false),
    }));
    const __VLS_43 = __VLS_42({
        modelValue: (__VLS_ctx.formData.passes[pass - 1].startX),
        precision: (2),
        controls: (false),
    }, ...__VLS_functionalComponentArgsRest(__VLS_42));
    var __VLS_40;
    const __VLS_45 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({
        label: "结束X",
        ...{ class: "form-item-inline" },
    }));
    const __VLS_47 = __VLS_46({
        label: "结束X",
        ...{ class: "form-item-inline" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_46));
    __VLS_48.slots.default;
    const __VLS_49 = {}.ElInputNumber;
    /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
        modelValue: (__VLS_ctx.formData.passes[pass - 1].endX),
        precision: (2),
        controls: (false),
    }));
    const __VLS_51 = __VLS_50({
        modelValue: (__VLS_ctx.formData.passes[pass - 1].endX),
        precision: (2),
        controls: (false),
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    var __VLS_48;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "actions" },
});
const __VLS_53 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent(__VLS_53, new __VLS_53({
    ...{ 'onClick': {} },
    type: "primary",
    loading: (__VLS_ctx.store.isLoading),
}));
const __VLS_55 = __VLS_54({
    ...{ 'onClick': {} },
    type: "primary",
    loading: (__VLS_ctx.store.isLoading),
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
let __VLS_57;
let __VLS_58;
let __VLS_59;
const __VLS_60 = {
    onClick: (__VLS_ctx.handleGenerate)
};
__VLS_56.slots.default;
var __VLS_56;
const __VLS_61 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent(__VLS_61, new __VLS_61({
    ...{ 'onClick': {} },
    type: "success",
}));
const __VLS_63 = __VLS_62({
    ...{ 'onClick': {} },
    type: "success",
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
let __VLS_65;
let __VLS_66;
let __VLS_67;
const __VLS_68 = {
    onClick: (__VLS_ctx.addPass)
};
__VLS_64.slots.default;
var __VLS_64;
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['pass-config']} */ ;
/** @type {__VLS_StyleScopedClasses['pass-header']} */ ;
/** @type {__VLS_StyleScopedClasses['pass-row']} */ ;
/** @type {__VLS_StyleScopedClasses['form-item-inline']} */ ;
/** @type {__VLS_StyleScopedClasses['form-item-inline']} */ ;
/** @type {__VLS_StyleScopedClasses['form-item-inline']} */ ;
/** @type {__VLS_StyleScopedClasses['actions']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            store: store,
            deviceStore: deviceStore,
            formData: formData,
            handleDeviceChange: handleDeviceChange,
            removePass: removePass,
            addPass: addPass,
            handleGenerate: handleGenerate,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=LayoutForm.vue.js.map