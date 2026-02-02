// utils/color.ts
export function getContrastColor(hexcolor: string) {
    // 去掉 # 号
    const hex = hexcolor.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // YIQ 亮度算法
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 128 ? 'text-black' : 'text-white';
}