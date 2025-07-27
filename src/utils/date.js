// src/utils/date.ts
export const formatTime = (dateStr) => {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    return new Date(dateStr).toLocaleString('zh-CN', options);
};
//# sourceMappingURL=date.js.map