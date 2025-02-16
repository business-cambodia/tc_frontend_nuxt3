<template>
    <section class="relative min-h-screen bg-gradient-to-br from-gray-50   to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <!-- Animated Background Shapes -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block">
        <div class="animate-blob1 opacity-30 absolute bg-purple-300 dark:bg-purple-600 blur-3xl h-64 w-64 rounded-full -top-32 -left-32"></div>
        <div class="animate-blob2 opacity-30 absolute bg-blue-300 dark:bg-blue-600 blur-3xl h-64 w-64 rounded-full top-1/2 left-1/2"></div>
        <div class="animate-blob3 opacity-30 absolute bg-pink-300 dark:bg-pink-600 blur-3xl h-64 w-64 rounded-full bottom-0 right-0"></div>
      </div>
  
      <div class="container mx-auto px-4 pb-4 pt-20 relative">
        <!-- Heading with animated underline -->
        <!-- <h2 class="text-2xl font-bold mb-12 text-center relative inline-block left-1/2 -translate-x-1/2">
          <span class="text-gray-800 dark:text-white relative">
            Categories
            <span class="absolute bottom-0 left-0 w-full h-1 bg-primary transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
          </span>
        </h2> -->
        
        <!-- Loading State -->
        <div v-if="loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div v-for="n in 8" :key="n" class="animate-pulse">
            <div class="bg-gray-200 dark:bg-gray-700 rounded-2xl p-4 h-64">
              <div class="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>
              <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto mb-3"></div>
              <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
  
        <!-- Categories Grid -->
        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <NuxtLink 
            v-for="category in categoriesNews" 
            :key="category.id"
            :to="`/category/${category.slug}`"
            class="group transform-gpu hover:-translate-y-1 transition-all duration-300"
          >
            <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
              <div class="relative px-4 py-6 flex flex-col items-center">
                <!-- Image Container with Animated Gradient -->
                <div class="relative mb-4 group-hover:scale-105 transition-transform duration-300">
                  <div class="absolute inset-0 bg-gradient-to-r from-primary/50 to-purple-500/50 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="w-32 h-32 rounded-full overflow-hidden ring-2 ring-gray-100 dark:ring-gray-700 group-hover:ring-primary transition-all duration-300 relative z-10">
                    <img 
                      :src="useImg(category.thumbnail) || '/images/default-category.jpg'" 
                      :alt="category.name"
                      class="w-full h-full object-cover transform transition-transform duration-500"
                    />
                  </div>
                </div>
  
                <!-- Content -->
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-3 text-center group-hover:text-primary transition-colors">
                  {{ category.name }}
                </h3>
                
                <!-- Explore Button -->
                <div class="flex items-center space-x-2 text-gray-600 dark:text-gray-300 group-hover:text-primary transition-colors">
                  <span class="text-sm font-medium">Explore</span>
                  <svg 
                    class="w-4 h-4 transform group-hover:translate-x-2 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { IResponse } from 'types/api';
  import { ICategory } from 'types/category';
  
  const loading = ref(true);
  const categoriesNews = ref<ICategory[]>([]);
  
  // Fetch categories
  try {
    const response = await useApi(
      '/items/categories?filter[status]=published&sort=-date_created&fields=slug,id,name,thumbnail',
      { method: 'GET' }
    ) as IResponse<ICategory[]>;
    
    categoriesNews.value = response.data;
    
    // Simulate minimum loading time for smooth transition
    setTimeout(() => {
      loading.value = false;
    }, 200);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    loading.value = false;
  }
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
  .animate-spin-slow {
    animation: spin 10s linear infinite;
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
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  /* background image */
#author-bg {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1229%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%26quot%3b%23SvgjsLinearGradient1230%26quot%3b)'%3e%3c/rect%3e%3cpath d='M1464 560L0 560 L0 345.59Q19.58 293.17%2c 72 312.75Q89.36 258.11%2c 144 275.47Q192.33 251.8%2c 216 300.13Q275.79 287.92%2c 288 347.71Q316.44 256.14%2c 408 284.58Q477.19 233.77%2c 528 302.96Q569.13 272.1%2c 600 313.23Q640.64 233.88%2c 720 274.52Q767.95 250.47%2c 792 298.42Q842.61 277.03%2c 864 327.65Q940.24 283.89%2c 984 360.13Q1025.38 329.5%2c 1056 370.88Q1100.55 295.43%2c 1176 339.97Q1190.13 282.1%2c 1248 296.23Q1296.09 272.32%2c 1320 320.41Q1362.22 290.63%2c 1392 332.86Q1401.53 270.39%2c 1464 279.92z' fill='%23182f5d'%3e%3c/path%3e%3cpath d='M1464 560L0 560 L0 410.67Q24.47 363.14%2c 72 387.62Q88.71 332.33%2c 144 349.04Q215.13 300.17%2c 264 371.29Q340.2 327.5%2c 384 403.7Q433.02 332.72%2c 504 381.73Q566.51 372.25%2c 576 434.76Q602.48 341.24%2c 696 367.71Q772.39 324.1%2c 816 400.49Q858.48 370.97%2c 888 413.45Q930.68 336.13%2c 1008 378.81Q1061.37 312.18%2c 1128 365.54Q1223.73 341.27%2c 1248 437Q1269.1 386.1%2c 1320 407.2Q1329.58 344.78%2c 1392 354.36Q1433.15 323.51%2c 1464 364.67z' fill='%2325467d'%3e%3c/path%3e%3cpath d='M1560 560L0 560 L0 464.72Q77.76 422.49%2c 120 500.25Q122.34 430.59%2c 192 432.93Q258.81 379.74%2c 312 446.55Q356.64 419.19%2c 384 463.83Q427.32 387.15%2c 504 430.48Q562.42 416.9%2c 576 475.32Q620.13 447.45%2c 648 491.58Q689.18 412.75%2c 768 453.93Q790.94 404.87%2c 840 427.81Q927.88 395.69%2c 960 483.58Q975.64 427.22%2c 1032 442.86Q1083.7 374.56%2c 1152 426.27Q1215.61 417.88%2c 1224 481.48Q1273.39 458.88%2c 1296 508.27Q1300.59 440.86%2c 1368 445.44Q1390.1 395.54%2c 1440 417.64Q1521.13 378.77%2c 1560 459.91z' fill='%23356cb1'%3e%3c/path%3e%3cpath d='M1536 560L0 560 L0 562.58Q46.95 537.53%2c 72 584.47Q76.87 517.34%2c 144 522.2Q197.93 456.13%2c 264 510.07Q358.63 484.7%2c 384 579.33Q409.33 532.66%2c 456 558Q503.68 485.68%2c 576 533.36Q635.5 520.86%2c 648 580.35Q678.12 490.47%2c 768 520.58Q851.33 483.91%2c 888 567.25Q906.57 513.82%2c 960 532.38Q975.75 476.13%2c 1032 491.88Q1102.31 442.19%2c 1152 512.5Q1228.11 468.61%2c 1272 544.71Q1319.15 519.87%2c 1344 567.02Q1349.6 500.62%2c 1416 506.21Q1481.06 451.26%2c 1536 516.32z' fill='white'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1229'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='50%25' y1='100%25' x2='50%25' y2='0%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1230'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(74%2c 137%2c 218%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
    background-position: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}
  </style>