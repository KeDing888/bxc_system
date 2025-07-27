import { ref, nextTick } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import DeviceForm from './DeviceForm.vue';
const devices = ref([]);
const showDialog = ref(false);
const formRef = ref();
const isEditMode = ref(false);
const currentEditId = ref('');
const currentDeviceData = ref(null);
// 添加新设备
const handleAddDevice = () => {
    isEditMode.value = false;
    currentEditId.value = '';
    currentDeviceData.value = null;
    showDialog.value = true;
};
// 编辑设备
const handleEditDevice = (device) => {
    isEditMode.value = true;
    currentEditId.value = device.id;
    currentDeviceData.value = JSON.parse(JSON.stringify({
        ...device,
        attributes: device.attributes.map((attr) => ({
            ...attr,
            required: attr.required || false
        }))
    }));
    showDialog.value = true;
};
// 弹窗打开事件
const handleDialogOpen = () => {
    nextTick(() => {
        if (isEditMode.value && currentDeviceData.value) {
            formRef.value?.initForm(currentDeviceData.value);
        }
    });
};
// 处理表单提交
const handleFormSubmit = (formData) => {
    if (isEditMode.value) {
        // 更新现有设备
        const index = devices.value.findIndex(d => d.id === currentEditId.value);
        if (index !== -1) {
            devices.value[index] = {
                id: currentEditId.value,
                name: formData.name,
                image: formData.image,
                attributes: formData.attributes.map((attr) => ({
                    id: attr.id || `attr_${Date.now()}`,
                    name: attr.name,
                    type: attr.type,
                    required: attr.required || false,
                    value: getDefaultValue(attr.type)
                }))
            };
            ElMessage.success('设备更新成功');
        }
    }
    else {
        // 添加新设备
        devices.value.push({
            id: `device_${Date.now()}`,
            name: formData.name,
            image: formData.image,
            attributes: formData.attributes.map((attr) => ({
                id: `attr_${Date.now()}`,
                name: attr.name,
                type: attr.type,
                required: attr.required || false,
                value: getDefaultValue(attr.type)
            }))
        });
        ElMessage.success('设备添加成功');
    }
    showDialog.value = false;
};
// 保存按钮点击事件
const handleSave = async () => {
    try {
        await formRef.value.submit();
    }
    catch (error) {
        ElMessage.error('请填写完整信息');
    }
};
// 删除设备
const handleDelete = (deviceId) => {
    ElMessageBox.confirm('确定要删除此设备吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        devices.value = devices.value.filter(device => device.id !== deviceId);
        ElMessage.success('删除成功');
    }).catch(() => {
        // 用户点击了取消
    });
};
// 获取属性默认值
const getDefaultValue = (type) => {
    switch (type) {
        case 'number': return 0;
        case 'boolean': return false;
        default: return '';
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['attribute-tag']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "device-list-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "toolbar" },
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
    onClick: (__VLS_ctx.handleAddDevice)
};
__VLS_3.slots.default;
var __VLS_3;
const __VLS_8 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
    data: (__VLS_ctx.devices),
    stripe: true,
    ...{ style: {} },
}));
const __VLS_10 = __VLS_9({
    data: (__VLS_ctx.devices),
    stripe: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
__VLS_11.slots.default;
const __VLS_12 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
    prop: "name",
    label: "设备名称",
    width: "200",
    align: "center",
}));
const __VLS_14 = __VLS_13({
    prop: "name",
    label: "设备名称",
    width: "200",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_13));
__VLS_15.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_15.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "device-name" },
    });
    (row.name);
}
var __VLS_15;
const __VLS_16 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    label: "设备图片",
    width: "150",
    align: "center",
}));
const __VLS_18 = __VLS_17({
    label: "设备图片",
    width: "150",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_19.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    if (row.image) {
        const __VLS_20 = {}.ElImage;
        /** @type {[typeof __VLS_components.ElImage, typeof __VLS_components.elImage, typeof __VLS_components.ElImage, typeof __VLS_components.elImage, ]} */ ;
        // @ts-ignore
        const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
            src: (row.image),
            fit: "cover",
            ...{ class: "device-image" },
        }));
        const __VLS_22 = __VLS_21({
            src: (row.image),
            fit: "cover",
            ...{ class: "device-image" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_21));
        __VLS_23.slots.default;
        {
            const { error: __VLS_thisSlot } = __VLS_23.slots;
            __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: "image-error" },
            });
        }
        var __VLS_23;
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "no-image" },
        });
    }
}
var __VLS_19;
const __VLS_24 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
    label: "属性配置",
    align: "center",
}));
const __VLS_26 = __VLS_25({
    label: "属性配置",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_25));
__VLS_27.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_27.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    for (const [attr] of __VLS_getVForSourceType((row.attributes))) {
        const __VLS_28 = {}.ElTag;
        /** @type {[typeof __VLS_components.ElTag, typeof __VLS_components.elTag, typeof __VLS_components.ElTag, typeof __VLS_components.elTag, ]} */ ;
        // @ts-ignore
        const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
            key: (attr.id),
            type: "info",
            ...{ class: "attribute-tag" },
        }));
        const __VLS_30 = __VLS_29({
            key: (attr.id),
            type: "info",
            ...{ class: "attribute-tag" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_29));
        __VLS_31.slots.default;
        (attr.name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: "attribute-type" },
        });
        (attr.type);
        if (attr.required) {
            const __VLS_32 = {}.ElIcon;
            /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
            // @ts-ignore
            const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
                ...{ class: "required-star" },
            }));
            const __VLS_34 = __VLS_33({
                ...{ class: "required-star" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_33));
            __VLS_35.slots.default;
            const __VLS_36 = {}.StarFilled;
            /** @type {[typeof __VLS_components.StarFilled, ]} */ ;
            // @ts-ignore
            const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({}));
            const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
            var __VLS_35;
        }
        var __VLS_31;
    }
}
var __VLS_27;
const __VLS_40 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
    label: "操作",
    width: "180",
    align: "center",
}));
const __VLS_42 = __VLS_41({
    label: "操作",
    width: "180",
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_41));
__VLS_43.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_43.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_44 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
    }));
    const __VLS_46 = __VLS_45({
        ...{ 'onClick': {} },
        type: "primary",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    let __VLS_48;
    let __VLS_49;
    let __VLS_50;
    const __VLS_51 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleEditDevice(row);
        }
    };
    __VLS_47.slots.default;
    var __VLS_47;
    const __VLS_52 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_53 = __VLS_asFunctionalComponent(__VLS_52, new __VLS_52({
        ...{ 'onClick': {} },
        type: "danger",
        size: "small",
    }));
    const __VLS_54 = __VLS_53({
        ...{ 'onClick': {} },
        type: "danger",
        size: "small",
    }, ...__VLS_functionalComponentArgsRest(__VLS_53));
    let __VLS_56;
    let __VLS_57;
    let __VLS_58;
    const __VLS_59 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleDelete(row.id);
        }
    };
    __VLS_55.slots.default;
    var __VLS_55;
}
var __VLS_43;
var __VLS_11;
if (__VLS_ctx.devices.length === 0) {
    const __VLS_60 = {}.ElEmpty;
    /** @type {[typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, typeof __VLS_components.ElEmpty, typeof __VLS_components.elEmpty, ]} */ ;
    // @ts-ignore
    const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({
        description: "暂无设备数据",
    }));
    const __VLS_62 = __VLS_61({
        description: "暂无设备数据",
    }, ...__VLS_functionalComponentArgsRest(__VLS_61));
    __VLS_63.slots.default;
    const __VLS_64 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_65 = __VLS_asFunctionalComponent(__VLS_64, new __VLS_64({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_66 = __VLS_65({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_65));
    let __VLS_68;
    let __VLS_69;
    let __VLS_70;
    const __VLS_71 = {
        onClick: (__VLS_ctx.handleAddDevice)
    };
    __VLS_67.slots.default;
    var __VLS_67;
    var __VLS_63;
}
const __VLS_72 = {}.ElDialog;
/** @type {[typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ]} */ ;
// @ts-ignore
const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
    ...{ 'onOpen': {} },
    modelValue: (__VLS_ctx.showDialog),
    title: (__VLS_ctx.isEditMode ? '编辑设备' : '添加新设备'),
    width: "50%",
    closeOnClickModal: (false),
}));
const __VLS_74 = __VLS_73({
    ...{ 'onOpen': {} },
    modelValue: (__VLS_ctx.showDialog),
    title: (__VLS_ctx.isEditMode ? '编辑设备' : '添加新设备'),
    width: "50%",
    closeOnClickModal: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_73));
let __VLS_76;
let __VLS_77;
let __VLS_78;
const __VLS_79 = {
    onOpen: (__VLS_ctx.handleDialogOpen)
};
__VLS_75.slots.default;
/** @type {[typeof DeviceForm, ]} */ ;
// @ts-ignore
const __VLS_80 = __VLS_asFunctionalComponent(DeviceForm, new DeviceForm({
    ...{ 'onSubmit': {} },
    ref: "formRef",
    key: (__VLS_ctx.isEditMode ? 'edit-' + __VLS_ctx.currentEditId : 'add'),
    deviceId: (__VLS_ctx.currentEditId),
    deviceData: (__VLS_ctx.currentDeviceData),
    devices: (__VLS_ctx.devices),
}));
const __VLS_81 = __VLS_80({
    ...{ 'onSubmit': {} },
    ref: "formRef",
    key: (__VLS_ctx.isEditMode ? 'edit-' + __VLS_ctx.currentEditId : 'add'),
    deviceId: (__VLS_ctx.currentEditId),
    deviceData: (__VLS_ctx.currentDeviceData),
    devices: (__VLS_ctx.devices),
}, ...__VLS_functionalComponentArgsRest(__VLS_80));
let __VLS_83;
let __VLS_84;
let __VLS_85;
const __VLS_86 = {
    onSubmit: (__VLS_ctx.handleFormSubmit)
};
/** @type {typeof __VLS_ctx.formRef} */ ;
var __VLS_87 = {};
var __VLS_82;
{
    const { footer: __VLS_thisSlot } = __VLS_75.slots;
    __VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: "dialog-footer" },
    });
    const __VLS_89 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_90 = __VLS_asFunctionalComponent(__VLS_89, new __VLS_89({
        ...{ 'onClick': {} },
    }));
    const __VLS_91 = __VLS_90({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_90));
    let __VLS_93;
    let __VLS_94;
    let __VLS_95;
    const __VLS_96 = {
        onClick: (...[$event]) => {
            __VLS_ctx.showDialog = false;
        }
    };
    __VLS_92.slots.default;
    var __VLS_92;
    const __VLS_97 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_98 = __VLS_asFunctionalComponent(__VLS_97, new __VLS_97({
        ...{ 'onClick': {} },
        type: "primary",
    }));
    const __VLS_99 = __VLS_98({
        ...{ 'onClick': {} },
        type: "primary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_98));
    let __VLS_101;
    let __VLS_102;
    let __VLS_103;
    const __VLS_104 = {
        onClick: (__VLS_ctx.handleSave)
    };
    __VLS_100.slots.default;
    (__VLS_ctx.isEditMode ? '更新' : '保存');
    var __VLS_100;
}
var __VLS_75;
/** @type {__VLS_StyleScopedClasses['device-list-container']} */ ;
/** @type {__VLS_StyleScopedClasses['toolbar']} */ ;
/** @type {__VLS_StyleScopedClasses['device-name']} */ ;
/** @type {__VLS_StyleScopedClasses['device-image']} */ ;
/** @type {__VLS_StyleScopedClasses['image-error']} */ ;
/** @type {__VLS_StyleScopedClasses['no-image']} */ ;
/** @type {__VLS_StyleScopedClasses['attribute-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['attribute-type']} */ ;
/** @type {__VLS_StyleScopedClasses['required-star']} */ ;
/** @type {__VLS_StyleScopedClasses['dialog-footer']} */ ;
// @ts-ignore
var __VLS_88 = __VLS_87;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            DeviceForm: DeviceForm,
            devices: devices,
            showDialog: showDialog,
            formRef: formRef,
            isEditMode: isEditMode,
            currentEditId: currentEditId,
            currentDeviceData: currentDeviceData,
            handleAddDevice: handleAddDevice,
            handleEditDevice: handleEditDevice,
            handleDialogOpen: handleDialogOpen,
            handleFormSubmit: handleFormSubmit,
            handleSave: handleSave,
            handleDelete: handleDelete,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=DeviceList.vue.js.map