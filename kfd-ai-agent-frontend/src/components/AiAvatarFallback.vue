<template>
  <div class="ai-avatar-fallback" :class="type">
    <span>{{ badgeText }}</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'default'
  }
})

const badgeText = computed(() => (props.type === 'love' ? '恋' : '智'))
</script>

<style scoped>
.ai-avatar-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.love {
  background: linear-gradient(135deg, #e4708a, #ff9a7d);
}

.default,
.super {
  background: linear-gradient(135deg, #1f7a8c, #355c9a);
}
</style>
