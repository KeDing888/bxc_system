<script setup lang="ts">
import { useDeviceStore } from '@/stores/deviceStore'
import DeviceForm from '@/components/DeviceForm.vue'
import { onMounted, ref, computed} from 'vue'
import type { Device } from '@/types/device'
import { DeviceAPI } from '@/api/device'
import { storeToRefs } from 'pinia'
import { Plus } from '@element-plus/icons-vue'

const store = useDeviceStore()
const { devices, importTemplate } = storeToRefs(store)

// 对话框状态控制
const showDialog = ref(false)
const currentDevice = ref<Partial<Device> | null>(null)
const isEditing = ref(false)

// 确保计算属性在顶层作用域
const templateDownloadLink = computed(() => {
  if (!store.importTemplate) return ''
  return window.URL.createObjectURL(store.importTemplate)
})

// 显式暴露给模板（可选，大多数情况下不需要）
defineExpose({
  templateDownloadLink
})

// 初始化模板下载
onMounted(async () => {
  try {
    const response = await DeviceAPI.getImportTemplate()
    store.setImportTemplate(
      new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
    )
  } catch (error) {
    console.error('模板下载失败:', error)
  }
})

// 处理表单提交
const handleSubmit = async (formData: Partial<Device>) => {
  try {
    if (isEditing.value && formData.id) {
      await store.updateDevice(formData as Device)
    } else {
      await store.createDevice(formData as Omit<Device, 'id'>)
    }
    showDialog.value = false
    currentDevice.value = null
  } catch (error) {
    console.error('操作失败:', error)
  }
}

// 处理文件导入
const handleFileImport = async (file: File) => {
  try {
    await store.batchImport(file)
  } catch (error) {
    console.error('导入失败:', error)
    throw error
  }
}

// 打开编辑对话框
const openEditDialog = (device: Device) => {
  currentDevice.value = { ...device }
  isEditing.value = true
  showDialog.value = true
}

// 删除设备
const handleDelete = async (id: string) => {
  try {
    await store.deleteDevice(id)
  } catch (error) {
    console.error('删除失败:', error)
  }
}
</script>

<template>
  <div class="device-management">
    <!-- 操作工具栏 -->
    <div class="action-bar">
      <el-button type="primary" @click="showDialog = true; isEditing = false">
        <el-icon><Plus /></el-icon>
        新增设备
      </el-button>

      <el-upload
        :show-file-list="false"
        :before-upload="handleFileImport"
        accept=".xlsx,.xls"
      >
        <el-button type="success">
          <el-icon><Upload /></el-icon>
          Excel导入
        </el-button>
      </el-upload>

      <el-button 
      v-if="store.importTemplate"
      :href="templateDownloadLink"
       download="设备导入模板.xlsx"
      >
        <el-icon><Download /></el-icon>
        下载模板
      </el-button>
    </div>

    <!-- 设备表单对话框 -->
    <el-dialog
      v-model="showDialog"
      :title="isEditing ? '编辑设备信息' : '新增设备登记'"
      width="600px"
    >
      <DeviceForm
        :device="currentDevice || {}"
        @submit="handleSubmit"
        @cancel="showDialog = false"
      />
    </el-dialog>

    <!-- 设备数据表格 -->
    <el-table
      :data="devices"
      row-key="id"
      stripe
      highlight-current-row
    >
      <el-table-column prop="name" label="设备名称" min-width="180" />
      <el-table-column label="设备图片" width="120">
        <template #default="{ row }">
          <el-image
            v-if="row.image"
            :src="row.image"
            :preview-src-list="[row.image]"
            fit="cover"
            class="thumbnail"
          />
          <span v-else>无图片</span>
        </template>
      </el-table-column>
      <el-table-column label="属性配置" width="120">
        <template #default="{ row }">
          <el-tag type="info">
            {{ row.attributes?.length || 0 }} 项
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="最后更新" width="180">
        <template #default="{ row }">
          {{ new Date(row.updatedAt).toLocaleString() }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="openEditDialog(row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="handleDelete(row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.device-management {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.action-bar {
  margin-bottom: 20px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.thumbnail {
  width: 80px;
  height: 60px;
  border-radius: 4px;
  background: #f5f7fa;
}

:deep(.el-table) {
  margin-top: 20px;
}

:deep(.el-dialog__body) {
  padding: 20px;
}
</style>