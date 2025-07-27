<template>
  <el-form :model="formData">
    <el-form-item label="布局名称" required>
      <el-input v-model="formData.name" />
    </el-form-item>

    <!-- 17个道次配置 -->
    <div 
      v-for="pass in formData.passes.length"
      :key="pass"
      class="pass-config"
    >
      <div class="pass-header">
        <h3>道次 {{ pass }}</h3>
        <el-button 
          type="danger" 
          size="small"
          @click="removePass(pass-1)"
          v-if="pass > 1"
        >
          移除
        </el-button>
      </div>
      
      <div class="pass-row">
        <el-form-item label="选择设备" class="form-item-inline">
          <el-select 
            v-model="formData.passes[pass-1].deviceId"
            @change="handleDeviceChange(pass-1)"
            placeholder="请选择设备"
          >
            <el-option
              v-for="device in deviceStore.devices"
              :key="device.id"
              :label="device.name"
              :value="device.id"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="起始X" class="form-item-inline">
          <el-input-number 
            v-model="formData.passes[pass-1].startX"
            :precision="2"
            :controls="false"
          />
        </el-form-item>

        <el-form-item label="结束X" class="form-item-inline">
          <el-input-number 
            v-model="formData.passes[pass-1].endX"
            :precision="2"
            :controls="false"
          />
        </el-form-item>
      </div>
    </div>

    <div class="actions">
      <el-button 
        type="primary" 
        @click="handleGenerate"
        :loading="store.isLoading"
      >
        生成布局
      </el-button>
      <el-button 
        type="success"
        @click="addPass"
      >
        添加道次
      </el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useLayoutStore } from '@/stores/processLayoutStore'
import { useDeviceStore } from '@/stores/deviceStore'
import type { LayoutGenerateParams } from '@/types/processLayout'
import { ElMessage } from 'element-plus'

const store = useLayoutStore()
const deviceStore = useDeviceStore()

// 表单数据初始化
const formData = reactive<LayoutGenerateParams>({
  name: '',
  passes: Array(17).fill(null).map((_, i) => ({
    order: i + 1,
    deviceId: '',
    startX: 0,
    endX: 0
  }))
})

// 设备选择处理
const handleDeviceChange = (index: number) => {
  const prevEndX = index > 0 ? formData.passes[index-1].endX : 0
  formData.passes[index].startX = prevEndX + 50 // 间距
  formData.passes[index].endX = formData.passes[index].startX + 200 // 设备宽度
}

// 移除道次
const removePass = (index: number) => {
  if (formData.passes.length <= 1) {
    ElMessage.warning('至少保留一个道次')
    return
  }
  formData.passes.splice(index, 1)
  // 更新后续道次的 order 和 X 坐标
  formData.passes.forEach((pass, i) => {
    pass.order = i + 1
    if (i > 0) {
      pass.startX = formData.passes[i - 1].endX + 50
      pass.endX = pass.startX + 200
    }
  })
}

// 添加道次
const addPass = () => {
  const lastPass = formData.passes[formData.passes.length - 1]
  formData.passes.push({
    order: formData.passes.length + 1,
    deviceId: '',
    startX: lastPass ? lastPass.endX + 50 : 0,
    endX: lastPass ? lastPass.endX + 250 : 200
  })
}

// 生成布局
const handleGenerate = async () => {
  if (!formData.name) {
    ElMessage.error('请输入布局名称')
    return
  }
  await store.generateLayout(formData)
}
</script>

<style scoped>
.pass-config {
  margin: 12px 0;
  padding: 12px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.pass-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.pass-header h3 {
  margin: 0;
  font-size: 16px;
}

.pass-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.form-item-inline {
  margin-bottom: 0;
}

.form-item-inline :deep(.el-form-item__content) {
  display: flex;
  align-items: center;
}

.form-item-inline :deep(.el-form-item__label) {
  float: none;
  width: auto;
  padding-right: 8px;
}

.actions {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

/* 调整选择器和输入框宽度 */
.pass-row :deep(.el-select),
.pass-row :deep(.el-input-number) {
  width: 100%;
  min-width: 180px;
}

.pass-row :deep(.el-input-number) {
  width: 120px;
}
</style>