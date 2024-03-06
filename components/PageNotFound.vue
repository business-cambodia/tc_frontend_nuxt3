

<template>
    <div class="block" data-aos="fade-left " data-aos-anchor="#example-anchor" data-aos-offset="500">
        <p class="text-3xl max-sm:text-xl font-bold text-red-500 text-center  dark:text-white">
            មិនមានអត្ថបទសម្រាប់ផ្នែកនេះនៅឡើយទេនៅពេលនេះ។</p>

        <div class="block mt-5 image-container rounded-2xl " data-aos-duration="500">
            <!-- image user can't select click or download -->
        </div>
    </div>
</template>
<script setup lang="ts">

</script>
<style scoped>
.image-container {
    /* Use your actual image dimensions */
    width: 700px;
    height: 400px;
    background-image: url('~/assets/Not_Found.gif');
    background-size: cover;
    background-position: center;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
}

/* Disable right-click context menu */
.image-container {
    pointer-events: none;
}
</style>