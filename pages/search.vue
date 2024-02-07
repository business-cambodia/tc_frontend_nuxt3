<template>
  <!-- search page -->
  <div>
    <div class="flex justify-center items-center h-96">
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
        <div v-if="!searchFound" class="text-red-500">
          មិនមានអត្ថបទត្រូវនឹងការស្វែងរករបស់អ្នក។
        </div>
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
    if(response.length === 0){
        searchFound = false;
    }
    articles.value = [...response];
};
</script>
<style>
/* Custom styles if needed */
</style>
  