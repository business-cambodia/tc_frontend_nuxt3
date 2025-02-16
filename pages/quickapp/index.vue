<template>
  <div class="min-h-screen bg-gradient-to-br pt-8 from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
    <div class="hidden dark:block">
      <div
      class="animate-blob1 opacity-30 absolute bg-purple-300 dark:bg-purple-600 blur-3xl h-64 w-64 rounded-full -top-32 -left-32">
    </div>
    <div
      class="animate-blob3 opacity-30 absolute bg-pink-300 dark:bg-pink-600 blur-3xl h-64 w-64 rounded-full bottom-0 right-0">
    </div>
    </div>
    <div class="container mx-auto px-4 py-12 ">
      <h1
        class="text-4xl  font-bold text-center mb-4   text-primary  ">
        កម្មវិធីរហ័ស
      </h1>

      <p class="text-center text-gray-600 dark:text-gray-300 mb-12">កម្មវិធីសម្រាប់ប្រើប្រាស់ប្រចាំថ្ងៃរបស់អ្នក</p>

      <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="category in categories" :key="category.id" class="group relative cursor-pointer"
          @click="openModal(category)">
          <div
            :class="`absolute inset-0 bg-gradient-to-r ${category.gradientFrom} ${category.gradientTo} rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity hidden dark:block`">
          </div>
          <div
            class="relative bg-white/80 dark:bg-gray-800/80 h-48 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-200/50 dark:border-gray-700/50">
            <div :class="`w-14 h-14 mb-4 ${category.iconColor}`">
              <svg viewBox="0 0 24 24" fill="none" class="w-full h-full">
                <path :d="category.svgPath" :fill="category.fill" :stroke="category.stroke"
                  :stroke-width="category.strokeWidth" :stroke-linecap="category.strokeLinecap"
                  :stroke-linejoin="category.strokeLinejoin" />
              </svg>
            </div>
            <h2 class="text-md md:text-xl font-semibold mb-2 dark:text-white line-clamp-2">{{ category.title }}</h2>
            <!-- <p class="text-gray-600 dark:text-gray-300 mb-4">{{ category.description }}</p> -->
            <div :class="`inline-flex items-center ${category.iconColor}`">
              <span class="text-sm">ចូលប្រើប្រាស់</span>
              <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16"
                fill="none">
                <path d="M1 8h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <QuickAppModal :is-open="isModalOpen" :active-category="activeCategory" @close="closeModal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Category {
  id: string;
  title: string;
  description: string;
  svgPath: string;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: 'butt' | 'round' | 'square' | 'inherit';
  strokeLinejoin?: 'round' | 'inherit' | 'miter' | 'bevel';
  iconColor: string;
  gradientFrom: string;
  gradientTo: string;
}

const isModalOpen = ref(false);
const activeCategory = ref<Category | null>(null);

const openModal = (category: Category) => {
  activeCategory.value = category;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  setTimeout(() => {
    activeCategory.value = null;
  }, 300);
};

const categories: Category[] = [
  {
    id: 'qr-barcode',
    title: 'បង្កើត QR & Barcode',
    description: 'Generate QR codes and barcodes instantly for any content',
    svgPath: 'M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h1v1h-1v-1zm-1 2h1v1h-1v-1zm2 0h1v1h-1v-1zm-1 2h1v1h-1v-1zm-2 0h1v1h-1v-1zm3-2h1v1h-1v-1zm0 4h1v1h-1v-1zm-2 0h1v1h-1v-1z',
    fill: 'currentColor',
    iconColor: 'text-blue-600',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-cyan-500'
  },
  // {
  //   id: 'invoice',
  //   title: 'Invoice',
  //   description: 'Create and manage invoices with ease',
  //   svgPath: 'M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h1v1h-1v-1zm-1 2h1v1h-1v-1zm2 0h1v1h-1v-1zm-1 2h1v1h-1v-1zm-2 0h1v1h-1v-1zm3-2h1v1h-1v-1zm0 4h1v1h-1v-1zm-2 0h1v1h-1v-1z',
  //   fill: 'currentColor',
  //   iconColor: 'text-green-600',
  //   gradientFrom: 'from-green-500',
  //   gradientTo: 'to-lime-500'
  // },
  {
    id: 'password-generator',
    title: 'បង្កើតពាក្យសម្ងាត់',
    description: 'Generate strong and secure passwords',
    svgPath: 'M12 10v3h-3v-3a3 3 0 1 1 3 0zm-1-4a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-7 8h16v8H4v-8zm8 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0z',
    fill: 'currentColor',
    iconColor: 'text-purple-600',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-pink-500'
  },
  {
    id: 'text-to-speech',
    title: 'អត្ថបទទៅជាសំឡេង',
    description: 'Convert text into natural-sounding speech',
    svgPath: 'M3 9v6h2V9H3zm4 2v2h2v-2H7zm4-4v8h2V7h-2zm4 2v4h2V9h-2zm4-4v8h2V5h-2zM4 8h12M4 16h12',
    fill: 'currentColor',
    iconColor: 'text-red-600',
    gradientFrom: 'from-red-500',
    gradientTo: 'to-orange-500'
  },
  {
    id: 'image-compressor',
    title: 'កម្មវិធីបង្រួមទំហំរូបភាព',
    description: 'Reduce image file size without losing quality',
    svgPath: 'M4 4h16v16H4V4zm2 2v12h12V6H6zm2 6l4-4v8l-4-4zm8 0l-4 4V8l4 4z',
    fill: 'currentColor',
    iconColor: 'text-yellow-600',
    gradientFrom: 'from-yellow-500',
    gradientTo: 'to-amber-500'
  },
  
];

</script>

<style>
html {
  scroll-behavior: smooth;
}
</style>