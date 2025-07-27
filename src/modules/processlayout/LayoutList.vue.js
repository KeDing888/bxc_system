import { ref, onMounted } from 'vue'; // 确保这行存在
import { useRouter } from 'vue-router';
import { ElMessage, ElMessageBox } from 'element-plus';
export default (await import('vue')).defineComponent({
    setup() {
        const router = useRouter();
        const layouts = ref([]);
        // 加载本地布局列表
        const loadLayouts = () => {
            const savedData = localStorage.getItem('layoutList');
            layouts.value = savedData ? JSON.parse(savedData) : [];
        };
        // 确认删除对话框
        const handleConfirmDelete = (id) => {
            ElMessageBox.confirm('确定要删除此布局吗？', '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                handleDeleteLayout(id);
            });
        };
        // 删除布局
        const handleDeleteLayout = (id) => {
            layouts.value = layouts.value.filter(layout => layout.id !== id);
            localStorage.setItem('layoutList', JSON.stringify(layouts.value));
            ElMessage.success('删除成功');
        };
        // 新建布局
        const handleCreateNew = () => {
            router.push('/layout/new').catch(err => {
                console.error('路由跳转失败:', err);
                ElMessage.error('无法跳转到创建页面');
            });
        };
        // 编辑布局
        const handleEditLayout = (layout) => {
            router.push({
                path: '/layout/edit',
                query: {
                    data: encodeURIComponent(JSON.stringify(layout))
                }
            });
        };
        // 生命周期钩子
        onMounted(() => {
            loadLayouts();
        });
        return {
            layouts,
            handleCreateNew,
            handleEditLayout,
            handleConfirmDelete
        };
    }
});
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "layout-list" },
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
    onClick: (__VLS_ctx.handleCreateNew)
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
const __VLS_16 = {}.ElTable;
/** @type {[typeof __VLS_components.ElTable, typeof __VLS_components.elTable, typeof __VLS_components.ElTable, typeof __VLS_components.elTable, ]} */ ;
// @ts-ignore
const __VLS_17 = __VLS_asFunctionalComponent(__VLS_16, new __VLS_16({
    data: (__VLS_ctx.layouts),
    stripe: true,
    ...{ style: {} },
}));
const __VLS_18 = __VLS_17({
    data: (__VLS_ctx.layouts),
    stripe: true,
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_17));
__VLS_19.slots.default;
const __VLS_20 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
    prop: "name",
    label: "布局名称",
    width: "150",
    fixed: true,
}));
const __VLS_22 = __VLS_21({
    prop: "name",
    label: "布局名称",
    width: "150",
    fixed: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_21));
for (const [n] of __VLS_getVForSourceType((17))) {
    const __VLS_24 = {}.ElTableColumn;
    /** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        key: (n),
        label: (`工序${n}`),
        width: "120",
    }));
    const __VLS_26 = __VLS_25({
        key: (n),
        label: (`工序${n}`),
        width: "120",
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    __VLS_27.slots.default;
    {
        const { default: __VLS_thisSlot } = __VLS_27.slots;
        const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
        (row.passes[n - 1]?.meta?.name || '-');
    }
    var __VLS_27;
}
const __VLS_28 = {}.ElTableColumn;
/** @type {[typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, typeof __VLS_components.ElTableColumn, typeof __VLS_components.elTableColumn, ]} */ ;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent(__VLS_28, new __VLS_28({
    label: "操作",
    width: "120",
    fixed: "right",
}));
const __VLS_30 = __VLS_29({
    label: "操作",
    width: "120",
    fixed: "right",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
__VLS_31.slots.default;
{
    const { default: __VLS_thisSlot } = __VLS_31.slots;
    const [{ row }] = __VLS_getSlotParams(__VLS_thisSlot);
    const __VLS_32 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        ...{ 'onClick': {} },
        link: true,
    }));
    const __VLS_34 = __VLS_33({
        ...{ 'onClick': {} },
        link: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    let __VLS_36;
    let __VLS_37;
    let __VLS_38;
    const __VLS_39 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleEditLayout(row);
        }
    };
    __VLS_35.slots.default;
    var __VLS_35;
    const __VLS_40 = {}.ElButton;
    /** @type {[typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ]} */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        ...{ 'onClick': {} },
        link: true,
        type: "danger",
    }));
    const __VLS_42 = __VLS_41({
        ...{ 'onClick': {} },
        link: true,
        type: "danger",
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    let __VLS_44;
    let __VLS_45;
    let __VLS_46;
    const __VLS_47 = {
        onClick: (...[$event]) => {
            __VLS_ctx.handleConfirmDelete(row.id);
        }
    };
    __VLS_43.slots.default;
    var __VLS_43;
}
var __VLS_31;
var __VLS_19;
/** @type {__VLS_StyleScopedClasses['layout-list']} */ ;
/** @type {__VLS_StyleScopedClasses['action-bar']} */ ;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=LayoutList.vue.js.map