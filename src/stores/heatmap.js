// stores/heatmap.ts
import { defineStore } from 'pinia';
import { HeatmapAPI } from '@/api/heatmap';
export const useHeatmapStore = defineStore('heatmap', {
    state: () => ({
        rawData: [],
        loading: false,
        error: null,
        gridSize: 200,
        sigma: 0.005
    }),
    actions: {
        resetState() {
            this.$reset();
        },
        async loadData(simulationId) {
            this.resetState();
            this.loading = true;
            try {
                const data = await HeatmapAPI.fetchRawData(simulationId);
                this.rawData = data.points;
            }
            catch (err) {
                this.handleError(err);
            }
            finally {
                this.loading = false;
            }
        },
        updateParams(params) {
            Object.assign(this, params);
        },
        handleError(error) {
            if (error instanceof Error) {
                this.error = error.message;
            }
            else {
                this.error = '发生未知错误';
            }
            this.rawData = [];
        }
    }
});
//# sourceMappingURL=heatmap.js.map