<template>
  <div class="h-full dark:bg-black pb-20">
    <div class="">
      <video autoplay muted loop id="myVideo">
        <source src="/TC_Intro_Demo.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
    </div>
    <div class="dark:bg-black h-full px-4 lg:px-14 mt-8">
      <div
        class="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-4"
        data-aos="zoom-in"
      >
        <ReusablesVideoCard v-for="(v, n) in videos" :key="n" :video="v" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IResponse } from 'types/api';

let currentPage = 1;
let videos = ref(
  (
    await (<Promise<IResponse<any[]>>>(
      useApi(
        `/items/videos?limit=50&sort=-date_created&fields=title,body,slug,thumbnail,description, id`,
        { method: 'GET' }
      )
    ))
  ).data
);

const handleScrollPagination = async () => {
  try {
    let documentHeight = document.body.scrollHeight;
    let currentScroll = window.scrollY + window.innerHeight;
    // When the user is 80% of the screen, fire the event.
    if (currentScroll > 0.8 * documentHeight) {
      currentPage = currentPage + 1;
      const nextPageVideos = await (<Promise<IResponse<any[]>>>(
        useApi(
          `/items/videos?limit=10&sort=date_created&page=${currentPage}&filter[status]=published&fields=title, body, description, thumbnail, date_created, id, slug`,
          { method: 'GET' }
        )
      ));
      console.log(videos);
      videos.value = [...videos.value, ...nextPageVideos.data];
    }
  } catch (error) {}
};

onMounted(() => {
  // window.addEventListener('scroll', handleScrollPagination);
});

onUnmounted(() => {
  // window.removeEventListener('scroll', handleScrollPagination);
});
</script>

<style scoped></style>
