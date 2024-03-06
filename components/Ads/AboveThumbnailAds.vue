<template>
    <div id="above-thumbnail">
      <a
        v-for="(a, n) in ads"
        :key="n"
        :href="a.link"
        target="_blank"
        @click="$store.dispatch('handleAdvertisementClicked', a.slug)"
      >
        <img
          :src="apiUrl + '/assets/' + a.file"
          :id="a.slug"
          alt=""
          class="mb-2 w-full rounded-md lg:rounded-xl"
        />
      </a>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      apiUrl() {
        return process.env.API_URL;
      },
    },
    props: {
      ads: Array,
    },
  };
  </script>
  
  <style></style>