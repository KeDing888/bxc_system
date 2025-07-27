<template>
    <el-card class="controls">
      <template #header>
        <div class="control-header">
          <span>热力图参数设置</span>
        </div>
      </template>
  
      <el-form label-width="100px">
        <el-form-item label="网格密度">
          <el-slider
            v-model="gridSize"
            :min="50"
            :max="500"
            :step="50"
            show-stops
          />
        </el-form-item>
        
        <el-form-item label="平滑系数">
          <el-slider
            v-model="sigma"
            :min="0.001"
            :max="0.1"
            :step="0.001"
            :format-tooltip="(val: number) => val.toFixed(3)"
          />
        </el-form-item>
      </el-form>
    </el-card>
  </template>
  
  <script setup lang="ts">
  import { toRefs } from 'vue'
  
  const props = defineProps<{
    gridSize: number
    sigma: number
  }>()
  
  const emit = defineEmits<{
    (e: 'update:gridSize', value: number): void
    (e: 'update:sigma', value: number): void
  }>()
  
  const { gridSize, sigma } = toRefs(props)
  </script>
  
  <style scoped>
  .controls {
    margin-bottom: 20px;
  }
  
  .control-header {
    font-weight: 500;
    color: var(--el-color-primary);
  }
  </style>