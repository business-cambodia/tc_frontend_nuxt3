<template>
  <div class="">
    <div data-aos="fade-up"
     data-aos-duration="1000"
      :style="{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ), url(${useImg(
          heroArticles[currentIndex].thumbnail
        )})`,
      }"
      class="w-full h-hero object-cover bg-center bg-no-repeat bg-cover"
    >
      <div
        class="h-full flex flex-col justify-center text-center px-6 lg:px-20"
      >
        <div
          class="text-white text-2xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-medium hero-title mt-4"
        >
          {{ heroArticles[currentIndex].title }}
        </div>

        <div
          class="flex items-center flex-wrap justify-center w-full mt-2 text-xs lg:text-base text-gray-200"
        >
          <div class="flex">
            <div class="font-light self-center">
              {{ $formatDate(heroArticles[currentIndex].date_created) }}
            </div>
            <div class="text-lg mx-4">•</div>
            <div class="font-light self-center">
              {{ heroArticles[currentIndex].category.name }}
            </div>
            <div class="text-lg mx-4">•</div>
            <div class="font-light transform hover:underline self-center">
              {{
                heroArticles[currentIndex].user_created.first_name +
                " " +
                heroArticles[currentIndex].user_created.last_name
              }}
            </div>
          </div>
          <div class="flex">
            <div class="text-lg mx-4">•</div>
            <div class="font-light self-center">
              {{ heroArticles[currentIndex].views }} views
            </div>
            <div class="text-lg mx-4">•</div>
            <div class="font-light self-center">
              {{ $calculateReadTime(heroArticles[currentIndex].body) }}
            </div>
          </div>
        </div>
        <div class="mt-10">
          <nuxt-link :to="'/articles/' + heroArticles[currentIndex].slug">
            <button
              class="custom-button text-white bg-primary font-bold px-10 py-2 text-base rounded-3xl transform transition duration-300 hover:scale-110"
            >
              បន្តការអាន
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IArticle } from "types/article";

const currentIndex = ref(0);

const props = defineProps<{
  heroArticles: IArticle[];
}>();

const autoPlayCarousel = () => {
  setInterval(() => {
    if (currentIndex.value == props.heroArticles.length - 1) {
      currentIndex.value = 0;
      return;
    }
    currentIndex.value += 1;
  }, 5000);
};

onMounted(() => {
  autoPlayCarousel();
});
</script>

<style>
.hero-title {
  line-height: 1.5;
}

/* button */
.custom-button {
   
    background-color: #008CBA;/* Default background color */
    color: white;
    font-weight: bold;
    padding: 10px 20px;
    font-size: 16px;
    width: 150px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    overflow: hidden;
    transition: 0.5s ease-in-out;
    /* transition: background-color 0.3s ease; */
}

.custom-button:hover {
    background-color: #4CAF50; /* New background color on hover */
}

/* Animation for hover effect */
.custom-button::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background-color: #4CAF50; /* Color for animation */
    transition: left 0.3s ease;
    z-index: -1;
}

.custom-button:hover::before {
    left: 0;
}

</style>
