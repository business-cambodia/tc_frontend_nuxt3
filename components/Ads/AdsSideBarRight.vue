<template>
  <div class="sticky top-0">
    <div class="flex flex-col items-center">
      <div
        v-if="ads.length && ads !== undefined"
        class="w-full bg-white p-4 rounded-lg shadow-lg"
      >
        <div class="mt-4" v-for="(a, n) in ads" :key="n">
          <a
            :href="a.link"
            target="_blank"
            :id="'side_ads_' + n"
            @click="$handleAdClick(a ? a.slug : '')"
          >
            <img
              :id="a ? a.slug : ''"
              :src="useImg(a.file)"
              alt="Advertisement"
              class="w-full h-auto my-2 rounded-md"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IAd } from '~~/types/ad';

const props = defineProps({
  ads: {
    type: Array<IAd>,
    required: true,
  },
  type: String,
  page: Number,
});
</script>

<style scoped>
/* custom styles if any */
</style>
