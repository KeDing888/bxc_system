<script setup lang="ts">
import type { Device, DeviceAttribute } from '@/types/device'
import type { UploadFile } from 'element-plus'
import { ElMessage, ElInputNumber, ElSwitch} from 'element-plus'
import { reactive, ref } from 'vue'


const props = defineProps<{
  device: Partial<Device>
}>()

const emit = defineEmits(['submit'])

const formRef = ref()
const formData = reactive<Partial<Device>>({
  ...props.device,
  attributes: props.device.attributes ? [...props.device.attributes] : []
})

// 新增类型标签映射
const typeLabels = {
  number: '数值型',
  boolean: '布尔型',
  string: '字符串型'
} as const

// 新增类型显示方法
const getTypeLabel = (type: keyof typeof typeLabels) => {
  return typeLabels[type] || '未知类型'
}

// 文件上传处理（修复版本）
const handleImageUpload = (file: UploadFile) => {
  const rawFile = file.raw
  
  if (!rawFile) {
    ElMessage.error('文件读取失败')
    return
  }
  
  if (!rawFile.type.startsWith('image/')) {
    ElMessage.error('仅支持图片文件')
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    formData.image = reader.result as string
  }
  reader.onerror = () => {
    ElMessage.error('图片读取失败')
  }
  reader.readAsDataURL(rawFile)
}

// 提交验证（优化版本）
const handleSubmit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      // 清理空属性
      const cleanedData = {
        ...formData,
        attributes: formData.attributes?.filter(attr => 
          attr.name && attr.type
        )
      }
      emit('submit', cleanedData)
    } else {
      ElMessage.warning('请完善表单信息')
    }
  })
}
</script>

<template>
  <el-form ref="formRef" :model="formData" label-width="120px">
    <!-- 设备名称 -->
    <el-form-item label="设备名称" prop="name"
      :rules="[{ required: true, message: '设备名称不能为空' }]">
      <el-input v-model="formData.name" placeholder="请输入设备名称" />
    </el-form-item>

    <!-- 设备图片 -->
    <el-form-item label="设备图片" prop="image">
      <el-upload
        :auto-upload="false"
        :show-file-list="false"
        :on-change="handleImageUpload"
        accept="image/*"
      >
        <template #trigger>
          <el-button>上传图片</el-button>
        </template>
        <div v-if="formData.image" class="preview-container">
          <img :src="formData.image" class="preview-image" />
        </div>
      </el-upload>
    </el-form-item>

    <!-- 设备属性 -->
    <el-divider>设备属性配置</el-divider>
    <div 
      v-for="(attr, index) in formData.attributes" 
      :key="index"
      class="attribute-item"
    >
      <!-- 属性名称输入 -->
      <el-form-item
        :prop="`attributes[${index}].name`"
        :rules="{ required: true, message: '属性名不能为空' }"
      >
        <el-input v-model="attr.name" placeholder="属性名称" />
      </el-form-item>

      <!-- 类型选择与显示 -->
      <div class="type-select-group">
        <el-form-item
          :prop="`attributes[${index}].type`"
          :rules="{ required: true, message: '请选择属性类型' }"
        >
          <el-select v-model="attr.type" placeholder="选择类型">
            <el-option label="数值型" value="number" />
            <el-option label="布尔型" value="boolean" />
            <el-option label="字符串型" value="string" />
          </el-select>
        </el-form-item>
      </div>

      <el-button 
        type="danger" 
        @click="formData.attributes!.splice(index, 1)"
      >
        删除
      </el-button>
    </div>

    <el-button 
      type="primary" 
      @click="formData.attributes!.push({ name: '', type: 'number' })"
    >
      添加属性
    </el-button>

    <!-- 保存按钮 -->
    <div class="form-actions">
      <el-button type="primary" @click="handleSubmit">
        保存
      </el-button>
    </div>
  </el-form>
</template>

<style scoped>
.preview-container {
  margin-top: 10px;
}

.preview-image {
  max-width: 200px;
  max-height: 150px;
  border-radius: 4px;
}

.attribute-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;
}

.form-actions {
  margin-top: 24px;
  text-align: right;
}

.type-select-group {
  position: relative;
  width: 320px;
}


.attribute-item {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  align-items: center;
  position: relative;
}

/* 调整下拉框宽度 */
:deep(.el-select) {
  width: 100%;
}
</style>