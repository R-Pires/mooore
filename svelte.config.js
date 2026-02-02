import adapter from '@sveltejs/adapter-static';
// import adapter from 'sveltekit-adapter-chrome-extension';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // 使用 vite 预处理器
  preprocess: vitePreprocess(),
  kit: {
    // 将适配器改为 static
    adapter: adapter({
      pages: 'dist',
      assets: 'dist',
      fallback: 'index.html', // 必须设置，确保单页应用正常
      precompress: false,
      strict: true
    }),
    // 将默认的 "_app" 修改为 "app" 或其他不带下划线的名称
    appDir: 'app',
    paths: {
      base: '', // 确保基础路径为空
      relative: true
    },
    // 尝试添加此配置（如果你的 SvelteKit 版本支持）
    inlineStyleThreshold: 0,
  },
};

export default config;
