// components/CodeGenerator.vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import QRCode from 'qrcode'
import JsBarcode from 'jsbarcode'

interface Props {
  initialType?: 'qr' | 'barcode'
}

interface QRCodeOptions {
  width: number
  margin: number
  color: {
    dark: string
    light: string
  }
}

interface BarcodeOptions {
  format: string
  width: number
  height: number
  displayValue: boolean
  fontSize: number
  margin: number
}

const props = withDefaults(defineProps<Props>(), {
  initialType: 'qr'
})

const input = ref<string>('')
const codeType = ref<'qr' | 'barcode'>(props.initialType)
const generatedCode = ref<string>('')
const error = ref<string>('')

const generateQRCode = async (text: string): Promise<string> => {
  const options: QRCodeOptions = {
    width: 300,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  }
  return await QRCode.toDataURL(text, options)
}

const generateBarcode = (text: string): string => {
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  const options: BarcodeOptions = {
    format: 'CODE128',
    width: 2,
    height: 100,
    displayValue: true,
    fontSize: 20,
    margin: 10
  }
  
  JsBarcode(canvas, text, options)
  return canvas.toDataURL('image/png')
}

const generateCode = async (): Promise<void> => {
  if (!input.value) {
    error.value = 'Please enter some text'
    return
  }
  
  error.value = ''
  
  try {
    generatedCode.value = codeType.value === 'qr' 
      ? await generateQRCode(input.value)
      : generateBarcode(input.value)
  } catch (err) {
    error.value = `Error generating code: ${err instanceof Error ? err.message : 'Unknown error'}`
  }
}

// Generate code on input change with debounce
let timeout: NodeJS.Timeout
const handleInput = (): void => {
  clearTimeout(timeout)
  timeout = setTimeout(generateCode, 500)
}

// Download generated code
const downloadCode = (): void => {
  if (!generatedCode.value) return
  
  const link: HTMLAnchorElement = document.createElement('a')
  link.download = `${codeType.value}-code.png`
  link.href = generatedCode.value
  link.click()
}

// Generate initial code if input exists
onMounted(() => {
  if (input.value) {
    void generateCode()
  }
})
</script>

<template>
  <div class=" ">
    <div class="max-w-xl mx-auto px-4 py-2 space-y-6">
    <div class="space-y-2">
      
      <!-- Type selector -->
      <div class="flex space-x-4 dark:text-white">
        <label class="flex items-center">
          <input
            type="radio"
            v-model="codeType"
            value="qr"
            class="mr-2"
          >
          QR Code
        </label>
        <label class="flex items-center">
          <input
            type="radio"
            v-model="codeType"
            value="barcode"
            class="mr-2"
          >
          Barcode
        </label>


      </div>

      <!-- Input field -->
      <div class="space-y-2">
        <textarea
          v-model="input"
          @input="handleInput"
          type="text"
          :placeholder="codeType === 'qr' ? 'Enter text or URL' : 'Enter text'"
           class="w-full dark:text-white p-3 rounded-lg bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
        ></textarea>
        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
      </div>

      <!-- Generated code display -->
      <div v-if="generatedCode" class="space-y-4">
        <div class="flex justify-center p-4 bg-white rounded-lg border">
          <img
            :src="generatedCode"
            :alt="`Generated ${codeType} code`"
            class="max-w-full"
          >
        </div>
        
        <!-- Download button -->
        <button
          @click="downloadCode"
          class="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Download
        </button>
      </div>
    </div>
  </div>
  </div>
</template>