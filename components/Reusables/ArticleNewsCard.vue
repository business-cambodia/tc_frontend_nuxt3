<template>
  <NuxtLink :to="`/articles/${article.slug}`" >
    <article class="relative w-full overflow-hidden group rounded-2xl"
      :class="[featured ? 'h-[500px] md:h-[600px]' : 'h-[280px]']">
      <!-- Main Image -->
      <img :src="useImg(article.thumbnail)" :alt="article.title"
        class="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" loading="lazy" />

      <!-- Overlay Gradient -->
      <div class="absolute inset-0" :class="[
        featured
          ? 'bg-gradient-to-t from-black via-black/60 to-transparent'
          : 'bg-gradient-to-t from-black via-black/40 to-transparent'
      ]"></div>

      <!-- Content Overlay -->
      <div class="absolute inset-0 flex flex-col justify-end p-6">
        <!-- Category Tag -->
        <div class="mb-2 flex justify-between ">
          <span class="text-xs font-medium tracking-wider bg-primary text-white px-3 py-[3px] rounded-full">
            {{ article.category.name }}
          </span>
          <span class="text-white text-xs">{{ $formatDate(article.date_created) }}</span>

        </div>

        <!-- Title -->
        <h3 class="font-medium text-start text-white leading-tight line-clamp-2 ">
          {{ article.title }}

        </h3>

        <!-- Meta Info - Only for featured -->
        <div class="flex items-center space-x-4 text-white/80 text-sm mt-2">
          <div class="flex items-center space-x-2">
            <img :src="useImg(article.user_created.avatar)" :alt="article.user_created.first_name"
              class="w-8 h-8 rounded-full object-cover border-2 border-white" loading="lazy" />
            <span>{{ article.user_created.first_name }} {{ article.user_created.last_name }}</span>
          </div>
          <!-- <span>{{ $formatDate(article.date_created) }}</span> -->
          <span v-if="article.category.name !== 'PR'">{{ $kFormatter(article.views) }} views</span>
          <div class="flex items-center space-x-2">
            <!-- Favorite button -->
            <Icon :icon="isFavorite ? 'material-symbols:favorite' : 'material-symbols:favorite-outline'" width="24"
              height="24" @click.stop.prevent="handleToggleFavorite" />
          </div>
        </div>

      </div>
    </article>
  </NuxtLink>
</template>

<script setup lang="ts">
import { IArticle } from '~~/types/article';
import { Icon } from '@iconify/vue';
import { useFavorite } from '~~/composables/useFavorite';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
const props = defineProps<{
  article: IArticle;
  featured?: boolean;
}>();


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
/*  */
</style>