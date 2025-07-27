<template>
    <el-form :model="formData">
      <el-form-item 
        v-for="attr in device.attributes"
        :key="attr.name"
        :label="attr.name"
      >
        <el-input-number
          v-if="attr.type === 'number'"
          v-model="formData[attr.name]"
          :precision="2"
        />
        <el-switch
          v-if="attr.type === 'boolean'"
          v-model="formData[attr.name]"
        />
        <el-input
          v-if="attr.type === 'string'"
          v-model="formData[attr.name]"
        />
      </el-form-item>
  
      <el-button type="primary" @click="submitForm">
        保存参数
      </el-button>
    </el-form>
  </template>
  
  <script setup lang="ts">
  import { Device } from '@/types/device';
  import { reactive } from 'vue';
  
  const props = defineProps<{
    device: Device
  }>()
  
  const emit = defineEmits(['submit'])
  
  // 初始化表单数据
  const formData = reactive<Record<string, any>>(
    props.device.attributes.reduce((acc, attr) => {
      acc[attr.name] = attr.defaultValue || ''
      return acc
    }, {})
  )
  
  const submitForm = () => {
    emit('submit', formData)
  }
  </script>