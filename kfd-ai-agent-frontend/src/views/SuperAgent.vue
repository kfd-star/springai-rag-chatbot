<template>
  <main class="chat-page super-page">
    <div class="page-shell">
      <header class="page-header">
        <button class="back-button" type="button" @click="goBack">返回首页</button>

        <div class="title-block">
          <p class="eyebrow">PROJECT PAGE</p>
          <h1>AI 超级智能体</h1>
          <p>通用智能体页面，用于展示更长链路的任务处理与过程化输出。</p>
        </div>

        <div class="header-pills">
          <span class="pill">任务执行模式</span>
          <span class="pill">{{ connectionText }}</span>
        </div>
      </header>

      <section class="workspace">
        <aside class="guide-panel">
          <span class="panel-title">页面说明</span>
          <h2>适合测试任务处理与执行过程输出</h2>
          <p>
            可以输入任务目标、约束条件或预期结果，用来观察模型在较复杂问题下的输出过程。
          </p>
          <div class="tip-list">
            <span>任务拆解</span>
            <span>方案生成</span>
            <span>过程输出</span>
            <span>问题分析</span>
          </div>
        </aside>

        <section class="chat-panel">
          <ChatRoom
            :messages="messages"
            :connection-status="connectionStatus"
            ai-type="super"
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
import { chatWithManus } from '../api'

useHead({
  title: 'AI 超级智能体 - Spring AI 智能体实战项目',
  meta: [
    {
      name: 'description',
      content: '基于 Spring AI 的通用智能体聊天页，展示多步骤任务与 SSE 流式输出体验。'
    },
    {
      name: 'keywords',
      content: 'AI 智能体, Tool Calling, SSE, Spring AI'
    }
  ]
})

const router = useRouter()
const messages = ref([])
const connectionStatus = ref('disconnected')
let eventSource = null
const bubbleTimerIds = new Set()

const END_PUNCTUATION = ['。', '！', '？', '.', '!', '?']
const connectionText = computed(() => {
  if (connectionStatus.value === 'connecting') return '执行中'
  if (connectionStatus.value === 'error') return '连接异常'
  return '等待任务'
})

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

const clearBubbleTimers = () => {
  bubbleTimerIds.forEach((timerId) => window.clearTimeout(timerId))
  bubbleTimerIds.clear()
}

const sendMessage = (message) => {
  addMessage(message, true, 'user-question')
  clearBubbleTimers()
  closeStream()

  connectionStatus.value = 'connecting'

  let messageBuffer = []
  let lastBubbleTime = Date.now()
  let isFirstResponse = true
  const minBubbleInterval = 700

  const createBubble = (content, type = 'ai-answer') => {
    if (!content.trim()) return

    const now = Date.now()
    const timeSinceLastBubble = now - lastBubbleTime
    const pushBubble = () => addMessage(content, false, type)

    if (isFirstResponse) {
      pushBubble()
      isFirstResponse = false
    } else if (timeSinceLastBubble < minBubbleInterval) {
      const timerId = window.setTimeout(() => {
        pushBubble()
        bubbleTimerIds.delete(timerId)
      }, minBubbleInterval - timeSinceLastBubble)
      bubbleTimerIds.add(timerId)
    } else {
      pushBubble()
    }

    lastBubbleTime = now
    messageBuffer = []
  }

  eventSource = chatWithManus(message)

  eventSource.onmessage = (event) => {
    const data = event.data

    if (data && data !== '[DONE]') {
      messageBuffer.push(data)
      const combinedText = messageBuffer.join('')
      const lastChar = data.charAt(data.length - 1)
      const hasCompleteSentence = END_PUNCTUATION.includes(lastChar) || data.includes('\n\n')
      const isLongEnough = combinedText.length > 56

      if (hasCompleteSentence || isLongEnough) {
        createBubble(combinedText)
      }
    }

    if (data === '[DONE]') {
      if (messageBuffer.length > 0) {
        createBubble(messageBuffer.join(''), 'ai-final')
      }
      connectionStatus.value = 'disconnected'
      closeStream()
    }
  }

  eventSource.onerror = () => {
    connectionStatus.value = 'error'
    if (messageBuffer.length > 0) {
      createBubble(messageBuffer.join(''), 'ai-error')
    } else {
      addMessage('连接出现异常，请稍后重试。', false, 'ai-error')
    }
    closeStream()
  }
}

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  addMessage(
    '你好，我是 AI 超级智能体。你可以直接告诉我任务目标、限制条件和预期结果，我会尽量分步骤给出建议或方案。',
    false,
    'ai-final'
  )
})

onBeforeUnmount(() => {
  clearBubbleTimers()
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

.super-page {
  background:
    radial-gradient(circle at top right, rgba(15, 108, 120, 0.14), transparent 24%),
    radial-gradient(circle at bottom left, rgba(53, 95, 148, 0.13), transparent 26%),
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
  color: #0f6c78;
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
  background: rgba(15, 108, 120, 0.1);
  color: #0f6c78;
  font-size: 0.9rem;
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
  background: linear-gradient(160deg, rgba(242, 249, 250, 0.92), rgba(236, 243, 251, 0.92));
  border: 1px solid rgba(15, 108, 120, 0.12);
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
  background: rgba(15, 108, 120, 0.12);
  color: #0f6c78;
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
