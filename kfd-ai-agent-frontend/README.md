# AI 智能体前端

这是项目的前端部分，基于 Vue 3 和 Vite 开发，包含恋爱咨询应用与智能体对话页面。

## 功能说明

- AI 恋爱大师聊天页面
- AI 智能体聊天页面
- 基于 SSE 的流式消息展示
- 通过 `/api` 代理访问后端服务

## 技术栈

- Vue 3
- Vue Router
- Axios
- Vite

## 环境要求

- Node.js 20+
- npm 7+

## 安装依赖

```bash
npm install
```

## 启动开发环境

```bash
npm run dev
```

## 构建生产版本

```bash
npm run build
```

## 依赖的后端接口

- `/api/ai/love_app/chat/sse`
- `/api/ai/manus/chat`

默认后端地址为：

`http://localhost:8123`
