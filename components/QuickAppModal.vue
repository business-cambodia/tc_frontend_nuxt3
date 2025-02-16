
<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full  items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel :class="`w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white bg-opacity-50  dark:bg-gray-800 p-6 shadow-xl transition-all ${activeCategory?.gradientFrom} ${activeCategory?.gradientTo} `">
              <div class="flex items-center justify-between mb-4">
                <DialogTitle class="text-2xl font-semibold">
                  <div class="flex items-center dark:text-white">
                    <div :class="`w-8 h-8 mr-3 ${activeCategory?.iconColor}`">
                      <svg viewBox="0 0 24 24" fill="none" class="w-full h-full">
                        <path 
                          :d="activeCategory?.svgPath" 
                          :fill="activeCategory?.fill"
                          :stroke="activeCategory?.stroke"
                          :stroke-width="activeCategory?.strokeWidth"
                        />
                      </svg>
                    </div>
                    {{ activeCategory?.title }}
                  </div>
                </DialogTitle>
                <button 
                  @click="closeModal"
                  class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Modal Content Based on Category -->
              <div class="mt-4">
                <div v-if="activeCategory?.id === 'qr-barcode'" class="space-y-4">
                  <div class="">
                    <ToolCodeGenerator />
                  </div>
                 
                </div>

                <div v-else-if="activeCategory?.id === 'invoice'" class="space-y-4">
                  <!-- <div class="grid grid-cols-2 gap-4">
                    <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Create New Invoice</button>
                    <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Load Template</button>
                  </div> -->
                  <ToolPdfToWordConvert />
                </div>
                <div v-else-if="activeCategory?.id === 'text-to-speech'" class="space-y-4">
                  <ToolTechToSpeech />
                </div>
                <div v-else-if="activeCategory?.id === 'image-compressor'" class="space-y-4">
                  <ToolImageCompressor />

                </div>
                <!-- password-generator -->
                <div v-else-if="activeCategory?.id === 'password-generator'" class="space-y-4">
                  <ToolPasswordGenerator />
                </div>

                <!-- Add more category-specific content here -->
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { 
  TransitionRoot, 
  TransitionChild, 
  Dialog, 
  DialogPanel, 
  DialogTitle 
} from '@headlessui/vue'

interface Category {
  id: string;
  title: string;
  description: string;
  svgPath: string;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: string;
  strokeLinejoin?: string;
  iconColor: string;
  gradientFrom: string;
  gradientTo: string;
}

interface Props {
  isOpen: boolean;
  activeCategory: Category | null;
}

const props = defineProps<Props>();
const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>