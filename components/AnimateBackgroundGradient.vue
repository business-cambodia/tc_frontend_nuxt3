<template>
    <div>
        <!-- Animated Background Shapes -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block">
            <div
                class="animate-blob1 opacity-30 absolute bg-purple-300 dark:bg-purple-600 blur-3xl h-64 w-64 rounded-full -top-32 -left-32">
            </div>
            <div
                class="animate-blob2 opacity-30 absolute bg-blue-300 dark:bg-blue-600 blur-3xl h-64 w-64 rounded-full top-1/2 left-1/2">
            </div>
            <div
                class="animate-blob3 opacity-30 absolute bg-pink-300 dark:bg-pink-600 blur-3xl h-64 w-64 rounded-full bottom-0 right-0">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

.animate-blob1 {
    animation: blob 7s infinite;
  }
  .animate-blob2 {
    animation: blob 7s infinite 2s;
  }
  .animate-blob3 {
    animation: blob 7s infinite 4s;
  }
  .animate-spin-slow {
    animation: spin 10s linear infinite;
  }
  
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>