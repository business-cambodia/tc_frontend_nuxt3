<template>
  <div>
    <nav
      id="navbar"
      :class="
        scrollPosition == 0
          ? 'w-full flex items-center justify-between px-4 lg:px-8 py-2 fixed z-50 navbar'
          : 'w-full flex items-center justify-between px-4 lg:px-8 py-2 fixed z-50 bg-white dark:bg-dark filter drop-shadow-lg navbar'
      "
    >
      <div
        class="flex items-center p-0.5 rounded-full hover:ring-1 hover:ring-primary"
      >
        <NuxtLink to="/">
          <div class=""><img src="/logo.png" alt="" width="60" /></div>
        </NuxtLink>
      </div>
      <div>
        <ul class="hidden lg:flex list-none">
          <NuxtLink
            v-for="(i, n) in navItems"
            :key="n"
            :to="i.slug ? `/category/${i.slug}` : '/'"
            :class="`mx-4 hover:text-primary nav-items text-base ${
              scrollPosition == 0 &&
              ($route.name == 'index' ||
                $route.name == 'articles-article' ||
                $route.name == 'videos-video' ||
                $route.name == 'videos' ||
                $route.name == 'category-slug' ||
                $route.name == 'authors-author')
                ? 'text-white '
                : 'text-black dark:text-white'
            }`"
            exact-active-class="text-primary dark:text-primary font-semibold "
            exact
          >
            <li>{{ i.name }}</li>
          </NuxtLink>
          <NuxtLink
            :to="`/videos`"
            :class="`mx-4 hover:text-primary nav-items text-base ${
              scrollPosition == 0 &&
              ($route.name == 'index' ||
                $route.name == 'articles-article' ||
                $route.name == 'videos-video' ||
                $route.name == 'videos' ||
                $route.name == 'category-slug' ||
                $route.name == 'authors-author')
                ? 'text-white '
                : 'text-black dark:text-white'
            }`"
            exact-active-class="text-primary dark:text-primary font-semibold "
            exact
          >
            <li>វីដេអូ</li>
          </NuxtLink>
        </ul>
      </div>
      <div class="flex items-center">
        <!-- <form
          class="mr-4 hidden lg:block"
          v-if="$route.path.includes('search')"
          @submit.prevent="handleSubmitSearch"
        >
          <input
            type="text"
            placeholder="search"
            class="px-4 py-1 border border-gray-500 rounded-lg"
            v-model="search"
          />
          <button
            class="px-4 py-1 bg-primary text-white rounded-lg"
            type="submit">
            Search
          </button>
        </form> -->
        <div class="mr-4">
          <NuxtLink to="/search">
            <IconsSearch
              class="cursor-pointer"
              :scrollPosition="scrollPosition"
            />
          </NuxtLink>
        </div>

        <div class="mr-6 cursor-pointer">
          <button
            @click="
              $colorMode.preference =
                $colorMode.preference == 'dark' ? 'light' : 'dark'
            "
            v-if="$colorMode.preference == 'dark'"
          >
            <IconsMoon :scrollPosition="scrollPosition" />
          </button>
          <button
            @click="
              $colorMode.preference =
                $colorMode.preference == 'dark' ? 'light' : 'dark'
            "
            v-else
          >
            <IconsSun :scrollPosition="scrollPosition" />
          </button>
        </div>

        <div>
          <IconsMenu
            class="cursor-pointer block lg:hidden"
            :toggleDrawer="toggleDrawer"
            :scrollPosition="scrollPosition"
          />
        </div>
      </div>
    </nav>

    <div
      class="h-screen w-full bg-primary dark:bg-gray-900 text-center fixed z-20 lg:hidden"
      v-if="drawer"
      data-aos="fade-left"
    >
      <ul class="h-screen flex flex-col justify-center">
        <div
          v-for="(i, n) in navItems"
          :key="n"
          @click="drawer = false"
          class="text-center h-12"
        >
          <NuxtLink
            :to="`/category/${i.slug}`"
            class="mx-4 text-white list-none"
            exact-active-class="text-white font-bold text-sm"
            exact
            @click="closeDrawer"
          >
            <li class="hover-nav">{{ i.name }}</li>
          </NuxtLink>
        </div>
        <div class="">
          <NuxtLink
            to="/videos"
            class="mx-4 text-white list-none"
            exact-active-class="text-white font-bold text-lg"
            exact
            @click="closeDrawer"
          >
            <li class="hover-nav">វិដេអូ</li>
          </NuxtLink>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IResponse } from 'types/api';
import { ICategory } from 'types/category';
const scrollPosition = ref(0);
const lastScroll = ref(0);
const drawer = ref(false);
const search = ref(false);
const navItems: ICategory[] = (
  await (<Promise<IResponse<ICategory[]>>>(
    useApi(
      '/items/categories?fields=slug,id,name&sort=id&filter[status]=published',
      { method: 'GET' }
    )
  ))
).data;

const home: ICategory = {
  name: 'ទំព័រដើម',
  slug: '',
  thumbnail: '',
  articles: undefined,
};

navItems.unshift(home);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
  if (drawer.value) document.body.style.overflow = 'hidden';
  else document.body.style.overflow = 'visible';
};

const closeDrawer = () => {
  drawer.value = false;
  document.body.style.overflow = 'visible';
};

const updateScroll = () => {
  scrollPosition.value = window.scrollY;
  let scrollTop = window.scrollY || document.documentElement.scrollTop;
  const navbar = document.getElementById('navbar')!;
  if (scrollPosition.value == 0) {
    navbar.style.top = '0';
  }
  if (scrollPosition.value > 0) {
    if (scrollTop > lastScroll.value) {
      navbar.style.top = '-50%';
    } else {
      navbar.style.top = '0';
    }
  }
  lastScroll.value = scrollTop;
};

onMounted(() => {
  window.addEventListener('scroll', updateScroll);
});
</script>

<style scoped>
.navbar {
  transition: top 0.5s ease-in-out;
}

.nav-items {
  position: relative;
}

.nav-items::after {
  content: '';
  position: absolute;
  background: #089cf4;
  height: 3px;
  width: 0;
  left: 0;
  bottom: -10px;
  transition: 0.5s;
}

.nav-items:hover::after {
  width: 100%;
}

.hover-nav {
  transition: 0.5s ease-in-out;
}

.hover-nav:hover {
  transform: scale(1.3);
  font-weight: bold;
}
</style>
