# Spring AI RAG Chatbot

一个基于 Spring AI 框架构建的智能对话系统，集成了 RAG 知识库、工具调用、MCP 服务等企业级 AI 应用特性。

## ✨ 核心特性

### 🤖 多模型支持
- 集成阿里云通义千问（DashScope）大模型
- 支持本地 Ollama 模型部署
- 提供统一的 ChatModel 接口，便于模型切换

### 💬 智能对话
- 基于 Spring AI 的 ChatMemory 实现多轮对话记忆
- 使用 Kryo 高性能序列化实现对话持久化
- 支持自定义 Advisor 增强对话能力

### 📚 RAG 知识库
- 完整的 RAG（检索增强生成）实现
- 支持 Markdown 文档自动加载和切分
- 集成 PGvector 向量数据库进行语义检索
- 实现查询重写和多查询扩展优化检索效果
- 自动元信息标注提升检索准确率

### 🛠️ 工具调用
- 实现 6 种实用工具：联网搜索、网页抓取、文件操作、资源下载、PDF 生成、终端操作
- 基于 Spring AI 的 @Tool 注解实现
- 集中式工具注册管理

### 🔌 MCP 服务
- 开发图片搜索 MCP 服务（Pexels API）
- 集成高德地图 MCP 服务
- 支持 Stdio 和 SSE 双传输模式

### 🤖 智能体架构
- 实现分层智能体基础架构
- 支持状态管理和步骤控制
- 最大步骤限制防止死循环
- 基于 ReAct 模式的自主规划能力

### 🌊 流式响应
- 使用 SseEmitter 实现 SSE 流式接口
- CompletableFuture 异步处理提升响应速度
- 实时输出 AI 推理过程

## 🏗️ 技术架构

### 后端技术栈
- **框架**: Spring Boot 3.4.4 + Java 21
- **AI 框架**: Spring AI 1.0.0 + Spring AI Alibaba 1.0.0.2
- **向量数据库**: PostgreSQL + PGvector
- **序列化**: Kryo 5.6.2
- **工具库**: Hutool, Jsoup, iText
- **API 文档**: Knife4j

### 前端技术栈
- **框架**: Vue 3 + Vite
- **路由**: Vue Router 4
- **HTTP**: Axios

## 🚀 快速开始

### 环境要求
- Java 21+
- Maven 3.9+
- Node.js 20+
- PostgreSQL 12+ (with pgvector extension)

### 配置说明

编辑 `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://your-host:5432/your-database
    username: your-username
    password: your-password
  ai:
    dashscope:
      api-key: your-dashscope-api-key

search-api:
  api-key: your-search-api-key
```

### 启动后端

```bash
git clone https://github.com/kfd-star/springai-rag-chatbot.git
cd springai-rag-chatbot
mvn clean package -DskipTests
java -jar target/kfd-ai-agent-0.0.1-SNAPSHOT.jar
```

### 启动前端

```bash
cd kfd-ai-agent-frontend
npm install
npm run dev
```

### 访问应用

- 前端: http://localhost:5173
- API 文档: http://localhost:8123/api/doc.html

## 📖 API 示例

```http
GET /api/ai/love_app/chat/sync?message=你好&chatId=user123
GET /api/ai/love_app/chat/sse?message=你好&chatId=user123
GET /api/ai/manus/chat?message=帮我制定约会计划
```

## 🎯 应用场景

- **智能客服**: 基于企业知识库的智能问答
- **内容助手**: 自动生成和优化文本内容
- **数据分析**: 结合工具调用进行数据查询和分析
- **任务自动化**: 通过智能体自主完成复杂任务

## 📝 开发计划

- [ ] 支持更多大模型（OpenAI、Claude 等）
- [ ] 实现对话历史管理界面
- [ ] 添加用户认证和权限管理
- [ ] 优化 RAG 检索算法
- [ ] 支持多模态输入（图片、语音）

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 开源协议

本项目采用 MIT 协议开源。

## 🙏 致谢

- [Spring AI](https://spring.io/projects/spring-ai)
- [Alibaba Cloud](https://www.aliyun.com/)
- [PGvector](https://github.com/pgvector/pgvector)

---

⭐ 如果这个项目对你有帮助，欢迎 Star！