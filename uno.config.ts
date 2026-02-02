// uno.config.ts

// 预设 svelte 提取器
// Supports extracting classes from class: directive.
// <div class:text-orange-400={foo} />
import extractorSvelte from '@unocss/extractor-svelte'

import presetRemToPx from '@unocss/preset-rem-to-px'

// import myIcons from './src/iconify/custom.json' assert { type: 'json' }

// UnoCSS 核心配置函数
import {
    defineConfig,

    presetAttributify,
    presetIcons,
    presetTypography,
    presetWebFonts,

    presetWind4,

    transformerDirectives,  // transformerdirectives 预设, 支持 @apply @screen theme 等指令
    transformerVariantGroup,
    transformerAttributifyJsx,
} from 'unocss'

export default defineConfig({
    presets: [
        presetRemToPx({
            baseFontSize: 16,
        }),
        presetAttributify({
            strict: false,
        }),
        presetIcons({
            scale: 1.2,
            warn: true,
            prefix: 'i-',
            extraProperties: {
                display: 'inline-block'
            },
            // collections: {
            //     // 自定义图标集合
            //     // 'my-icons' 就是你的图标前缀
            //     // 你可以根据 icons.json 的内容直接传入
            //     'my-icons': () => myIcons,
            // },
        }),
        presetTypography(),
        presetWebFonts({
            fonts: {
                sans: 'Roboto',
                serif: 'Merriweather',
                mono: 'Fira Code',
            },
        }),
        presetWind4(),
    ],
    transformers: [
        transformerVariantGroup(),
        transformerDirectives(),
        transformerAttributifyJsx(),
    ],
    shortcuts: [
        // Define your shortcuts here
        {
            // 垂直水平居中
            'center-center': 'flex justify-center items-center',
            // 水平居中
            'center-x': 'flex justify-center',
            // 垂直居中
            'center-y': 'flex items-center',
            // 绝对居中
            'center': 'absolute inset-0 flex justify-center items-center',
            // 分开两边
            'space-x': 'flex justify-between',
            // 放在最后
            'end': 'flex justify-end',
            // 放在最前面
            'start': 'flex justify-start',
            // 字体 Smiley Sans
            'smiley': 'font-["SmileySans"]',
        }
    ],
    rules: [
        // Define your custom rules here
        ['m-1', { margin: '0.25rem' }],
        [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) / 4}rem` })],
        [/^p-(\d+)$/, match => ({ padding: `${Number(match[1]) / 4}rem` })],
    ],
    extractors: [
        // Define your extractors here
        extractorSvelte(),
    ],
    // 自定义主题, 自定义字体, 没有用不知道为什么, 使用 shortcuts 代替
    // theme: {
    //     fontFamily: {
    //         // 'Smiley Sans' 必须和 CSS 里的 font-family 一致
    //         'smiley': '"SmileySans", sans-serif',
    //     },
    // },
})