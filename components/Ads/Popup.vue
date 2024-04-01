<template>
  <div class="fixed w-screen h-screen z-10" v-if="ad && ad !== undefined">
    <div
      :style="{
        background: `rgba(0, 0, 0, 0.7)`,
      }"
      class="h-full w-full relative flex justify-center"
    >
      <div class="w-full px-2 lg:px-0 lg:w-1/2 mt-24">
        <div class="p-2 lg:p-4 bg-white rounded-xl">
          <a :href="ad.link" target="_blank">
            <img
              :src="useImg(ad.file)"
              alt=""
              class="rounded-xl"
              @click="$handleAdClick(ad ? ad.slug : '')"
              :id="ad.slug"
            />
          </a>
          <div class="flex justify-end mt-2 items-center">
            <div class="mr-4">បិទដោយស្វ័យប្រវត្តិនៅ {{ timer }}</div>
            <button
              class="px-8 py-1 bg-primary text-white rounded-xl"
              @click="handleClosePopup?.()"
            >
              បិទឥឡូវនេះ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IAd } from '~~/types/ad';
const { $handleAdSeen }: any = useNuxtApp();

const timer = ref(5);
const props = defineProps<{
  ad: IAd | undefined;
  handleClosePopup: Function;
}>();

const handleCountDown = () => {
  setInterval(() => {
    if (timer.value === 0) {
      props.handleClosePopup?.();
      clearInterval();
    } else {
      timer.value = timer.value - 1;
    }
  }, 1000);
};
onMounted(async () => {
  if (props.ad) {
    handleCountDown();
    await $handleAdSeen(props?.ad?.slug);
  }
});
</script>

<style>
.popup {
  background: rgba(0, 0, 0, 0.7);
}
</style>
