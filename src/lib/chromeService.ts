// // src/lib/chromeService.ts

// // 模拟数据
// const MOCK_SITES = [
//   { title: 'GitHub', url: 'https://github.com' },
//   { title: 'Svelte', url: 'https://svelte.dev' },
//   { title: 'UnoCSS', url: 'https://unocss.dev' }
// ];

// export const chromeService = {
//   /**
//    * 获取最常访问网站
//    */
//   getTopSites: async (): Promise<chrome.topSites.MostVisitedURL[]> => {
//     if (typeof chrome !== 'undefined' && chrome.topSites) {
//       return new Promise((resolve) => chrome.topSites.get(resolve));
//     }
//     return MOCK_SITES;
//   },

//   /**
//    * 持久化存储数据 (支持模拟)
//    */
//   storage: {
//     get: async (key: string): Promise<unknown> => {
//       if (typeof chrome !== 'undefined' && chrome.storage) {
//         return new Promise((resolve) => {
//           chrome.storage.local.get([key], (result) => resolve(result[key]));
//         });
//       }
//       // 本地预览环境：使用浏览器原生的 localStorage 模拟
//       const data = localStorage.getItem(`mock_storage_${key}`);
//       return data ? JSON.parse(data) : null;
//     },

//     set: async (key: string, value: unknown): Promise<void> => {
//       if (typeof chrome !== 'undefined' && chrome.storage) {
//         return new Promise((resolve) => {
//           chrome.storage.local.set({ [key]: value }, resolve);
//         });
//       }
//       // 本地预览环境
//       localStorage.setItem(`mock_storage_${key}`, JSON.stringify(value));
//     }
//   }
// };