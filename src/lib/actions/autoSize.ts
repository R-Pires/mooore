// autoSize.ts
export function autoSizeAction(node: HTMLTextAreaElement) {
    function setHeight() {
        node.style.height = 'auto'; // 先重置高度，防止删减文字时高度不缩小
        node.style.height = `${node.clientHeight}px`;
    }

    node.addEventListener('input', setHeight);

    // 初始化高度（防止有默认值时高度不对）
    setHeight();

    return {
        destroy() {
            node.removeEventListener('input', setHeight);
        }
    };
}