<template>
  <div>
    <!-- Articles card -->
    <div class="py-10 px-12">
      <div
        class="flex flex-col mt-10 h-20 justify-center px-4 lg:px-24 text-blue-500 text-3xl font-bold"
      >
        អត្ថបទពេញនិយម
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 justify-center gap-x-4 gap-y-8 mt-8 lg:px-20"
        v-if="articles != undefined && articles.length > 0">
        <div v-for="(a, n) in articles" :key="n" class="flex justify-center">
          <ReusablesArticleCard :article="a" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { IResponse } from "~~/types/api";
import { IArticle } from "~~/types/article";
const now = new Date();
const firstday = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

// popular artcles
const articles = ref(
  (
    await (<Promise<IResponse<IArticle[]>>>(
      useApi(
        `/items/articles?filter[date_created][_between]=${firstday}, ${now.toISOString()}&sort[]=-views&limit=10&fields=title, date_created,slug, thumbnail,body,category.name, user_created.first_name, user_created.last_name, user_created.avatar,views,slug`,
        { method: "GET" }
      )
    ))
  ).data
);

useHead({
  title: `Technology Cambodia - អត្ថបទពេញនិយម`,
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "format-detection", content: "telephone=no" },
    {
      hid: "description",
      name: "description",
      content: "អត្ថបទពេញនិយម",
    },
    { name: "keywords", content: "technology cambodia, technology cambodia" },
    {
      hid: "og:title",
      name: "og:title",
      content: `Technology Cambodia - អត្ថបទពេញនិយម`,
    },
    {
      hid: "og:site_name",
      name: "og:site_name",
      content: `Technology Cambodia - អត្ថបទពេញនិយម`,
    },
    {
      hid: "og:description",
      name: "og:description",
      content: "អត្ថបទពេញនិយម",
    },
    {
      hid: "og:image",
      name: "og:image",
    },
  ],
});
</script>

<style>
/* Custom styles if needed */
</style>a