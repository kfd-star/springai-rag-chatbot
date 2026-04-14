<template>
  <main class="chat-page love-page">
    <div class="page-shell">
      <header class="page-header">
        <button class="back-button" type="button" @click="goBack">返回首页</button>

        <div class="title-block">
          <p class="eyebrow">PROJECT PAGE</p>
          <h1>AI 恋爱顾问</h1>
          <p>情感咨询场景页面，用于展示多轮对话、上下文承接与流式回复效果。</p>
        </div>

        <div class="header-pills">
          <span class="pill">SSE 实时响应</span>
          <span class="pill">{{ connectionText }}</span>
          <span class="pill subtle">会话 {{ shortChatId }}</span>
        </div>
      </header>

      <section class="workspace">
        <aside class="guide-panel">
          <span class="panel-title">页面说明</span>
          <h2>适合测试情感咨询类对话</h2>
          <p>
            可以输入关系背景、最近聊天内容或当前困扰，用来观察模型在连续对话中的回复表现。
          </p>
          <div class="tip-list">
            <span>聊天开场</span>
            <span>回复建议</span>
            <span>约会安排</span>
            <span>关系推进</span>
          </div>
        </aside>

        <section class="chat-panel">
          <ChatRoom
            :messages="messages"
            :connection-status="connectionStatus"
            ai-type="love"
            @send-message="sendMessage"
          />
        </section>
      </section>
    </div>

    <AppFooter />
  </main>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import ChatRoom from '../components/ChatRoom.vue'
import AppFooter from '../components/AppFooter.vue'
import { chatWithLoveApp } from '../api'

useHead({
  title: 'AI 恋爱顾问 - Spring AI 智能体实战项目',
  meta: [
    {
      name: 'description',
      content: '基于 Spring AI 的情感咨询聊天页，支持多轮对话与 SSE 流式响应。'
    },
    {
      name: 'keywords',
      content: 'AI 恋爱顾问, 情感咨询, Spring AI, SSE'
    }
  ]
})

const router = useRouter()
const messages = ref([])
const chatId = ref('')
const connectionStatus = ref('disconnected')
let eventSource = null

const shortChatId = computed(() => (chatId.value ? chatId.value.slice(0, 12) : '--'))
const connectionText = computed(() => {
  if (connectionStatus.value === 'connecting') return '生成中'
  if (connectionStatus.value === 'error') return '连接异常'
  return '等待提问'
})

const generateChatId = () => `love-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`

const addMessage = (content, isUser, type = '') => {
  messages.value.push({
    content,
    isUser,
    type,
    time: Date.now()
  })
}

const closeStream = () => {
  if (eventSource) {
    eventSource.close()
    eventSource = null
  }
}

const sendMessage = (message) => {
  addMessage(message, true, 'user-question')
  closeStream()

  const aiMessageIndex = messages.value.length
  addMessage('', false, 'ai-answer')

  connectionStatus.value = 'connecting'
  eventSource = chatWithLoveApp(message, chatId.value)

  eventSource.onmessage = (event) => {
    const data = event.data

    if (data && data !== '[DONE]' && aiMessageIndex < messages.value.length) {
      messages.value[aiMessageIndex].content += data
    }

    if (data === '[DONE]') {
      if (aiMessageIndex < messages.value.length) {
        messages.value[aiMessageIndex].type = 'ai-final'
      }
      connectionStatus.value = 'disconnected'
      closeStream()
    }
  }

  eventSource.onerror = () => {
    connectionStatus.value = 'error'
    if (aiMessageIndex < messages.value.length) {
      const fallback = messages.value[aiMessageIndex]
      fallback.content = fallback.content || '连接出现异常，请稍后重试。'
      fallback.type = 'ai-error'
    }
    closeStream()
  }
}

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  chatId.value = generateChatId()
  addMessage(
    '你好，我是 AI 恋爱顾问。你可以告诉我你的关系背景、最近的聊天内容，或者你现在最想解决的情感问题。',
    false,
    'ai-final'
  )
})

onBeforeUnmount(() => {
  closeStream()
})
</script>

<style scoped>
.chat-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 28px;
  padding: 28px;
}

.love-page {
  background:
    radial-gradient(circle at top right, rgba(228, 112, 138, 0.14), transparent 24%),
    radial-gradient(circle at bottom left, rgba(255, 154, 125, 0.14), transparent 26%),
    transparent;
}

.page-shell {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 22px;
  flex: 1;
}

.page-header {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 18px;
  padding: 24px;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(18, 49, 78, 0.08);
  box-shadow: var(--shadow-soft);
  backdrop-filter: blur(16px);
  align-items: start;
}

.back-button,
.pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
}

.back-button {
  height: fit-content;
  padding: 12px 16px;
  background: #142033;
  color: #fff;
  font-weight: 700;
}

.title-block h1 {
  margin: 6px 0 10px;
  font-size: clamp(2rem, 3vw, 2.8rem);
  line-height: 1.1;
}

.title-block p:last-child {
  margin: 0;
  color: #66768c;
  line-height: 1.8;
  max-width: 680px;
}

.eyebrow,
.panel-title {
  display: inline-flex;
  color: #c05877;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.16em;
}

.header-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}

.pill {
  padding: 10px 14px;
  background: rgba(228, 112, 138, 0.1);
  color: #a34f69;
  font-size: 0.9rem;
}

.pill.subtle {
  background: rgba(18, 49, 78, 0.06);
  color: #516276;
}

.workspace {
  display: grid;
  grid-template-columns: minmax(260px, 300px) minmax(0, 1fr);
  gap: 20px;
  align-items: start;
}

.guide-panel {
  padding: 24px;
  border-radius: 28px;
  background: linear-gradient(160deg, rgba(255, 247, 247, 0.92), rgba(255, 240, 235, 0.92));
  border: 1px solid rgba(228, 112, 138, 0.12);
  box-shadow: var(--shadow-soft);
}

.guide-panel h2 {
  margin: 12px 0 10px;
  font-size: 1.45rem;
  line-height: 1.3;
}

.guide-panel p {
  margin: 0;
  color: #6d7686;
  line-height: 1.8;
}

.tip-list {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tip-list span {
  display: inline-flex;
  padding: 9px 12px;
  border-radius: 999px;
  background: rgba(228, 112, 138, 0.12);
  color: #a34f69;
  font-size: 0.9rem;
}

.chat-panel {
  min-width: 0;
}

@media (max-width: 1080px) {
  .page-header,
  .workspace {
    grid-template-columns: 1fr;
  }

  .header-pills {
    justify-content: flex-start;
  }
}

@media (max-width: 640px) {
  .chat-page {
    padding: 18px;
    gap: 18px;
  }

  .page-header,
  .guide-panel {
    padding: 20px;
    border-radius: 24px;
  }

  .title-block h1 {
    font-size: 2rem;
  }
}
</style>
