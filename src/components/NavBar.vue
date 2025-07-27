<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const activeMenu = ref('device')

const menuItems = [
  { name: '设备管理', path: '/device' },
  { name: '工艺布局', path: '/layout' },
  { name: '热力图', path: '/heatmap' }
]

// 初始化同步状态
const updateActiveMenu = () => {
  activeMenu.value = route.path.split('/')[1] || 'device'
}

updateActiveMenu()

// 监听路由变化
watch(
  () => route.path,
  (newPath) => {
    updateActiveMenu()
    console.log('当前路由:', newPath) // 调试用
  }
)

const handleMenuSelect = async (path: string) => {
  if (route.path === path) return
  
  try {
    await router.push(path)
    console.log('成功导航到:', path) // 调试用
  } catch (error) {
    console.error('导航错误:', error)
  }
}
</script>

<template>
  <el-menu 
    mode="horizontal" 
    :default-active="activeMenu"
    class="nav-menu"
    @select="(index) => handleMenuSelect('/' + index)"
  >
    <el-menu-item 
      v-for="item in menuItems" 
      :key="item.path" 
      :index="item.path.split('/')[1]"
    >
      {{ item.name }}
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.nav-menu {
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
</style>