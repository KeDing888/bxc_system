<template>
    <div class="layout-container">
      <!-- 上部：工艺布局画布 -->
      <ProcessCanvas 
        v-if="store.currentLayout"
        :layout="store.currentLayout" 
        class="canvas-section"
      />
      
      <!-- 下部：布局配置表单 -->
      <LayoutForm 
        @generate="handleGenerate"
        class="form-section"
      />
  
      <!-- 设备参数弹窗 -->
      <DeviceParamModal 
        v-if="selectedPassIndex !== null"
        :pass="store.currentLayout!.passes[selectedPassIndex]"
        @save="handleSaveParams"
        @close="selectedPassIndex = null"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useLayoutStore } from '@/stores/processLayoutStore'
  import ProcessCanvas from './ProcessCanvas.vue'
  import LayoutForm from '@/LayoutForm.vue'
  import DeviceParamModal from ' @/modules/layout/DeviceParaModal.vue'
  import { LayoutGenerateParams } from '@/types/processLayout'
  
  const store = useLayoutStore()
  const selectedPassIndex = ref<number | null>(null)
  
  // 处理布局生成
  const handleGenerate = async (params: LayoutGenerateParams) => {
    await store.generateLayout(params)
  }
  
  // 处理参数保存
  const handleSaveParams = (params: Record<string, any>) => {
    if (selectedPassIndex.value !== null) {
      store.updateDeviceParams(selectedPassIndex.value, params)
      selectedPassIndex.value = null
    }
  }
  </script>
  
  <style scoped>
  .layout-container {
    display: flex;
    flex-direction: column;
    height: 50vh;
  }
  
  .canvas-section {
    flex: 1;
    min-height: 10%;
    border-bottom: 2px solid #ebeef5;
  }
  
  .form-section {
    flex: 0 0 40%;
    overflow-y: 10px;
    padding: 10px;
  }
  </style>