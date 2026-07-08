# 设计工具使用指南（Agent 必读）

本文件为后续所有 agent 提供本项目的两个前端设计工具的正确使用方法。
**务必先读本文件再进行任何 UI/设计相关工作。**

---

## 一、uipro-cli（设计系统生成器）

### 它是什么
`uipro-cli` 是一个 **npm 包**（不是 TRAE Skill），用于一键生成项目设计系统（色彩/字体/排版/组件规范）的 Markdown 文档。
生成产物落地在 `design-system/{项目名}/MASTER.md`，作为全局设计真理源。

### 是否全局可用
**是。** 任何装有 Node + npx 的环境都能用，无需全局安装（`npm i -g` 在 Windows 常因 EPERM 失败，**不要尝试全局安装**）。
任何 agent、任何项目均可通过 npx 免安装调用。

### 正确调用方式（唯一推荐）
```bash
npx -y uipro-cli@latest init --ai trae
```
- `--ai trae` 指定生成 TRAE 友好的 Markdown 格式
- 交互式提示会问项目名、风格关键词等，按需回答
- 产物路径：`design-system/{项目名}/MASTER.md`

### 重要约定
- uipro-cli 默认可能输出 Retro-Futurism / 赛博朋克风格，**本项目（寻遗记）实际采用"现代东方美学"**：
  墨黑 `#0E0E12` + 宣纸白 `#F5F2EA` + 紫调 `#7C5CFF`（与 TRAE 主页呼应）+ 朱砂 `#C73E3A` 点缀。
- 若 uipro-cli 生成的 MASTER.md 风格与本项目冲突，**以本项目 `src/index.css` 的 CSS 变量为准**，MASTER.md 仅作参考。
- 用户偏好：镂空线性图标（非实心）、非方形可点击元素、黑白为主+紫色光效、避免大块亮色。

### 与 ui-ux-pro-max Skill 的区别（勿混淆）
- `ui-ux-pro-max`（位于 `.trae/skills/ui-ux-pro-max/`）是 **TRAE Skill**，提供 Python 脚本搜索设计规则库（67 风格/96 配色/57 字体对）。
  调用：`python skills/ui-ux-pro-max/scripts/search.py "<关键词>" --design-system -p "项目名"`
  **它是项目级 Skill**，仅当前项目可用，不跨项目。
- `uipro-cli` 是 **npm 包**，跨项目跨 agent 全局可用。
- 两者可互补：uipro-cli 生成骨架，ui-ux-pro-max 补充细节规则。

---

## 二、reactbits（reactbits.dev）动效/背景组件源码

### 核心铁律（最重要）
**必须使用官方源码，禁止凭印象复刻"相似"组件。**
reactbits 每个组件都附带完整可复制源码（MIT + Commons Clause 许可，项目内使用 OK，勿转卖组件本身）。

### 获取源码的正确方式 —— GitHub raw（唯一可靠）
**不要用 WebFetch 抓官网组件页**（`reactbits.dev/{分类}/{组件}`），官网 Code 标签页是 JS 动态渲染的，WebFetch 只能拿到 Preview/props，**拿不到源码**。

正确做法：直接抓 GitHub raw 文件。

#### 抓取模板
```
https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/content/{分类Pascal}/{组件Pascal}/{组件Pascal}.jsx
https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/content/{分类Pascal}/{组件Pascal}/{组件Pascal}.css
```

#### 命名映射规则
URL 连字符名 → GitHub PascalCase 目录名
- `soft-aurora` → `Backgrounds/SoftAurora/SoftAurora.jsx`
- `shiny-text` → `TextAnimations/ShinyText/ShinyText.jsx`
- `blob-cursor` → `Animations/BlobCursor/BlobCursor.jsx`

#### 四大分类（对应 URL 路径与目录名）
| 分类 | URL 段 | GitHub 目录 |
|---|---|---|
| 背景 | `/backgrounds/` | `Backgrounds/` |
| 动效 | `/animations/` | `Animations/` |
| 文字动效 | `/text-animations/` | `TextAnimations/` |
| UI 组件 | `/components/` | `Components/` |

#### 不确定目录文件名时，先列目录
```
https://api.github.com/repos/DavidHDev/react-bits/contents/src/content/{分类}/{组件}
```
返回 JSON 文件列表，再拼 raw URL。

### 本项目推荐组件（东方美学 + 紫调光效）
**背景类（首选，WebGL 着色器，传 `color`/`color1`/`color2` 即可调紫调）：**
- `Backgrounds/SoftAurora` —— 极光流动（已用于主页 AuroraBackground，可替换为官方版）
- `Backgrounds/Aurora`、`Backgrounds/ColorBends`、`Backgrounds/Grainient`、`Backgrounds/PlasmaWave`

**文字动效类：** `TextAnimations/ShinyText`（闪光）、`TextAnimations/SplitText`（逐字）、`TextAnimations/BlurText`
**过渡/丝带类：** `Animations/Ribbons`（飘带，贴合东方意象）、`Animations/MagicRings`、`Animations/Strands`

### 依赖（按组件而异，抓源码后必查 import）
- `ogl` —— 轻量 WebGL 库（SoftAurora/Aurora/ColorBends 等着色器背景必装）
- `gsap` —— 动画库
- `three` —— 3D 组件
- `matter.js` —— 物理粒子（如 SplashCursor）
- `lenis` —— 平滑滚动

安装：`npm install ogl gsap three matter.js lenis`（按需）

### 接入本项目流程
1. WebFetch 抓 `.jsx` + `.css` raw 源码
2. 落地到 `src/components/{组件名}.tsx`，按需改 TS 类型 / Tailwind
3. 安装 import 中标注的第三方依赖
4. 调 `color` props 为本项目紫调 `#7C5CFF` / `#A78BFA`
5. 尊重 `prefers-reduced-motion`，提供静态降级

---

## 三、Docker

本机有 Docker，可按需使用。当前项目为纯前端 Vite 应用，`npm run dev` 即可开发；
若需容器化部署，可基于 `node:20-alpine` 多阶段构建（build → nginx 托管 dist）。
未主动创建 Dockerfile，待有容器化需求时再添加。
