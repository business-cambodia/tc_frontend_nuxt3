<template>
    <section class="relative overflow-hidden min-h-[50vh]">
      <!-- Animated Background Shapes -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="animate-blob1 opacity-20 absolute bg-purple-300 dark:bg-purple-600 blur-3xl h-64 w-64 rounded-full -top-32 -left-32"></div>
        <div class="animate-blob2 opacity-20 absolute bg-blue-300 dark:bg-blue-600 blur-3xl h-64 w-64 rounded-full top-1/2 left-1/2"></div>
        <div class="animate-blob3 opacity-20 absolute bg-pink-300 dark:bg-pink-600 blur-3xl h-64 w-64 rounded-full bottom-0 right-0"></div>
      </div>
  
      <div class="mx-auto px-4 pb-4 pt-20 relative" data-aos="fade-up">
        <div>
          <h2 class="text-xl font-bold text-primary mb-2">អត្ថបទថ្មីៗ</h2>
        </div>
  
        <!-- Loading State -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <ArticleLoadingCard v-for="n in 5" :key="n" />
        </div>
  
        <!-- Regular Articles Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-5 gap-6">
          <template v-for="(article, index) in articles" :key="article.id">
            <ReusablesArticleNewsCard :article="article" :featured="false" />
          </template>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { IResponse } from 'types/api';
  import { IArticle } from 'types/article';
  
  const loading = ref(true);
  const articles = ref<IArticle[]>([]);
  
  // Fetch articles with minimum loading time
  const fetchArticles = async () => {
    try {
      const startTime = Date.now();
      
      const response = await useApi(
        '/items/articles?filter[status]=published&limit=15&sort=-date_created&fields=title, date_created,slug, thumbnail,body ,category.name, user_created.first_name, user_created.last_name, user_created.avatar,views',
        { method: 'GET' }
      ) as IResponse<IArticle[]>;
      
      articles.value = response.data;
  
      // Calculate remaining time to meet minimum loading duration (800ms)
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 800 - elapsedTime);
  
      // Wait for remaining time before hiding loading state
      await new Promise(resolve => setTimeout(resolve, remainingTime));
      
      loading.value = false;
    } catch (error) {
      console.error('Failed to fetch articles:', error);
      loading.value = false;
    }
  };
  
  // Start fetching immediately
  fetchArticles();
  </script>
  
  <style scoped>
  .animate-blob1 {
    animation: blob 7s infinite;
  }
  .animate-blob2 {
    animation: blob 7s infinite 2s;
  }
  .animate-blob3 {
    animation: blob 7s infinite 4s;
  }
  
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  </style>