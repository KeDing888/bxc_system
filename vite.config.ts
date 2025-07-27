// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { fileURLToPath, URL } from 'url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import path from 'path'

export default defineConfig({

  base: process.env.NODE_ENV === 'production' 
    ? '/bxc_system/'  // 必须与仓库名一致
    : '/',
  build: {
    outDir: 'dist'
  },

  plugins: [
    Icons({ compiler: 'vue3', autoInstall: true }),
    vue(),
    nodePolyfills({ include: ['url'] }),
    AutoImport({ resolvers: [ElementPlusResolver()] }),
    Components({ resolvers: [ElementPlusResolver()] })
  ],
  
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: ['node_modules'],
        additionalData: `@use "@/assets/styles/variables.scss" as *;`
      }
    }
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@stores': path.resolve(__dirname, './src/stores')
    }
  },

  server: {
    proxy: {
      '/api': {
        target: 'http://172.19.214.184:3000',
        changeOrigin: true
      }
    }
  },

  build: {
    target: 'esnext'
  }
})