import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: 'Spring AI 智能体实战项目',
      description: '展示多轮对话、RAG、Tool Calling、MCP 与 SSE 流式交互体验的前端首页。'
    }
  },
  {
    path: '/love-master',
    name: 'LoveMaster',
    component: () => import('../views/LoveMaster.vue'),
    meta: {
      title: 'AI 恋爱顾问 - Spring AI 智能体实战项目',
      description: '情感咨询场景聊天页，支持多轮对话与 SSE 流式响应。'
    }
  },
  {
    path: '/super-agent',
    name: 'SuperAgent',
    component: () => import('../views/SuperAgent.vue'),
    meta: {
      title: 'AI 超级智能体 - Spring AI 智能体实战项目',
      description: '任务执行场景聊天页，适合展示智能体的过程化输出。'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

export default router
