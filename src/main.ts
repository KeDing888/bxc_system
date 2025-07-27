import { createApp } from 'vue' // 确保vue版本为3.x
import App from './App.vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import './assets/styles/main.scss'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus) // 正确注册ElementPlus
app.use(router) // 正确注册路由
app.mount('#app')
// 全局注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }