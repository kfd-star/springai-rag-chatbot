<template>
  <footer class="app-footer">
    <div class="footer-inner">
      <div class="footer-block">
        <p class="footer-title">Spring AI 智能体项目</p>
        <p class="footer-text">
          前端基于 Vue 3 + Vite，负责页面路由、聊天交互与 SSE 流式消息展示。
        </p>
      </div>

      <div class="footer-tags">
        <span>Vue 3</span>
        <span>Vite</span>
        <span>SSE</span>
        <span>Axios</span>
      </div>
    </div>

    <div class="footer-bottom">© {{ currentYear }} Spring AI Project</div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.app-footer {
  margin-top: auto;
  padding: 22px 24px 24px;
  background: rgba(255, 255, 255, 0.66);
  border-top: 1px solid rgba(18, 49, 78, 0.08);
  backdrop-filter: blur(14px);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.footer-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #1f2f45;
}

.footer-text {
  margin: 8px 0 0;
  color: #5f6c82;
  line-height: 1.7;
}

.footer-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.footer-tags span {
  padding: 8px 12px;
  border-radius: 999px;
  background: #f3f7fb;
  color: #243247;
  font-size: 0.9rem;
}

.footer-bottom {
  max-width: 1200px;
  margin: 18px auto 0;
  padding-top: 18px;
  border-top: 1px solid rgba(18, 49, 78, 0.08);
  color: #718096;
  font-size: 0.9rem;
}

@media (max-width: 860px) {
  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 640px) {
  .app-footer {
    padding: 20px 16px 22px;
  }
}
</style>
