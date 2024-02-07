<template>
  <NuxtLink :to="`/articles/${article.slug}`">
    <div
      class="bg-white dark:bg-neutral-800 filter drop-shadow-xl rounded-b-lg mx-2 mb-6 lg:my-0 lg:mx-0 rounded-xl transform transition duration-300 hover:scale-95 hover:shadow-lg"
    >
      <img
        format="webp"
        loading="lazy"
        :src="useImg(article.thumbnail)"
        alt=""
        class="h-auto lg:h-40 2xl:h-44 w-full rounded-t-xl object-cover bg-no-repeat bg-center"
      />
      <div
        class="h-60 px-4 pt-4 pb-6 flex flex-col justify-between rounded-b-lg relative"
      >
        <div>
          <div class="p-1 bg-white dark:bg-gray-800 card-profile-container">
            <img
              loading="lazy"
              :src="useImg(article.user_created.avatar)"
              class="card-profile bg-cover object-cover"
              alt="profile "
            />
          </div>
          <div
            class="text-xs font-light text-primary mt-10 flex justify-between"
          >
            {{ $formatDate(article.date_created) }}
            <div
              class="underline">
              #{{ article.category.name }}
            </div>
          </div>

          <p
            class="text-base lg:text-lg font-medium line-clamp dark:text-white mt-1">
            {{ article.title }}
          </p>
          <div class="text-xs font-light mt-2 dark:text-white">
            {{ $kFormatter(article.views) }} views
            <span class="text-xs mx-2">•</span>
            <span
              class="bg-gray-200 dark:bg-gray-500 dark:text-white p-0.5 px-2 rounded-full"
              >{{ $calculateReadTime(article.body) }}</span>
          </div>
        </div>
        <div class="flex items-center justify-between dark:text-white">
          <div class="">
            <div class="text-sm font-thin">បន្តការអានអត្ថបទ</div>
          </div>
          <IconsArrow />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { IArticle } from '~~/types/article';
defineProps<{
  article: IArticle;
}>();
</script>

<style>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
.news-card:hover {
  filter: brightness(80%);
}
.card-profile {
  border-radius: 50%;
  height: 100%;
  width: 100%;
}
.card-profile-container {
  position: absolute;
  top: -20%;
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
}
</style>
