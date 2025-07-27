<template>
  <el-dialog 
    v-model="visible" 
    :title="`设备参数配置 - ${device?.name}`"
    width="600px"
  >
    <el-form :model="formData">
      <el-form-item
        v-for="attr in deviceAttributes"
        :key="attr.name"
        :label="attr.name"
        :rules="{ required: attr.required }"
      >
        <!-- 数字类型 -->
        <el-input-number
          v-if="attr.type === 'number'"
          v-model="formData[attr.name]"
          :precision="2"
        />
        
        <!-- 布尔类型 -->
        <el-switch
          v-if="attr.type === 'boolean'"
          v-model="formData[attr.name]"
        />
        
        <!-- 字符串类型 -->
        <el-input
          v-if="attr.type === 'string'"
          v-model="formData[attr.name]"
        />
      </el-form-item>

      <el-button type="primary" @click="handleSave">
        保存参数
      </el-button>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import type { ProcessPass } from '@/types/processLayout'
import { useDeviceStore } from '@/stores/deviceStore'

const props = defineProps<{
  pass: ProcessPass
}>()

const emit = defineEmits(['save', 'close'])

const deviceStore = useDeviceStore()
const visible = defineModel<boolean>('visible')

// 获取设备属性
const device = computed(() => 
  deviceStore.getDeviceById(props.pass.deviceId)
)

// 表单数据初始化
const formData = reactive<Record<string, any>>(
  device.value?.attributes.reduce((acc, attr) => {
    acc[attr.name] = props.pass.parameters[attr.name] ?? attr.defaultValue
    return acc
  }, {}) || {}
)

// 设备属性定义
const deviceAttributes = computed(() => 
  device.value?.attributes || []
)

// 保存参数
const handleSave = () => {
  emit('save', formData)
  visible.value = false
}
</script>