<template>
    <div class="w-full px-2 lg:px-32 rounded-md">
      <div v-if="ads.length && ads !== undefined">
        <a
          v-for="(a, n) in ads"
          :key="n"
          :id="'above_ads_' + n + '_' + page"
          :href="a.link"
          target="_blank"
          @click="$handleAdClick(a ? a.slug : '')"
        >
          <img
            :id="a ? a.slug : ''"
            format="webp"
            loading="lazy"
            :src="useImg(a.file)"
            alt=""
            :class="`my-2 w-full rounded-md ${
              a && a.mobile_only ? 'lg:hidden' : ''
            }`"
          />
        </a>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { IAd } from "~~/types/ad";
  
  const props = defineProps({
    ads: {
      type: Array<IAd>,
      required: true,
    },
    type: String,
    page: Number,
  });
  
  </script>
  
  <style></style>