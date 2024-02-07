<template>
  <!-- search page -->
  <div>
    <div class="flex justify-center items-center h-[30rem]">
      <div class="flex flex-col items-center">
        <img src="/footer/logo2.png" class="w-20 h-20" alt="Website Logo" />
        <h1 class="text-blue-500 text-2xl font-bold mt-4">ស្វែងរកអត្ថបទ</h1>
        <p class="text-blue-500 text-lg text-center mt-2">
          ស្វែងរកអត្ថបទដែលអ្នកចង់អាននៅទីនេះ
        </p>
        <div class="flex mt-4 w-full">
          <form class="flex w-full" @submit.prevent="performSearch">
            <input
              v-model="search"
              type="text"
              class="w-full border-2 border-gray-300 px-4 py-2 rounded-l-lg focus:outline-none focus:border-blue-500"
              placeholder="ស្វែងរកអត្ថបទ..."
              required
            />
            <button
              type="submit"
              class="px-5 flex justify-center items-center bg-blue-500 text-white rounded-r-lg mx-1 hover:bg-blue-600 duration-150"
              aria-label="Search"
            >
              ស្វែងរក <i class="fas fa-search mx-1" aria-hidden="true"></i>
            </button>
          </form>
        </div>

        <!-- Error Message for No Articles Found -->
        <div
          v-if="!searchFound"
          class="text-red-500 flex flex-col items-center justify-center mt-10"
        >
          <h2 class="text-4xl font-bold">
            មិនមានអត្ថបទត្រូវនឹងការស្វែងរករបស់អ្នក <i class="fas fa-search mx-1" aria-hidden="true"></i>
          </h2>
          <a
            href="/"
            class="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded"
          >
            ត្រឡប់ទៅទំព័រដើម
          </a>
        </div>
      </div>
    </div>
    <!-- show the articles -->
    <div
      class="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 justify-center mb-10 gap-x-4 gap-y-8 mt-8 lg:px-20"
      v-if="articles != undefined && articles.length > 0"
    >
      <div v-for="(a, n) in articles" :key="n" class="flex justify-center">
        <ReusablesArticleCard :article="a" />
      </div>
    </div>
  </div>
</template>
  <script setup lang="ts">
import { ref } from "vue";
//   import api
import { IResponse } from "~~/types/api";
import { IArticle } from "~~/types/article";

const searchTerm = ref("");

let currentPage = 1;
let searchFound = true;
let requesting = false;
const search = ref("");
const articles = ref<IArticle[]>([]);

const performSearch = async () => {
  searchFound = true;
  requesting = false;
  const response = (
    await (<Promise<IResponse<IArticle[]>>>(
      useApi(
        `/items/articles?filter[status]=published&sort=-date_created&limit=10&page=1&search=${search.value}&fields=title, thumbnail, date_created,user_created.first_name, user_created.last_name, user_created.avatar,slug, category.slug, category.name,views`,
        { method: "GET" }
      )
    ))
  ).data;
  // Check condition if not articles found
  if (response.length === 0) {
    searchFound = false;
  }
  articles.value = [...response];
};
const handleScrollPagination = async () => {
  let documentHeight = document.body.scrollHeight;
  let currentScroll = window.scrollY + window.innerHeight;
  // When user scroll to 80% of the screen then fetch 10 more articles
  if (
    currentScroll > 0.8 * documentHeight &&
    !requesting &&
    articles.value.length != 0
  ) {
    requesting = true;
    currentPage = currentPage + 1;
    const nextPageArticles: any = await useApi(
      `/items/articles?filter[status]=published&sort=-date_created&limit=10&page=${currentPage}&search=${search.value}&fields=title, thumbnail, date_created,user_created.first_name, user_created.last_name, user_created.avatar,slug, category.slug, category.name,views`,
      { method: "GET" }
    );
    if (nextPageArticles.data.length == 0) {
      return;
    }
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
<style>
/* Custom styles if needed */
</style>
  