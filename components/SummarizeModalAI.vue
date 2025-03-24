<template>
    <Teleport to="body">
      <transition 
        enter-active-class="transition duration-500 ease-out" 
        enter-from-class="transform opacity-0" 
        enter-to-class="transform opacity-100" 
        leave-active-class="transition duration-400 ease-in" 
        leave-from-class="transform opacity-100" 
        leave-to-class="transform opacity-0"
      >
        <div v-if="isVisible" class="fixed inset-0 z-[60] flex items-center justify-center">
          <!-- Backdrop with animated gradient -->
          <div 
            class="fixed inset-0 backdrop-blur-md transition-all duration-700 ease-in-out"
            :class="backgroundClass"
            @click="closeModal"
          ></div>
  
          <!-- Modal Container with scale animation -->
          <div 
            class="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 flex flex-col overflow-hidden transform transition-all duration-500"
            :class="[isLoading ? 'scale-95' : 'scale-100']"
            style="max-height: 90vh;"
          >
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center space-x-2">
                <div class="relative h-8 w-8 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 ">
                  <div v-if="!isLoading" class="text-white text-sm font-bold bg-white flex items-center justify-center"> <img src="/logo.png" alt="" width="60" /></div>
                  <div v-else class="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 animate-gradient-x"></div>
                </div>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">AI សង្ខេបអត្ថបទ</h3>
              </div>
              <button @click="closeModal" class="text-gray-400 hover:text-gray-500 focus:outline-none transition-colors duration-300">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
  
            <!-- Modal Content -->
            <div class="flex-1 overflow-hidden">
              <div v-if="isLoading" class="flex flex-col items-center justify-center p-8 h-full">
                <!-- Apple Intelligence Style Loader -->
                <div class="relative h-20 w-20 mb-8">
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="h-full w-full rounded-full border-4 border-t-blue-500 border-r-transparent border-b-blue-300 border-l-transparent animate-spin"></div>
                  </div>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="h-12 w-12 rounded-full border-4 border-t-transparent border-r-blue-300 border-b-transparent border-l-blue-500 animate-spin-reverse"></div>
                  </div>
                  <!-- Inner pulsing circle -->
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="h-6 w-6 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse"></div>
                  </div>
                </div>
                <p class="text-center text-gray-600 dark:text-gray-300 text-lg">កំពុងសង្ខេបអត្ថបទ...</p>
                <!-- Animated dots -->
                <div class="flex space-x-1 mt-2">
                  <div class="h-2 w-2 rounded-full bg-blue-500 animate-bounce" style="animation-delay: 0ms"></div>
                  <div class="h-2 w-2 rounded-full bg-blue-400 animate-bounce" style="animation-delay: 150ms"></div>
                  <div class="h-2 w-2 rounded-full bg-blue-300 animate-bounce" style="animation-delay: 300ms"></div>
                </div>
              </div>
  
              <div v-else class="p-6 overflow-y-auto space-y-4 transition-opacity duration-500 opacity-100" style="max-height: calc(90vh - 130px);">
                <!-- Content appears with fade-in effect -->
                <transition
                  enter-active-class="transition ease-out duration-300"
                  enter-from-class="transform opacity-0 translate-y-4"
                  enter-to-class="transform opacity-100 translate-y-0"
                  appear
                >
                  <div>
                    <!-- Thumbnail with subtle zoom effect on hover -->
                    <div v-if="thumbnail" class="flex justify-center mb-4 overflow-hidden rounded-lg">
                      <img :src="thumbnail" class="rounded-lg w-full object-cover max-h-64 transition-transform duration-700 hover:scale-105" alt="">
                    </div>
  
                    <!-- Summary Text with staggered animation -->
                    <p class="text-gray-700 dark:text-white text-base leading-relaxed whitespace-pre-line text-justify">
                      {{ summaryText }}
                    </p>
  
                    <!-- Key points with animated entrance -->
                    <div v-if="keyPoints.length > 0" 
                         class="mt-6 space-y-3 animate-fade-in-up">
                      <p class="font-bold text-lg text-blue-600 dark:text-blue-400">
                        -ចំណុចសំខាន់ៗ
                      </p>
                      <ul class="space-y-3">
                        <li v-for="(point, index) in keyPoints" 
                            :key="index"
                            class="pl-4 border-l-4 border-blue-500 dark:border-blue-400 text-gray-700 dark:text-gray-200 py-2 rounded-r bg-blue-50 dark:bg-gray-700 transition-all duration-300 hover:border-l-6 hover:pl-5"
                            :style="`animation-delay: ${200 + index * 100}ms`">
                          {{ point.trim() }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
  
            <!-- Modal Footer -->
            <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 flex justify-end border-t border-gray-200 dark:border-gray-700">
              <button @click="closeModal" 
                     class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 shadow-md">
                Close
              </button>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  
  interface Props {
    isVisible: boolean;
    isLoading: boolean;
    summaryContent: string | null;
    thumbnail?: string;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    isVisible: false,
    isLoading: false,
    summaryContent: null,
    thumbnail: ''
  });
  
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    emit('close');
  };
  
  // Compute summary text and key points
  const summaryText = computed(() => {
    if (!props.summaryContent) return '';
    return props.summaryContent.split("**ចំណុចសំខាន់ៗ:**")[0].replace(/<br\s*\/?>/gi, '').trim();
  });
  
  const keyPoints = computed(() => {
    if (!props.summaryContent || !props.summaryContent.includes("**ចំណុចសំខាន់ៗ:**")) return [];
    return props.summaryContent.split('**ចំណុចសំខាន់ៗ:**')[1].replace(/<br\s*\/?>/gi, '').split('* ').filter(point => point.trim().length > 0);
  });
  
  // Background color transition states
  const isDarkMode = ref(false);
  const backgroundColors = [
    'bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-pink-400/30',
    'bg-gradient-to-br from-blue-500/30 via-indigo-400/20 to-blue-400/30'
  ];
  const currentBackground = ref(0);
  
  // Change background color periodically
  const backgroundClass = computed(() => {
    return backgroundColors[currentBackground.value];
  });
  
  // Toggle background color every 5 seconds if loading
  watch(() => props.isLoading, (isLoading) => {
    let interval: number | null = null;
    
    if (isLoading) {
      interval = window.setInterval(() => {
        currentBackground.value = (currentBackground.value + 1) % backgroundColors.length;
      }, 5000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, { immediate: true });
  
  // Detect dark mode
  onMounted(() => {
    isDarkMode.value = document.documentElement.classList.contains('dark');
    
    // Listen for dark mode changes
    const observer = new MutationObserver(() => {
      isDarkMode.value = document.documentElement.classList.contains('dark');
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  });
  </script>
  
  <style scoped>
  .animate-spin {
    animation: spin 3s linear infinite;
  }
  
  .animate-spin-reverse {
    animation: spin-reverse 2s linear infinite;
  }
  
  .animate-gradient-x {
    animation: gradient-x 3s linear infinite;
    background-size: 200% 200%;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.5s ease-out forwards;
    opacity: 0;
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @keyframes spin-reverse {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
  
  @keyframes gradient-x {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  
  @keyframes fade-in-up {
    0% {
      opacity: 0;
      transform: translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>