<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-1">
      <!-- Chat History Section -->
      <div class="mb-6 max-h-96 overflow-y-auto" ref="chatHistoryRef">
        <div v-if="chatHistory.length === 0" class="text-center text-gray-500 dark:text-gray-400 py-10">
          <div class="mb-2">
            <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <p>ចាប់ផ្តើមការសន្ទនាជាមួយ AI Assistance</p>
        </div>
        
        <div v-else class="space-y-4">
          <div v-for="(message, index) in chatHistory" :key="index" 
              :class="{'flex justify-end': message.role === 'user'}">
            <div :class="{
              'bg-blue-100 dark:bg-blue-900 rounded-lg p-3 max-w-3/4': message.role === 'user',
              'bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-3/4': message.role === 'assistant'
            }">
              <div class="flex items-center mb-1">
                <div :class="{
                  'bg-blue-600 text-white': message.role === 'user',
                  'bg-gray-800 dark:bg-gray-500 text-white': message.role === 'assistant'
                }" class="rounded-full p-1 text-xs font-bold mr-2">
                  {{ message.role === 'user' ? 'You' : 'AI' }}
                </div>
                <div class="text-xs text-gray-500">{{ formatTime(message.timestamp) }}</div>
              </div>
              
              <!-- Regular text content with markdown -->
              <div v-if="!hasCodeBlock(message.content)" 
                   class="text-gray-800 dark:text-gray-200 prose dark:prose-invert max-w-none"
                   v-html="renderMarkdown(message.content)">
              </div>
              
              <!-- Code block content with copy button -->
              <div v-else>
                <div v-for="(part, partIdx) in parseMessage(message.content)" :key="partIdx">
                  <div v-if="part.type === 'text'" 
                       class="text-gray-800 dark:text-gray-200 prose dark:prose-invert max-w-none mb-2"
                       v-html="renderMarkdown(part.content)">
                  </div>
                  
                  <div v-else-if="part.type === 'code'" class="relative mt-2 mb-4 group">
                    <pre class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 text-gray-100 overflow-x-auto text-sm">{{ part.content }}</pre>
                    <button @click="copyToClipboard(part.content)" 
                            class="absolute top-2 right-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded p-1 
                                   opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Typing Indicator for AI -->
          <div v-if="isTyping" class="flex">
            <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-3/4">
              <div class="flex items-center mb-1">
                <div class="bg-gray-800 dark:bg-gray-500 text-white rounded-full p-1 text-xs font-bold mr-2">
                  AI
                </div>
                <div class="text-xs text-gray-500">{{ formatTime(new Date()) }}</div>
              </div>
              
              <div class="text-gray-800 dark:text-gray-200 prose dark:prose-invert max-w-none"
                   v-if="sanitizedPartialResponse" :innerHTML="sanitizedPartialResponse">
                <span class="typing-cursor">|</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Rest of the component remains the same -->
      <!-- Copy toast notification -->
      <Transition
        enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-if="showCopyToast" class="fixed bottom-4 right-4 z-50 max-w-sm w-full bg-gray-800 text-white rounded-lg shadow-lg p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1">
              <p class="text-sm font-medium">Code copied to clipboard!</p>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Input Section -->
      <div class="relative">
        <textarea
          id="prompt"
          v-model="prompt"
          rows="3"
          class="block w-full rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100
                 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Type your message here..."
          :disabled="isLoading || isTyping"
          @keydown.enter.exact.prevent="handleSubmit"
        />
        <button
          @click="handleSubmit"
          :disabled="isLoading || isTyping || !prompt.trim()"
          class="absolute bottom-3 right-3 inline-flex items-center rounded-lg
                 bg-blue-600 px-4 py-2 text-sm font-semibold text-white
                 hover:bg-blue-700 focus:outline-none focus:ring-2 
                 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          <span v-if="isLoading" class="flex items-center">
            <svg class="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            សូមរងចាំលទ្ធផល​...
          </span>
          <span v-else>Send</span>
        </button>
      </div>

      <!-- Clear chat button -->
      <div class="flex justify-end mt-3">
        <button 
          @click="clearChat"
          class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-2 py-1 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
          Clear conversation
        </button>
      </div>

      <!-- Error Display -->
      <TransitionRoot :show="!!error" as="template">
        <div v-if="error" class="mt-4 rounded-lg bg-red-50 dark:bg-red-900/50 p-4">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <p class="text-sm text-red-700 dark:text-red-200">{{ error }}</p>
            </div>
          </div>
        </div>
      </TransitionRoot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import { TransitionRoot } from '@headlessui/vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const prompt = ref('')
const error = ref('')
const isLoading = ref(false)
const isTyping = ref(false)
const partialResponse = ref('')

// Computed property for sanitized partial response
const sanitizedPartialResponse = computed(() => {
  const markdownContent = marked.parse(partialResponse.value) as string; // Ensure synchronous parsing
  return partialResponse.value ? DOMPurify.sanitize(markdownContent) : ''
})
const chatHistory = ref<ChatMessage[]>([])
const showCopyToast = ref(false)
const chatHistoryRef = ref<HTMLElement | null>(null)

const { generateContent } = useGemini()

// Render markdown content safely
const renderMarkdown = (content: string) => {
  // Process the markdown
  const html = marked.parse(content) as string // Ensure synchronous parsing
  // Sanitize the HTML to prevent XSS
  return DOMPurify.sanitize(html)
}

// Load chat history from localStorage
onMounted(() => {
  const savedChat = localStorage.getItem('geminiChatHistory')
  if (savedChat) {
    try {
      const parsed = JSON.parse(savedChat)
      // Convert string timestamps back to Date objects
      chatHistory.value = parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
      scrollToBottom()
    } catch (e) {
      console.error('Failed to parse saved chat history', e)
    }
  }
  
  // Add typing cursor animation
  const style = document.createElement('style')
  style.innerHTML = `
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .typing-cursor {
      animation: blink 1s step-end infinite;
    }
  `
  document.head.appendChild(style)
})

// Save chat history to localStorage when it changes
watch(chatHistory, (newChat) => {
  const serializable = newChat.map(msg => ({
    ...msg,
    timestamp: msg.timestamp.toISOString()
  }))
  localStorage.setItem('geminiChatHistory', JSON.stringify(serializable))
  nextTick(() => scrollToBottom())
}, { deep: true })

const scrollToBottom = () => {
  nextTick(() => {
    if (chatHistoryRef.value) {
      chatHistoryRef.value.scrollTop = chatHistoryRef.value.scrollHeight
    }
  })
}

// Simulate typing effect
const simulateTyping = async (text: string) => {
  isTyping.value = true
  partialResponse.value = ''
  
  // Detect code blocks and handle them differently
  const parts = parseMessageForTyping(text)
  
  for (const part of parts) {
    if (part.type === 'text') {
      // Type text character by character
      const words = part.content.split(' ')
      
      for (let i = 0; i < words.length; i++) {
        // Add the word
        partialResponse.value += words[i]
        
        // Add space unless it's the last word
        if (i < words.length - 1) {
          partialResponse.value += ' '
        }
        
        // Scroll to keep up with the typing
        scrollToBottom()
        
        // Random typing delay between words
        await new Promise(resolve => setTimeout(resolve, Math.random() * 20 + 10))
      }
    } else if (part.type === 'code') {
      // Add a small pause before code block
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // For code blocks, type it out in chunks for efficiency
      partialResponse.value += '```\n'
      
      const codeLines = part.content.split('\n')
      for (const line of codeLines) {
        partialResponse.value += line + '\n'
        scrollToBottom()
        await new Promise(resolve => setTimeout(resolve, Math.random() * 30 + 20))
      }
      
      partialResponse.value += '```'
    }
    
    // Add a short pause between different parts
    await new Promise(resolve => setTimeout(resolve, 200))
  }
  
  // Add the complete response to the chat history
  chatHistory.value.push({
    role: 'assistant',
    content: text,
    timestamp: new Date()
  })
  
  // Reset typing state
  isTyping.value = false
  partialResponse.value = ''
}


const handleSubmit = async () => {
  if (!prompt.value.trim() || isLoading.value || isTyping.value) return
  
  const userMessage = prompt.value.trim()
  
  // Add user message to chat
  chatHistory.value.push({
    role: 'user',
    content: userMessage,
    timestamp: new Date()
  })
  
  // Clear input and errors
  prompt.value = ''
  error.value = ''
  isLoading.value = true
  
  try {
    // Fetch the response
    const result = await generateContent(userMessage)
    
    // Stop loading indicator
    isLoading.value = false
    
    // Simulate typing the response
    await simulateTyping(result)
  } catch (e: any) {
    error.value = e.message
    isLoading.value = false
  }
}

const clearChat = () => {
  chatHistory.value = []
  localStorage.removeItem('geminiChatHistory')
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    showCopyToast.value = true
    setTimeout(() => {
      showCopyToast.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy text: ', err)
  }
}

// Detect if message contains code blocks
const hasCodeBlock = (message: string) => {
  return message.includes('```')
}

// Parse message to separate text and code blocks for display
const parseMessage = (message: string) => {
  const parts = []
  const codeBlockRegex = /```(?:\w+)?\n([\s\S]*?)```/g
  
  let lastIndex = 0
  let match
  
  while ((match = codeBlockRegex.exec(message)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: message.substring(lastIndex, match.index)
      })
    }
    
    // Add code block
    parts.push({
      type: 'code',
      content: match[1]
    })
    
    lastIndex = match.index + match[0].length
  }
  
  // Add remaining text after last code block
  if (lastIndex < message.length) {
    parts.push({
      type: 'text',
      content: message.substring(lastIndex)
    })
  }
  
  return parts.length > 0 ? parts : [{ type: 'text', content: message }]
}

// Parse message for typing simulation
const parseMessageForTyping = (message: string) => {
  const parts = []
  const codeBlockRegex = /```(?:\w+)?\n([\s\S]*?)```/g
  
  let lastIndex = 0
  let match
  
  while ((match = codeBlockRegex.exec(message)) !== null) {
    // Add text before code block
    if (match.index > lastIndex) {
      parts.push({
        type: 'text',
        content: message.substring(lastIndex, match.index)
      })
    }
    
    // Add code block
    parts.push({
      type: 'code',
      content: match[1]
    })
    
    lastIndex = match.index + match[0].length
  }
  
  // Add remaining text after last code block
  if (lastIndex < message.length) {
    parts.push({
      type: 'text',
      content: message.substring(lastIndex)
    })
  }
  
  return parts
}
</script>

<style scoped>
/* Component-specific styles */
:deep(.prose) {
  @apply max-w-none;
}

:deep(.prose strong) {
  @apply font-bold text-gray-900 dark:text-gray-100;
}

:deep(.prose em) {
  @apply italic text-gray-800 dark:text-gray-200;
}

:deep(.prose h1, .prose h2, .prose h3) {
  @apply text-gray-900 dark:text-gray-100 font-bold;
}

:deep(.prose ul) {
  @apply pl-5 list-disc;
}

:deep(.prose ol) {
  @apply pl-5 list-decimal;
}
</style>