import axios from 'axios';
import { ElMessage } from 'element-plus';
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    timeout: 10000
});
instance.interceptors.response.use(response => response.data, error => {
    const message = error.response?.data?.message || error.message;
    ElMessage.error(message);
    return Promise.reject(error);
});
export const http = {
    get: (url, config) => instance.get(url, config),
    post: (url, data, config) => instance.post(url, data, config),
    put: (url, data, config) => instance.put(url, data, config),
    patch: (url, data, config) => instance.patch(url, data, config),
    delete: (url, config) => instance.delete(url, config)
};
//# sourceMappingURL=request.js.map