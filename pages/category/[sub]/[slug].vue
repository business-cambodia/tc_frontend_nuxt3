<template>
  <div>
    <div data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500" :style="{
      backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${useImg(
        fetchedParentCategory.thumbnail
      )})`,
    }" class="h-64 lg:h-80 object-cover bg-center bg-no-repeat bg-cover pt-6">
      <div class="text-white h-full flex items-center text-base md:text-lg lg:text-2xl md:px-20 px-6">
        {{ fetchedParentCategory.description }}
      </div>
    </div>
    <!-- Subcategories Section -->
    <div v-if="subCategories.length > 0" class="mt-2 lg:px-20 px-6">
      <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-1">
        <div
          v-for="subCategory in subCategories"
          :key="subCategory.id"
          class="group relative overflow-hidden rounded-xl bg-white dark:bg-dark transition-all duration-300 border hover:border-primary"
          :class="{
            'border-primary bg-gray-100 dark:bg-gray-800': subCategory.slug === route.params.slug,
          }"
        >
          <NuxtLink :to="`/category/${parentCategory?.slug}/${subCategory.slug}`" class="block p-3 transition-colors">
            <div class="flex items-center justify-between">
              <span
                class="text-gray-800 text-sm md:text-md dark:text-white font-medium group-hover:text-primary transition-colors line-clamp-1"
                :class="{
                  'text-primary font-bold': subCategory.slug === route.params.slug,
                }"
              >
                {{ subCategory.name }}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400 group-hover:text-primary transform transition-transform group-hover:translate-x-1"
                :class="{
                  'text-primary': subCategory.slug === route.params.slug,
                }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Subcategory Content -->
    <div v-if="currentSubcategory" class="">
      <!-- <div class="text-2xl font-bold">{{ currentSubcategory.name }}</div>
      <p class="mt-2 text-gray-600">{{ currentSubcategory.description }}</p> -->
    </div>

    <div v-else class="flex justify-center items-center h-32">
      <p class="text-gray-500">Loading...</p>
    </div>
    <!-- data-aos="fade-up"
    data-aos-duration="500" -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 justify-center gap-4 my-10   lg:px-20 px-6"
   
      v-if="articles && articles.length > 0"
    >
      <div v-for="(a, index) in articles" :key="index" class="flex justify-center article-animation">
        <ReusablesArticleCard :article="a" />
      </div>
    </div>

    <div v-else class="mt-10 justify-center flex items-center h-auto">
      <p class="text-gray-500">No articles found for - {{ currentSubcategory?.name }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { IArticle } from "~/types/article";
import { IResponse } from "~~/types/api";
import { ICategory } from "~~/types/category";

const route = useRoute();
const currentSubcategory = ref<ICategory | null>(null);
const subCategories = ref<ICategory[]>([]);
const parentCategory = ref<ICategory | null>(null);
const articles = ref<IArticle[]>([]);

// Fetch the parent category and its subcategories
const fetchedParentCategory = (
  await (<Promise<IResponse<ICategory[]>>>(
    useApi(
      `/items/categories?sort=-date_created&filter[slug][_eq]=${route.params.sub}&fields=id,name,description,slug,thumbnail,sub_categories.id,sub_categories.name,sub_categories.slug,sub_categories.description`,
      { method: "GET" }
    )
  ))
).data[0];

if (fetchedParentCategory) {
  parentCategory.value = fetchedParentCategory;
  subCategories.value = fetchedParentCategory.sub_categories || [];

  // Find the matching subcategory
  const foundSubcategory = subCategories.value.find(
    (sub: ICategory) => sub.slug === route.params.slug
  );

  if (foundSubcategory) {
    currentSubcategory.value = foundSubcategory;
  } else {
    throw createError({
      statusCode: 404,
      statusMessage: "This subcategory does not exist.",
    });
  }
}

// Fetch articles based on subcategory slug
const fetchedArticles = (
  await (<Promise<IResponse<IArticle[]>>>(
    useApi(
      `/items/articles?filter[status]=published&sort=-date_created&filter[sub_category][slug][_eq]=${route.params.slug}&fields=*,user_created.first_name,user_created.last_name,category.name,user_created.avatar,slug,views,sub_category.slug,sub_category.name`,
      { method: "GET" }
    )
  ))
).data;

articles.value = fetchedArticles;


useHead({
  title: `Technology Cambodia - ${currentSubcategory.value?.name}`,
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "format-detection", content: "telephone=no" },
    {
      hid: "description",
      name: "description",
      content: fetchedParentCategory.description,
    },
    { name: "keywords", content: "technology-cambodia, technology cambodia" },
    {
      hid: "og:title",
      name: "og:title",
      content: `Technology Cambodia - ${fetchedParentCategory.name}`,
    },
    {
      hid: "og:site_name",
      name: "og:site_name",
      content: `Technology Cambodia - ${fetchedParentCategory.name}`,
    },
    {
      hid: "og:description",
      name: "og:description",
      content: fetchedParentCategory.description,
    },
    {
      hid: "og:image",
      name: "og:image",
      content: useImg(fetchedParentCategory.thumbnail),
    },
  ],
});

</script>
