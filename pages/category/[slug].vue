<template>
    <div class="">
      <div
        :style="{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${useImg(
            currentCategory.thumbnail
          )})`,
        }"
        class="h-64 lg:h-80 object-cover bg-center bg-no-repeat bg-cover pt-6"
      >
        <div
          class="text-white h-full flex items-center text-base md:text-lg lg:text-2xl md:px-20 px-6"
        >
          {{ currentCategory.description }}
        </div>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 justify-center gap-4 mt-8 lg:px-20 px-6"
        v-if="articles != undefined && articles.length > 0"
      >
        <div v-for="(a, n) in articles" :key="n" class="flex justify-center">
          <ReusablesArticleCard :article="a" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { IResponse } from "~~/types/api";
  import { IArticle } from "~~/types/article";
  import { ICategory } from "~~/types/category";
  const route = useRoute();
  let currentPage = 1;
  let requesting = false;
  
  const currentCategory = (
    await (<Promise<IResponse<ICategory[]>>>(
      useApi(
        `/items/categories?sort=-date_created&filter[slug][_eq]=${route.params.slug}&fields=name, description, thumbnail`,
        { method: "GET" }
      )
    ))
  ).data[0];
  
  if (!currentCategory) {
    throw createError({
      statusCode: 404,
      statusMessage: "ផ្នែកនេះមិនទាន់មាននៅឡើយទេ",
    });
  }
  
  const articles = ref(
    (
      await (<Promise<IResponse<IArticle[]>>>(
        useApi(
          route.params.slug == "technology"
            ? `/items/articles?limit=10&sort=-date_created&page=1&filter[category][slug][_in]=business,technology,agriculture&filter[status]=published&fields=title, thumbnail, date_created,user_created.first_name, user_created.last_name,user_created.avatar ,slug, views,id, category.slug, category.name`
            : `/items/articles?limit=10&sort=-date_created&page=1&filter[category][slug]=${route.params.slug}&filter[status]=published&fields=title, thumbnail, date_created,user_created.first_name, user_created.last_name,user_created.avatar ,slug, views,id, category.slug, category.name`,
          { method: "GET" }
        )
      ))
    ).data
  );
  
  useHead({
    title: `Technology Cambodia - ${currentCategory.name}`,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "format-detection", content: "telephone=no" },
      {
        hid: "description",
        name: "description",
        content: currentCategory.description,
      },
      { name: "keywords", content: "technology-cambodia, technology cambodia" },
      {
        hid: "og:title",
        name: "og:title",
        content: `Technology Cambodia - ${currentCategory.name}`,
      },
      {
        hid: "og:site_name",
        name: "og:site_name",
        content: `Technology Cambodia - ${currentCategory.name}`,
      },
      {
        hid: "og:description",
        name: "og:description",
        content: currentCategory.description,
      },
      {
        hid: "og:image",
        name: "og:image",
        content: useImg(currentCategory.thumbnail),
      },
    ],
  });
  
  const handleScrollPagination = async () => {
    let documentHeight = document.body.scrollHeight;
    let currentScroll = window.scrollY + window.innerHeight;
    // When user scroll to 80% of the screen then fetch 10 more articles
    if (currentScroll > 0.8 * documentHeight && !requesting) {
      requesting = true;
      currentPage = currentPage + 1;
      // add technology and argriculture category into business category
      const nextPageArticles: any = await useApi(
        route.params.slug == "business"
          ? `/items/articles?limit=10&sort=-date_created&page=${currentPage}&filter[category][slug][_in]=business,technology,agriculture&fields=title, thumbnail, date_created,user_created.first_name, user_created.last_name, user_created.avatar,slug, category.slug, views, category.name`
          : `/items/articles?limit=10&sort=-date_created&page=${currentPage}&filter[category][slug]=${route.params.slug}&fields=title, thumbnail, date_created,user_created.first_name, user_created.last_name, user_created.avatar,slug, category.slug, views, category.name`,
        { method: "GET" }
      );
      articles.value = [...articles.value, ...nextPageArticles.data];
      requesting = false;
    }
  };
  
  onMounted(() => {
    window.addEventListener("scroll", handleScrollPagination);
  });
  
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScrollPagination);
  });
  </script>
  
  <style></style>