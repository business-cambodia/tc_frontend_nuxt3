<template>
  <div class="p-4 mt-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
   
    <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-6">
      <div
        class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center"
        :class="{ 'border-blue-500': isDragging }"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleFileDrop"
      >
        <div class="mb-4">
          <svg
            class="mx-auto h-16 w-16 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p class="text-lg mb-2 text-gray-700 dark:text-gray-300">
          ទាញទម្លាក់រូបភាពរបស់អ្នកនៅទីនេះ ឬ
        </p>
        <label
          for="file-upload"
          class="relative cursor-pointer bg-indigo-600 rounded-md font-medium text-white hover:bg-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 px-4 py-2"
        >
          <span>ជ្រើសរើសរូបភាព</span>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            class="sr-only"
            accept="image/*"
            @change="handleFileSelect"
          />
        </label>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          រូបភាពប្រភេទ JPG, PNG, GIF
        </p>
      </div>
    </div>

    <div v-if="uploadedImage" class="mb-6">
      <h2 class="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
        រូបភាពដែលបានជ្រើសរើស
      </h2>
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="relative w-full max-w-md mx-auto sm:mx-0">
          <img
            :src="uploadedImage"
            alt="Uploaded image"
            class="w-full h-auto rounded-lg border border-gray-300 dark:border-gray-700 object-contain max-h-72"
          />
          <button
            @click="clearImage"
            class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div class="flex-1">
          <div class="grid grid-cols-1 gap-2 mb-4">
            <!-- <button
              @click="extractText('khm')"
              class="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              :disabled="isProcessing"
            >
              <span v-if="isProcessing && currentProcessingLang === 'khm'" class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                កំពុងដំណើរការ...
              </span>
              <span v-else>ស្រង់អត្ថបទខ្មែរ</span>
            </button> -->
            <button
              @click="extractText('eng')"
              class="bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              :disabled="isProcessing"
            >
              <span v-if="isProcessing && currentProcessingLang === 'eng'" class="flex items-center justify-center">
                <svg
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
              <span v-else>Extract English Text</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentLang" class="mb-4 flex justify-center">
      <div class="inline-flex rounded-md" role="group">
        <button
          v-if="extractedTextKhmer"
          @click="currentLang = 'khm'"
          class="px-4 py-2 text-sm font-medium rounded-l-lg"
          :class="currentLang === 'khm' 
            ? 'bg-indigo-600 text-white' 
            : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'"
        >
          ខ្មែរ
        </button>
        <button
          v-if="extractedTextEnglish"
          @click="currentLang = 'eng'"
          class="px-4 py-2 text-sm font-medium"
          :class="[
            currentLang === 'eng' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
            extractedTextKhmer ? 'rounded-r-lg' : 'rounded-lg'
          ]"
        >
          English
        </button>
      </div>
    </div>

    <div v-if="shouldShowText" class="mb-6">
      <h2 class="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
        {{ currentLang === 'khm' ? 'អត្ថបទដែលបានស្រង់' : 'Extracted Text' }}
      </h2>
      <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 relative">
        <pre
          class="text-gray-800 dark:text-gray-200 whitespace-pre-wrap"
          :class="{'font-khmer': currentLang === 'khm'}"
        >{{ currentText }}</pre>
        <button
          @click="copyToClipboard"
          class="absolute top-3 right-3 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
          title="Copy to clipboard"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
            />
            <path
              d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
            />
          </svg>
        </button>
      </div>
      <div v-if="copied" class="mt-2 text-sm text-green-600 dark:text-green-400">
        {{ currentLang === 'khm' ? 'បានចម្លងទៅក្នុងក្ដារតម្បៀតខ្ទាស់' : 'Copied to clipboard' }}
      </div>
      <div v-if="errorMessage" class="mt-2 text-sm text-red-600 dark:text-red-400">
        {{ errorMessage }}
      </div>
    </div>

    <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
        របៀបប្រើប្រាស់
      </h3>
      <ol class="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
        <li>ជ្រើសរើសរូបភាពដែលមានអត្ថបទ</li>
        <li>ជ្រើសរើសប៊ូតុងភាសា "ស្រង់អត្ថបទខ្មែរ" ឬ "Extract English Text"</li>
        <li>រង់ចាំអត្ថបទត្រូវបានស្រង់ចេញពីរូបភាព</li>
        <li>ចម្លងអត្ថបទដែលបានស្រង់ដោយចុចលើរូបតំណាងចម្លង</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";

const OCR_API_KEY = "K84721447088957"; // Your OCR.space API key
const OCR_API_URL = "https://api.ocr.space/parse/image";

const uploadedImage = ref(null);
const extractedTextKhmer = ref("");
const extractedTextEnglish = ref("");
const currentLang = ref(null);
const currentProcessingLang = ref(null);
const imageFile = ref(null);
const isDragging = ref(false);
const isProcessing = ref(false);
const copied = ref(false);
const errorMessage = ref("");

const currentText = computed(() => {
  return currentLang.value === 'khm' ? extractedTextKhmer.value : extractedTextEnglish.value;
});

const shouldShowText = computed(() => {
  return (currentLang.value === 'khm' && extractedTextKhmer.value) || 
         (currentLang.value === 'eng' && extractedTextEnglish.value);
});

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    processFile(file);
  }
};

const handleFileDrop = (event) => {
  isDragging.value = false;
  const file = event.dataTransfer.files[0];
  if (file && file.type.startsWith("image/")) {
    processFile(file);
  }
};

const processFile = (file) => {
  imageFile.value = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImage.value = e.target.result;
    extractedTextKhmer.value = ""; // Clear previous text
    extractedTextEnglish.value = ""; // Clear previous text
    currentLang.value = null;
    errorMessage.value = "";
  };
  reader.readAsDataURL(file);
};

const clearImage = () => {
  uploadedImage.value = null;
  imageFile.value = null;
  extractedTextKhmer.value = "";
  extractedTextEnglish.value = "";
  currentLang.value = null;
  copied.value = false;
  errorMessage.value = "";
};

const extractText = async (language) => {
  if (!imageFile.value) return;

  isProcessing.value = true;
  currentProcessingLang.value = language;
  errorMessage.value = "";
  
  try {
    const formData = new FormData();
    formData.append('apikey', OCR_API_KEY);
    formData.append('file', imageFile.value);
    formData.append('language', language);
    formData.append('scale', 'true');
    formData.append('isTable', 'false');
    formData.append('OCREngine', '2'); // More accurate OCR engine

    const response = await axios.post(OCR_API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });

    if (response.data && response.data.ParsedResults && response.data.ParsedResults.length > 0) {
      const extractedText = response.data.ParsedResults[0].ParsedText;
      
      if (language === 'khm') {
        extractedTextKhmer.value = extractedText || "ឯកសារមិនមានអត្ថបទខ្មែរដែលអាចស្រង់បាន";
        currentLang.value = 'khm';
      } else if (language === 'eng') {
        extractedTextEnglish.value = extractedText || "No English text could be extracted from the image";
        currentLang.value = 'eng';
      }
    } else {
      throw new Error(response.data.ErrorMessage || "Unknown error occurred");
    }
  } catch (error) {
    console.error("Error extracting text:", error);
    errorMessage.value = language === 'khm' ? 
      "មានបញ្ហាក្នុងការស្រង់អត្ថបទ៖ " + (error.message || "សូមព្យាយាមម្តងទៀត") :
      "Error extracting text: " + (error.message || "Please try again");
    
    if (language === 'khm') {
      extractedTextKhmer.value = "មានបញ្ហាក្នុងការស្រង់អត្ថបទខ្មែរ";
      currentLang.value = 'khm';
    } else if (language === 'eng') {
      extractedTextEnglish.value = "There was a problem extracting English text";
      currentLang.value = 'eng';
    }
  } finally {
    isProcessing.value = false;
    currentProcessingLang.value = null;
  }
};

const copyToClipboard = () => {
  if (!currentText.value) return;

  navigator.clipboard.writeText(currentText.value).then(
    () => {
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 2000);
    },
    (err) => {
      console.error("Could not copy text: ", err);
      errorMessage.value = currentLang.value === 'khm' ? 
        "មិនអាចចម្លងអត្ថបទ៖ " + err.message :
        "Could not copy text: " + err.message;
    }
  );
};

onMounted(() => {
  // Any initialization code here if needed
});
</script>

<style scoped>
/*  */
</style>