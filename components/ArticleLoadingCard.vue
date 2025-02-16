<template>
    <div class="bg-white dark:bg-dark rounded-2xl shadow-md overflow-hidden animate-pulse">
        <!-- Image skeleton -->
        <div class="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>

        <div class="p-4">
            <!-- Author info skeleton -->
            <div class="flex items-center space-x-3 mb-3">
                <!-- Avatar skeleton -->
                <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div class="flex-1">
                    <!-- Author name skeleton -->
                    <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
                    <!-- Date skeleton -->
                    <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                </div>
            </div>

            <!-- Title skeleton -->
            <div class="space-y-2 mb-3">
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>

            <!-- Category and views skeleton -->
            <div class="flex items-center justify-between">
                <!-- Category skeleton -->
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                <!-- Views skeleton -->
                <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts"></script>
<style>
/*  */
</style>