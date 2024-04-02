<template>
  <!-- v-if -->
  <div v-if="video">
    <div>
      <div
        :style="{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://images.unsplash.com/photo-1486257293255-8810a92c541f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1438&q=80)`,
        }"
        class="h-20 lg:h-28 w-full object-cover bg-no-repeat bg-center"
      ></div>
      <div class="dark:bg-black h-full list-disc list-inside pt-4">
        <AdsAboveArticle
          :ads="aboveArticleAds"
          id="type_above-article"
          type="above-article"
          :page="1"
        />
        <div class="px-4">
          <div
            class="mb-3 text-center text-gray-800 text-2xl lg:text-5xl lg:leading-normal font-medium lg:font-bold article-title lg:mx-28 mx-2 mt-2 dark:text-white"
          >
            {{ video.title }}
          </div>
          <div class="flex flex-col items-center pt-2 text-xs lg:text-base">
            <div
              class="flex flex-wrap justify-center items-center text-gray-600 dark:text-white"
            >
              <!-- <NuxtLink :to="`/authors/${video.user_created?.id}`">-->
              <div class="transfrom hover:underline">
                {{
                  video.user_created.first_name +
                  ' ' +
                  video.user_created.last_name
                }}
              </div>
              <!-- </NuxtLink> -->

              <div class="text-lg mx-2 lg:mx-4">•</div>
              <div>{{ $formatDate(video.date_created) }}</div>
              <div class="text-lg mx-2 lg:mx-4">•</div>
              <div>វីដេអូ</div>
              <div class="text-lg mx-2 lg:mx-4">•</div>
              <div class="font-bold">{{ $kFormatter(video.views) }} views</div>
              <div class="text-lg mx-2 lg:mx-4">•</div>
            </div>
          </div>
          <div
            class="flex flex-wrap justify-center items-center dark:text-white mx-2 lg:mx-56"
          >
            <AdsAboveThumbnailAds
              :ads="aboveThumbnailAds"
              id="above-thumbnail"
              :page="1"
            />
            <div class="md:text-lg text-sm text-center font-extralight pt-2">
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
import { IAd } from 'types/ad';
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
      `/items/videos?filter[status]=published&filter[slug][_eq]=${route.params.video}&fields=title,body,slug,thumbnail,thumbnail_facebook,views,description,date_created, id,user_created.first_name, user_created.last_name, user_created.avatar, user_created.id`,
      { method: 'GET' }
    )
  ))
).data[0];

const ads: IAd[] = (
  await (<Promise<IResponse<IAd[]>>>(
    useApi(
      '/items/advertisement?fields=name, slug,id , file,link,mobile_only, file_mobile,advertisement_type.type, advertiser.slug, detail_page&filter[status]=published&filter[detail_page]=true&sort[]=-order',
      { method: 'GET' }
    )
  ))
).data;

onMounted(() => {
  handleVideoViewed(video);
});

const aboveArticleAds = ads.filter((a) => {
  return a.advertisement_type.type == 'above-article';
});

const firstParagraphAds = ads.filter((a) => {
  return a.advertisement_type.type == 'paragraph-1';
});

const secondParagraphAds = ads.filter((a) => {
  return a.advertisement_type.type == 'paragraph-2';
});

const thirdParagraphAds = ads.filter((a) => {
  return a.advertisement_type.type == 'paragraph-3';
});

const sideBarAds = ads.filter((a) => {
  return a.advertisement_type.type == 'side-bar';
});

const aboveThumbnailAds = ads.filter((a) => {
  return a.advertisement_type.type == 'above-thumbnail';
});

const handleVideoViewed = async (video: any) => {
  await useApi('/items/videos/' + video.id, {
    method: 'PATCH',
    data: {
      views: video.views + 1,
    },
  });
};

let thumbnail = video.thumbnail ? video.thumbnail_facebook : video.thumbnail;

useHead({
  script: [
    {
      type: 'text/javascript',
      src: 'https://platform.twitter.com/widgets.js',
      async: true,
    },
  ],
  title: video.title,
  meta: [
    {
      property: 'og:image',
      content: 'https://tech-cambodia.com/cms' + '/assets/' + thumbnail,
    },
    {
      hid: 'og:description',
      name: 'og:description',
      content: video.body,
    },
    {
      hid: 'og:title',
      name: 'og:title',
      content: video.title,
    },
    {
      hid: 'description',
      name: 'description',
      content: video.body,
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: video.keywords
        ? video.keywords
        : 'Technology Cambodia, articles',
    },
  ],
});
</script>

<style>
.video_body iframe {
  height: 500px;
  width: 100%;
}
</style>
