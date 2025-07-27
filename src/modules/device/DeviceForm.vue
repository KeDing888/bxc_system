<template>
  <el-form :model="formData" ref="formRef" label-width="120px">
    <!-- 设备名称 -->
    <el-form-item label="设备名称" prop="name"
      :rules="[{ required: true, message: '设备名称不能为空', trigger: 'blur' }]">
      <el-input v-model="formData.name" placeholder="请输入设备名称" />
    </el-form-item>

    <!-- 设备图片 -->
    <el-form-item label="设备图片" prop="image">
      <div class="image-upload-container">
        <el-upload
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleImageUpload"
        >
          <el-button type="primary">上传图片</el-button>
        </el-upload>
        
        <!-- 图片预览区域 -->
        <div class="image-preview-container" v-if="formData.image">
          <img 
            :src="formData.image" 
            class="preview-image"
            @click="showFullImage"
            alt="设备图片预览"
          />
          <el-button 
            class="clear-button"
            @click.stop="clearImage"
            size="small"
            type="danger"
          >
            清除
          </el-button>
        </div>
      </div>
    </el-form-item>

    <!-- 属性配置 -->
    <el-divider>设备属性</el-divider>
    <div 
      v-for="(attr, index) in formData.attributes" 
      :key="index"
      class="attribute-item"
    >
      <div class="attribute-row">
        <el-form-item
          label="属性名称"
          :prop="`attributes[${index}].name`"
          :rules="{ required: true, message: '属性名不能为空', trigger: 'blur' }"
          class="attribute-name"
        >
          <el-input v-model="attr.name" placeholder="请输入属性名" />
        </el-form-item>

        <el-form-item
          label="类型"
          :prop="`attributes[${index}].type`"
          :rules="{ required: true, message: '请选择属性类型', trigger: 'change' }"
          class="attribute-type"
        >
          <el-select v-model="attr.type">
            <el-option label="数值" value="number" />
            <el-option label="布尔值" value="boolean" />
            <el-option label="字符串" value="string" />
          </el-select>
        </el-form-item>

        <el-form-item label="必填" class="attribute-required">
          <el-switch v-model="attr.required" />
        </el-form-item>

        <el-button 
          type="danger" 
          @click="removeAttribute(index)"
          class="attribute-delete"
        >
          删除
        </el-button>
      </div>
    </div>

    <el-button @click="addAttribute">添加属性</el-button>
    
    <!-- 全图查看模态框 -->
    <el-dialog 
      v-model="showFullView" 
      title="图片预览" 
      width="80%"
      top="5vh"
      custom-class="full-image-dialog"
    >
      <img :src="formData.image" class="full-image" />
    </el-dialog>
  </el-form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadFile } from 'element-plus'

const props = defineProps({
  deviceId: String,
  deviceData: Object,
  devices: Array
})

const emit = defineEmits<{
  (e: 'submit', data: { 
    id?: string
    name: string
    image: string
    attributes: Array<{
      name: string
      type: string
      required: boolean
    }>
  }): void
}>()

const formRef = ref()
const formData = ref({
  name: '',
  image: '',
  attributes: [] as Array<{
    name: string
    type: string
    required: boolean
  }>
})

const showFullView = ref(false)

// 初始化表单
const initForm = (data: any) => {
  formData.value = {
    name: data.name || '',
    image: data.image || '',
    attributes: data.attributes?.map((attr: any) => ({
      name: attr.name || '',
      type: attr.type || 'number',
      required: attr.required || false
    })) || []
  }
}

// 监听props变化
watch(() => props.deviceData, (newVal) => {
  if (newVal) {
    initForm(newVal)
  }
}, { immediate: true })

// 添加属性
const addAttribute = () => {
  formData.value.attributes.push({
    name: '',
    type: 'number',
    required: false
  })
}

// 移除属性
const removeAttribute = (index: number) => {
  formData.value.attributes.splice(index, 1)
}

// 处理图片上传
const handleImageUpload = (file: UploadFile) => {
  const rawFile = file.raw
  if (!rawFile) return
  
  // 检查文件类型
  if (!rawFile.type.match('image.*')) {
    ElMessage.error('请选择图片文件')
    return
  }
  
  // 检查文件大小（限制为5MB）
  if (rawFile.size > 20 * 1024 * 1024) {
    ElMessage.error('图片大小不能超过5MB')
    return
  }
  
  const reader = new FileReader()
  reader.onload = (e) => {
    formData.value.image = e.target?.result as string
  }
  reader.readAsDataURL(rawFile)
}

// 显示大图
const showFullImage = () => {
  if (formData.value.image) {
    showFullView.value = true
  }
}

// 清除图片
const clearImage = () => {
  formData.value.image = ''
}

// 提交表单
const submit = () => {
  try {
    // 验证设备名称
    if (!formData.value.name.trim()) {
      throw new Error('设备名称不能为空')
    }
    
    // 验证属性名称
    for (const attr of formData.value.attributes) {
      if (!attr.name.trim()) {
        throw new Error('所有属性名称必须填写')
      }
    }

    emit('submit', {
      id: props.deviceId,
      name: formData.value.name,
      image: formData.value.image,
      attributes: formData.value.attributes
    })
  } catch (error) {
    throw error
  }
}

defineExpose({
  submit,
  initForm
})
</script>

<style scoped>
.image-upload-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.image-preview-container {
  position: relative;
  width: 100%;
  height: 200px;
  border: 1px dashed #ddd;
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  cursor: zoom-in;
}

.clear-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

.attribute-item {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 10px;
  position: relative;
}

.attribute-row {
  display: flex;
  align-items: center;
  gap: 4px; /* 设置更小的间距 */
}

/* 覆盖 Element Plus 的默认间距 */
.attribute-row .el-form-item {
  margin-bottom: 0 !important;
  margin-right: 0 !important;
}

.attribute-row .el-form-item__content {
  margin-left: 0 !important;
}

.attribute-name {
  flex: 2;
  min-width: 80px;
  margin-left: auto;
}

.attribute-type {
  flex: 1;
  min-width: 220px;
  margin-left: auto;
}

.attribute-required {
  flex: 0 0 auto;
  white-space: nowrap;
  margin-left: 1px;
}

.attribute-delete {
  flex: 0 0 auto;
  padding: 6px 10px;
  margin-left: auto;
}

/* 调整表单标签的间距 */
.attribute-row .el-form-item__label {
  padding-right: 0px !important;
  padding-left: 2px !important;
}

.full-image {
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: contain;
}
</style>

<style>
.full-image-dialog .el-dialog__body {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
}
</style>