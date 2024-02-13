<template>
  <div>
    <div class="mt-8 pb-4">
      <div class="flex justify-between">
        <p class="font-light lg:text-lg dark:text-white">
          {{ title }}
        </p>
        <NuxtLink :to="`/category/${name}`" v-if="!seeMoreLink"
          ><button class="text-primary hover:text-gray-300">
            មើល​បន្ថែម​ទៀត
          </button></NuxtLink
        >
        <NuxtLink :to="`${seeMoreLink}`" v-else
          ><button class="text-primary hover:text-gray-300">
            មើល​បន្ថែម​ទៀត
          </button></NuxtLink
        >
      </div>
      <div
        class="hidden lg:grid lg:grid-cols-4 2xl:grid-cols-5 gap-x-10 mt-6"
        v-if="articles != undefined && articles.length > 0"
        data-aos="zoom-in"
        data-aos-once='true'
      >
        <ReusablesArticleCard
          :class="n == 4 && 'hidden 2xl:block'"
          v-for="(a, n) in articles"
          :key="n"
          :article="a"
        />
      </div>
      <div class="lg:hidden mt-6">
        <Carousel :breakpoints="breakpoints">
          <Slide v-for="(a, index) in articles" :key="index">
            <ReusablesArticleCard :article="a" class="px-2 mb-3 text-left" />
          </Slide>
          <template #addons>
            <Pagination class="dark:text-white"/>
          </template>
        </Carousel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IArticle } from 'types/article';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Pagination, Slide } from 'vue3-carousel';

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
};

defineProps<{
  title: String;
  name?: String;
  articles: Array<IArticle>;
  seeMoreLink?: String;
}>();

</script>

<style>
.carousel__slide {
  align-items: start;
}
</style>
