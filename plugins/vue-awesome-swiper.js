import Vue from 'vue';
import { Swiper as SwiperClass, Pagination, Navigation, EffectCoverflow } from 'swiper/core';
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

// Swiper modules
SwiperClass.use([Pagination, Navigation, EffectCoverflow]);

// Global use
Vue.use(getAwesomeSwiper(SwiperClass));
