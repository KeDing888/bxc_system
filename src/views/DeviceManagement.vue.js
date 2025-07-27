import { useDeviceStore } from '@/stores/deviceStore';
import DeviceForm from '@/components/DeviceForm.vue';
import { onMounted, ref, computed } from 'vue';
import { DeviceAPI } from '@/api/device';
import { storeToRefs } from 'pinia';
import { Plus } from '@element-plus/icons-vue';
const store = useDeviceStore();
const { devices, importTemplate } = storeToRefs(store);
// 对话框状态控制
const showDialog = ref(false);
const currentDevice = ref(null);
const isEditing = ref(false);
// 确保计算属性在顶层作用域
const templateDownloadLink = computed(() => {
    if (!store.importTemplate)
        return '';
    return window.URL.createObjectURL(store.importTemplate);
});
// 显式暴露给模板（可选，大多数情况下不需要）
const __VLS_exposed = {
    templateDownloadLink
};
defineExpose(__VLS_exposed);
// 初始化模板下载
onMounted(async () => {
    try {
        const response = await DeviceAPI.getImportTemplate();
        store.setImportTemplate(new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }));
    }
    catch (error) {
        console.error('模板下载失败:', error);
    }
});
// 处理表单提交
const handleSubmit = async (formData) => {
    try {
        if (isEditing.value && formData.id) {
            await store.updateDevice(formData);
        }
        else {
            await store.createDevice(formData);
        }
        showDialog.value = false;
        currentDevice.value = null;
    }
    catch (error) {
        console.error('操作失败:', error);
    }
};
// 处理文件导入
const handleFileImport = async (file) => {
    try {
        await store.batchImport(file);
    }
    catch (error) {
        console.error('导入失败:', error);
        throw error;
    }
};
// 打开编辑对话框
const openEditDialog = (device) => {
    currentDevice.value = { ...device };
    isEditing.value = true;
    showDialog.value = true;
};
// 删除设备
const handleDelete = async (id) => {
    try {
        await store.deleteDevice(id);
    }
    catch (error) {
        console.error('删除失败:', error);
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "device-management" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "action-bar" },
});
const __VLS_0 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_4;
let __VLS_5;
let __VLS_6;
const __VLS_7 = {
    onClick: (...[$event]) => {
        __VLS_ctx.showDialog = true;
        __VLS_ctx.isEditing = false;
    }
};
__VLS_3.slots.default;
const __VLS_8 = {}.ElIcon;
/** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({}));
const __VLS_10 = __VLS_9({}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
const __VLS_12 = {}.Plus;
/** @type {[typeof __VLS_components.Plus, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
var __VLS_11;
var __VLS_3;
const __VLS_16 = {}.ElUpload;
/** @type {[typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    showFileList: (false),
    beforeUpload: (__VLS_ctx.handleFileImport),
    accept: ".xlsx,.xls",
}));
const __VLS_18 = __VLS_17({
    showFileList: (false),
    beforeUpload: (__VLS_ctx.handleFileImport),
    accept: ".xlsx,.xls",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.ElButton;
/** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    type: "success",
}));
const __VLS_22 = __VLS_21({
    type: "success",
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
__VLS_23.slots.default;
const __VLS_24 = {}.ElIcon;
/** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
const __VLS_28 = {}.Upload;
/** @type {[typeof __VLS_components.Upload, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({}));
const __VLS_30 = __VLS_29({}, ...__VLS_functionalComponentArgsRest(__VLS_29));
var __VLS_27;
var __VLS_23;
var __VLS_19;
if (__VLS_ctx.store.importTemplate) {
    const __VLS_32 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        href: (__VLS_ctx.templateDownloadLink),
        download: "设备导入模板.xlsx",
    }));
    const __VLS_34 = __VLS_33({
        href: (__VLS_ctx.templateDownloadLink),
        download: "设备导入模板.xlsx",
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    __VLS_35.slots.default;
    const __VLS_36 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
    const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
    __VLS_39.slots.default;
    const __VLS_40 = {}.Download;
    /** @type {[typeof __VLS_components.Download, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({}));
    const __VLS_42 = __VLS_41({}, ...__VLS_functionalComponentArgsRest(__VLS_41));
    var __VLS_39;
    var __VLS_35;
}
const __VLS_44 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
    modelValue: (__VLS_ctx.showDialog),
    title: (__VLS_ctx.isEditing ? '编辑设备信息' : '新增设备登记'),
    width: "600px",
}));
const __VLS_46 = __VLS_45({
    modelValue: (__VLS_ctx.showDialog),
    title: (__VLS_ctx.isEditing ? '编辑设备信息' : '新增设备登记'),
    width: "600px",
}, ...__VLS_functionalComponentArgsRest(__VLS_45));
__VLS_47.slots.default;
/** @type {[typeof DeviceForm, ]} */ ;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent(DeviceForm, new DeviceForm({
    ...{ 'onSubmit': {} },
    ...{ 'onCancel': {} },
    device: (__VLS_ctx.currentDevice || {}),
}));
const __VLS_49 = __VLS_48({
    ...{ 'onSubmit': {} },
    ...{ 'onCancel': {} },
    device: (__VLS_ctx.currentDevice || {}),
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
let __VLS_51;
let __VLS_52;
let __VLS_53;
const __VLS_54 = {
    onSubmit: (__VLS_ctx.handleSubmit)
};
const __VLS_55 = {
    onCancel: (...[$event]) => {
        __VLS_ctx.showDialog = false;
    }
};
var __VLS_50;
var __VLS_47;
const __VLS_56 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
    data: (__VLS_ctx.devices),
    rowKey: "id",
    stripe: true,
    highlightCurrentRow: true,
}));
const __VLS_58 = __VLS_57({
    data: (__VLS_ctx.devices),
    rowKey: "id",
    stripe: true,
    highlightCurrentRow: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_57));
__VLS_59.slots.default;
const __VLS_60 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
    prop: "name",
    label: "设备名称",
    minWidth: "180",
}));
const __VLS_62 = __VLS_61({
    prop: "name",
    label: "设备名称",
    minWidth: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_61));
const __VLS_64 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
    label: "设备图片",
    width: "120",
}));
const __VLS_66 = __VLS_65({
    label: "设备图片",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
__VLS_67.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_67.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    if (row.image) {
        const __VLS_68 = {}.ElImage;
        /** @type {[typeof __VLS_components.ElImage, typeof __VLS_components.elImage, ]} */ ;
        // @ts-ignore
        const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
            src: (row.image),
            previewSrcList: ([row.image]),
            fit: "cover",
            ...{ class: "thumbnail" },
        }));
        const __VLS_70 = __VLS_69({
            src: (row.image),
            previewSrcList: ([row.image]),
            fit: "cover",
            ...{ class: "thumbnail" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
}
var __VLS_67;
const __VLS_72 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    label: "属性配置",
    width: "120",
}));
const __VLS_74 = __VLS_73({
    label: "属性配置",
    width: "120",
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
__VLS_75.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_75.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_76 = {}.ElTag;
    /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
    // @ts-ignore
    const __VLS_77 = __VLS_asFunctionalComponent(__VLS_76, new __VLS_76({
        type: "info",
    }));
    const __VLS_78 = __VLS_77({
        type: "info",
    }, ...__VLS_functionalComponentArgsRest(__VLS_77));
    __VLS_79.slots.default;
    (row.attributes?.length || 0);
    var __VLS_79;
}
var __VLS_75;
const __VLS_80 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({
    label: "最后更新",
    width: "180",
}));
const __VLS_82 = __VLS_81({
    label: "最后更新",
    width: "180",
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
__VLS_83.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_83.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    (new Date(row.updatedAt).toLocaleString());
}
var __VLS_83;
const __VLS_84 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({
    label: "操作",
    width: "200",
    fixed: "right",
}));
const __VLS_86 = __VLS_85({
    label: "操作",
    width: "200",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_85));
__VLS_87.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_87.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_88 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_89 = __VLS_asFunctionalComponent(__VLS_88, new __VLS_88({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
    }));
    const __VLS_90 = __VLS_89({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_89));
    let __VLS_92;
    let __VLS_93;
    let __VLS_94;
    const __VLS_95 = {
        onClick: (...[$event]) => {
            __VLS_ctx.openEditDialog(row);
        }
    };
    __VLS_91.slots.default;
    var __VLS_91;
    const __VLS_96 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({
        ...{ 'onClick': {} },
        type: "danger",
        size: "small",
    }));
    const __VLS_98 = __VLS_97({
        ...{ 'onClick': {} },
        type: "danger",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_97));
    let __VLS_100;
    let __VLS_101;
    let __VLS_102;
    const __VLS_103 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleDelete(row.id);
        }
    };
    __VLS_99.slots.default;
    var __VLS_99;
}
var __VLS_87;
var __VLS_59;
/** @type {__VLS_StyleScopedClasses['device-management']} */ ;
/** @type {__VLS_StyleScopedClasses['action-bar']} */ ;
/** @type {__VLS_StyleScopedClasses['thumbnail']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            DeviceForm: DeviceForm,
            Plus: Plus,
            store: store,
            devices: devices,
            showDialog: showDialog,
            currentDevice: currentDevice,
            isEditing: isEditing,
            templateDownloadLink: templateDownloadLink,
            handleSubmit: handleSubmit,
            handleFileImport: handleFileImport,
            openEditDialog: openEditDialog,
            handleDelete: handleDelete,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {
            ...__VLS_exposed,
        };
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=DeviceManagement.vue.js.map