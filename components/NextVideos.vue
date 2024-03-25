<template>
  <div v-if="videos !== undefined && videos.length">
    <div
      class="block grid-cols-1 lg:grid-cols-left_shrink px-3 py-6 gap-x-4 items-center"
    >
      <div class="flex items-center justify-center underline lg:px-10">
        <div class="font-bold text-xl md:text-2xl text-gray-600">
          <div class="w-full text-center">{{ title }}</div>
        </div>
      </div>

      <div class="mt-6">
        <Carousel :breakpoints="breakpoints">
          <Slide v-for="(v, index) in videos" :key="index">
            <NuxtLink class="mx-3" :to="`/videos/${v.slug}`">
              <div
                class="overflow-hidden rounded-lg shadow-xl cursor-pointer transform transition duration-300 hover:scale-95 hover:shadow-lg"
              >
                <img
                  class="object-cover w-full h-44"
                  :src="useImg(v.thumbnail)"
                  alt="Flower and sky"
                />
              </div>
              <div class="pt-3 font-medium dark:text-white">
                {{ v.title }}
              </div>
            </NuxtLink>
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
  videos: {
    type: Array<any>,
    required: true,
  },
  title: String,
  to: String,
});
</script>

<style></style>
