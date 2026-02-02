// import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        /* tailwindcss(), */
        UnoCSS(),
        sveltekit(),
    ],
    build: {
        // 强制不进行内联，所有资源都作为独立文件
        assetsInlineLimit: 0,
        rollupOptions: {
            output: {
                // 去掉下划线前缀，防止 Chrome 插件权限问题
                chunkFileNames: 'assets/[name]-[hash].js',
                entryFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]'
            }
        }
    }
});