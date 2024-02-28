<template>
    <div class="min-h-screen   dark:bg-gray-900" id="author-bg">
        <div class="h-auto pt-40 mx-auto px-4  lg:pb-10 pb-10">
            <h2 class="text-4xl font-bold text-center my-8 text-white " data-aos="zoom-in-down">Meet Our
                Authors</h2>
            <div class="flex justify-center items-center flex-wrap gap-8" data-aos="zoom-in-down">
                <div v-for="author in activeAuthors" :key="author.id"
                    class="text-center bg-white dark:bg-dark p-4 rounded-2xl shadow-md shadow-primary duration-500 transition hover:scale-110">
                    <!-- Author Avatar -->
                    <div
                        class="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary dark:border-white">
                        <img :src="useImg(author.avatar)" :alt="`${author.first_name} ${author.last_name}`"
                            class="w-full h-full object-cover select-none pointer-events-none overflow-hidden">
                    </div>
                    <!-- Author Name -->
                    <h3 class="text-lg font-semibold text-primary dark:text-white">{{ `${author.first_name}
                                            ${author.last_name}` }}</h3>
                    <!-- Author Title -->
                    <p class="text-sm font-light dark:text-white">{{ author.title }}</p>
                    <!-- Author Article Count -->
                    <p class="text-sm font-light dark:text-white">អត្ថបទសរុប៖ {{ author.articles_count }}</p>
                    <!-- Total Views Count -->
                    <p class="text-sm font-light dark:text-white">Total Views: {{ author.formattedTotalViewCount }}</p>
                    <!-- Social Links -->
                    <div class="flex justify-center items-center mt-4">
                        <a :href="author.facebook_link" target="_blank"
                            class="text-blue-600 mx-2 duration-300 hover:scale-125">
                            <i class="fab fa-facebook  "></i>
                        </a>
                        <a :href="author.instagram_link" target="_blank"
                            class="text-pink-600 mx-2 duration-300 hover:scale-125">
                            <i class="fab fa-instagram"></i>
                        </a>
                        <a :href="author.youtube_link" target="_blank"
                            class="text-red-600 mx-2 duration-300 hover:scale-125">
                            <i class="fab fa-youtube"></i>
                        </a>
                    </div>
                    <!-- View Profile Button -->
                    <a :href="'/authors/' + author.id"
                        class="mt-4 inline-block bg-primary hover:bg-red-500 duration-200 text-white rounded-xl py-2 px-4 shadow-lg hover:shadow-primary">View
                        Profile</a>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { IResponse } from '~~/types/api';
import { IAuthor } from '~~/types/author';
import { IArticle } from '~~/types/article';

// State for storing the list of active authors and their total views
const activeAuthors = ref<IAuthor[]>([]);

// Helper function to format view counts
function formatViewCount(viewCount: number): string {
    if (viewCount < 1000) {
        return viewCount.toString(); // Return the simple number
    } else if (viewCount < 1000000) {
        return (viewCount / 1000).toFixed(1) + 'K'; // Convert to 'k' notation and keep one decimal
    } else if (viewCount < 10000000)  {
        return (viewCount / 1000000).toFixed(1) + 'M'; // Convert to 'm' notation and keep one decimal
    }else{
        return (viewCount / 1000000000).toFixed(1) + 'B'; // Convert to 'b' notation and keep one decimal
    
    }
}

// Function to fetch active authors and calculate their total article views
async function fetchActiveAuthors() {
    try {
        const authorsResponse: IResponse<IAuthor[]> = await useApi('/users?filter[status]=active&filter[title][_eq]=Content Writer&fields=*,count(articles)', { method: 'GET' });
        if (authorsResponse && authorsResponse.data) {
            for (const author of authorsResponse.data) {
                const articlesResponse: IResponse<IArticle[]> = await useApi(`/items/articles?filter[user_created][id][_eq]=${author.id}&aggregate[sum]=views`, { method: 'GET' });
                if (articlesResponse && articlesResponse.data) {
                   
                    author.formattedTotalViewCount = formatViewCount(articlesResponse.data[0].sum.views);
                }
            }
            activeAuthors.value = authorsResponse.data;
        }
    } catch (error) {
        console.error('Failed to fetch active authors:', error);
    }
}

onMounted(fetchActiveAuthors);
</script>
<style scoped>
/* background image */
#author-bg {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1229%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%26quot%3b%23SvgjsLinearGradient1230%26quot%3b)'%3e%3c/rect%3e%3cpath d='M1464 560L0 560 L0 345.59Q19.58 293.17%2c 72 312.75Q89.36 258.11%2c 144 275.47Q192.33 251.8%2c 216 300.13Q275.79 287.92%2c 288 347.71Q316.44 256.14%2c 408 284.58Q477.19 233.77%2c 528 302.96Q569.13 272.1%2c 600 313.23Q640.64 233.88%2c 720 274.52Q767.95 250.47%2c 792 298.42Q842.61 277.03%2c 864 327.65Q940.24 283.89%2c 984 360.13Q1025.38 329.5%2c 1056 370.88Q1100.55 295.43%2c 1176 339.97Q1190.13 282.1%2c 1248 296.23Q1296.09 272.32%2c 1320 320.41Q1362.22 290.63%2c 1392 332.86Q1401.53 270.39%2c 1464 279.92z' fill='%23182f5d'%3e%3c/path%3e%3cpath d='M1464 560L0 560 L0 410.67Q24.47 363.14%2c 72 387.62Q88.71 332.33%2c 144 349.04Q215.13 300.17%2c 264 371.29Q340.2 327.5%2c 384 403.7Q433.02 332.72%2c 504 381.73Q566.51 372.25%2c 576 434.76Q602.48 341.24%2c 696 367.71Q772.39 324.1%2c 816 400.49Q858.48 370.97%2c 888 413.45Q930.68 336.13%2c 1008 378.81Q1061.37 312.18%2c 1128 365.54Q1223.73 341.27%2c 1248 437Q1269.1 386.1%2c 1320 407.2Q1329.58 344.78%2c 1392 354.36Q1433.15 323.51%2c 1464 364.67z' fill='%2325467d'%3e%3c/path%3e%3cpath d='M1560 560L0 560 L0 464.72Q77.76 422.49%2c 120 500.25Q122.34 430.59%2c 192 432.93Q258.81 379.74%2c 312 446.55Q356.64 419.19%2c 384 463.83Q427.32 387.15%2c 504 430.48Q562.42 416.9%2c 576 475.32Q620.13 447.45%2c 648 491.58Q689.18 412.75%2c 768 453.93Q790.94 404.87%2c 840 427.81Q927.88 395.69%2c 960 483.58Q975.64 427.22%2c 1032 442.86Q1083.7 374.56%2c 1152 426.27Q1215.61 417.88%2c 1224 481.48Q1273.39 458.88%2c 1296 508.27Q1300.59 440.86%2c 1368 445.44Q1390.1 395.54%2c 1440 417.64Q1521.13 378.77%2c 1560 459.91z' fill='%23356cb1'%3e%3c/path%3e%3cpath d='M1536 560L0 560 L0 562.58Q46.95 537.53%2c 72 584.47Q76.87 517.34%2c 144 522.2Q197.93 456.13%2c 264 510.07Q358.63 484.7%2c 384 579.33Q409.33 532.66%2c 456 558Q503.68 485.68%2c 576 533.36Q635.5 520.86%2c 648 580.35Q678.12 490.47%2c 768 520.58Q851.33 483.91%2c 888 567.25Q906.57 513.82%2c 960 532.38Q975.75 476.13%2c 1032 491.88Q1102.31 442.19%2c 1152 512.5Q1228.11 468.61%2c 1272 544.71Q1319.15 519.87%2c 1344 567.02Q1349.6 500.62%2c 1416 506.21Q1481.06 451.26%2c 1536 516.32z' fill='white'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1229'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='50%25' y1='100%25' x2='50%25' y2='0%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1230'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(74%2c 137%2c 218%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e");
    background-position: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}
</style>