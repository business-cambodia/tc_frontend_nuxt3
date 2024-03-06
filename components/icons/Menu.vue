<template>
  <div @click="toggleDrawer">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      :stroke="
        $colorMode.preference == 'dark' || scrollPosition <= 0
          ? 'white'
          : 'black'
      ">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    toggleDrawer: Function,
    scrollPosition: Number,
  },
};
</script>

<style></style>
