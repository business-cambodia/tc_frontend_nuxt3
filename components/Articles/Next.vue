<template>
  <div v-if="articles !== undefined && articles.length">
    <div
      class="block grid-cols-1 lg:grid-cols-left_shrink px-4 lg:px-16 py-6 gap-x-4 items-center"
    >
      <div class="flex items-center justify-center underline lg:px-10">
        <div class="font-bold text-xl md:text-2xl text-gray-600">
          <div class="w-full text-center">{{ title }}</div>
        </div>
      </div>

      <div class="mt-6">
        <Carousel :breakpoints="breakpoints">
          <Slide v-for="(a, index) in articles" :key="index">
            <ReusablesArticleCard :article="a" class="px-2 mb-3" />
          </Slide>

          <template #addons>
            <Pagination />
          </template>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IArticle } from '~~/types/article';
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';
import 'vue3-carousel/dist/carousel.css';
//responsive breakpoints for carousel
const breakpoints = {
  // mobile
  0: {
    itemsToShow: 1,
    snapAlign: 'start',
  },
  // 640px to 770
  640: {
    itemsToShow: 2,
    snapAlign: 'start',
  },
  // 770px to 1024
  770: {
    itemsToShow: 3,
    snapAlign: 'start',
  },
  1024: {
    itemsToShow: 4,
    snapAlign: 'start',
  },
};
defineProps({
  articles: {
    type: Array<IArticle>,
    required: true,
  },
  title: String,
  to: String,
});
</script>

<style></style>
