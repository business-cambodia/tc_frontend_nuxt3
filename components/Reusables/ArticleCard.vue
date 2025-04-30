<template>
  <NuxtLink :to="`/articles/${article.slug}`" class="article-card-container cursor-pointer" >
    <div
      class="article-card relative  bg-white dark:bg-neutral-900 rounded-xl overflow-hidden transition-all duration-500 transform hover:translate-y-2 group">
      <!-- Card Header with 3D perspective image -->
      <div class="card-media-wrapper overflow-hidden h-52  sm:h-32 md:h-48">
        <img format="webp" loading="lazy" :src="useImg(article.thumbnail)" alt=""
          class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
      </div>

      <!-- Content Area -->
      <div class="card-content relative px-6 pt-8 pb-4 -mt-6">
        <!-- Category Badge -->
        <div
          class="category-badge absolute right-6 -top-4 px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-medium transform transition-transform duration-300 group-hover:scale-110">
          #{{ article.category.name }}
        </div>

        <!-- Profile Image with 3D effect -->
        <div class="profile-container mb-4">
          <div class="profile-wrapper">
            <img loading="lazy" :src="useImg(article.user_created.avatar)" class="profile-image" alt="profile" />
          </div>
        </div>

        <!-- Date and Views -->
        <div class="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <span>{{ $formatDate(article.date_created) }}</span>
          <div  v-if="article.category.name !== 'PR'" class="border-dashed border border-primary dark:border-gray-500 rounded-md px-1 -mt-3">
            <span>{{ $kFormatter(article.views) }} views</span>
          </div>
        </div>

        <!-- Title with 3D hover effect -->
        <h3
          class="title-3d text-lg  font-semibold line-clamp-2 dark:text-white  group-hover:text-blue-500 transition-colors duration-300">
          {{ article.title }}
        </h3>
        <div class="">
          <span class="text-blue-500 text-xs ">
            {{ $calculateReadTime(article.body) }}
          </span>
        </div>
        <!-- Footer -->
        <div class="flex items-center  justify-between border-t border-gray-100 dark:border-gray-800">
          <div
            class="text-sm font-medium  dark:text-blue-400 flex items-center group-hover:translate-x-1 transition-transform duration-300">
            <span>បន្តការអានអត្ថបទ</span>
            <Icon icon="heroicons:arrow-right" class="ml-1 w-4 h-4" />
          </div>

          <!-- Favorite button with 3D effect -->
          <button @click.stop.prevent="handleToggleFavorite" class="favorite-btn"
            :class="{ 'is-favorite': isFavorite }">
            <Icon :icon="isFavorite ? 'material-symbols:favorite' : 'material-symbols:favorite-outline'" width="24"
              height="24" class="transition-transform duration-300 ease-in-out" />
          </button>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { IArticle } from '~~/types/article';
import { useFavorite } from '~~/composables/useFavorite';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

// Define props
const props = defineProps<{ article: IArticle }>();

// Get toggleFavorite function
const { toggleFavorite } = useFavorite();

// Favorite state
const isFavorite = ref(false);

// Check if the article is already in favorites
const checkIfFavorite = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  isFavorite.value = favorites.some((item: { id: string }) => item.id === props.article.id);
};

// Function to toggle favorite status
const handleToggleFavorite = () => {
  toggleFavorite(isFavorite, props.article);
};

onMounted(() => {
  checkIfFavorite();
});

const router = useRouter();
const goToArticle = (article: IArticle) => {
  router.push(`/articles/${article.slug}`);
};
</script>

<style>
.article-card-container {
  display: block;
  margin-bottom: 2rem;
  perspective: 1000px;
}

.article-card {
  will-change: transform;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.article-card:hover {
  box-shadow: 0 20px 40px -10px rgba(59, 130, 246, 0.3);
}

.card-media-wrapper {
  overflow: hidden;
  position: relative;
}

.profile-container {
  position: relative;
  z-index: 10;
}

.profile-wrapper {
  height: 3.5rem;
  width: 3.5rem;
  border-radius: 50%;
  background: white;
  padding: 3px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-80%);
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

.profile-image {
  border-radius: 50%;
  height: 100%;
  width: 100%;
  object-fit: cover;
}



.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-3d {
  position: relative;
  transition: transform 0.3s, text-shadow 0.3s;
}

.article-card:hover .title-3d {
  text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.1);
  transform: translateZ(10px);
}

.favorite-btn {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(59, 130, 246, 0.1);
  color: rgb(59, 130, 246);
  transition: all 0.3s ease;
}

.favorite-btn:hover {
  transform: scale(1.1);
  background: rgba(59, 130, 246, 0.2);
}

.favorite-btn.is-favorite {
  background: rgba(239, 68, 68, 0.1);
  color: rgb(239, 68, 68);
}

.category-badge {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Dark mode adjustments */
.dark .article-card {
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.3);
}

.dark .article-card:hover {
  box-shadow: 0 20px 40px -10px rgba(59, 130, 246, 0.4);
}

.dark .profile-wrapper {
  background: #2a2a2a;
}

.dark .read-time-badge {
  background-color: rgba(59, 130, 246, 0.2);
}
</style>