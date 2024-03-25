<template>
  <!-- v-if -->
  <div v-if="video">
    <div>
      <div
        :style="{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://images.unsplash.com/photo-1486257293255-8810a92c541f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1438&q=80)`,
        }"
        class="h-44 lg:h-60 w-full object-cover bg-no-repeat bg-center"
      ></div>
      <div class="dark:bg-black h-full list-disc list-inside pt-4">
        <div class="px-4">
          <div
            class="mb-3 text-center text-gray-800 text-2xl lg:text-5xl lg:leading-normal font-medium lg:font-bold article-title lg:mx-28 mx-2 mt-2 dark:text-white"
          >
            {{ video.title }}
          </div>
          <div
            class="flex flex-wrap justify-center items-center dark:text-white"
          >
            <div
              class="md:text-base text-sm text-center font-extralight mx-2 pt-2 lg:mx-40"
            >
              {{ video.description }}
            </div>
          </div>
          <div class="flex justify-center mt-4">
            <hr class="w-10 bg-primary" />
          </div>
        </div>
      </div>
      <div class="mt-4 pb-10">
        <div class="grid grid-cols-1 lg:grid-cols-articles pt-4 px-4">
          <div class="hidden lg:block"></div>
          <!-- content -->
          <div class="">
            <!-- iframe -->
            <div class="rounded-md p-2 border dark:border-white border-primary">
              <div class="text-lg dark:text-white">
                <div
                  v-html="video.body"
                  class="video_body"
                  id="video-body"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <NextVideos
        :videos="relatedVideos"
        title="មើលវីដេអូបន្ទាប់"
        to="/latest"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IResponse } from 'types/api';
const route = useRoute();

const relatedVideos = ref(
  (
    await (<Promise<IResponse<any[]>>>(
      useApi(
        `/items/videos?limit=4&sort=-date_created&fields=title,body,slug,thumbnail,description, id`,
        { method: 'GET' }
      )
    ))
  ).data
);

const video = (
  await (<Promise<IResponse<any[]>>>(
    useApi(
      `/items/videos?filter[status]=published&filter[slug][_eq]=${route.params.video}&fields=title,body,slug,thumbnail,description, id`,
      { method: 'GET' }
    )
  ))
).data[0];
</script>

<style>
.video_body iframe {
  height: 500px;
  width: 100%;
}
</style>
