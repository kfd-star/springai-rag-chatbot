# Spring AI RAG Chatbot

一个聚焦情感咨询场景的 Spring AI 智能体实战项目，覆盖多轮对话、RAG 检索增强、Tool Calling、ReAct 智能体、MCP 扩展接入与 SSE 流式响应等完整能力链路。

它不是只展示单点能力的 Demo，而是把“模型接入 -> 对话记忆 -> 知识增强 -> 工具调用 -> 智能体执行 -> 前端流式展示”串成了一套可以直接运行和继续扩展的项目。

## 项目亮点速览

- 多轮对话记忆：基于 `ChatMemory` 与 `MessageChatMemoryAdvisor` 保持上下文连贯，支持持续对话。
- RAG 检索增强：支持 Markdown 文档导入、关键词元信息增强、查询重写与知识检索。
- Tool Calling 实战：内置联网搜索、网页抓取、资源下载、PDF 生成等工具能力。
- ReAct 智能体链路：支持“思考 -> 决策 -> 调工具 -> 继续执行”的多步骤任务闭环。
- MCP 独立扩展：内置图片搜索 MCP 子模块，支持 `SSE` 与 `Stdio` 两种传输模式。
- SSE 流式体验：后端流式返回生成结果与执行过程，前端可实时展示智能体响应。

## 核心能力概览

| 能力模块 | 项目内实现情况 |
| --- | --- |
| 多轮对话 | 基于 `ChatMemory` 与 Advisor 实现上下文记忆 |
| 结构化输出 | 支持将模型结果映射为结构化 Java 对象 |
| RAG 检索增强 | 支持文档加载、元信息增强、检索召回与查询重写 |
| Tool Calling | 支持搜索、抓取、下载、PDF 生成等工具调用 |
| ReAct 智能体 | 支持任务拆解、多步骤执行、状态控制与步数限制 |
| MCP 子模块 | 提供独立图片搜索 MCP 服务，支持 `SSE` 与 `Stdio` |
| SSE 流式响应 | 支持边生成边返回，前端可实时消费流式消息 |
| PGvector 扩展 | 当前仓库预留接入能力，默认链路未强绑定 |
| Ollama 扩展 | 当前仓库预留模型接入能力，可按需补充配置 |

## 项目组成

项目包含 3 个主要部分：

- `src/`：主后端服务，包含对话、RAG、工具调用、智能体和接口实现
- `kfd-ai-agent-frontend/`：Vue 3 前端页面，负责聊天交互与流式消息展示
- `kfd-image-search-mcp-server/`：独立图片搜索 MCP 服务，可单独运行或接入其他 AI 项目

## 技术栈

### 后端

- Spring Boot 3.4.4
- Java 21
- Spring AI 1.0.0
- Spring AI Alibaba
- Spring AI MCP
- PGvector / Vector Store

### 前端

- Vue 3
- Vite
- Vue Router
- Axios

### 其他组件

- Kryo
- Jsoup
- iText
- Knife4j

## 项目结构

```text
springai-rag-chatbot/
├─ src/
│  ├─ main/
│  │  ├─ java/com/kfd/kfdaiagent/
│  │  │  ├─ agent/        # 智能体执行链路
│  │  │  ├─ app/          # 业务应用封装
│  │  │  ├─ controller/   # HTTP / SSE 接口
│  │  │  ├─ rag/          # 文档加载、检索增强、查询重写
│  │  │  └─ tools/        # Tool Calling 工具集合
│  │  └─ resources/
│  │     ├─ document/     # RAG 文档
│  │     └─ application.yml
├─ kfd-ai-agent-frontend/         # 前端项目
└─ kfd-image-search-mcp-server/   # MCP 服务子项目
```

## 环境要求

- Java 21+
- Maven 3.9+
- Node.js 20+
- PostgreSQL 12+ with pgvector

## 配置说明

建议通过环境变量或本地覆盖配置文件管理敏感信息，不要把真实密钥提交到仓库。

示例配置如下：

```yaml
spring:
  datasource:
    url: ${DB_URL:jdbc:postgresql://localhost:5432/ai_agent}
    username: ${DB_USERNAME:postgres}
    password: ${DB_PASSWORD:change-me}
  ai:
    dashscope:
      api-key: ${DASHSCOPE_API_KEY:replace-with-your-dashscope-api-key}

search-api:
  api-key: ${SEARCH_API_KEY:replace-with-your-search-api-key}
```

## 快速启动

默认仓库已移除本地私有敏感配置，并关闭了主服务对本地 MCP 子模块的强依赖，首次运行时可以先启动主后端与前端。

### 1. 启动后端

```bash
git clone https://github.com/kfd-star/springai-rag-chatbot.git
cd springai-rag-chatbot
mvn clean package -DskipTests
java -jar target/kfd-ai-agent-0.0.1-SNAPSHOT.jar
```

### 2. 启动前端

```bash
cd kfd-ai-agent-frontend
npm install
npm run dev
```

### 3. 访问项目

- 前端地址：`http://localhost:5173`
- API 文档：`http://localhost:8123/api/doc.html`

## 示例接口

```http
GET /api/ai/love_app/chat/sync?message=你好&chatId=user123
GET /api/ai/love_app/chat/sse?message=你好&chatId=user123
GET /api/ai/manus/chat?message=帮我制定约会计划
```
