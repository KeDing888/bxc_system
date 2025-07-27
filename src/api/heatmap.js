import axios from 'axios';
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json'
    }
});
export const HeatmapAPI = {
    async fetchRawData(simulationId) {
        const response = await apiClient.get(`/heatmap/${simulationId}`);
        if (response.data.code !== 200) {
            throw new Error(response.data.message);
        }
        return response.data.data;
    }
};
//# sourceMappingURL=heatmap.js.map