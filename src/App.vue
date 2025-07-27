<script setup lang="ts">
// 移除所有业务逻辑，仅作为根组件容器
</script>

<template>
  <!-- 作为最高层级的路由出口 -->
  <router-view />
</template>

<style scoped>
/* 基础布局样式 */
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
