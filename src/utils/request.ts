import axios, { type AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE,
  timeout: 10000
})

instance.interceptors.response.use(
  response => response.data,
  error => {
    const message = error.response?.data?.message || error.message
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

export const http = {
  get: <T>(url: string, config?: AxiosRequestConfig) => 
    instance.get<T>(url, config),
  
  post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    instance.post<T>(url, data, config),
  
  put: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    instance.put<T>(url, data, config),
  
  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
    instance.patch<T>(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig) => 
    instance.delete<T>(url, config)
}