import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

function patch() {
    let html = fs.readFileSync(indexPath, 'utf-8');

    const inlineScriptRegex = /<script>([\s\S]*?__sveltekit_([\s\S]*?))<\/script>/;
    const match = html.match(inlineScriptRegex);

    // ... 之前的代码 (提取内联脚本的部分)

if (match) {
    let scriptContent = match[1];

    // --- 核心修复：路径漂白剂 ---
    // SvelteKit 启动时会寻找 __sveltekit_xxxx.start() 里的配置
    // 我们强制在脚本执行前，把所有的 /index.html 引用抹除掉
    const routerSanitizer = `
    (function() {
        // 1. 冻结 History API
        const noop = () => {};
        window.history.pushState = noop;
        window.history.replaceState = noop;

        // 2. 这里的黑魔法：拦截所有对路径的内部访问
        // 我们不改 location 自身，但我们劫持 SvelteKit 可能会用到的 URL 构造函数
        const OriginalURL = window.URL;
        window.URL = class extends OriginalURL {
            constructor(url, base) {
                if (typeof url === 'string' && url.includes('index.html')) {
                    url = url.replace('/index.html', '/');
                }
                super(url, base || window.location.href);
            }
        };
    })();
    `;

    // 修复变量挂载
    scriptContent = scriptContent.replace(/(__sveltekit_[a-zA-Z0-9]+)\s*=/g, 'window.$1 =');
    
    // 修复挂载点
    scriptContent = scriptContent.replace(
        'const element = document.currentScript.parentElement;',
        'const element = document.body;'
    );

    // --- 关键点：强制修正 SvelteKit 内部配置 ---
    // 让它以为 assets 和 base 都是当前相对目录
    scriptContent = scriptContent.replace(/base:\s*""/g, 'base: ""');
    scriptContent = scriptContent.replace(/assets:\s*""/g, 'assets: ""');

    const fileName = 'chrome-init.js';
    // 将漂白逻辑注入到最顶部
    fs.writeFileSync(path.join(distDir, fileName), routerSanitizer + scriptContent);
    
    html = html.replace(inlineScriptRegex, `<script type="module" src="./${fileName}"></script>`);
}

// ... 剩下的路径替换逻辑保持不变

    // 4. 【暴力替换】把所有开头的斜杠全部去掉，确保它们相对于当前 index.html
    // 假设你在 svelte.config.js 里设置了 appDir: 'internal'
    html = html.replace(/(src|href)="\//g, '$1="./');
    html = html.replace(/url\(\//g, 'url(./');

    fs.writeFileSync(indexPath, html);
    console.log('✅ 路径已固化，刷新防御已就位');
}

patch();