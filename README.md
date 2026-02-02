# 🚀 Beyond New Tab - 极简主义赛博插件

一个基于 **Svelte 5** + **SvelteKit** + **UnoCSS** 构建的 Chrome 高性能新标签页扩展。它不仅是一个搜索工具，更是一个充满细节的交互艺术品。

---

## ✨ 核心特性

- 🌌 **视差滚动背景**：基于 `scrollY` 驱动的 3D 深度感背景，随手滑动即是风景。
- 🌈 **Google 流光搜索框**：
  - **Google 四色无缝渐变**：聚焦时触发丝滑的品牌色循环动画。
  - **智能 Textarea**：支持 Enter 搜索、Ctrl+Enter 换行、高度自适应。
  - **极速唤醒**：按下 `/` 键自动聚焦，极致的极客体验。
- 🧊 **现代磨砂美学**：全局采用 Glassmorphism（玻璃拟态）设计，搭配自研的极简滚动条。
- 🤖 **自动化发布**：集成 GitHub Actions，推送 Tag 即可自动构建并发布 Release。

---

## 🛠️ 技术栈

- **框架**: [Svelte 5 (Runes)](https://svelte.dev/) - 响应式重塑，极致性能。
- **构建工具**: [Vite](https://vitejs.dev/) + SvelteKit。
- **样式**: [UnoCSS](https://unocss.dev/) - 原子化 CSS，即时编译。
- **工程化**: GitHub Actions + 自定义脚本处理 Chrome 插件安全策略 (CSP)。

---

## 📦 安装指南

由于本插件目前为开发者预览版，请按以下步骤手动安装：

1. **前往 [Releases](../../releases)** 页面。
2. 下载最新版本的 `extension.zip` 并解压。
3. 打开 Chrome 浏览器，访问 `chrome://extensions/`。
4. 开启右上角的 **"开发者模式" (Developer mode)**。
5. 点击 **"加载已解压的扩展程序" (Load unpacked)**。
6. 选择你刚才解压的文件夹，搞定！

---

## 👨‍💻 本地开发

如果你想在本项目基础上进行二次开发：

```bash
# 克隆项目
git clone [https://github.com/你的用户名/你的项目名.git](https://github.com/你的用户名/你的项目名.git)

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 编译并打包插件
npm run zip
