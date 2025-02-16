<template>
  <section class="mx-auto px-4 pt-4">
    <div class="flex justify-between px-2 mb-2">
      <h2 class="text-xl text-gray-500 dark:text-white  ">អត្ថបទថ្មីៗ</h2>
      <!-- see more -->
      <NuxtLink to="/hot-news" class="text-primary dark:text-primary">មើលបន្ថែមទៀត</NuxtLink>

    </div>

    <!-- Show loading skeleton while fetching articles -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6">
      <ArticleLoadingCard v-for="i in 4" :key="i" />
    </div>

    <!-- Carousel for Newest Articles -->
    <carousel v-else-if="newestArticles.length > 0" :items-to-show="1" :breakpoints="breakpoints" :wrap-around="true"
      :autoplay="4000" :pause-autoplay-on-hover="true" class="relative">
      <slide v-for="(article, index) in newestArticles" :key="article.id">
        <ReusablesArticleNewsCard :article="article" :featured="false" class="w-full px-2" data-aos="zoom-in"
          data-aos-once="true" />
      </slide>

      <template #addons>
        <!-- <Navigation class="text-gray-600  dark:bg-white  "  /> -->
        <pagination class="dark:text-white text-gray-900" />
      </template>
    </carousel>

    <!-- No articles found message -->
    <div v-else class="text-center text-gray-500 dark:text-white mt-4">
      No articles found.
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { IResponse } from "types/api";
import { IArticle } from "types/article";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Pagination, Slide, Navigation } from "vue3-carousel";
import ArticleLoadingCard from "@/components/ArticleLoadingCard.vue"; // Import loading skeleton

const breakpoints = {
  640: { itemsToShow: 2, snapAlign: "start" }, // Mobile
  1024: { itemsToShow: 3, snapAlign: "center" }, // MD screens
  1536: { itemsToShow: 5, snapAlign: "center" }, // XL screens
};

const isLoading = ref(true); // Loading state
const newestArticles = ref<IArticle[]>([]);

// Fetch articles with loading state
(async () => {
  try {
    const response = await useApi(
      "/items/articles?filter[status]=published&limit=8&sort=-date_created&fields=id,title,date_created,slug,thumbnail,body,category.name,user_created.first_name,user_created.last_name,user_created.avatar,views",
      { method: "GET" }
    ) as IResponse<IArticle[]>;

    newestArticles.value = response.data;
  } catch (error) {
    console.error("Failed to fetch articles:", error);
  } finally {
    isLoading.value = false; // Stop loading once data is fetched
  }
})();
</script>
