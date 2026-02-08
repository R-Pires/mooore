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
    paths: {
      relative: true
    },
    // prerender: {
    //   // 关键点：显式列出 /index.html，解决 "not found while crawling" 报错
    //   entries: ['*', '/index.html'],
    //   // 如果还有报错，可以开启这个忽略选项（可选）
    //   handleHttpError: 'warn'
    // },
    // 将默认的 "_app" 修改为 "app" 或其他不带下划线的名称
    appDir: 'internal',
    // paths: {
    //   base: '', // 确保基础路径为空
    //   relative: true
    // },
    // 尝试添加此配置（如果你的 SvelteKit 版本支持）
    inlineStyleThreshold: 0,
  },
};

export default config;
