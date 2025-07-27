<template>
  <div class="process-canvas">
    <!-- 设备渲染 -->
    <div 
      v-for="(pass, index) in layout.passes"
      :key="index"
      class="device-item"
      :style="{
        left: `${pass.startX}px`,
        width: `${pass.endX - pass.startX}px`
      }"
      @click="handleDeviceClick(index)"
    >
      <img 
        :src="deviceMap.get(pass.deviceId)?.image" 
        class="device-image"
      />
      <div class="device-name">
        {{ deviceMap.get(pass.deviceId)?.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ProcessLayout } from '@/types/processLayout'
import { useDeviceStore } from '@/stores/deviceStore'

const props = defineProps<{
  layout: ProcessLayout
}>()

const emit = defineEmits(['deviceClick'])

const deviceStore = useDeviceStore()

// 设备映射数据
const deviceMap = computed(() => 
  new Map(deviceStore.devices.map(d => [d.id, d]))
)

// 设备点击处理
const handleDeviceClick = (index: number) => {
  emit('deviceClick', index)
}
</script>

<style scoped>
.process-canvas {
  position: relative;
  height: 50%;
  background: #f8f9fa;
}

.device-item {
  position: absolute;
  height: 120px;
  border-right: 2px solid #409eff;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
    z-index: 1;
  }
}

.device-image {
  height: 80px;
  object-fit: contain;
}

.device-name {
  padding: 8px;
  text-align: center;
  background: rgba(255,255,255,0.9);
}
</style>