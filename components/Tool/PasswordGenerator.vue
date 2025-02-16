<script setup>
import { ref } from 'vue';
import { TransitionRoot } from '@headlessui/vue';

const length = ref(12);
const includeUppercase = ref(true);
const includeLowercase = ref(true);
const includeNumbers = ref(true);
const includeSymbols = ref(false);
const generatedPassword = ref('');
const copied = ref(false);

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generatedPassword.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

const getCharset = () => {
  let charset = '';
  if (includeUppercase.value) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (includeLowercase.value) charset += 'abcdefghijklmnopqrstuvwxyz';
  if (includeNumbers.value) charset += '0123456789';
  if (includeSymbols.value) charset += '!@#$%^&*()_+{}[]<>?/';
  return charset;
};

const generatePassword = () => {
  const charset = getCharset();
  
  if (!charset.length) {
    generatedPassword.value = 'Select at least one option';
    return;
  }
  
  let password = '';
  for (let i = 0; i < length.value; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  generatedPassword.value = password;
};
</script>

<template>
  <div class="p-6 bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-lg max-w-md mx-auto">
    <label class="block mb-2">ចំនួននៃពាក្យសម្ងាត់: {{ length }}</label>
    <input type="range" v-model="length" min="6" max="32" class="w-full" />

    <div class="mt-4">
      <label class="flex items-center mb-2">
        <input type="checkbox" v-model="includeUppercase" class="mr-2" /> មានអក្សរធំ
      </label>
      <label class="flex items-center mb-2">
        <input type="checkbox" v-model="includeLowercase" class="mr-2" /> មានអក្សរតូច
      </label>
      <label class="flex items-center mb-2">
        <input type="checkbox" v-model="includeNumbers" class="mr-2" /> មានលេខ
      </label>
      <label class="flex items-center mb-2">
        <input type="checkbox" v-model="includeSymbols" class="mr-2" /> មាននិមិត្តសញ្ញា
      </label>
    </div>

    <button @click="generatePassword" 
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Generate Password
    </button>

    <div v-if="generatedPassword" class="mt-4">
      <div class="relative flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
        <p class="flex-1 text-lg font-mono text-gray-700 dark:text-gray-200 break-all">
          {{ generatedPassword }}
        </p>
        <button 
          @click="copyToClipboard"
          class="flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          :class="{ 'text-green-600 dark:text-green-400': copied }"
        >
          <span v-if="copied">បានចម្លង!</span>
          <span v-else>ចម្លង</span>
        </button>
      </div>

      <TransitionRoot
        appear
        :show="copied"
        as="template"
        enter="transform transition duration-300"
        enter-from="opacity-0 translate-y-2"
        enter-to="opacity-100 translate-y-0"
        leave="transition duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="absolute mt-2 px-3 py-1 text-sm text-green-700 bg-green-100 dark:bg-green-800 dark:text-green-100 rounded-md">
          បានចម្លងទៅក្នុង Clipboard!
        </div>
      </TransitionRoot>
    </div>
  </div>
</template>

<style scoped>
input[type='range'] {
  accent-color: #3b82f6;
}
</style>