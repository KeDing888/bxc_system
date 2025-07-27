<template>
  <div class="layout-creator-container">
    <!-- 预览区 -->
    <div class="preview-section">
      <h3>布局预览</h3>
      <LayoutCanvas 
        :passes="processedPasses" 
        ref="canvasRef"
      />
    </div>

    <!-- 配置区 -->
    <div class="form-section">
      <el-form :model="form" label-width="120px">
        <el-form-item label="布局名称" required>
          <el-input v-model="form.name" placeholder="输入布局名称" />
        </el-form-item>

        <div v-for="(pass, index) in form.passes" :key="index" class="pass-item">
          <el-divider>道次 {{ index + 1 }}</el-divider>
          
          <el-form-item label="选择设备" required>
            <el-select
              v-model="pass.deviceId"
              placeholder="选择设备"
              style="width: 100%"
            >
              <el-option
                v-for="(device, idx) in deviceMetadata"
                :key="idx"
                :label="device.name"
                :value="idx"
              >
                <div style="display: flex; align-items: center">
                  <img 
                    :src="deviceImages[idx]" 
                    style="width: 50px; height: 40px; object-fit: contain; margin-right: 10px"
                  />
                  <span>{{ device.name }}</span>
                </div>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="X轴范围(mm)" required>
            <el-input-number 
              v-model="pass.startX" 
              :min="index === 0 ? 0 : form.passes[index-1].endX + 1"
              :step="100"
            />
            <span style="margin: 0 10px">至</span>
            <el-input-number 
              v-model="pass.endX" 
              :min="pass.startX + 100"
              :step="100"
            />
          </el-form-item>

          <el-form-item>
            <el-button 
              type="danger" 
              @click="removePass(index)"
              :disabled="form.passes.length <= 1"
            >
              移除道次
            </el-button>
          </el-form-item>
        </div>

        <div class="action-buttons">
          <el-button @click="addPass" type="primary" plain>
            添加道次
          </el-button>
          <el-button @click="resetForm" plain>
            重置
          </el-button>
          <el-button type="primary" @click="submit">
            生成布局
          </el-button>
          <el-button @click="goBack" plain>
            返回列表
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import LayoutCanvas from './LayoutCanvas.vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'

const router = useRouter()
const route = useRoute()

// 设备图片配置
const deviceImages = [
  '/device-images/中轧飞剪.png',
  '/device-images/粗轧机.png',
  '/device-images/定径机.png',
  '/device-images/废料收集.png',
  '/device-images/辊道_出炉.png',
  '/device-images/辊道_短.png',
  '/device-images/辊道_长.png',
  '/device-images/活套.png',
  '/device-images/加热炉.png',
  '/device-images/夹送辊.png',
  '/device-images/冷却设备.png',
  '/device-images/吐丝机.png',
  '/device-images/预精轧机_常规.png',
  '/device-images/预精轧机_短应力线.png',
  '/device-images/中轧机.png'
]

// 设备元数据
const deviceMetadata = reactive([
  { id: 1, name: '中轧飞剪', widthRatio: 2.4 },
  { id: 2, name: '粗轧机', widthRatio: 0.9 },
  { id: 3, name: '定径机', widthRatio: 0.8 },
  { id: 4, name: '废料收集', widthRatio: 1.5 },
  { id: 5, name: '辊道_出炉', widthRatio: 1.0 },
  { id: 6, name: '辊道_短', widthRatio: 1.8 },
  { id: 7, name: '辊道_长', widthRatio: 0.7 },
  { id: 8, name: '活套', widthRatio: 0.5 },
  { id: 9, name: '加热炉', widthRatio: 0.9 },
  { id: 10, name: '夹送辊', widthRatio: 1.0 },
  { id: 11, name: '冷却设备', widthRatio: 1.8 },
  { id: 12, name: '吐丝机', widthRatio: 0.7 },
  { id: 13, name: '预精轧机_常规', widthRatio: 0.5 },
  { id: 14, name: '预精轧机_短应力线', widthRatio: 0.9 },
  { id: 15, name: '中轧机', widthRatio: 0.9 },
])

// 修改表单初始化逻辑
const form = reactive({
  id: '',
  name: '',
  passes: [] as Array<{
    deviceId: number
    startX: number
    endX: number
  }>
})

// 加载已有布局数据
const loadLayoutData = () => {
  if (route.query.data) {
    try {
      const layoutData = JSON.parse(decodeURIComponent(route.query.data as string))
      form.id = layoutData.id
      form.name = layoutData.name
      form.passes = layoutData.passes.map(pass => ({
        deviceId: deviceMetadata.findIndex(d => d.name === pass.meta.name),
        startX: pass.startX,
        endX: pass.endX
      }))
    } catch (e) {
      console.error('解析布局数据失败:', e)
    }
  }
}

// 修改提交逻辑
const submit = async () => {
  if (!form.name.trim()) {
    ElMessage.error('请输入布局名称')
    return
  }
  
  try {
    await canvasRef.value?.generateLayout()
    
    const layouts = JSON.parse(localStorage.getItem('layoutList') || '[]')
    const existingIndex = layouts.findIndex(l => l.id === form.id)
    const newLayout = {
      id: form.id || Date.now().toString(),
      name: form.name,
      passes: processedPasses.value,
      createdAt: form.id ? layouts[existingIndex].createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    if (existingIndex >= 0) {
      layouts[existingIndex] = newLayout
    } else {
      layouts.push(newLayout)
    }
    
    localStorage.setItem('layoutList', JSON.stringify(layouts))
    ElMessage.success('布局保存成功')
    router.push('/layout')
  } catch (error) {
    ElMessage.error('布局生成失败: ' + (error as Error).message)
  }
}

// 初始化时加载数据
onMounted(() => {
  loadLayoutData()
})


// 处理后的道次数据
const processedPasses = computed(() => {
  return form.passes.map((pass, index) => ({
    ...pass,
    order: index + 1,
    imageUrl: deviceImages[pass.deviceId],
    meta: deviceMetadata[pass.deviceId]
  }))
})

// 画布组件引用
const canvasRef = ref<InstanceType<typeof LayoutCanvas>>()

// 添加道次
const addPass = () => {
  const nextDeviceId = form.passes.length % deviceImages.length
  const prevEndX = form.passes.length > 0 ? form.passes[form.passes.length-1].endX : 0
  
  form.passes.push({
    deviceId: nextDeviceId,
    startX: prevEndX,
    endX: prevEndX + 200 // 增加默认长度
  })
}

// 移除道次
const removePass = (index: number) => {
  form.passes.splice(index, 1)
}

// 重置表单
const resetForm = () => {
  form.name = ''
  form.passes = []
  canvasRef.value?.clearCanvas()
}

// 保存布局到本地
const saveLayoutToLocal = () => {
  const layouts = JSON.parse(localStorage.getItem('layoutList') || '[]')
  const newLayout = {
    id: Date.now().toString(),
    name: form.name,
    passes: processedPasses.value,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  layouts.push(newLayout)
  localStorage.setItem('layoutList', JSON.stringify(layouts))
}


// 监听道次变化
watch(() => form.passes, () => {
  nextTick(() => canvasRef.value?.generateLayout())
}, { deep: true })

const goBack = () => {
  router.push('/layout')
}
</script>

<style scoped>
.layout-creator-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 10px;
  background-color: #f5f7fa;
}

.preview-section {
  height: 350px;
  background: white;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 10px;
}

.form-section {
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow-y: auto;
}

.pass-item {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
}
</style>