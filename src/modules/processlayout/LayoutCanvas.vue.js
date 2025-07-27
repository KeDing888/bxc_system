import { ref, reactive, watch, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus';
const props = defineProps();
const emit = defineEmits(['update:passes']);
// 画布尺寸
const width = 3000;
const height = 260;
const canvasEl = ref();
// 弹窗相关状态
const dialogVisible = ref(false);
const currentDevice = ref(null);
const editForm = reactive({
    name: ''
});
// 设备参数配置
// 在script setup部分添加完整的设备参数配置
const deviceParamsConfig = {
    // 中轧飞剪
    0: {
        name: '中轧飞剪',
        params: [
            { label: '剪切力(kN)', prop: 'shearForce', type: 'number', min: 100, max: 500, step: 10 },
            { label: '剪切频率(次/min)', prop: 'frequency', type: 'number', min: 1, max: 30, step: 1 },
            { label: '刀片间隙(mm)', prop: 'bladeGap', type: 'number', min: 0.1, max: 5, step: 0.1 },
            { label: '冷却水流量(L/min)', prop: 'waterFlow', type: 'number', min: 0, max: 100, step: 5 },
            { label: '最大剪切断面(mm²)', prop: 'maxSection', type: 'number', min: 100, max: 2000, step: 50 }
        ]
    },
    // 粗轧机
    1: {
        name: '粗轧机',
        params: [
            { label: '轧制力(kN)', prop: 'rollingForce', type: 'number', min: 1000, max: 10000, step: 100 },
            { label: '轧制速度(m/s)', prop: 'rollingSpeed', type: 'number', min: 0.1, max: 5, step: 0.1 },
            { label: '辊径(mm)', prop: 'rollDiameter', type: 'number', min: 300, max: 1000, step: 10 },
            { label: '压下量(mm)', prop: 'reduction', type: 'number', min: 1, max: 50, step: 1 },
            { label: '电机功率(kW)', prop: 'motorPower', type: 'number', min: 100, max: 5000, step: 50 }
        ]
    },
    //定径机
    2: {
        name: '定径机',
        params: [
            { label: '轧制力(kN)', prop: 'rollingForce', type: 'number', min: 500, max: 5000, step: 50 },
            { label: '轧制速度(m/s)', prop: 'speed', type: 'number', min: 0.5, max: 10, step: 0.1 },
            { label: '辊缝(mm)', prop: 'rollGap', type: 'number', min: 0.1, max: 20, step: 0.1 },
            { label: '冷却水压力(MPa)', prop: 'waterPressure', type: 'number', min: 0.1, max: 5, step: 0.1 },
            { label: '成品尺寸(mm)', prop: 'productSize', type: 'number', min: 5, max: 100, step: 0.5 }
        ]
    },
    // 废料收集
    3: {
        name: '废料收集',
        params: [
            { label: '收集容量(kg)', prop: 'capacity', type: 'number', min: 100, max: 5000, step: 50 },
            { label: '传送速度(m/s)', prop: 'conveyorSpeed', type: 'number', min: 0.1, max: 2, step: 0.1 },
            { label: '压缩比', prop: 'compressionRatio', type: 'number', min: 1, max: 10, step: 0.5 },
            { label: '电机功率(kW)', prop: 'motorPower', type: 'number', min: 5, max: 100, step: 5 }
        ]
    },
    // 辊道_出炉
    4: {
        name: '辊道_出炉',
        params: [
            { label: '辊速(m/s)', prop: 'speed', type: 'number', min: 0.1, max: 3, step: 0.1 },
            { label: '倾斜角度(°)', prop: 'angle', type: 'number', min: 0, max: 30, step: 1 },
            { label: '冷却水流量(L/min)', prop: 'waterFlow', type: 'number', min: 0, max: 200, step: 5 },
            { label: '表面温度(°C)', prop: 'surfaceTemp', type: 'number', min: 50, max: 500, step: 10 }
        ]
    },
    // 辊道_短
    5: {
        name: '辊道_短',
        params: [
            { label: '辊速(m/s)', prop: 'speed', type: 'number', min: 0.1, max: 5, step: 0.1 },
            { label: '辊径(mm)', prop: 'diameter', type: 'number', min: 100, max: 500, step: 10 },
            { label: '加速时间(s)', prop: 'accelTime', type: 'number', min: 0.1, max: 10, step: 0.1 },
            { label: '制动距离(mm)', prop: 'brakeDistance', type: 'number', min: 100, max: 2000, step: 50 }
        ]
    },
    // 辊道_长
    6: {
        name: '辊道_长',
        params: [
            { label: '辊速(m/s)', prop: 'speed', type: 'number', min: 0.1, max: 5, step: 0.1 },
            { label: '辊距(mm)', prop: 'rollGap', type: 'number', min: 500, max: 3000, step: 50 },
            { label: '承载能力(kg)', prop: 'loadCapacity', type: 'number', min: 100, max: 5000, step: 50 },
            { label: '电机功率(kW)', prop: 'motorPower', type: 'number', min: 5, max: 100, step: 5 }
        ]
    },
    // 活套
    7: {
        name: '活套',
        params: [
            { label: '最大套量(m)', prop: 'maxLoop', type: 'number', min: 1, max: 20, step: 0.5 },
            { label: '张力(kN)', prop: 'tension', type: 'number', min: 1, max: 100, step: 1 },
            { label: '升降速度(m/s)', prop: 'liftingSpeed', type: 'number', min: 0.01, max: 1, step: 0.01 },
            { label: '位置控制精度(mm)', prop: 'positionAccuracy', type: 'number', min: 1, max: 50, step: 1 }
        ]
    },
    // 加热炉
    8: {
        name: '加热炉',
        params: [
            { label: '加热温度(°C)', prop: 'heatingTemp', type: 'number', min: 800, max: 1300, step: 10 },
            { label: '均热时间(h)', prop: 'soakingTime', type: 'number', min: 0.5, max: 5, step: 0.5 },
            { label: '出炉温度(°C)', prop: 'outTemp', type: 'number', min: 800, max: 1200, step: 10 },
            { label: '燃料类型', prop: 'fuelType', type: 'select', options: ['天然气', '煤气', '电加热'] },
            { label: '加热区数', prop: 'heatingZones', type: 'number', min: 1, max: 10, step: 1 },
            { label: '空燃比', prop: 'airFuelRatio', type: 'number', min: 1, max: 20, step: 0.1 }
        ]
    },
    // 夹送辊
    9: {
        name: '夹送辊',
        params: [
            { label: '夹紧力(kN)', prop: 'clampingForce', type: 'number', min: 1, max: 100, step: 1 },
            { label: '线速度(m/s)', prop: 'speed', type: 'number', min: 0.1, max: 5, step: 0.1 },
            { label: '辊缝(mm)', prop: 'gap', type: 'number', min: 0.1, max: 50, step: 0.1 },
            { label: '对中精度(mm)', prop: 'centeringAccuracy', type: 'number', min: 0.1, max: 5, step: 0.1 }
        ]
    },
    // 冷却设备
    10: {
        name: '冷却设备',
        params: [
            { label: '水压(MPa)', prop: 'waterPressure', type: 'number', min: 0.1, max: 5, step: 0.1 },
            { label: '水量(m³/h)', prop: 'waterFlow', type: 'number', min: 1, max: 100, step: 1 },
            { label: '冷却速率(°C/s)', prop: 'coolingRate', type: 'number', min: 1, max: 100, step: 1 },
            { label: '喷嘴数量', prop: 'nozzleCount', type: 'number', min: 1, max: 100, step: 1 },
            { label: '冷却区长度(m)', prop: 'coolingLength', type: 'number', min: 1, max: 50, step: 0.5 }
        ]
    },
    // 吐丝机
    11: {
        name: '吐丝机',
        params: [
            { label: '吐丝速度(m/s)', prop: 'coilingSpeed', type: 'number', min: 0.1, max: 5, step: 0.1 },
            { label: '吐丝直径(mm)', prop: 'coilDiameter', type: 'number', min: 100, max: 2000, step: 10 },
            { label: '张力(kN)', prop: 'tension', type: 'number', min: 1, max: 50, step: 1 },
            { label: '导卫间隙(mm)', prop: 'guideGap', type: 'number', min: 0.1, max: 10, step: 0.1 }
        ]
    },
    // 预精轧机_常规
    12: {
        name: '预精轧机_常规',
        params: [
            { label: '轧制力(kN)', prop: 'rollingForce', type: 'number', min: 500, max: 5000, step: 50 },
            { label: '轧制速度(m/s)', prop: 'rollingSpeed', type: 'number', min: 0.5, max: 10, step: 0.1 },
            { label: '辊径(mm)', prop: 'rollDiameter', type: 'number', min: 200, max: 600, step: 10 },
            { label: '张力(kN)', prop: 'tension', type: 'number', min: 1, max: 100, step: 1 },
            { label: '表面粗糙度(μm)', prop: 'surfaceRoughness', type: 'number', min: 0.1, max: 5, step: 0.1 }
        ]
    },
    // 预精轧机_短应力线
    13: {
        name: '预精轧机_短应力线',
        params: [
            { label: '轧制力(kN)', prop: 'rollingForce', type: 'number', min: 500, max: 5000, step: 50 },
            { label: '轧制速度(m/s)', prop: 'rollingSpeed', type: 'number', min: 0.5, max: 10, step: 0.1 },
            { label: '辊径(mm)', prop: 'rollDiameter', type: 'number', min: 200, max: 600, step: 10 },
            { label: '张力(kN)', prop: 'tension', type: 'number', min: 1, max: 100, step: 1 },
            { label: '表面粗糙度(μm)', prop: 'surfaceRoughness', type: 'number', min: 0.1, max: 5, step: 0.1 }
        ]
    },
    // 中轧机
    14: {
        name: '中轧机',
        params: [
            { label: '轧制力(kN)', prop: 'rollingForce', type: 'number', min: 1000, max: 10000, step: 100 },
            { label: '轧制速度(m/s)', prop: 'speed', type: 'number', min: 0.5, max: 8, step: 0.1 },
            { label: '压下率(%)', prop: 'reduction', type: 'number', min: 5, max: 50, step: 1 },
            { label: '辊径(mm)', prop: 'rollDiameter', type: 'number', min: 300, max: 800, step: 10 },
            { label: '冷却水流量(L/min)', prop: 'coolingWater', type: 'number', min: 0, max: 500, step: 10 }
        ]
    }
};
// 当前设备的参数配置
const currentDeviceParams = computed(() => {
    if (!currentDevice.value)
        return [];
    return deviceParamsConfig[currentDevice.value.deviceId]?.params || [];
});
// 图片尺寸缓存
const imageSizeCache = new Map();
// 生成布局
const generateLayout = async () => {
    const ctx = canvasEl.value?.getContext('2d');
    if (!ctx)
        return;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    // 绘制设备（底部对齐）
    for (const pass of props.passes) {
        await drawDeviceImage(ctx, pass);
    }
};
// 绘制设备图片（底部对齐）
const drawDeviceImage = (ctx, pass) => {
    return new Promise(async (resolve) => {
        const img = new Image();
        try {
            // 先尝试从缓存获取尺寸
            let imgWidth = 100;
            let imgHeight = 100;
            if (imageSizeCache.has(pass.imageUrl)) {
                const size = imageSizeCache.get(pass.imageUrl);
                imgWidth = size.width;
                imgHeight = size.height;
            }
            img.onload = () => {
                // 缓存图片尺寸
                imageSizeCache.set(pass.imageUrl, {
                    width: img.width,
                    height: img.height
                });
                const displayWidth = pass.endX - pass.startX;
                const aspectRatio = img.width / img.height;
                const displayHeight = displayWidth / aspectRatio;
                // 底部对齐计算
                const bottomMargin = 20;
                const yPos = height - displayHeight - bottomMargin;
                const clampedYPos = Math.max(0, yPos);
                ctx.drawImage(img, pass.startX, clampedYPos, displayWidth, displayHeight);
                resolve();
            };
            img.onerror = () => {
                console.error('图片加载失败:', pass.imageUrl);
                resolve();
            };
            img.src = pass.imageUrl;
        }
        catch (error) {
            console.error('绘制设备出错:', error);
            resolve();
        }
    });
};
// 处理画布点击事件
const handleCanvasClick = (e) => {
    if (!canvasEl.value)
        return;
    const rect = canvasEl.value.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    // 查找点击的设备
    for (const pass of props.passes) {
        const size = imageSizeCache.get(pass.imageUrl) || { width: 100, height: 100 };
        const aspectRatio = size.width / size.height;
        const displayWidth = pass.endX - pass.startX;
        const displayHeight = displayWidth / aspectRatio;
        const yPos = height - displayHeight - 20;
        if (clickX >= pass.startX &&
            clickX <= pass.endX &&
            clickY >= yPos &&
            clickY <= yPos + displayHeight) {
            openEditDialog(pass);
            return;
        }
    }
};
// 参数验证方法
const validateParam = (param, value) => {
    if (param.type === 'number') {
        const numValue = Number(value);
        if (isNaN(numValue)) {
            return Promise.reject(new Error('请输入有效数字'));
        }
        if (param.min !== undefined && numValue < param.min) {
            return Promise.reject(new Error(`不能小于${param.min}`));
        }
        if (param.max !== undefined && numValue > param.max) {
            return Promise.reject(new Error(`不能大于${param.max}`));
        }
    }
    return Promise.resolve();
};
// 打开编辑弹窗（修改后）
const openEditDialog = (pass) => {
    currentDevice.value = pass;
    // 重置表单
    Object.keys(editForm).forEach(key => delete editForm[key]);
    // 设置设备名称（不可编辑）
    editForm.name = pass.meta?.name || `设备${pass.order}`;
    // 初始化设备参数
    const config = deviceParamsConfig[pass.deviceId];
    if (config) {
        config.params.forEach(param => {
            // 将数值转换为字符串显示
            editForm[param.prop] = String(pass[param.prop] ?? param.min ?? '');
        });
    }
    dialogVisible.value = true;
};
// 保存设备参数（修改后）
const saveDeviceParams = () => {
    if (!currentDevice.value)
        return;
    const updatedPasses = props.passes.map(pass => {
        if (pass.order === currentDevice.value.order) {
            const updatedPass = { ...pass };
            // 更新meta中的设备名称
            updatedPass.meta = {
                ...pass.meta,
                name: editForm.name
            };
            // 更新设备参数（转换回数值）
            currentDeviceParams.value.forEach(param => {
                const value = editForm[param.prop];
                updatedPass[param.prop] = param.type === 'number' ?
                    Number(value) : value;
            });
            return updatedPass;
        }
        return pass;
    });
    emit('update:passes', updatedPasses);
    dialogVisible.value = false;
    ElMessage.success('参数已保存');
};
// 监听数据变化
watch(() => props.passes, generateLayout, { deep: true });
onMounted(() => {
    if (props.passes.length > 0) {
        generateLayout();
    }
});
const __VLS_exposed = { generateLayout };
defineExpose(__VLS_exposed);
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "canvas-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.canvas, __VLS_intrinsicElements.canvas)({
    ...{ onClick: (__VLS_ctx.handleCanvasClick) },
    ref: "canvasEl",
    width: (__VLS_ctx.width),
    height: (__VLS_ctx.height),
});
/** @type {typeof __VLS_ctx.canvasEl} */ ;
const __VLS_0 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.dialogVisible),
    title: (`编辑设备参数 - ${__VLS_ctx.currentDevice?.meta?.name || '设备' + __VLS_ctx.currentDevice?.order}`),
    width: "700px",
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.dialogVisible),
    title: (`编辑设备参数 - ${__VLS_ctx.currentDevice?.meta?.name || '设备' + __VLS_ctx.currentDevice?.order}`),
    width: "700px",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
const __VLS_4 = {}.ElForm;
/** @type {[typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    model: (__VLS_ctx.editForm),
    labelWidth: "160px",
}));
const __VLS_6 = __VLS_5({
    model: (__VLS_ctx.editForm),
    labelWidth: "160px",
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_7.slots.default;
const __VLS_8 = {}.ElFormItem;
/** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    label: "设备名称",
}));
const __VLS_10 = __VLS_9({
    label: "设备名称",
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
const __VLS_12 = {}.ElInput;
/** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    modelValue: (__VLS_ctx.editForm.name),
    disabled: true,
    ...{ class: "disabled-input" },
}));
const __VLS_14 = __VLS_13({
    modelValue: (__VLS_ctx.editForm.name),
    disabled: true,
    ...{ class: "disabled-input" },
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
var __VLS_11;
for (const [param] of __VLS_getVForSourceType((__VLS_ctx.currentDeviceParams))) {
    const __VLS_16 = {}.ElFormItem;
    /** @type {[typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ]} */ ;
    // @ts-ignore
    const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
        label: (param.label),
        prop: (param.prop),
        rules: ({
            validator: (_, value) => __VLS_ctx.validateParam(param, value),
            trigger: 'blur'
        }),
    }));
    const __VLS_18 = __VLS_17({
        label: (param.label),
        prop: (param.prop),
        rules: ({
            validator: (_, value) => __VLS_ctx.validateParam(param, value),
            trigger: 'blur'
        }),
    }, ...__VLS_functionalComponentArgsRest(__VLS_17));
    __VLS_19.slots.default;
    const __VLS_20 = {}.ElInput;
    /** @type {[typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ]} */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        modelValue: (__VLS_ctx.editForm[param.prop]),
        placeholder: (`请输入${param.label}`),
    }));
    const __VLS_22 = __VLS_21({
        modelValue: (__VLS_ctx.editForm[param.prop]),
        placeholder: (`请输入${param.label}`),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    var __VLS_19;
}
var __VLS_7;
{
    const { footer: __VLS_thisSlot } = __VLS_3.slots;
    const __VLS_24 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        ...{ 'onClick': {} },
    }));
    const __VLS_26 = __VLS_25({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    let __VLS_28;
    let __VLS_29;
    let __VLS_30;
    const __VLS_31 = {
        onClick: (...[$event]) => {
            __VLS_ctx.dialogVisible = false;
        }
    };
    __VLS_27.slots.default;
    var __VLS_27;
    const __VLS_32 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_34 = __VLS_33({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    let __VLS_36;
    let __VLS_37;
    let __VLS_38;
    const __VLS_39 = {
        onClick: (__VLS_ctx.saveDeviceParams)
    };
    __VLS_35.slots.default;
    var __VLS_35;
}
var __VLS_3;
/** @type {__VLS_StyleScopedClasses['canvas-container']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled-input']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            width: width,
            height: height,
            canvasEl: canvasEl,
            dialogVisible: dialogVisible,
            currentDevice: currentDevice,
            editForm: editForm,
            currentDeviceParams: currentDeviceParams,
            handleCanvasClick: handleCanvasClick,
            validateParam: validateParam,
            saveDeviceParams: saveDeviceParams,
        };
    },
    emits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
    emits: {},
    __typeProps: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=LayoutCanvas.vue.js.map