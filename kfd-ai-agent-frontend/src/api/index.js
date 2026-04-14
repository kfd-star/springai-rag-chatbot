import axios from 'axios'

const fallbackBaseUrl = import.meta.env.PROD ? '/api' : 'http://localhost:8123/api'
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || fallbackBaseUrl).replace(/\/$/, '')

const request = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000
})

export const connectSSE = (url, params = {}, onMessage, onError) => {
  const queryString = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')

  const fullUrl = queryString ? `${API_BASE_URL}${url}?${queryString}` : `${API_BASE_URL}${url}`
  const eventSource = new EventSource(fullUrl)

  eventSource.onmessage = (event) => {
    if (onMessage) onMessage(event.data)
  }

  eventSource.onerror = (error) => {
    if (onError) onError(error)
    eventSource.close()
  }

  return eventSource
}

export const chatWithLoveApp = (message, chatId) => connectSSE('/ai/love_app/chat/sse', { message, chatId })

export const chatWithManus = (message) => connectSSE('/ai/manus/chat', { message })

export { request, API_BASE_URL }

export default {
  request,
  chatWithLoveApp,
  chatWithManus
}
