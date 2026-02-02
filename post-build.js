import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

if (fs.existsSync(indexPath)) {
  let html = fs.readFileSync(indexPath, 'utf-8');

  // 1. 匹配那段内联脚本
  const inlineScriptRegex = /<script>([\s\S]*?__sveltekit_([\s\S]*?))<\/script>/;
  const match = html.match(inlineScriptRegex);

  if (match) {
    let scriptContent = match[1];

    // 核心修复 1: 全局变量
    scriptContent = scriptContent.replace(/(__sveltekit_[a-zA-Z0-9]+)\s*=/g, 'window.$1 =');

    // 核心修复 2: 模拟 element
    scriptContent = scriptContent.replace(
      'const element = document.currentScript.parentElement;',
      'const element = document.body;'
    );

    // // --- 核心修复 3: 路由路径修正 ---
    // // 强制 base 路径，防止 SvelteKit 找不到 index.html
    // scriptContent = scriptContent.replace(
    //   'base: ""',
    //   'base: window.location.pathname.replace(/\\/[^\\/]*$/, "")'
    // );

    // // 核心修复 4: 路径补丁
    // scriptContent = scriptContent.replace(/import\s*\("\//g, 'import("./');

    // 在 post-build.js 中找到 base: "" 的替换逻辑，改为：
    scriptContent = scriptContent.replace(
      'base: ""',
      'base: ""' // 保持为空，但我们要配合下面的全局重定向
    );

    // 在 chrome-init.js 的内容开头强制注入一段逻辑，重置路由路径
    const routerFix = `
  if (window.location.pathname.endsWith('/index.html')) {
    window.history.replaceState(null, '', './');
  }
`;
    scriptContent = routerFix + scriptContent;

    const fileName = 'chrome-init.js';
    fs.writeFileSync(path.join(distDir, fileName), scriptContent);

    // 2. 替换 HTML 
    html = html.replace(inlineScriptRegex, `<script type="module" src="./${fileName}"></script>`);

    // 3. 修复 HTML 中其他的绝对路径
    html = html.replace(/(src|href)="\/app\//g, '$1="app/');

    fs.writeFileSync(indexPath, html);
    console.log('✅ [Fixed]: 全局变量与路径修复完成！');
  }
}