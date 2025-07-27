import * as XLSX from 'xlsx';
export const parseDeviceExcel = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const devices = XLSX.utils.sheet_to_json(sheet, {
                    header: ['name', 'image', 'attributes'],
                    range: 1 // 跳过标题行
                }).map(device => ({
                    ...device,
                    attributes: JSON.parse(device.attributes)
                }));
                resolve(devices);
            }
            catch (error) {
                reject(new Error('Excel文件解析失败'));
            }
        };
        reader.onerror = () => reject(new Error('文件读取失败'));
        reader.readAsArrayBuffer(file);
    });
};
//# sourceMappingURL=excel.js.map