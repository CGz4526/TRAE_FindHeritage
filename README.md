# 寻遗记 · 点亮中国非遗版图

> AI 非遗知识闯关游戏 · TRAE AI 创造力大赛 · 非遗创新赛道

「寻遗记」是一款**打开即玩、零安装、零注册**的 AI 非遗知识闯关 Web 游戏。在中国地图上选择省份、答题闯关、收集非遗图鉴——2 分钟一局的轻量游戏，玩着玩着就记住了家乡与全国的非遗知识。

## ✨ 核心玩法

- **选省闯关** — 34 省份（含港澳台）各有 5 道非遗题，覆盖十大非遗类别，3 题即过关，答错不惩罚可无限重试。
- **道具助阵** — 提示卡、五五开、跳过、复活四种道具，降低闯关挫败感。
- **收集图鉴** — 点亮省份解锁对应非遗图鉴，未解锁灰显锁定，支持筛选与详情查看。
- **成就系统** — 首次过关、全图点亮、连续答对、零失误通关等多项成就。
- **进度持久化** — 已点亮省份、图鉴、道具、成就、答题统计全部本地存储，刷新不丢失。
- **一键分享** — 生成战绩分享文案，支持 Web Share API。

## 🎨 设计风格

现代东方美学：墨黑 + 宣纸白为底，紫调光效为魂，朱砂红仅用于关键节点的克制点缀。视觉灵感取自水墨晕染、印章纹样、卷轴展开与镂空窗格。详见 [DESIGN-GUIDE.md](DESIGN-GUIDE.md)。

## 🛠️ 技术栈

| 层 | 技术 |
|----|------|
| 框架 | React 18 + TypeScript |
| 构建 | Vite 5 |
| 样式 | Tailwind CSS + CSS Variables（支持主题切换） |
| 地图 | ECharts 中国地图 |
| 动效 | Framer Motion |
| 状态 | Zustand + localStorage 持久化 |
| 路由 | React Router |

题库采用**离线批量生成**策略：由大模型经 TRAE 生成 JSON 题库并人工抽样校验，打包为静态资源，运行时随机抽题，零延迟、零调用成本。

## 🚀 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产产物
npm run build

# 预览构建产物
npm run preview
```

开发服务器默认运行在 `http://localhost:5173`。

## 📁 项目结构

```
src/
├── components/       # 地图、答题弹窗、背景、引导等组件
│   ├── MapView.tsx       # ECharts 中国地图
│   ├── QuizModal.tsx     # 答题闯关弹窗
│   ├── AuroraBackground.tsx
│   └── Onboarding.tsx    # 新手引导
├── pages/            # 页面
│   ├── LandingPage.tsx      # 宣传落地页
│   ├── CollectionPage.tsx   # 非遗图鉴收集
│   └── AchievementsPage.tsx # 成就墙
├── data/             # 静态数据（题库 / 图鉴 / 成就 / 省份）
├── store/            # Zustand 状态与本地存档
└── types/            # TypeScript 类型定义
```

## 📖 相关文档

- [项目计划书.md](项目计划书.md) — 完整的产品规划、技术架构与开发里程碑
- [DESIGN-GUIDE.md](DESIGN-GUIDE.md) — 设计系统与视觉规范

## 📄 许可

本项目为 TRAE AI 创造力大赛参赛作品，仅供学习交流。
