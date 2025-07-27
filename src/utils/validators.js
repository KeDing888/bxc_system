// src/modules/process-layout/utils/validators.ts
export const validateLayout = (passes) => {
    let prevEnd = 0;
    passes.forEach((pass, index) => {
        // 基础校验
        if (pass.startX >= pass.endX) {
            throw `道次 ${index + 1}: 终点必须大于起点`;
        }
        // 连续性校验
        if (index > 0 && pass.startX !== prevEnd) {
            throw `道次 ${index + 1}: 起点必须等于前一道次终点 (当前: ${pass.startX}, 应等于: ${prevEnd})`;
        }
        prevEnd = pass.endX;
    });
};
//# sourceMappingURL=validators.js.map