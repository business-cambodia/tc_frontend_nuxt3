<template>
    <div v-if="isVisible" @click="scrollToTop" class="back-to-top text-2xl p-[20px] z-10 fixed rounded-full flex items-center justify-center cursor-pointer text-white duration-300  bg-gradient-to-r from-teal-500 to-primary  transform hover:scale-125 shadow-md shadow-gray-900">
      ↑ 
    </div>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';
  
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
      return {
        isVisible: false,
      };
    },
    methods: {
      scrollToTop(): void {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      },
      handleScroll(): void {
        this.isVisible = window.scrollY > 100;
      },
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
  });
  </script>
  
  <style scoped>
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 40px; 
    height: 40px; 

  }
  </style>
  