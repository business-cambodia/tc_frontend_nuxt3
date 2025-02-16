<template>
  <div>
    <nav
      id="bottomBar"
      class="fixed bottom-0 left-0 w-full pb-3 bg-white/80 dark:bg-dark/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 lg:hidden z-50"
      :style="{ bottom: bottomPosition + 'px' }"
    >
      <div class="grid grid-cols-5 py-2 px-2 relative">
        <!-- Animated Background Pill -->
        <div
          class="absolute h-16 transition-all duration-300 ease-in-out bg-primary dark:bg-primary/20 rounded-2xl"
          :style="{
            width: '20%',
            transform: `translateX(${activeIndex * 99}%)`,
          }"
        />

        <!-- Navigation Items -->
        <NuxtLink
          v-for="(item, index) in bottomItems"
          :key="item.name"
          :to="item.link"
          class="relative flex flex-col items-center justify-center group transition-all duration-300"
          :class="{
            'text-white hover:text-white': route.path === item.link,
            'text-gray-500 dark:text-gray-400': route.path !== item.link
          }"
        >
          <!-- Icon with Pop Animation -->
          <div
            class="relative transition-all duration-300 ease-spring"
            :class="{
              'scale-110 -translate-y-1': route.path === item.link,
              'scale-100': route.path !== item.link
            }"
          >
            <Icon
              :icon="item.icon"
              class="w-6 h-6 transition-all duration-300"
            />
          </div>

          <!-- Label with Fade Animation -->
          <span
            class="text-xs mt-1 transition-all duration-300"
            :class="{
              'opacity-100': route.path === item.link,
              'opacity-70': route.path !== item.link
            }"
          >
            {{ item.name }}
          </span>
        </NuxtLink>
      </div>
    </nav>

    <!-- Page Transition Wrapper -->
    <div class="page-wrapper">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const bottomPosition = ref(0);
const lastScroll = ref(0);

const bottomItems = [
  { name: 'Home', icon: 'heroicons-outline:home', link: '/' },
  { name: 'Hot', icon: 'noto:fire', link: '/hot-news' },
  { name: 'Articles', icon: 'gravity-ui:square-article', link: '/category' },
  { name: 'Favorite', icon: 'heroicons-outline:heart', link: '/favorite' },
  {name: 'Quick App' , icon: 'tdesign:app', link: '/quickapp'}
];

const activeIndex = computed(() => 
  bottomItems.findIndex(item => item.link === route.path)
);

// Smooth scroll handling with debounce
const updateScroll = useDebounceFn(() => {
  const scrollPosition = window.scrollY;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  
  if (scrollPosition === 0) {
    bottomPosition.value = 0;
  } else {
    if (scrollTop > lastScroll.value) {
      // Scrolling down - hide the bar
      bottomPosition.value = -100;
    } else {
      // Scrolling up - show the bar
      bottomPosition.value = 0;
    }
  }
  lastScroll.value = scrollTop;
}, 50);

// Page transition handler
const handlePageTransition = () => {
  // Add any custom transition logic here
};

onMounted(() => {
  window.addEventListener('scroll', updateScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll);
});

function useDebounceFn(fn: () => void, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(fn, delay);
  };
}
</script>

<style scoped>
#bottomBar {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom spring animation curve */
.ease-spring {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1.5);
}

/* Page transition animations */
.page-wrapper {
  position: relative;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease-out;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>