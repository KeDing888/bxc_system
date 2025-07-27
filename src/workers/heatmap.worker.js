self.onmessage = (e) => {
    const { rawData, gridSize, sigma } = e.data;
    // 边界计算
    const xs = rawData.map(d => d.x);
    const ys = rawData.map(d => d.y);
    const xMin = Math.min(...xs);
    const xMax = Math.max(...xs);
    const yMin = Math.min(...ys);
    const yMax = Math.max(...ys);
    // 生成网格
    const grid = [];
    const xStep = (xMax - xMin) / gridSize;
    const yStep = (yMax - yMin) / gridSize;
    for (let i = 0; i <= gridSize; i++) {
        for (let j = 0; j <= gridSize; j++) {
            const x = xMin + i * xStep;
            const y = yMin + j * yStep;
            let sum = 0;
            let weightSum = 0;
            rawData.forEach(({ x: xi, y: yi, temperature }) => {
                const dx = x - xi;
                const dy = y - yi;
                const weight = Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
                sum += weight * temperature;
                weightSum += weight;
            });
            grid.push({
                x: Number(x.toFixed(5)),
                y: Number(y.toFixed(5)),
                value: weightSum > 0 ? Number((sum / weightSum).toFixed(2)) : 0
            });
        }
    }
    const message = {
        grid,
        xRange: [xMin, xMax],
        yRange: [yMin, yMax]
    };
    self.postMessage(message);
};
export {};
//# sourceMappingURL=heatmap.worker.js.map