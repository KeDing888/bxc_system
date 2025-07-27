import { reactive, ref, computed, watch, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import LayoutCanvas from './LayoutCanvas.vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
const router = useRouter();
const route = useRoute();
// 设备图片配置
const deviceImages = [
    '/device-images/中轧飞剪.png',
    '/device-images/粗轧机.png',
    '/device-images/定径机.png',
    '/device-images/废料收集.png',
    '/device-images/辊道_出炉.png',
    '/device-images/辊道_短.png',
    '/device-images/辊道_长.png',
    '/device-images/活套.png',
    '/device-images/加热炉.png',
    '/device-images/夹送辊.png',
    '/device-images/冷却设备.png',
    '/device-images/吐丝机.png',
    '/device-images/预精轧机_常规.png',
    '/device-images/预精轧机_短应力线.png',
    '/device-images/中轧机.png'
];
// 设备元数据
const deviceMetadata = reactive([
    { id: 1, name: '中轧飞剪', widthRatio: 2.4 },
    { id: 2, name: '粗轧机', widthRatio: 0.9 },
    { id: 3, name: '定径机', widthRatio: 0.8 },
    { id: 4, name: '废料收集', widthRatio: 1.5 },
    { id: 5, name: '辊道_出炉', widthRatio: 1.0 },
    { id: 6, name: '辊道_短', widthRatio: 1.8 },
    { id: 7, name: '辊道_长', widthRatio: 0.7 },
    { id: 8, name: '活套', widthRatio: 0.5 },
    { id: 9, name: '加热炉', widthRatio: 0.9 },
    { id: 10, name: '夹送辊', widthRatio: 1.0 },
    { id: 11, name: '冷却设备', widthRatio: 1.8 },
    { id: 12, name: '吐丝机', widthRatio: 0.7 },
    { id: 13, name: '预精轧机_常规', widthRatio: 0.5 },
    { id: 14, name: '预精轧机_短应力线', widthRatio: 0.9 },
    { id: 15, name: '中轧机', widthRatio: 0.9 },
]);
// 修改表单初始化逻辑
const form = reactive({
    id: '',
    name: '',
    passes: []
});
// 加载已有布局数据
const loadLayoutData = () => {
    if (route.query.data) {
        try {
            const layoutData = JSON.parse(decodeURIComponent(route.query.data));
            form.id = layoutData.id;
            form.name = layoutData.name;
            form.passes = layoutData.passes.map(pass => ({
                deviceId: deviceMetadata.findIndex(d => d.name === pass.meta.name),
                startX: pass.startX,
                endX: pass.endX
            }));
        }
        catch (e) {
            console.error('解析布局数据失败:', e);
        }
    }
};
// 修改提交逻辑
const submit = async () => {
    if (!form.name.trim()) {
        ElMessage.error('请输入布局名称');
        return;
    }
    try {
        await canvasRef.value?.generateLayout();
        const layouts = JSON.parse(localStorage.getItem('layoutList') || '[]');
        const existingIndex = layouts.findIndex(l => l.id === form.id);
        const newLayout = {
            id: form.id || Date.now().toString(),
            name: form.name,
            passes: processedPasses.value,
            createdAt: form.id ? layouts[existingIndex].createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        if (existingIndex >= 0) {
            layouts[existingIndex] = newLayout;
        }
        else {
            layouts.push(newLayout);
        }
        localStorage.setItem('layoutList', JSON.stringify(layouts));
        ElMessage.success('布局保存成功');
        router.push('/layout');
    }
    catch (error) {
        ElMessage.error('布局生成失败: ' + error.message);
    }
};
// 初始化时加载数据
onMounted(() => {
    loadLayoutData();
});
// 处理后的道次数据
const processedPasses = computed(() => {
    return form.passes.map((pass, index) => ({
        ...pass,
        order: index + 1,
        imageUrl: deviceImages[pass.deviceId],
        meta: deviceMetadata[pass.deviceId]
    }));
});
// 画布组件引用
const canvasRef = ref();
// 添加道次
const addPass = () => {
    const nextDeviceId = form.passes.length % deviceImages.length;
    const prevEndX = form.passes.length > 0 ? form.passes[form.passes.length - 1].endX : 0;
    form.passes.push({
        deviceId: nextDeviceId,
        startX: prevEndX,
        endX: prevEndX + 200 // 增加默认长度
    });
};
// 移除道次
const removePass = (index) => {
    form.passes.splice(index, 1);
};
// 重置表单
const resetForm = () => {
    form.name = '';
    form.passes = [];
    canvasRef.value?.clearCanvas();
};
// 保存布局到本地
const saveLayoutToLocal = () => {
    const layouts = JSON.parse(localStorage.getItem('layoutList') || '[]');
    const newLayout = {
        id: Date.now().toString(),
        name: form.name,
        passes: processedPasses.value,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    layouts.push(newLayout);
    localStorage.setItem('layoutList', JSON.stringify(layouts));
};
// 监听道次变化
watch(() => form.passes, () => {
    nextTick(() => canvasRef.value?.generateLayout());
}, { deep: true });
const goBack = () => {
    router.push('/layout');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "layout-creator-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "preview-section" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({});
/** @type {[typeof LayoutCanvas, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(LayoutCanvas, new LayoutCanvas({
    passes: (__VLS_ctx.processedPasses),
    ref: "canvasRef",
}));
const __VLS_1 = __VLS_0({
    passes: (__VLS_ctx.processedPasses),
    ref: "canvasRef",
}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {typeof __VLS_ctx.canvasRef} */ ;
var __VLS_3 = {};
var __VLS_2;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "form-section" },
});
const __VLS_5 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent(__VLS_5, new __VLS_5({
    model: (__VLS_ctx.form),
    labelWidth: "120px",
}));
const __VLS_7 = __VLS_6({
    model: (__VLS_ctx.form),
    labelWidth: "120px",
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
__VLS_8.slots.default;
const __VLS_9 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
    label: "布局名称",
    required: true,
}));
const __VLS_11 = __VLS_10({
    label: "布局名称",
    required: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_10));
__VLS_12.slots.default;
const __VLS_13 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({
    modelValue: (__VLS_ctx.form.name),
    placeholder: "输入布局名称",
}));
const __VLS_15 = __VLS_14({
    modelValue: (__VLS_ctx.form.name),
    placeholder: "输入布局名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
var __VLS_12;
for (const [pass, index] of __VLS_getVForSourceType((__VLS_ctx.form.passes))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: (index),
        ...{ class: "pass-item" },
    });
    const __VLS_17 = {}.ElDivider;
    /** @type {[typeof __VLS_components.ElDivider, typeof __VLS_components.elDivider, typeof __VLS_components.ElDivider, typeof __VLS_components.elDivider, ]} */ ;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent(__VLS_17, new __VLS_17({}));
    const __VLS_19 = __VLS_18({}, ...__VLS_functionalComponentArgsRest(__VLS_18));
    __VLS_20.slots.default;
    (index + 1);
    var __VLS_20;
    const __VLS_21 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
        label: "选择设备",
        required: true,
    }));
    const __VLS_23 = __VLS_22({
        label: "选择设备",
        required: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    __VLS_24.slots.default;
    const __VLS_25 = {}.ElSelect;
    /** @type {[typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ]} */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({
        modelValue: (pass.deviceId),
        placeholder: "选择设备",
        ...{ style: {} },
    }));
    const __VLS_27 = __VLS_26({
        modelValue: (pass.deviceId),
        placeholder: "选择设备",
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_28.slots.default;
    for (const [device, idx] of __VLS_getVForSourceType((__VLS_ctx.deviceMetadata))) {
        const __VLS_29 = {}.ElOption;
        /** @type {[typeof __VLS_components.ElOption, typeof __VLS_components.elOption, typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ]} */ ;
        // @ts-ignore
        const __VLS_30 = __VLS_asFunctionalComponent(__VLS_29, new __VLS_29({
            key: (idx),
            label: (device.name),
            value: (idx),
        }));
        const __VLS_31 = __VLS_30({
            key: (idx),
            label: (device.name),
            value: (idx),
        }, ...__VLS_functionalComponentArgsRest(__VLS_30));
        __VLS_32.slots.default;
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ style: {} },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.img)({
            src: (__VLS_ctx.deviceImages[idx]),
            ...{ style: {} },
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
        (device.name);
        var __VLS_32;
    }
    var __VLS_28;
    var __VLS_24;
    const __VLS_33 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_34 = __VLS_asFunctionalComponent(__VLS_33, new __VLS_33({
        label: "X轴范围(mm)",
        required: true,
    }));
    const __VLS_35 = __VLS_34({
        label: "X轴范围(mm)",
        required: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_34));
    __VLS_36.slots.default;
    const __VLS_37 = {}.ElInputNumber;
    /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({
        modelValue: (pass.startX),
        min: (index === 0 ? 0 : __VLS_ctx.form.passes[index - 1].endX + 1),
        step: (100),
    }));
    const __VLS_39 = __VLS_38({
        modelValue: (pass.startX),
        min: (index === 0 ? 0 : __VLS_ctx.form.passes[index - 1].endX + 1),
        step: (100),
    }, ...__VLS_functionalComponentArgsRest(__VLS_38));
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ style: {} },
    });
    const __VLS_41 = {}.ElInputNumber;
    /** @type {[typeof __VLS_components.ElInputNumber, typeof __VLS_components.elInputNumber, ]} */ ;
    // @ts-ignore
    const __VLS_42 = __VLS_asFunctionalComponent(__VLS_41, new __VLS_41({
        modelValue: (pass.endX),
        min: (pass.startX + 100),
        step: (100),
    }));
    const __VLS_43 = __VLS_42({
        modelValue: (pass.endX),
        min: (pass.startX + 100),
        step: (100),
    }, ...__VLS_functionalComponentArgsRest(__VLS_42));
    var __VLS_36;
    const __VLS_45 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_46 = __VLS_asFunctionalComponent(__VLS_45, new __VLS_45({}));
    const __VLS_47 = __VLS_46({}, ...__VLS_functionalComponentArgsRest(__VLS_46));
    __VLS_48.slots.default;
    const __VLS_49 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({
        ...{ 'onClick': {} },
        type: "danger",
        disabled: (__VLS_ctx.form.passes.length <= 1),
    }));
    const __VLS_51 = __VLS_50({
        ...{ 'onClick': {} },
        type: "danger",
        disabled: (__VLS_ctx.form.passes.length <= 1),
    }, ...__VLS_functionalComponentArgsRest(__VLS_50));
    let __VLS_53;
    let __VLS_54;
    let __VLS_55;
    const __VLS_56 = {
        onClick: (...[$event]) => {
            __VLS_ctx.removePass(index);
        }
    };
    __VLS_52.slots.default;
    var __VLS_52;
    var __VLS_48;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "action-buttons" },
});
const __VLS_57 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
    ...{ 'onClick': {} },
    type: "primary",
    plain: true,
}));
const __VLS_59 = __VLS_58({
    ...{ 'onClick': {} },
    type: "primary",
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_58));
let __VLS_61;
let __VLS_62;
let __VLS_63;
const __VLS_64 = {
    onClick: (__VLS_ctx.addPass)
};
__VLS_60.slots.default;
var __VLS_60;
const __VLS_65 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_66 = __VLS_asFunctionalComponent(__VLS_65, new __VLS_65({
    ...{ 'onClick': {} },
    plain: true,
}));
const __VLS_67 = __VLS_66({
    ...{ 'onClick': {} },
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_66));
let __VLS_69;
let __VLS_70;
let __VLS_71;
const __VLS_72 = {
    onClick: (__VLS_ctx.resetForm)
};
__VLS_68.slots.default;
var __VLS_68;
const __VLS_73 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent(__VLS_73, new __VLS_73({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_75 = __VLS_74({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
let __VLS_77;
let __VLS_78;
let __VLS_79;
const __VLS_80 = {
    onClick: (__VLS_ctx.submit)
};
__VLS_76.slots.default;
var __VLS_76;
const __VLS_81 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
    ...{ 'onClick': {} },
    plain: true,
}));
const __VLS_83 = __VLS_82({
    ...{ 'onClick': {} },
    plain: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
let __VLS_85;
let __VLS_86;
let __VLS_87;
const __VLS_88 = {
    onClick: (__VLS_ctx.goBack)
};
__VLS_84.slots.default;
var __VLS_84;
var __VLS_8;
/** @type {__VLS_StyleScopedClasses['layout-creator-container']} */ ;
/** @type {__VLS_StyleScopedClasses['preview-section']} */ ;
/** @type {__VLS_StyleScopedClasses['form-section']} */ ;
/** @type {__VLS_StyleScopedClasses['pass-item']} */ ;
/** @type {__VLS_StyleScopedClasses['action-buttons']} */ ;
// @ts-ignore
var __VLS_4 = __VLS_3;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            LayoutCanvas: LayoutCanvas,
            deviceImages: deviceImages,
            deviceMetadata: deviceMetadata,
            form: form,
            submit: submit,
            processedPasses: processedPasses,
            canvasRef: canvasRef,
            addPass: addPass,
            removePass: removePass,
            resetForm: resetForm,
            goBack: goBack,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=LayoutCreator.vue.js.map