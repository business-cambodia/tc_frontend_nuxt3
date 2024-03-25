<template>
  <NuxtLink :to="`/videos/${video.slug}`">
    <div class="flex">
      <div
        class="dark:bg-blue-gray-800 filter drop-shadow-xl lg:my-0 lg:mx-0 border py-0 transform transition duration-300 hover:scale-90 hover:shadow-lg w-1/3 rounded-md"
      >
        <img
          :src="useImg(video.thumbnail)"
          alt=""
          class="w-full h-24 object-cover bg-no-repeat rounded-md"
        />
      </div>
      <div class="font-medium w-2/3 pt-1 pl-5 text-black dark:text-white">
        <div class="text-sm lg:text-lg">
          {{ video.title }}
        </div>
        <!-- <div class="truncate w-64 font-light pt-2 text-xs">
            {{ video.description }}
          </div> -->
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  video: {
    type: Object as PropType<any>,
    required: true,
  },
});
</script>

<style scoped>
.video-card iframe {
  height: 250px;
}
</style>
