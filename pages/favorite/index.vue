<template>
  <div class="dark:bg-dark">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 pb-5 pt-20">
      <h1 class="text-xl text-gray-500 dark:text-white font-bold tracking-tight mb-8">
        Your Favorite Articles
      </h1>

      <!-- If no favorite articles -->
      <div v-if="!isLoading && favoriteProducts.length === 0"
        class="flex flex-col items-center justify-center py-12 px-4 rounded-2xl bg-gray-50 dark:bg-neutral-900">
        <div class="text-gray-500 dark:text-gray-400 text-lg">
          You haven't saved any articles to your favorites yet.
        </div>
      </div>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleLoadingCard v-for="n in 6" :key="n" />
      </div>

      <!-- Display Favorite Articles -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="article in favoriteProducts" :key="article.id"
          class="group relative bg-white dark:bg-neutral-900 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
          <NuxtLink :to="`/articles/${article.slug}`" class="block">
            <div class="aspect-w-16 aspect-h-9 rounded-t-2xl overflow-hidden">
              <img :src="useImg(article.thumbnail)" alt="Article thumbnail"
                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200" />
            </div>

            <div class="p-6">
              <h2 class="text-md line-clamp-2 tracking-tight mb-3 dark:text-white transition-colors duration-200">
                {{ article.title }}
              </h2>

              <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-neutral-800">
                <span class="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                  Read more
                  <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>

                <button @click.prevent="removeFavorite(article.id)"
                  class="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-500 transition-colors duration-200">
                  <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Remove
                </button>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApi } from '~/composables/useApi';
import ArticleLoadingCard from '~/components/ArticleLoadingCard.vue';

// State for favorite articles
const favoriteProducts = ref<any[]>([]);
const isLoading = ref(true); // Loading state

// Function to load favorites from localStorage and API
const loadFavorites = async () => {
  try {
    isLoading.value = true; // Set loading to true

    const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    // Sort articles by the `added_at` timestamp in descending order (newest first)
    localFavorites.sort((a: { added_at: string }, b: { added_at: string }) =>
      new Date(b.added_at).getTime() - new Date(a.added_at).getTime()
    );

    // Fetch data for all favorite articles concurrently
    const updatedFavorites = await Promise.all(
      localFavorites.map(async (item: { id: string }) => {
        try {
          const response = await useApi<{ data: any }>(`/items/articles/${item.id}`, { method: 'GET' });
          return response.data;
        } catch (error) {
          console.error(`Failed to fetch article with id: ${item.id}`, error);
          return null; // Return null if fetch fails
        }
      })
    );

    // Filter out any null responses (failed fetches)
    favoriteProducts.value = updatedFavorites.filter((article) => article !== null);
  } catch (error) {
    console.error('Error loading favorites:', error);
  } finally {
    isLoading.value = false; // Hide loading after fetching
  }
};

// Function to remove an article from favorites
const removeFavorite = (id: string) => {
  // Remove from localStorage
  let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  favorites = favorites.filter((item: { id: string }) => item.id !== id);
  localStorage.setItem('favorites', JSON.stringify(favorites));

  // Update the UI
  favoriteProducts.value = favoriteProducts.value.filter((article) => article.id !== id);
};

// Load favorites on component mount
onMounted(() => {
  loadFavorites();
});
</script>

<style scoped>
.aspect-w-16 {
  position: relative;
  padding-bottom: 56.25%;
}

.aspect-w-16>* {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
