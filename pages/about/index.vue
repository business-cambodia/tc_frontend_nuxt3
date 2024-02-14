

<template>
    <div class="h-screen max-[1024px]:p-20  lg:flex w-full justify-evenly items-center px-32">
        <!-- img w-1/2 -->
        <div class="w-full mt-30 lg:w-1/2  zoom-in-up">
            <!-- <img src="/about/develop-web.gif" alt="" class=" lg:rounded-3xl md:rounded-2xl md:mb-8 sm:rounded-sm  "> -->
            <div style="pointer-events: none; user-select: none; overflow: hidden;">
                <img src="/about/develop-web.gif" alt="" class="lg:rounded-3xl md:rounded-2xl md:mb-8 sm:rounded-sm">
            </div>
        </div>
        <!-- div text w-1/2 -->
        <div class="w-full lg:w-1/2 ">
            <div class="w-full text-center zoom-in   " style="pointer-events: none; user-select: none; overflow: hidden;">
                
                <div class="text-5xl  font-extrabold text-primary dark:text-white">
                    ចក្ខុវិស័យ
                </div>
                <div class="mt-12 text-2xl dark:text-white lg:p-5 max-[774px]:text-xl max-[774px]:text-justify">
                    ជួយធ្វើឲ្យកម្ពុជាកាន់តែទំនើប &ZeroWidthSpace;ទាំងការរស់នៅនិងរកស៊ី!&ZeroWidthSpace;
                    ក្ដីសង្ឃឹមយើងយ៉ាងមុតមាំគឺ
                    វិស័យបច្ចេកវិទ្យានៅកម្ពុជានឹងកាន់តែរីកចម្រើនជាងមុន
                    គ្រប់គ្នានឹងមានគំនិតច្នៃប្រឌិតកាន់តែច្រើន
                    ជាពិសេសអាជីវកម្មនៅកម្ពុជាមានវត្តមានលើឆាកអន្តរជាតិ
                    កាត់បន្ថយលើការចំណាយថ្លៃដើម និងលំហូរចេញលុយទៅក្រៅស្រុក
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import '~/assets/css/about_animations.css';
import '~/assets/css/fade_up.css';

</script>
<style>
.zoom-in-up img{
    box-shadow: rgba(0, 128, 255, 0.765) 0px 5px 15px;
    perspective: 1000px;
    margin: 50px auto; 
}

</style>