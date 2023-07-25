<template>
  <NuxtLoadingIndicator :duration="5000" color="#089cf4" />
  <NuxtLayout />
  <NuxtPage />
</template>

<script setup>
import AOS from "aos";
if (process.client) {
  AOS.init();
}
</script>
