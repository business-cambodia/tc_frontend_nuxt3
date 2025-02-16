<template>
  <div class="relative w-full">
    <!-- Hero Background with Gradient Overlay -->
    <div
      class="relative h-[90vh] w-full overflow-hidden"
      v-for="(article, index) in heroArticles"
      :key="article.id"
      v-show="currentIndex === index"
    >
      <!-- Background Image with Modern Gradient -->
      <div
        class="absolute inset-0 transition-opacity duration-700"
        :class="{ 'opacity-0': currentIndex !== index }"
        :style="{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url(${useImg(article.thumbnail)})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }"
      ></div>

      <!-- Content Container -->
      <div class="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col justify-center h-full text-white">
          <!-- Category Badge -->
          <div class="mb-4">
            <span class="px-4 py-1.5 bg-primary/80 backdrop-blur-sm rounded-full text-sm font-medium">
              {{ article.category.name }}
            </span>
          </div>

          <!-- Title with Animation -->
          <h1 
            class="text-2xl md:text-5xl  font-medium max-w-4xl hero-title line-clamp-3"
            :class="{ 'animate-fadeIn': currentIndex === index }"
          >
            {{ article.title }}
          </h1>

          <!-- Meta Information -->
          <div class="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-200 animate-fadeIn">
            <div class="flex items-center " >
              <Icon icon="heroicons:calendar-20-solid" class="w-4 h-4 mr-2" />
              {{ $formatDate(article.date_created) }}
            </div>
            <div class="flex items-center">
              <Icon icon="noto-v1:man-judge" class="w-4 h-4 mr-2" />
              {{ article.user_created.first_name + ' ' + article.user_created.last_name }}
            </div>
            <div v-if="article.category.name !== 'PR'" class="flex items-center">
              <Icon icon="hugeicons:view" class="w-4 h-4 mr-2" />
              {{ article.views }} views
            </div>
            <div class="flex items-center">
              <Icon icon="svg-spinners:clock" class="w-4 h-4 mr-2" />
              {{ $calculateReadTime(article.body) }}
            </div>
          </div>

          <!-- CTA Button -->
          <div class="mt-8">
            <nuxt-link :to="'/articles/' + article.slug" class="group">
              <button class="relative px-3 py-2 bg-primary rounded-lg overflow-hidden transition-all duration-300 hover:bg-primary/90">
                <span class="relative z-10 flex items-center font-medium">
                  បន្តការអាន
                  <Icon icon="solar:round-arrow-right-bold" class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </span>
                <div class="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Dots -->
    <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <button
        v-for="(_, index) in heroArticles"
        :key="index"
        @click="currentIndex = index"
        class="w-2 h-2 rounded-full transition-all duration-300"
        :class="currentIndex === index ? 'bg-primary w-6' : 'bg-white/50 hover:bg-white/80'"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { IArticle } from 'types/article';
import { Icon } from "@iconify/vue";
const props = defineProps<{
  heroArticles: IArticle[];
}>();

const currentIndex = ref(0);
let intervalId: NodeJS.Timeout;

const autoPlayCarousel = () => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.heroArticles.length;
  }, 5000);
};

onMounted(() => {
  autoPlayCarousel();
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<style scoped>
.hero-title {
  line-height: 1.3;
}
.animate-fadeIn {
  animation: fadeIn 0.7s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Smooth transition for background changes */
.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>