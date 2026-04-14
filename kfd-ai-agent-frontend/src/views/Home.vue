<template>
  <main class="home-page">
    <section class="hero-section">
      <div class="hero-copy">
        <p class="eyebrow">PROJECT OVERVIEW</p>
        <h1 class="hero-title">Spring AI 智能体项目</h1>
        <p class="hero-description">
          这是一个围绕情感咨询与通用智能体场景构建的完整项目，包含 Spring Boot 后端、Vue 3
          前端、RAG、Tool Calling、MCP 子模块与 SSE 流式响应。
        </p>

        <div class="hero-tags">
          <span>Spring Boot 3</span>
          <span>Spring AI</span>
          <span>Vue 3</span>
          <span>SSE</span>
          <span>MCP</span>
        </div>
      </div>

      <div class="hero-panel">
        <div class="panel-title">项目组成</div>
        <div class="panel-grid">
          <article>
            <strong>后端服务</strong>
            <p>负责对话、工具调用、RAG、智能体执行链路与接口输出。</p>
          </article>
          <article>
            <strong>前端页面</strong>
            <p>负责聊天交互、SSE 消息展示与应用入口组织。</p>
          </article>
          <article>
            <strong>MCP 子模块</strong>
            <p>提供独立的图片搜索服务，便于后续扩展接入。</p>
          </article>
        </div>
      </div>
    </section>

    <section class="workspace-grid">
      <article class="entry-card warm-card" @click="navigateTo('/love-master')">
        <div class="entry-header">
          <span class="entry-tag">业务应用</span>
          <span class="entry-icon">恋</span>
        </div>
        <h2>AI 恋爱顾问</h2>
        <p>面向情感咨询场景，支持多轮对话、上下文承接与流式回复展示。</p>
        <div class="entry-points">
          <span>多轮对话</span>
          <span>上下文记忆</span>
          <span>SSE 响应</span>
        </div>
        <button class="entry-button" type="button">进入页面</button>
      </article>

      <article class="entry-card cool-card" @click="navigateTo('/super-agent')">
        <div class="entry-header">
          <span class="entry-tag">智能体应用</span>
          <span class="entry-icon">智</span>
        </div>
        <h2>AI 超级智能体</h2>
        <p>用于展示通用任务处理过程，适合观察更长链路的输出与执行反馈。</p>
        <div class="entry-points">
          <span>任务处理</span>
          <span>过程输出</span>
          <span>工具调用</span>
        </div>
        <button class="entry-button" type="button">进入页面</button>
      </article>
    </section>

    <section class="feature-grid">
      <article class="feature-card">
        <span class="feature-index">01</span>
        <h3>核心能力</h3>
        <p>项目已接入对话、RAG、工具调用、结构化输出与流式接口等关键能力。</p>
      </article>
      <article class="feature-card">
        <span class="feature-index">02</span>
        <h3>模块结构</h3>
        <p>前后端分离，主服务与 MCP 子模块拆分清晰，便于继续开发与部署。</p>
      </article>
      <article class="feature-card">
        <span class="feature-index">03</span>
        <h3>项目用途</h3>
        <p>既可以作为学习 Spring AI 的参考项目，也可以继续扩展成自己的完整应用。</p>
      </article>
    </section>

    <AppFooter />
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import AppFooter from '../components/AppFooter.vue'

useHead({
  title: 'Spring AI 智能体项目',
  meta: [
    {
      name: 'description',
      content: '基于 Spring AI 的完整项目，包含多轮对话、RAG、Tool Calling、MCP 与 SSE 流式交互。'
    },
    {
      name: 'keywords',
      content: 'Spring AI, RAG, Tool Calling, MCP, SSE, 智能体, Vue 3'
    }
  ]
})

const router = useRouter()

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: relative;
}

.home-page::before,
.home-page::after {
  content: '';
  position: fixed;
  inset: auto;
  pointer-events: none;
  border-radius: 50%;
  filter: blur(18px);
}

.home-page::before {
  top: 72px;
  right: 4%;
  width: 240px;
  height: 240px;
  background: rgba(224, 122, 79, 0.14);
}

.home-page::after {
  left: 6%;
  bottom: 120px;
  width: 300px;
  height: 300px;
  background: rgba(15, 108, 120, 0.12);
}

.hero-section,
.workspace-grid,
.feature-grid {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero-section {
  display: grid;
  gap: 24px;
  grid-template-columns: minmax(0, 1.4fr) minmax(340px, 0.9fr);
  align-items: stretch;
}

.hero-copy,
.hero-panel,
.entry-card,
.feature-card {
  border: 1px solid rgba(18, 49, 78, 0.08);
  backdrop-filter: blur(16px);
  box-shadow: var(--shadow-soft);
}

.hero-copy {
  padding: 38px;
  border-radius: 32px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.88), rgba(255, 248, 241, 0.92));
}

.eyebrow {
  margin: 0 0 14px;
  color: #0f6c78;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.hero-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 4vw, 4rem);
  line-height: 1.08;
  letter-spacing: -0.03em;
}

.hero-description {
  margin: 20px 0 0;
  max-width: 720px;
  font-size: 1.04rem;
  line-height: 1.9;
  color: var(--color-text-muted);
}

.hero-tags {
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.hero-tags span,
.entry-points span {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 0.92rem;
}

.hero-tags span {
  background: rgba(15, 108, 120, 0.08);
  color: #0f5260;
}

.hero-panel {
  padding: 28px;
  border-radius: 28px;
  background: linear-gradient(160deg, rgba(20, 32, 51, 0.95), rgba(32, 56, 86, 0.94));
  color: #f4f8fc;
}

.panel-title {
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: rgba(255, 255, 255, 0.7);
}

.panel-grid {
  margin-top: 18px;
  display: grid;
  gap: 16px;
}

.panel-grid article {
  padding: 18px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.panel-grid strong {
  display: inline-block;
  margin-bottom: 8px;
  font-size: 1rem;
  color: #ffd8bd;
}

.panel-grid p {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.75;
}

.workspace-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.entry-card {
  padding: 28px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.84);
  transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;
}

.entry-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
}

.warm-card:hover {
  border-color: rgba(224, 122, 79, 0.24);
}

.cool-card:hover {
  border-color: rgba(15, 108, 120, 0.24);
}

.entry-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 26px;
}

.entry-tag {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(18, 49, 78, 0.06);
  font-size: 0.9rem;
  color: #425269;
}

.entry-icon {
  width: 52px;
  height: 52px;
  border-radius: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
}

.warm-card .entry-icon {
  background: linear-gradient(135deg, #e4708a, #ff9a7d);
  box-shadow: 0 14px 30px rgba(228, 112, 138, 0.28);
}

.cool-card .entry-icon {
  background: linear-gradient(135deg, #0f6c78, #365f94);
  box-shadow: 0 14px 30px rgba(15, 108, 120, 0.28);
}

.entry-card h2 {
  margin: 0;
  font-size: 1.8rem;
  line-height: 1.2;
}

.entry-card p {
  margin: 14px 0 0;
  color: var(--color-text-muted);
  line-height: 1.9;
}

.entry-points {
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.warm-card .entry-points span {
  background: rgba(228, 112, 138, 0.1);
  color: #a04c69;
}

.cool-card .entry-points span {
  background: rgba(15, 108, 120, 0.1);
  color: #0c5c67;
}

.entry-button {
  margin-top: 28px;
  width: 100%;
  padding: 14px 18px;
  border-radius: 18px;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #162033, #27456c);
  transition: transform 0.22s ease, opacity 0.22s ease;
}

.entry-button:hover {
  transform: translateY(-1px);
  opacity: 0.94;
}

.feature-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.feature-card {
  padding: 24px;
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.78);
}

.feature-index {
  display: inline-flex;
  min-width: 48px;
  height: 38px;
  padding: 0 12px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-family: var(--font-display);
  font-weight: 700;
}

.feature-card h3 {
  margin: 16px 0 10px;
  font-size: 1.2rem;
}

.feature-card p {
  margin: 0;
  color: var(--color-text-muted);
  line-height: 1.8;
}

@media (max-width: 980px) {
  .hero-section,
  .workspace-grid,
  .feature-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .home-page {
    padding: 18px;
    gap: 20px;
  }

  .hero-copy,
  .hero-panel,
  .entry-card,
  .feature-card {
    padding: 22px;
    border-radius: 24px;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .entry-card h2 {
    font-size: 1.52rem;
  }
}
</style>
