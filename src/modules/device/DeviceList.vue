<template>
  <div class="device-list-container">
    <!-- 添加设备按钮 -->
    <div class="toolbar">
      <el-button type="primary" @click="handleAddDevice">
        添加设备
      </el-button>
    </div>

    <!-- 设备表格 -->
    <el-table :data="devices" stripe style="width: 100%">
      <!-- 设备名称列 -->
      <el-table-column prop="name" label="设备名称" width="200" align="center">
        <template #default="{ row }">
          <span class="device-name">
            {{ row.name }}
          </span>
        </template>
      </el-table-column>

      <!-- 设备图片列 -->
      <el-table-column label="设备图片" width="150" align="center">
        <template #default="{ row }">
          <el-image 
            v-if="row.image"
            :src="row.image"
            fit="cover"
            class="device-image"
          >
            <template #error>
              <div class="image-error">图片加载失败</div>
            </template>
          </el-image>
          <span v-else class="no-image">暂无图片</span>
        </template>
      </el-table-column>

      <!-- 设备属性列 -->
      <el-table-column label="属性配置" align="center">
        <template #default="{ row }">
          <el-tag
            v-for="attr in row.attributes"
            :key="attr.id"
            type="info"
            class="attribute-tag"
          >
            {{ attr.name }}: 
            <span class="attribute-type">{{ attr.type }}</span>
            <el-icon v-if="attr.required" class="required-star">
              <StarFilled />
            </el-icon>
          </el-tag>
        </template>
      </el-table-column>

      <!-- 操作列 -->
      <el-table-column label="操作" width="180" align="center">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="handleEditDevice(row)"
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

    <!-- 空状态 -->
    <el-empty 
      v-if="devices.length === 0"
      description="暂无设备数据"
    >
      <el-button type="primary" @click="handleAddDevice">
        添加设备
      </el-button>
    </el-empty>

    <!-- 添加/编辑设备弹窗 -->
    <el-dialog
      v-model="showDialog"
      :title="isEditMode ? '编辑设备' : '添加新设备'"
      width="50%"
      :close-on-click-modal="false"
      @open="handleDialogOpen"
    >
      <DeviceForm 
        ref="formRef" 
        :key="isEditMode ? 'edit-' + currentEditId : 'add'"
        :device-id="currentEditId"
        :device-data="currentDeviceData"
        :devices="devices"
        @submit="handleFormSubmit" 
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="handleSave">
            {{ isEditMode ? '更新' : '保存' }}
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import DeviceForm from './DeviceForm.vue'

const devices = ref<any[]>([])
const showDialog = ref(false)
const formRef = ref()
const isEditMode = ref(false)
const currentEditId = ref('')
const currentDeviceData = ref<any>(null)

// 添加新设备
const handleAddDevice = () => {
  isEditMode.value = false
  currentEditId.value = ''
  currentDeviceData.value = null
  showDialog.value = true
}

// 编辑设备
const handleEditDevice = (device: any) => {
  isEditMode.value = true
  currentEditId.value = device.id
  currentDeviceData.value = JSON.parse(JSON.stringify({
    ...device,
    attributes: device.attributes.map((attr: any) => ({
      ...attr,
      required: attr.required || false
    }))
  }))
  showDialog.value = true
}

// 弹窗打开事件
const handleDialogOpen = () => {
  nextTick(() => {
    if (isEditMode.value && currentDeviceData.value) {
      formRef.value?.initForm(currentDeviceData.value)
    }
  })
}

// 处理表单提交
const handleFormSubmit = (formData: any) => {
  if (isEditMode.value) {
    // 更新现有设备
    const index = devices.value.findIndex(d => d.id === currentEditId.value)
    if (index !== -1) {
      devices.value[index] = {
        id: currentEditId.value,
        name: formData.name,
        image: formData.image,
        attributes: formData.attributes.map((attr: any) => ({
          id: attr.id || `attr_${Date.now()}`,
          name: attr.name,
          type: attr.type,
          required: attr.required || false,
          value: getDefaultValue(attr.type)
        }))
      }
      ElMessage.success('设备更新成功')
    }
  } else {
    // 添加新设备
    devices.value.push({
      id: `device_${Date.now()}`,
      name: formData.name,
      image: formData.image,
      attributes: formData.attributes.map((attr: any) => ({
        id: `attr_${Date.now()}`,
        name: attr.name,
        type: attr.type,
        required: attr.required || false,
        value: getDefaultValue(attr.type)
      }))
    })
    ElMessage.success('设备添加成功')
  }
  
  showDialog.value = false
}

// 保存按钮点击事件
const handleSave = async () => {
  try {
    await formRef.value.submit()
  } catch (error) {
    ElMessage.error('请填写完整信息')
  }
}

// 删除设备
const handleDelete = (deviceId: string) => {
  ElMessageBox.confirm('确定要删除此设备吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    devices.value = devices.value.filter(device => device.id !== deviceId)
    ElMessage.success('删除成功')
  }).catch(() => {
    // 用户点击了取消
  })
}

// 获取属性默认值
const getDefaultValue = (type: string) => {
  switch(type) {
    case 'number': return 0
    case 'boolean': return false
    default: return ''
  }
}
</script>

<style scoped>
.device-list-container {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}

.toolbar {
  margin-bottom: 30px;
}

.device-name {
  color: var(--el-color-primary);
}

.device-image {
  width: 100px;
  height: 60px;
  border-radius: 4px;
}

.no-image {
  color: #999;
  font-size: 12px;
}

.attribute-tag {
  margin: 2px;
}

.attribute-tag :deep(.el-tag__content) {
  display: flex;
  align-items: center;
}

.attribute-type {
  color: #67c23a;
  margin-left: 4px;
  font-size: 0.9em;
}

.required-star {
  color: #f56c6c;
  margin-left: 4px;
  font-size: 0.8em;
}

.image-error {
  padding: 5px;
  background: #fef0f0;
  color: #f56c6c;
  font-size: 12px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>