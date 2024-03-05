
<template>
    <div class="min-h-screen dark:bg-black">
        <div class=" lg:flex w-full justify-evenly items-center lg:px-32 max-sm:pt-32 md:h-auto lg:h-screen dark:bg-gray-900 mission" data-aos="fade-up"
            data-aos-anchor-placement="top-center">
            <div data-aos="fade-right" class="w-full text-center aos-init aos-animate">
                <img id="close-select" src="/about/Baksey_Media.jpg" class="lg:w-[80%] rounded-full " alt="">

            </div>
            <div data-aos="zoom-in" data-aos-duration="1500" class="w-full flex justify-center aos-init aos-animate"
                style="pointer-events: none; user-select: none; overflow: hidden;filter: drop-shadow(0px 15px 5px #006eff); ">
                <img id="close-select" src="/about/Technology_Macbook_Mockup.png" alt=""
                    class="lg:w-[100%] lg:rounded-3xl ">
            </div>
        </div>
        <div class=" max-[1024px]:p-20  lg:flex w-full justify-evenly md:h-auto lg:h-screen items-center px-32" data-aos="fade-up"
            data-aos-anchor-placement="top-center">
            <div class="w-full  mt-30 lg:w-1/2 zoom-in-up">
                <div style="pointer-events: none; user-select: none; overflow: hidden;">
                    <img src="/about/develop-web.gif" alt=""
                        class="image-bevel lg:w-[75%] lg:rounded-3xl md:rounded-2xl md:mb-8 sm:rounded-sm">
                </div>
            </div>
            <div class="w-full lg:w-1/2 ">
                <div class="w-full text-center zoom-in   "
                    style="pointer-events: none; user-select: none; overflow: hidden;">
                    <div class="text-5xl  font-extrabold text-primary dark:text-white">
                        ចក្ខុវិស័យ
                    </div>
                    <div class="mt-12 text-2xl dark:text-white lg:p-5 max-[774px]:text-xl max-[774px]:text-justify">
                        {{ about_tech_vision }}
                    </div>
                </div>
            </div>
        </div>
        <div class="md:h-auto lg:h-screen max-[1024px]:p-20  lg:flex w-full justify-evenly items-center px-32">
            <div class="w-full lg:w-1/2 ">
                <div class="w-full text-center zoom-in   "
                    style="pointer-events: none; user-select: none; overflow: hidden;">

                    <div class="text-5xl  font-extrabold text-primary dark:text-white" data-aos="zoom-out-down">
                        About Technology Cambodia
                    </div>
                    <div data-aos="zoom-out-down"
                        class="mt-12 text-2xl p-5 text-white lg:p-5 max-[774px]:text-xl max-[774px]:text-justify bg-blue-600 rounded-3xl">
                        {{ about_tech_detail }}
                    </div>
                </div>
            </div>
            <!-- img w-1/2 -->
            <div class="w-full  mt-30 lg:w-1/2 zoom-in-up">
                <!-- Commented out the unused part for clarity -->
                <div style="pointer-events: none; user-select: none; overflow: hidden;" data-aos="fade-up"
                    data-aos-anchor-placement="top-center">
                    <img src="/footer/logo2.png" alt=""
                        class="image-bevels lg:w-[75%] lg:rounded-3xl md:rounded-2xl md:mb-8 sm:rounded-sm">
                </div>
            </div>
            <!-- div text w-1/2 -->

        </div>

        <div class="md:h-auto lg:h-screen   lg:flex w-full justify-evenly items-center lg:px-32 bg-primary dark:bg-gray-900 mission">
            <div data-aos="fade-up" data-aos-duration="1500" class="w-full text-center aos-init aos-animate">
                <div class="text-[5rem] font-extrabold text-white " id="close-select">បេសកកម្ម</div>
                <div class="mt-12 text-4xl text-white">
                    បំផុសគំនិតបច្ចេកវិទ្យា បង្ហាញអនាគត!
                </div>
            </div>
            <div data-aos="zoom-in" data-aos-duration="1500"
                class="w-full flex justify-center aos-init aos-animate mission-rotate"
                style="pointer-events: none; user-select: none; overflow: hidden;"><img src="/about/mission_img.gif" alt=""
                    class="w-[70%] lg:rounded-3xl"></div>
        </div>
        <div class="py-10 min-h-screen">
            <div data-aos="zoom-in-up" data-aos-duration="1500"
                class="text-5xl font-bold text-primary dark:text-white text-center aos-init aos-animate">
                Our Social Media
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3  gap-8 px-4 lg:px-20 pt-4 object-cover">
                <div data-aos="fade-right" class="aos-init aos-animate  pb-5">
                    <div> <a href="https://www.facebook.com/techcambodia2022" target="_blank"><img
                                src="/about/Ipad_Facebook.png" alt=""
                                class="w-full scale-105 h-auto rounded-2xl object-cover bg-no-repeat bg-center transition-all duration-300 hover:scale-110"></a>
                    </div>
                    <div class="text-center mt-4">
                        <div class="lg:text-lg xl:text-xl 2xl:text-3xl font-bold dark:text-white">
                            Facebook
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2 -mt-1"
                                viewBox="0 0 512 512" fill="currentColor">
                                <path
                                    d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div data-aos="fade-right" class="aos-init aos-animate  pb-5">
                    <div><a href="https://www.tiktok.com/@technology_cambodia" target="_blank"><img
                                src="/about/Ipad_Tiktok.png" alt=""
                                class="w-full h-auto rounded-2xl object-cover bg-no-repeat bg-center transition-all duration-300 hover:scale-105"></a>
                    </div>
                    <div class="text-center mt-4">
                        <div class="lg:text-lg xl:text-xl 2xl:text-3xl font-bold dark:text-white">
                            Tiktok
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2 -mt-1"
                                viewBox="0 0 448 512" fill="currentColor">
                                <path
                                    d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div data-aos="fade-right" class="aos-init aos-animate  pb-5">
                    <div><a href="https://t.me/techcambodia2022" target="_blank"><img src="/about/Ipad_Telegram.png" alt=""
                                class="w-full h-auto rounded-2xl object-cover bg-no-repeat bg-center transition-all duration-300 hover:scale-105"></a>
                    </div>
                    <div class="text-center mt-4">
                        <div class="lg:text-lg xl:text-xl 2xl:text-3xl font-bold dark:text-white">
                            Telegram
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block mr-2 -mt-1"
                                viewBox="0 0 496 512" fill="currentColor">
                                <path
                                    d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="h-screen   lg:flex w-full justify-evenly items-center lg:px-32 text-primary dark:text-white  dark:bg-gray-900">
            <div class="container mx-auto px-4 flex flex-col md:flex-row md:space-x-6 items-center py-8">
                <div class="w-full md:w-2/5 flex flex-col items-center relative" data-aos="fade-up"
                    data-aos-duration="3000">
                    <img src="/about/CEO_Sam_Kosal.png" alt="Sam Kosal" id="close-select"
                        class="w-[70%] rounded-full mx-auto mb-4 shadow-md" />

                    <h2 class="text-4xl font-semibold text-center">Sam Kosal</h2>
                    <h3 class="text-lg text-gray-600 dark:text-white   text-center">Chief Executive Officer</h3>
                </div>
                <div class="w-full md:w-3/5 flex flex-col items-center md:items-start text-center md:text-left"
                    data-aos="zoom-in">
                    <img src="/about/Baksey_Media.jpg" id="close-select" class="w-[200px] rounded-full" alt="">
                    <p class="text-3xl text-center leading-relaxed font-medium mb-4">"
                        ខ្មែរកាន់តែខ្លាំងជាងមុនពេលយើងប្រើបច្ចេកវិទ្យាឲ្យទាន់សម័យកាល!
                        ចាបខៀវនឹងខំប្រឹងទាំងយប់ទាំងថ្ងៃដើម្បីគោលដៅ១នេះ! "</p>
                </div>
            </div>


        </div>

        <Authors />
        <div class="py-10 min-h-screen  text-primary dark:text-white bg-primary    dark:bg-gray-900 aboutus-bg"
            id="close-select">

            <div class="container mx-auto  px-4" data-aos="fade-up" data-aos-anchor-placement="top-center">
                <div class="text-5xl font-bold text-white text-center aos-init aos-animate">
                    អំពីពួកយើង
                </div>

                <div class="grid grid-cols-1 mt-10 justify-items-center text-center">
                    <div class="w-full max-w-md bg-primary dark:bg-gray-900 rounded-2xl  overflow-hidden">
                        <img class="w-full h-80 object-cover" src="/about/khon_sakada.jpg" alt="Card Image">
                        <div class="px-6 py-4">
                            <h5 class="text-4xl font-bold text-white mb-2">Sakada Khon</h5>
                            <p class="text-white text-2xl">
                                Team Leader
                            </p>
                        </div>
                    </div>

                </div>
                <div class="container mx-auto px-4 text-center">
                    <div class="grid grid-cols-1 lg:grid-cols-6 md:grid-cols-3 gap-4 mt-6 ">
                        <!-- lopp team members -->
                        <div v-for="member in teamMembers" :key="member.name"
                            class=" bg-white dark:bg-gray-900 dark:text-white rounded-lg shadow-md overflow-hidden">
                            <img :src="member.image" :alt="member.name" class="w-full h-80 object-cover  ">
                            <div class="px-6 py-4">
                                <h5 class="text-xl font-bold text-gray-900 dark:text-white mb-2">{{ member.name }}</h5>
                                <p class="text-gray-900 dark:text-white text-base">{{ member.role }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="h-screen  lg:flex w-full justify-evenly items-center lg:px-32 pt-5  dark:bg-gray-900 mission">
            <div data-aos="fade-up" data-aos-duration="1500" class="w-full text-center aos-init aos-animate">
                <div class="lg:text-[3rem] max-md:text-4xl font-extrabold text-primary " id="close-select">ទាក់ទងមកយើងតាមរយៈទូរស័ព្ទ</div>
                <div class="mt-12 text-2xl text-primary">
                    HOTLINE: <a href="https://t.me/marketing_techcambodia" target="_blank">+855 (0) 89 525 180</a> | <a
                        href="https://t.me/marketing_techcambodia" target="_blank">+855 (0) 69
                        720 727</a> <br>
                </div>

            </div>
            <div data-aos="zoom-in" data-aos-duration="1500"
                class="w-full flex justify-center aos-init aos-animate mission-rotate"
                style="pointer-events: none; user-select: none; overflow: hidden;"><img src="/about/call_icon.png" alt=""
                    class="w-[70%] lg:rounded-3xl"></div>
        </div>
        <BackToTopButton />

    </div>
</template>
<script setup lang="ts">
import '~/assets/css/about_animations.css';
import '~/assets/css/fade_up.css';

import { onMounted, onUnmounted } from 'vue';
const teamMembers = [
    { name: 'Hang Chhengly', role: 'Sales & Marketing', image: '/about/Hang_Chhengly_1.jpg' },
    { name: 'Navasiri Morm', role: 'Content Creator', image: '/about/siri.jpg' },
    { name: 'Rin Makara', role: 'Content Creator', image: '/about/rin_makara_1.jpg' },
    { name: 'Pheakdey Prem', role: 'Content Creator & Writer', image: '/about/Pheakdey_Prem.jpg' },
    { name: 'Sonarith Seng', role: 'Web Developer', image: '/about/sonarith_seng.jpg' },
    { name: 'Soun Soratha', role: 'Web Developer', image: '/about/Soun_Soratha_1.png' },
    { name: 'Chham Chamnan', role: 'Video Editor', image: '/about/Chham_Chamnan.jpg' },
    { name: 'Ly Rorfilin', role: 'Video Editor', image: '/about/Rorfilin.jpg' },
    { name: 'Thoun LeeThen', role: 'Video Editor', image: '/about/Thoun_LeeThen.jpg' },
    { name: 'Samith Kimsang', role: 'Video Editor', image: '/about/Samith_Kimsang.jpg' },
];
const socialMediaLinks = [
    {
        name: 'Facebook',
        iconPath: '/about/facebook-icon.svg',
        link: 'https://www.facebook.com/techcambodia2022',
        imagePath: '/about/Ipad_Facebook.png'
    },
    {
        name: 'Tiktok',
        iconPath: '/about/tiktok-icon.svg',
        link: 'https://www.tiktok.com/@technology_cambodia',
        imagePath: '/about/Ipad_Tiktok.png'
    },
    {
        name: 'Telegram',
        iconPath: '/about/telegram-icon.svg',
        link: 'https://t.me/techcambodia2022',
        imagePath: '/about/Ipad_Telegram.png'
    },

];
const about_tech_detail = " Technology Cambodia is Cambodia’s Leading Technology Media Startup. We are a media branch under Baksey Media, aim to share, explain, and examine how technology will help society and change people’s lives in the future to massive Cambodian audiences."
const about_tech_vision = "ជួយធ្វើឲ្យកម្ពុជាកាន់តែទំនើប ទាំងការរស់នៅនិងរកស៊ី!ក្ដីសង្ឃឹមយើងយ៉ាងមុតមាំគឺ វិស័យបច្ចេកវិទ្យានៅកម្ពុជានឹងកាន់តែរីកចម្រើនជាងមុន គ្រប់គ្នានឹងមានគំនិតច្នៃប្រឌិតកាន់តែច្រើនជាពិសេសអាជីវកម្មនៅកម្ពុជាមានវត្តមានលើឆាកអន្តរជាតិ កាត់បន្ថយលើការចំណាយថ្លៃដើម និងលំហូរចេញលុយទៅក្រៅស្រុក"
// Function to prevent default behavior
const preventDefault = (event: Event) => {
    event.preventDefault();
};

// Function to handle keydown events
const preventCertainKeys = (event: KeyboardEvent) => {
    if (event.ctrlKey && [67, 86, 85, 117].includes(event.keyCode)) {
        preventDefault(event);
    }
    if (event.keyCode === 123) { // F12 key
        preventDefault(event);
    }
};

onMounted(() => {

    document.addEventListener('contextmenu', preventDefault);


    document.addEventListener('keydown', preventCertainKeys);
});

onUnmounted(() => {

    document.removeEventListener('contextmenu', preventDefault);
    document.removeEventListener('keydown', preventCertainKeys);
});

</script>
<style scoped>
a:hover {
    color: red;
    transition: 0.3s ease-in-out;
}

#close-select {
    pointer-events: none;
    user-select: none;
    overflow: hidden;
}

.zoom-in-up {
    perspective: 1000px;
    cursor: pointer;
}


.image-bevel {
    transition: transform 0.3s ease-in-out;
    display: block;
}


.zoom-in-up:hover .image-bevel {
    transform: rotateY(-20deg) rotateX(-30deg);

}

.zoom-in-up:hover .image-bevels {
    transform: rotateY(20deg) rotateX(-20deg);

}

.zoom-in-up img {
    margin: 50px auto;
    transition: 0.5s ease-in-out;
    box-shadow: rgba(0, 128, 255, 0.765) 0px 5px 15px;

}

@media screen and (max-width: 774px) {
    .zoom-in-up img {
        margin: 50px auto;

        box-shadow: rgba(0, 128, 255, 0.765) 0px 5px 5px;

    }
}

.mission-rotate {
    perspective: 800px;
    padding: 40px;
    padding-bottom: 80px;
    transition: 0.5s ease-in-out;
    margin: auto;

}

.mission-rotate img {
    transition: transform 0.3s ease-in-out;
    transform: rotate3d(1, 2, -1, 12deg);
    will-change: transform;

}

.meida-card-hover {
    cursor: pointer;
    transition: 0.5s ease-in-out;

}

.aboutus-bg {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1050%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%26quot%3b%23SvgjsLinearGradient1051%26quot%3b)'%3e%3c/rect%3e%3cpath d='M204.691%2c326.665C248.833%2c327.992%2c284.187%2c295.192%2c307.096%2c257.437C331.099%2c217.878%2c346.308%2c169.949%2c324.566%2c129.103C301.75%2c86.239%2c253.035%2c60.498%2c204.691%2c65.047C161.996%2c69.064%2c137.427%2c110.062%2c118.414%2c148.501C102.059%2c181.567%2c96.347%2c218.38%2c112.425%2c251.582C130.948%2c289.832%2c162.211%2c325.388%2c204.691%2c326.665' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1261.403%2c308.415C1285.159%2c309.993%2c1312.558%2c307.288%2c1324.378%2c286.621C1336.151%2c266.036%2c1324.499%2c241.132%2c1311.057%2c221.595C1299.659%2c205.028%2c1281.479%2c196.247%2c1261.403%2c195.091C1238.606%2c193.778%2c1212.419%2c195.616%2c1200.745%2c215.242C1188.917%2c235.128%2c1198.798%2c259.728%2c1211.422%2c279.119C1222.715%2c296.465%2c1240.751%2c307.043%2c1261.403%2c308.415' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M554.988%2c155.632C586.513%2c156.119%2c617.46%2c140.645%2c632.105%2c112.724C645.924%2c86.376%2c636.497%2c55.476%2c620.763%2c30.225C606.092%2c6.681%2c582.729%2c-11.18%2c554.988%2c-11.038C527.467%2c-10.897%2c504.559%2c7.312%2c490.366%2c30.891C475.633%2c55.368%2c468.745%2c85.038%2c481.886%2c110.405C496.013%2c137.674%2c524.281%2c155.158%2c554.988%2c155.632' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1075.352%2c295.456C1099.709%2c294.769%2c1118.755%2c275.479%2c1129.039%2c253.389C1137.829%2c234.508%2c1132.08%2c213.688%2c1121.869%2c195.536C1111.394%2c176.914%2c1096.671%2c159.364%2c1075.352%2c157.95C1051.787%2c156.387%2c1028.919%2c168.317%2c1016.764%2c188.566C1004.259%2c209.398%2c1004.471%2c235.267%2c1016.149%2c256.573C1028.312%2c278.763%2c1050.057%2c296.17%2c1075.352%2c295.456' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M143.798%2c564.888C160.459%2c564.004%2c174.182%2c552.842%2c182.085%2c538.149C189.549%2c524.272%2c190.135%2c507.479%2c181.901%2c494.045C174.004%2c481.161%2c158.905%2c476.016%2c143.798%2c475.683C127.953%2c475.333%2c111.647%2c479.237%2c102.666%2c492.296C92.43%2c507.181%2c88.857%2c526.906%2c97.763%2c542.623C106.769%2c558.518%2c125.555%2c565.856%2c143.798%2c564.888' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M15.149018211239824 440.3243448433795L23.922824641995614 607.7385446202977 182.5632179881581 431.5505384126237z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M613.7107483622291 205.26155897324367L474.1044241975271 270.36105705811343 539.2039222823969 409.96738122281533 678.8102464470988 344.86788313794557z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M1056.6902932161227 132.94500234278803L989.9502917360992 66.20500086276454 989.9502917360992 199.68500382281152z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M530.708%2c491.112C547.608%2c490.998%2c566.882%2c491.949%2c576.095%2c477.781C585.862%2c462.761%2c581.096%2c443.17%2c571.87%2c427.812C562.954%2c412.97%2c548.022%2c402.253%2c530.708%2c402.232C513.36%2c402.211%2c498.407%2c412.902%2c489.373%2c427.712C479.895%2c443.251%2c474.307%2c463.152%2c484.248%2c478.4C493.647%2c492.816%2c513.499%2c491.228%2c530.708%2c491.112' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M978.647%2c535.737C1015.363%2c534.058%2c1049.483%2c517.312%2c1068.683%2c485.971C1088.812%2c453.114%2c1093.793%2c411.996%2c1075.092%2c378.305C1055.881%2c343.695%2c1018.23%2c323.969%2c978.647%2c323.766C938.696%2c323.561%2c901.438%2c343.298%2c880.47%2c377.306C858.376%2c413.14%2c850.95%2c459.127%2c873.125%2c494.911C894.418%2c529.272%2c938.266%2c537.583%2c978.647%2c535.737' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M645.8795173597904 380.422944106347L724.2885925800409 446.2159702046108 711.6725434580542 302.0138688860965z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1376.509719122907 96.78571036376186L1262.2470594153551 162.75528770423955 1442.4792964633846 211.04837007131368z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1255.0287222323334 512.5470770158962L1141.8581910345047 454.88381123779925 1084.1949252564077 568.054342435628 1197.3654564542364 625.7176082137249z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M30.077900218758057 273.1919378323266L-55.944719317542095 365.26382536403383 50.93113699568238 391.9109691707648z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M356.59035860952355 143.6100940119045L295.3964895643814 84.51586158799668 236.30225714047356 145.70973063313883 297.4961261856157 204.80396305704664z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float1'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1050'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='50%25' y1='100%25' x2='50%25' y2='0%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1051'%3e%3cstop stop-color='%230e2a47' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(60%2c 96%2c 142%2c 1)' offset='1'%3e%3c/stop%3e%3c/linearGradient%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e");
    background-position: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}
</style>