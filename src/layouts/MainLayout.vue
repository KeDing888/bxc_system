<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// 添加路由变化监听（调试用）
watch(
  () => route.fullPath,
  (newPath) => {
    console.log('路由变化:', newPath)
  }
)
</script>

<template>
  <div class="main-layout">
    <nav-bar />
    <div class="content-container">
      <!-- 添加key强制重新渲染 -->
      <router-view v-slot="{ Component }">
        <component :is="Component" :key="route.fullPath" />
      </router-view>
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-container {
  flex: 1;
  overflow: auto;
  padding: 20px;
  background: #f5f7fa;
}
</style>