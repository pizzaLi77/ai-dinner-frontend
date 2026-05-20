# AI 晚餐决策搭子前端

uni-app + Vue3 + TypeScript MVP。

## 运行

```bash
npm install
npm run dev:h5
```

默认接口地址是 `http://localhost:8080`，可通过 `VITE_API_BASE_URL` 覆盖。

微信小程序：

```bash
npm run dev:mp-weixin
```

 ---
项目文件结构

根目录/
├── index.html           ← H5 入口 HTML
├── vite.config.ts       ← 构建配置（开发时代理 /api 到 localhost:8080）
├── package.json         ← 依赖清单
└── src/
├── main.ts          ← ★ 应用入口：创建 Vue 实例，挂载 Pinia
├── App.vue          ← ★ 根组件：全局样式 + 启动时埋点
├── pages.json       ← ★ 页面路由配置 + 底部 TabBar 定义
├── pages/           ← 5 个页面（每个页面对应一个 .vue 文件）
│   ├── index/       ← 首页：输入食材/状态/口味，点按钮生成推荐
│   ├── result/      ← 推荐结果页：展示 3 个晚餐方案
│   ├── favorites/   ← 收藏页：标签筛选 + 再来类似的
│   ├── history/     ← 历史页：按日期分组展示历史记录
│   └── profile/     ← 我的口味页：编辑口味画像
├── components/      ← 可复用组件（推荐卡片、标签选择器、空状态等）
├── api/             ← 后端接口封装（每个文件对应一类接口）
│   ├── request.ts   ← ★ 核心：统一请求封装，自动带 token、错误处理
│   ├── auth.ts      ← 微信登录
│   ├── recommendation.ts ← 生成推荐、提交反馈、换一个
│   ├── favorite.ts  ← 收藏相关接口
│   ├── history.ts   ← 历史相关接口
│   ├── profile.ts   ← 口味画像接口
│   └── analytics.ts ← 埋点统计
├── stores/          ← Pinia 状态管理（页面间共享的数据）
│   ├── user.ts      ← 用户登录态、画像数据
│   └── recommendation.ts ← 当前推荐请求和结果
├── types/           ← TypeScript 类型定义（数据结构长什么样）
└── utils/           ← 工具函数（常量、格式化、校验）