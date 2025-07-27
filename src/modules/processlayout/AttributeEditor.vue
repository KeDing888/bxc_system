<!-- src/modules/process-layout/components/AttributeEditor.vue -->
<template>
  <el-dialog 
    v-model="visible" 
    :title="`编辑属性 - ${deviceName}`"
    width="600px"
  >
    <el-form label-width="100px">
      <el-form-item 
        v-for="attr in attributes" 
        :key="attr.name"
        :label="attr.name"
        :rules="{ required: attr.required }"
      >
        <el-input
          v-model="formData[attr.name]"
          :type="attr.type === 'number' ? 'number' : 'text'"
          :placeholder="`请输入${attr.name}`"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useLayoutStore } from '@/stores/useLayoutStore'

const props = defineProps<{
  pass: {
    order: number
    deviceId: string
    attributes: Record<string, any>
  }
}>()

const emit = defineEmits(['update'])

const store = useLayoutStore()
const visible = ref(true)
const formData = ref({ ...props.pass.attributes })

// 获取设备元数据
const device = computed(() => 
  store.devices.find(d => d.id === props.pass.deviceId)
)

const deviceName = computed(() => device.value?.name || '')
const attributes = computed(() => 
  device.value?.attributes || []
)

// 保存处理
const handleSave = () => {
  emit('update', formData.value)
  visible.value = false
}

// 监听外部数据变化s
watch(() => props.pass, (newVal) => {
  formData.value = { ...newVal.attributes }
})
</script>