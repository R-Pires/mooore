// sync-version.js
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 1. 读取 package.json (此时 pnpm 已经把它改成了新版本)
const pkgPath = path.join(__dirname, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
const newVersion = pkg.version;

// 2. 定义 manifest.json 路径
const manifestPath = path.join(__dirname, 'static', 'manifest.json');

if (fs.existsSync(manifestPath)) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  // 3. 同步版本号
  manifest.version = newVersion;

  // 4. 写回文件 (保持格式整齐)
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');

  console.log(`✅ 已将 manifest.json 版本同步为: ${newVersion}`);
} else {
  console.error('❌ 未找到 manifest.json 文件！');
  process.exit(1);
}