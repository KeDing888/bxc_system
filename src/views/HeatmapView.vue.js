import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import * as echarts from 'echarts';
import { Loading } from '@element-plus/icons-vue';
// 使用提供的温度数据
const temperatureData = [
    [0, 0, 442.86405],
    [0.003, 0, 442.12868],
    [0.006, 0, 438.95132],
    [0.009, 0, 433.57943],
    [0.012, 0, 426.05365],
    [0.015, 0, 416.45616],
    [0.018, 0, 404.877],
    [0.021, 0, 391.419],
    [0.024, 0, 376.20223],
    [0.027, 0, 359.37478],
    [0.03, 0, 341.15848],
    [0, 0.003, 442.12868],
    [0.00212, 0.00212, 442.15159],
    [0.00537, 0.00268, 438.99154],
    [0.00854, 0.00285, 433.56586],
    [0.01164, 0.00291, 426.02313],
    [0.01471, 0.00294, 416.42042],
    [0.01776, 0.00296, 404.8371],
    [0.02079, 0.00297, 391.3725],
    [0.02381, 0.00298, 376.14082],
    [0.02683, 0.00298, 359.26622],
    [0.02985, 0.00299, 340.8662],
    [0, 0.006, 438.95132],
    [0.00268, 0.00537, 438.99154],
    [0.00424, 0.00424, 438.90215],
    [0.00749, 0.00499, 433.60369],
    [0.01073, 0.00537, 426.02],
    [0.01393, 0.00557, 416.37823],
    [0.01708, 0.00569, 404.76942],
    [0.02019, 0.00577, 391.28554],
    [0.02328, 0.00582, 376.03479],
    [0.02636, 0.00586, 359.13575],
    [0.02942, 0.00588, 340.70633],
    [0, 0.009, 433.57943],
    [0.00285, 0.00854, 433.56586],
    [0.00499, 0.00749, 433.60369],
    [0.00636, 0.00636, 433.45785],
    [0.0096, 0.0072, 426.04832],
    [0.01286, 0.00772, 416.38174],
    [0.0161, 0.00805, 404.72554],
    [0.0193, 0.00827, 391.2014],
    [0.02247, 0.00843, 375.92043],
    [0.02561, 0.00854, 359.00231],
    [0.02873, 0.00862, 340.57004],
    [0, 0.012, 426.05365],
    [0.00291, 0.01164, 426.02313],
    [0.00537, 0.01073, 426.02],
    [0.0072, 0.0096, 426.04832],
    [0.00849, 0.00849, 425.87029],
    [0.01171, 0.00937, 416.39292],
    [0.01498, 0.00998, 404.72145],
    [0.01823, 0.01042, 391.14782],
    [0.02147, 0.01073, 375.8204],
    [0.02467, 0.01097, 358.87204],
    [0.02785, 0.01114, 340.43429],
    [0, 0.015, 416.45616],
    [0.00294, 0.01471, 416.42042],
    [0.00557, 0.01393, 416.37823],
    [0.00772, 0.01286, 416.38174],
    [0.00937, 0.01171, 416.39292],
    [0.01061, 0.01061, 416.19589],
    [0.01383, 0.01152, 404.71369],
    [0.01709, 0.01221, 391.12604],
    [0.02035, 0.01272, 375.74587],
    [0.0236, 0.01311, 358.75053],
    [0.02683, 0.01342, 340.29584],
    [0, 0.018, 404.877],
    [0.00296, 0.01776, 404.8371],
    [0.00569, 0.01708, 404.76942],
    [0.00805, 0.0161, 404.72554],
    [0.00998, 0.01498, 404.72145],
    [0.01152, 0.01383, 404.71369],
    [0.01273, 0.01273, 404.50511],
    [0.01594, 0.01367, 391.09704],
    [0.0192, 0.0144, 375.69478],
    [0.02247, 0.01498, 358.63982],
    [0.02572, 0.01543, 340.15165],
    [0, 0.021, 391.419],
    [0.00297, 0.02079, 391.3725],
    [0.00577, 0.02019, 391.28554],
    [0.00827, 0.0193, 391.2014],
    [0.01042, 0.01823, 391.14782],
    [0.01221, 0.01709, 391.12604],
    [0.01367, 0.01594, 391.09704],
    [0.01485, 0.01485, 390.88123],
    [0.01806, 0.0158, 375.63624],
    [0.02131, 0.01658, 358.53635],
    [0.02458, 0.0172, 339.99072],
    [0, 0.024, 376.20223],
    [0.00298, 0.02381, 376.14082],
    [0.00582, 0.02328, 376.03479],
    [0.00843, 0.02247, 375.92043],
    [0.01073, 0.02147, 375.8204],
    [0.01272, 0.02035, 375.74587],
    [0.0144, 0.0192, 375.69478],
    [0.0158, 0.01806, 375.63624],
    [0.01697, 0.01697, 375.41521],
    [0.02018, 0.01794, 358.41822],
    [0.02343, 0.01874, 339.78455],
    [0, 0.027, 359.37478],
    [0.00298, 0.02683, 359.26622],
    [0.00586, 0.02636, 359.13575],
    [0.00854, 0.02561, 359.00231],
    [0.01097, 0.02467, 358.87204],
    [0.01311, 0.0236, 358.75053],
    [0.01498, 0.02247, 358.63982],
    [0.01658, 0.02131, 358.53635],
    [0.01794, 0.02018, 358.41822],
    [0.01909, 0.01909, 358.18929],
    [0.0223, 0.02007, 339.46192],
    [0, 0.03, 341.15848],
    [0.00299, 0.02985, 340.8662],
    [0.00588, 0.02942, 340.70633],
    [0.00862, 0.02873, 340.57004],
    [0.01114, 0.02785, 340.43429],
    [0.01342, 0.02683, 340.29584],
    [0.01543, 0.02572, 340.15165],
    [0.0172, 0.02458, 339.99072],
    [0.01874, 0.02343, 339.78455]
];
// 高斯插值函数
const interpolateValue = (data, x, y, sigma) => {
    let numerator = 0;
    let denominator = 0;
    data.forEach(([xi, yi, value]) => {
        const distance2 = (x - xi) ** 2 + (y - yi) ** 2;
        const weight = Math.exp(-distance2 / (2 * sigma ** 2));
        numerator += weight * value;
        denominator += weight;
    });
    return denominator === 0 ? 0 : numerator / denominator;
};
// 生成网格数据
const generateGridData = (data, gridSize, sigma) => {
    const xMin = Math.min(...data.map(d => d[0]));
    const xMax = Math.max(...data.map(d => d[0]));
    const yMin = Math.min(...data.map(d => d[1]));
    const yMax = Math.max(...data.map(d => d[1]));
    const xStep = (xMax - xMin) / gridSize;
    const yStep = (yMax - yMin) / gridSize;
    const grid = [];
    for (let i = 0; i <= gridSize; i++) {
        for (let j = 0; j <= gridSize; j++) {
            const x = xMin + i * xStep;
            const y = yMin + j * yStep;
            const value = interpolateValue(data, x, y, sigma);
            grid.push([i, j, value]);
        }
    }
    return {
        grid,
        xRange: [xMin, xMax],
        yRange: [yMin, yMax],
        valueRange: [
            Math.min(...data.map(d => d[2])),
            Math.max(...data.map(d => d[2]))
        ]
    };
};
const loading = ref(false);
const gridSize = ref(50);
const sigma = ref(0.005);
const chartEl = ref();
let chartInstance = null;
// 响应参数变化
watch([gridSize, sigma], () => {
    updateChart();
});
// 更新图表函数
const updateChart = () => {
    if (!chartInstance) {
        console.error('Chart instance not initialized');
        return;
    }
    const { grid, xRange, yRange, valueRange } = generateGridData(temperatureData, gridSize.value, sigma.value);
    const option = {
        tooltip: {
            formatter: (params) => {
                const data = params.data;
                const x = (data[0] / gridSize.value) * (xRange[1] - xRange[0]) + xRange[0];
                const y = (data[1] / gridSize.value) * (yRange[1] - yRange[0]) + yRange[0];
                return `
          X: ${x.toFixed(3)}<br>
          Y: ${y.toFixed(3)}<br>
          温度: ${data[2].toFixed(2)}℃
        `;
            }
        },
        xAxis: {
            type: 'category', // 修改为 category 类型
            min: 0,
            max: gridSize.value,
            axisLabel: {
                formatter: (val) => ((val / gridSize.value) * (xRange[1] - xRange[0]) + xRange[0]).toFixed(3),
                interval: Math.floor(gridSize.value / 10)
            },
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            type: 'category', // 修改为 category 类型
            min: 0,
            max: gridSize.value,
            axisLabel: {
                formatter: (val) => ((val / gridSize.value) * (yRange[1] - yRange[0]) + yRange[0]).toFixed(3),
                interval: Math.floor(gridSize.value / 10)
            },
            axisTick: {
                alignWithLabel: true
            }
        },
        visualMap: {
            min: valueRange[0],
            max: valueRange[1],
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            inRange: {
                color: [
                    '#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8',
                    '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'
                ]
            }
        },
        series: [{
                type: 'heatmap',
                data: grid.map(item => ({
                    value: [item[0], item[1], item[2]],
                    itemStyle: {
                        opacity: 0.8
                    }
                })),
                progressive: 1000,
                blurSize: sigma.value * 100,
                coordinateSystem: 'cartesian2d',
                label: {
                    show: false
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
    };
    chartInstance.setOption(option, true);
};
const initChart = () => {
    if (!chartEl.value) {
        console.error('Chart container not found');
        return;
    }
    chartInstance = echarts.init(chartEl.value);
    updateChart();
    window.addEventListener('resize', () => {
        chartInstance?.resize();
    });
};
onMounted(() => {
    initChart();
});
onBeforeUnmount(() => {
    chartInstance?.dispose();
    window.removeEventListener('resize', () => {
        chartInstance?.resize();
    });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['control-item']} */ ;
/** @type {__VLS_StyleScopedClasses['control-item']} */ ;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "heatmap-view" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "controls" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "control-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
const __VLS_0 = {}.ElSlider;
/** @type {[typeof __VLS_components.ElSlider, typeof __VLS_components.elSlider, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.gridSize),
    min: (10),
    max: (100),
    step: (5),
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.gridSize),
    min: (10),
    max: (100),
    step: (5),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "control-item" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
const __VLS_4 = {}.ElSlider;
/** @type {[typeof __VLS_components.ElSlider, typeof __VLS_components.elSlider, ]} */ ;
// @ts-ignore
const __VLS_5 = __VLS_asFunctionalComponent(__VLS_4, new __VLS_4({
    modelValue: (__VLS_ctx.sigma),
    min: (0.001),
    max: (0.01),
    step: (0.001),
}));
const __VLS_6 = __VLS_5({
    modelValue: (__VLS_ctx.sigma),
    min: (0.001),
    max: (0.01),
    step: (0.001),
}, ...__VLS_functionalComponentArgsRest(__VLS_5));
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "chart-container" },
});
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: "loading-overlay" },
    });
    const __VLS_8 = {}.ElIcon;
    /** @type {[typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ]} */ ;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent(__VLS_8, new __VLS_8({
        ...{ class: "is-loading" },
    }));
    const __VLS_10 = __VLS_9({
        ...{ class: "is-loading" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    __VLS_11.slots.default;
    const __VLS_12 = {}.Loading;
    /** @type {[typeof __VLS_components.Loading, ]} */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
    const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
    var __VLS_11;
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ref: "chartEl",
    ...{ class: "echarts-chart" },
});
/** @type {typeof __VLS_ctx.chartEl} */ ;
/** @type {__VLS_StyleScopedClasses['heatmap-view']} */ ;
/** @type {__VLS_StyleScopedClasses['controls']} */ ;
/** @type {__VLS_StyleScopedClasses['control-item']} */ ;
/** @type {__VLS_StyleScopedClasses['control-item']} */ ;
/** @type {__VLS_StyleScopedClasses['chart-container']} */ ;
/** @type {__VLS_StyleScopedClasses['loading-overlay']} */ ;
/** @type {__VLS_StyleScopedClasses['is-loading']} */ ;
/** @type {__VLS_StyleScopedClasses['echarts-chart']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Loading: Loading,
            loading: loading,
            gridSize: gridSize,
            sigma: sigma,
            chartEl: chartEl,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=HeatmapView.vue.js.map