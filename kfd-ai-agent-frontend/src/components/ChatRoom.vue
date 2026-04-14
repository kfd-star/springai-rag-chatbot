<template>
  <div class="chat-card">
    <div class="chat-toolbar">
      <div class="assistant-meta">
        <div class="assistant-avatar">
          <AiAvatarFallback :type="aiType" />
        </div>
        <div>
          <div class="assistant-name">{{ assistantName }}</div>
          <div class="assistant-hint">{{ assistantHint }}</div>
        </div>
      </div>
      <div class="status-pill" :class="connectionStatus">{{ statusLabel }}</div>
    </div>

    <div class="chat-messages" ref="messagesContainer">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="message-row"
        :class="{ 'is-user': msg.isUser }"
      >
        <div v-if="!msg.isUser" class="avatar ai-avatar">
          <AiAvatarFallback :type="aiType" />
        </div>

        <article class="message-card" :class="[msg.isUser ? 'user-card' : 'ai-card', msg.type]">
          <div class="message-role">
            <span>{{ msg.isUser ? '我' : assistantName }}</span>
            <span>{{ formatTime(msg.time) }}</span>
          </div>
          <div class="message-content">
            {{ msg.content }}
            <span
              v-if="connectionStatus === 'connecting' && !msg.isUser && index === messages.length - 1"
              class="typing-dots"
            >
              <i></i><i></i><i></i>
            </span>
          </div>
        </article>

        <div v-if="msg.isUser" class="avatar user-avatar">
          <div class="user-avatar-badge">我</div>
        </div>
      </div>
    </div>

    <div class="composer">
      <textarea
        ref="inputRef"
        v-model="inputMessage"
        class="input-box"
        :placeholder="placeholderText"
        :disabled="connectionStatus === 'connecting'"
        rows="1"
        @input="resizeInput"
        @keydown.enter.exact.prevent="sendMessage"
      ></textarea>

      <div class="composer-footer">
        <span class="composer-hint-text">Enter 发送，Shift + Enter 换行</span>
        <button
          class="send-button"
          type="button"
          :disabled="connectionStatus === 'connecting' || !inputMessage.trim()"
          @click="sendMessage"
        >
          {{ connectionStatus === 'connecting' ? '生成中...' : '发送' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import AiAvatarFallback from './AiAvatarFallback.vue'

const props = defineProps({
  messages: {
    type: Array,
    default: () => []
  },
  connectionStatus: {
    type: String,
    default: 'disconnected'
  },
  aiType: {
    type: String,
    default: 'default'
  }
})

const emit = defineEmits(['send-message'])

const inputMessage = ref('')
const inputRef = ref(null)
const messagesContainer = ref(null)

const assistantName = computed(() => (props.aiType === 'love' ? 'AI 恋爱顾问' : 'AI 超级智能体'))
const assistantHint = computed(() =>
  props.aiType === 'love' ? '更适合情感建议与沟通表达' : '更适合任务执行与综合问答'
)
const placeholderText = computed(() =>
  props.aiType === 'love'
    ? '描述一下你的情况，比如当前关系、聊天困扰或你想达成的目标...'
    : '输入任务、问题或你想让智能体协助完成的事情...'
)
const statusLabel = computed(() => {
  if (props.connectionStatus === 'connecting') return '实时生成中'
  if (props.connectionStatus === 'error') return '连接异常'
  return '已准备好'
})

const sendMessage = () => {
  const message = inputMessage.value.trim()
  if (!message) return

  emit('send-message', message)
  inputMessage.value = ''
  resetInputHeight()
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const resizeInput = () => {
  if (!inputRef.value) return
  inputRef.value.style.height = 'auto'
  inputRef.value.style.height = `${Math.min(inputRef.value.scrollHeight, 168)}px`
}

const resetInputHeight = async () => {
  await nextTick()
  if (inputRef.value) {
    inputRef.value.style.height = 'auto'
  }
}

watch(
  () => props.messages,
  () => {
    scrollToBottom()
  },
  { deep: true }
)

onMounted(() => {
  resizeInput()
  scrollToBottom()
})
</script>

<style scoped>
.chat-card {
  display: flex;
  flex-direction: column;
  min-height: 68vh;
  background: rgba(255, 255, 255, 0.84);
  border: 1px solid rgba(18, 49, 78, 0.08);
  border-radius: 28px;
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(16px);
  overflow: hidden;
}

.chat-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 22px;
  border-bottom: 1px solid rgba(18, 49, 78, 0.08);
  background: rgba(255, 255, 255, 0.72);
}

.assistant-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.assistant-avatar,
.avatar {
  width: 42px;
  height: 42px;
  flex-shrink: 0;
}

.assistant-name {
  font-weight: 700;
  color: #142033;
}

.assistant-hint {
  margin-top: 2px;
  font-size: 0.88rem;
  color: #708096;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  border-radius: 999px;
  background: #eef4f8;
  color: #506174;
  font-size: 0.88rem;
  white-space: nowrap;
}

.status-pill.connecting {
  background: rgba(15, 108, 120, 0.12);
  color: #0f6c78;
}

.status-pill.error {
  background: rgba(224, 122, 79, 0.12);
  color: #b55b33;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 24px 22px 8px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.message-row {
  display: flex;
  align-items: flex-end;
  gap: 12px;
}

.message-row.is-user {
  justify-content: flex-end;
}

.message-card {
  max-width: min(720px, calc(100% - 56px));
  padding: 14px 16px;
  border-radius: 22px;
  line-height: 1.8;
}

.message-role {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 6px;
  font-size: 0.8rem;
  color: #708096;
}

.message-content {
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 0.98rem;
}

.ai-card {
  background: #f7fafc;
  color: #1e293b;
  border: 1px solid rgba(18, 49, 78, 0.08);
  border-bottom-left-radius: 10px;
}

.user-card {
  background: linear-gradient(135deg, #142033, #2d4f7c);
  color: #fff;
  border-bottom-right-radius: 10px;
}

.user-card .message-role {
  color: rgba(255, 255, 255, 0.72);
}

.ai-final {
  box-shadow: inset 0 0 0 1px rgba(15, 108, 120, 0.12);
}

.ai-error {
  background: #fff4ed;
  border-color: rgba(224, 122, 79, 0.18);
}

.user-avatar-badge {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #142033, #2d4f7c);
  color: #fff;
  font-weight: 700;
}

.composer {
  padding: 18px 22px 22px;
  border-top: 1px solid rgba(18, 49, 78, 0.08);
  background: rgba(255, 255, 255, 0.9);
}

.input-box {
  width: 100%;
  min-height: 52px;
  max-height: 168px;
  padding: 14px 16px;
  border-radius: 20px;
  border: 1px solid rgba(18, 49, 78, 0.1);
  background: #f9fbfd;
  color: #142033;
  font-size: 0.98rem;
  line-height: 1.7;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input-box:focus {
  border-color: rgba(15, 108, 120, 0.34);
  box-shadow: 0 0 0 4px rgba(15, 108, 120, 0.08);
}

.input-box:disabled {
  opacity: 0.72;
  cursor: not-allowed;
}

.composer-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 12px;
}

.composer-hint-text {
  color: #7f8ba0;
  font-size: 0.86rem;
}

.send-button {
  min-width: 110px;
  padding: 12px 18px;
  border-radius: 16px;
  background: linear-gradient(135deg, #0f6c78, #365f94);
  color: #fff;
  font-size: 0.96rem;
  font-weight: 700;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.send-button:hover:not(:disabled) {
  transform: translateY(-1px);
  opacity: 0.94;
}

.send-button:disabled {
  opacity: 0.56;
  cursor: not-allowed;
}

.typing-dots {
  display: inline-flex;
  gap: 4px;
  margin-left: 8px;
  vertical-align: middle;
}

.typing-dots i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.3;
  animation: pulse 1s infinite ease-in-out;
}

.typing-dots i:nth-child(2) {
  animation-delay: 0.15s;
}

.typing-dots i:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes pulse {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.25;
  }
  50% {
    transform: translateY(-2px);
    opacity: 0.75;
  }
}

@media (max-width: 720px) {
  .chat-toolbar,
  .chat-messages,
  .composer {
    padding-left: 16px;
    padding-right: 16px;
  }

  .chat-toolbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .message-card {
    max-width: calc(100% - 42px);
  }

  .composer-footer {
    flex-direction: column;
    align-items: stretch;
  }

  .send-button {
    width: 100%;
  }
}
</style>
