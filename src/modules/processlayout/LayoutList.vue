<template>
  <div class="layout-list">
    <!-- 操作栏 -->
    <div class="action-bar">
      <el-button type="primary" @click="handleCreateNew">
        <el-icon><Plus /></el-icon> 新建布局
      </el-button>
    </div>

    <!-- 布局列表 -->
    <el-table :data="layouts" stripe style="width: 100%">
      <el-table-column prop="name" label="布局名称" width="150" fixed />
      
      <!-- 动态生成工序列 -->
      <el-table-column 
        v-for="n in 17" 
        :key="n" 
        :label="`工序${n}`" 
        width="120"
      >
        <template #default="{ row }">
          {{ row.passes[n-1]?.meta?.name || '-' }}
        </template>
      </el-table-column>
      
      <el-table-column label="操作" width="120" fixed="right">
        <template #default="{ row }">
          <el-button link @click="handleEditLayout(row)">编辑</el-button>
          <el-button link type="danger" @click="handleConfirmDelete(row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'  // 确保这行存在
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  setup() {
    const router = useRouter()
    const layouts = ref([])

    // 加载本地布局列表
    const loadLayouts = () => {
      const savedData = localStorage.getItem('layoutList')
      layouts.value = savedData ? JSON.parse(savedData) : []
    }

    // 确认删除对话框
    const handleConfirmDelete = (id) => {
      ElMessageBox.confirm('确定要删除此布局吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        handleDeleteLayout(id)
      })
    }

    // 删除布局
    const handleDeleteLayout = (id) => {
      layouts.value = layouts.value.filter(layout => layout.id !== id)
      localStorage.setItem('layoutList', JSON.stringify(layouts.value))
      ElMessage.success('删除成功')
    }

    // 新建布局
    const handleCreateNew = () => {
      router.push('/layout/new').catch(err => {
        console.error('路由跳转失败:', err)
        ElMessage.error('无法跳转到创建页面')
      })
    }

    // 编辑布局
    const handleEditLayout = (layout) => {
      router.push({
        path: '/layout/edit',
        query: {
          data: encodeURIComponent(JSON.stringify(layout))
        }
      })
    }

    // 生命周期钩子
    onMounted(() => {
      loadLayouts()
    })
    

    return {
      layouts,
      handleCreateNew,
      handleEditLayout,
      handleConfirmDelete
    }
  }
}
</script>

<style scoped>
.layout-list {
  padding: 20px;
  overflow-x: auto;
}

.action-bar {
  margin-bottom: 20px;
}
</style>