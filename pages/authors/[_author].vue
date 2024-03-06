<template>
     <div class="">
    <div
      :style="{
        background: `linear-gradient(rgba(0,0,0,0.5), rgb(0,0,0,0.5)), url(${
          author.cover_pic ? useImg(author.cover_pic) : '/author_cover.jpg'
        }) no-repeat center / cover`,
      }"
      class="h-60 lg:h-[40rem] relative"
    >
      <!-- profile picture and author details (name, description, social medias) -->
      <div
        class="h-full  flex items-end lg:items-center lg:px-16 justify-center lg:justify-start pb-2 lg:mb-0"
      >
        <!-- profile -->
        <img
          :src="useImg(author.avatar)"
          class="rounded-full bg-cover object-cover h-36 w-36 lg:h-48 lg:w-48 lg:mr-20 "
          alt="profile "
        />
        <!-- details -->
        <div class="text-white hidden lg:block">
          <div class="text-4xl font-bold">
            {{ `${author.first_name} ${author.last_name}` }}
          </div>

          <div class="text-2xl font-light py-2">
            {{ author.description }}
          </div>
          <div class="flex text-xl text-gray-100">
            <a :href="author.facebook_link" target="_blank"
              ><i class="fab fa-facebook mx-2"></i
            ></a>
            <a :href="author.youtube_link" target="_blank"
              ><i class="fab fa-youtube mx-2"></i
            ></a>
            <a :href="author.instagram_link" target="_blank"
              ><i class="fab fa-instagram mx-2"></i
            ></a>
          </div>
            <span class=" bg-gradient-to-r from-cyan-400 to-purple-600 text-white px-4 text-xl py-1 rounded-full">អត្ថបទសរុប៖ {{ author.articles_count }}</span>
        </div>
      </div>
    </div>
    <!-- author details for mobile -->
    <div class="lg:hidden bg-white py-4 px-6 filter drop-shadow-xl  dark:bg-dark dark:text-white">
      <div class="text-xl font-bold text-center">
        {{ `${author.first_name} ${author.last_name}` }}
      </div>
      <div class="text-sm font-light py-2 text-center">
        {{ author.description }}
      </div>
      <div class="flex justify-center text-xl text-gray-800 dark:text-white">
        <a :href="author.facebook_link" target="_blank"
          ><i class="fab fa-facebook mx-2"></i
        ></a>
        <a :href="author.youtube_link" target="_blank"
          ><i class="fab fa-youtube mx-2"></i
        ></a>
        <a :href="author.instagram_link" target="_blank"
          ><i class="fab fa-instagram mx-2"></i
        ></a>
      </div>

      <p class="text-center text-sm font-light mt-2 ">
        <span class="  text-center bg-gradient-to-r from-cyan-400 to-purple-600 text-white px-4 text-sm py-1 rounded-full">អត្ថបទសរុប៖ {{ author.articles_count }}</span>
      </p>
    </div>
    <!-- author articles -->
    <div class="pt-10" >
      <div class="font-bold text-2xl flex justify-center text-primary dark:text-white">អត្ថបទដោយអ្នកនិពន្ធរូបនេះ</div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 justify-center gap-x-4 gap-y-8 mt-8 lg:px-20"
      >
        <div  data-aos="zoom-in-up"
          v-for="(a, n) in authorArticles"
          :key="n"
          class="flex justify-center"
        >
          <ReusablesArticleCard :article="a" />
        </div>
      </div>
    </div>
    <BackToTopButton />

  </div>
  </template>
  
  <script setup lang="ts">
  import { IResponse } from "~~/types/api";
  import { IArticle } from "~~/types/article";
  import { IAuthor } from "~~/types/author";
  const route = useRoute();
  let currentPage = 1;
  let requesting = false;
  
  const author: IAuthor = (
    await (<Promise<IResponse<IAuthor>>>(
      useApi(`/users/${route.params._author}?fields=*,count(articles)`, {
        method: "GET",
      })
    ))
  ).data;
  
  const authorArticles = ref(
    (
      await (<Promise<IResponse<IArticle[]>>>(
        useApi(
          `/items/articles?filter[user_created][email][_eq]=${author.email}&limit=10&page=1&filter[status]=published&fields=*,user_created.first_name, user_created.last_name, category.slug, user_created.avatar,user_created.count(articles), category.name&sort=-date_created`,
          { method: "GET" }
        )
      ))
    ).data
  );
  
  useHead({
    title: `Business Cambodia - អត្ថបទពេញនិយម`,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "format-detection", content: "telephone=no" },
      {
        hid: "description",
        name: "description",
        content: "អត្ថបទពេញនិយម",
      },
      { name: "keywords", content: "business-cambodia, business cambodia" },
      {
        hid: "og:title",
        name: "og:title",
        content: `Business Cambodia - អត្ថបទពេញនិយម`,
      },
      {
        hid: "og:site_name",
        name: "og:site_name",
        content: `Business Cambodia - អត្ថបទពេញនិយម`,
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
  
  const handleScrollPagination = async () => {
    let documentHeight = document.body.scrollHeight;
    let currentScroll = window.scrollY + window.innerHeight;
    // When user scroll to 80% of the screen then fetch 10 more articles
    if (currentScroll > 0.8 * documentHeight && !requesting) {
      requesting = true;
      currentPage = currentPage + 1;
      const nextPageArticles: any = await useApi(
        `/items/articles?filter[user_created][email][_eq]=${author.email}&filter[status]=published&limit=10&page=${currentPage}&fields=title, thumbnail, date_created,user_created.first_name, user_created.last_name, user_created.avatar,slug,views,category.slug,category.name&sort=-date_created`,
        { method: "GET" }
      );
      authorArticles.value = [...authorArticles.value, ...nextPageArticles.data];
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
  
  
  <style scoped>
  .profile {
    height: 15rem;
    width: 15rem;
    border-radius: 50%;
  }
  </style>