<template>
  <div class="">

    <div data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500" :style="{
      backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${useImg(
        currentCategory.thumbnail
      )})`,
    }" class="h-64 lg:h-80 object-cover bg-center bg-no-repeat bg-cover pt-6">
      <div class="text-white h-full flex items-center text-base md:text-lg lg:text-2xl md:px-20 px-6">
        {{ currentCategory.description }}
      </div>
    </div>
    
    <!-- Subcategories Section -->
    <div v-if="subCategories.length > 0" class="mt-2  lg:px-20 px-6 ">
      <div class="grid grid-cols-3  md:grid-cols-4 lg:grid-cols-8 gap-1">
        <div v-for="subCategory in subCategories" :key="subCategory.id"
          class="group relative overflow-hidden rounded-xl bg-white dark:bg-dark  transition-all duration-300 border hover:border-primary ">
          <NuxtLink :to="`/category/${currentCategory.slug}/${subCategory.slug}`" class="block p-3 transition-colors ">
            <div class="flex items-center justify-between ">
              <span class="text-gray-800 text-sm md:text-md dark:text-white font-medium group-hover:text-primary transition-colors line-clamp-1">
                {{ subCategory.name }}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-gray-400 group-hover:text-primary transform transition-transform group-hover:translate-x-1"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>


    <div class="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 justify-center gap-4 mt-10 lg:px-20 px-6"
      data-aos="fade-up" data-aos-duration="500" v-if="articles && currentCategory && articles.length > 0">
      <div v-for="(a, n) in articles" :key="n" class="flex justify-center article-animation">
        <ReusablesArticleCard :article="a" />
      </div>
    </div>

    <div v-else class="mt-10 justify-center flex items-center h-auto ">
      <PageNotFound />
    </div>

    <BackToTopButton />
  </div>
</template>

<script setup lang="ts">
import '~/assets/css/animations.css';
import { IResponse } from "~~/types/api";
import { IArticle } from "~~/types/article";
import { ICategory } from "~~/types/category";
// import LoadingSpinner from '~~/components/LoadingSpinner';
// const isLoading = ref(true);
// Simulate loading data
// setTimeout(() => {
//   isLoading.value = false;
// }, 3000);
const route = useRoute();
let currentPage = 1;
let requesting = false;

const subCategories = ref<Array<{ id: string; name: string; slug: string }>>([]);


// Existing fetch logic for currentCategory remains unchanged
const currentCategory = (
  await (<Promise<IResponse<ICategory[]>>>(
    useApi(
      `/items/categories?sort=-date_created&filter[slug][_eq]=${route.params.slug}&fields=id,name,description,slug,thumbnail,sub_categories.id,sub_categories.name,sub_categories.slug`,
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
// Extract and assign subcategories to the ref
if (currentCategory.sub_categories) {
  subCategories.value = currentCategory.sub_categories;
}
const articles = ref(
  (
    await (<Promise<IResponse<IArticle[]>>>(
      useApi(
        route.params.slug == "technology"
          ? `/items/articles?limit=10&sort=-date_created&page=1&filter[category][slug][_in]=business,technology,agriculture&filter[status]=published&fields=id,title,body, thumbnail, date_created,user_created.first_name, user_created.last_name,user_created.avatar ,slug, views,id, category.slug, category.name`
          : `/items/articles?limit=10&sort=-date_created&page=1&filter[category][slug]=${route.params.slug}&filter[status]=published&fields=id,title, thumbnail,body, date_created,user_created.first_name, user_created.last_name,user_created.avatar ,slug, views,id, category.slug, category.name`,
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
        ? `/items/articles?limit=10&sort=-date_created&page=${currentPage}&filter[category][slug][_in]=business,technology,agriculture&fields=id,title, thumbnail, date_created,user_created.first_name, user_created.last_name, user_created.avatar,slug, category.slug, views, category.name`
        : `/items/articles?limit=10&sort=-date_created&page=${currentPage}&filter[category][slug]=${route.params.slug}&fields=id,title, thumbnail, date_created,user_created.first_name, user_created.last_name, user_created.avatar,slug, category.slug, views, category.name`,
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

<style>
.button-shadow {
  /* box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset; */
  box-shadow: rgba(255, 165, 0, 0.1) 0px 4px 16px, rgba(255, 165, 0, 0.1) 0px 8px 24px, rgba(255, 165, 0, 0.1) 0px 16px 56px;

}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  display: inline-block;
  white-space: nowrap;
  animation: marquee 10s linear infinite;
}
</style>