<template>
  <div>
    <div class="my-4 relative">
      <img
        format="webp"
        loading="lazy"
        :src="user.cover_pic ? useImg(user.cover_pic) : '/footer/foot_bg.jpg'"
        alt="cover"
        class="w-full h-36 lg:h-60 object-cover bg-no-repeat bg-center rounded-t-lg"
      />
      <NuxtLink :to="'/authors/' + user.id">
        <img
          :src="useImg(user.avatar)"
          class="article_profile profile-avatar bg-cover object-cover h-32 w-32 p-1 bg-white z-10"
          alt="profile "
        />
      </NuxtLink>
      <div
        class="bg-white dark:bg-gray-900 filter drop-shadow-xl text-center pt-10 pb-4 rounded-b-lg px-4 dark:text-gray-200"
      >
        <nuxt-link :to="'/authors/' + user.id">
          <div class="text-xl font-semibold transform hover:underline">
            {{ user.first_name + ' ' + user.last_name }}
          </div>
        </nuxt-link>
        <nuxt-link :to="'/authors/' + user.id">
          <div class="font-light lg:font-thin text-sm lg:text-base mt-2">
            " {{ user.description || 'N/A' }} "
          </div>
        </nuxt-link>
        <div class="flex text-lg justify-center">
          <a :href="user.facebook_link" target="_blank"
            ><i class="fab fa-facebook mx-2"></i
          ></a>
          <a :href="user.youtube_link" target="_blank"
            ><i class="fab fa-youtube mx-2"></i
          ></a>
          <a :href="user.instagram_link" target="_blank"
            ><i class="fab fa-instagram mx-2"></i
          ></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IAuthor } from '~~/types/author';

defineProps<{
  user: IAuthor;
}>();
</script>

<style scoped>
.profile-avatar {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 12%;
  text-align: center;
  z-index: 1;
}

.article_profile {
  border-radius: 50%;
}
</style>
