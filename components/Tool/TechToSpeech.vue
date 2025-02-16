<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const text = ref('')
const isSpeaking = ref(false)
const pitch = ref(1)
const rate = ref(1) // Default rate for English
const volume = ref(1)
const selectedVoice = ref('')
const availableVoices = ref([])
const isPaused = ref(false)
const currentUtterance = ref(null)
const selectedLanguage = ref('en-US') // Set English as default

// Filter voices by language
const filteredVoices = computed(() => {
  return availableVoices.value.filter(voice => {
    const voiceLang = voice.lang.toLowerCase()
    const selectedLang = selectedLanguage.value.toLowerCase()
    return voiceLang.includes(selectedLang) ||
           (selectedLang.includes('km') && voiceLang.includes('th'))
  })
})

// Load available voices
const loadVoices = () => {
  availableVoices.value = speechSynthesis.getVoices()
  const defaultVoice = filteredVoices.value[0]
  if (defaultVoice) {
    selectedVoice.value = defaultVoice.name
  }
}

// Handle text preprocessing
const preprocessText = (text) => {
  if (!text) return ''
  
  if (selectedLanguage.value === 'km-KH') {
    return text
      .replace(/។/g, '។ ')
      .replace(/៕/g, '៕ ')
      .replace(/、/g, '、 ')
      .replace(/។\s+/g, '។\n')
      .replace(/([០-៩]+)/g, ' $1 ')
      .trim()
  }
  
  return text.trim()
}

onMounted(() => {
  loadVoices()
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices
  }
})

onBeforeUnmount(() => {
  stopSpeech()
})

const speakText = () => {
  if (!text.value || isSpeaking.value) return
  
  const processedText = preprocessText(text.value)
  const utterance = new SpeechSynthesisUtterance(processedText)
  
  utterance.pitch = pitch.value
  utterance.rate = rate.value
  utterance.volume = volume.value
  utterance.lang = selectedLanguage.value
  
  if (selectedVoice.value) {
    utterance.voice = availableVoices.value.find(voice => voice.name === selectedVoice.value)
  }
  
  utterance.onstart = () => {
    isSpeaking.value = true
    isPaused.value = false
  }
  
  utterance.onend = () => {
    isSpeaking.value = false
    isPaused.value = false
    currentUtterance.value = null
  }
  
  utterance.onerror = (event) => {
    console.error('Speech synthesis error:', event)
    isSpeaking.value = false
    isPaused.value = false
    currentUtterance.value = null
  }
  
  currentUtterance.value = utterance
  speechSynthesis.speak(utterance)
}

const pauseSpeech = () => {
  speechSynthesis.pause()
  isPaused.value = true
}

const resumeSpeech = () => {
  speechSynthesis.resume()
  isPaused.value = false
}

const stopSpeech = () => {
  speechSynthesis.cancel()
  isSpeaking.value = false
  isPaused.value = false
  currentUtterance.value = null
}

// Available languages
const languages = [
  { code: 'en-US', name: 'English' },
  // { code: 'km-KH', name: 'ខ្មែរ (Khmer)' },
  // { code: 'th-TH', name: 'ไทย (Thai)' }
]
</script>
<template>
  <div class="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg w-full max-w-lg mx-auto">
    <div class="mb-4">
      <textarea
        v-model="text"
        placeholder="បញ្ចូលអត្ថបទដើម្បីចេញជាសម្លេង..."
        class="w-full p-3 border dark:bg-gray-700 dark:text-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-khmer"
        rows="4"
        dir="auto"
      ></textarea>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">ភាសា / Language</label>
        <select
          v-model="selectedLanguage"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option
            v-for="lang in languages"
            :key="lang.code"
            :value="lang.code"
          >
            {{ lang.name }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">សម្លេង / Voice</label>
        <select
          v-model="selectedVoice"
          class="mt-1 block w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option value="">Default Voice</option>
          <option
            v-for="voice in filteredVoices"
            :key="voice.name"
            :value="voice.name"
          >
            {{ voice.name }} ({{ voice.lang }})
          </option>
        </select>
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">កម្រិតសម្លេង / Volume</label>
        <input
          type="range"
          v-model="volume"
          min="0"
          max="1"
          step="0.1"
          class="w-full"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">កម្រិតសូរស័ព្ទ / Pitch</label>
        <input
          type="range"
          v-model="pitch"
          min="0.5"
          max="2"
          step="0.1"
          class="w-full"
        />
      </div>
      
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">ល្បឿន / Speed</label>
        <input
          type="range"
          v-model="rate"
          min="0.5"
          max="2"
          step="0.1"
          class="w-full"
        />
      </div>
    </div>

    <div class="flex space-x-2">
      <button
        @click="speakText"
        :disabled="isSpeaking || !text"
        class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <span v-if="!isSpeaking">▶ ចាប់ផ្តើម / Play</span>
        <span v-else>កំពុងនិយាយ... / Speaking...</span>
      </button>
      
      <button
        v-if="isSpeaking && !isPaused"
        @click="pauseSpeech"
        class="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
      >
        ⏸ ផ្អាក / Pause
      </button>
      
      <button
        v-if="isPaused"
        @click="resumeSpeech"
        class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        ▶ បន្ត / Resume
      </button>
      
      <button
        @click="stopSpeech"
        :disabled="!isSpeaking && !isPaused"
        class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        ⏹ បញ្ឈប់ / Stop
      </button>
    </div>
  </div>
</template>

<style scoped>
/*  */
</style>