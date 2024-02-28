
<template>
    <div class="min-h-screen dark:bg-black">
        <div id="image-gif"
            class="h-screen flex lg:flex w-full justify-evenly items-center lg:px-32  bg-gray-600 dark:bg-gray-800 mission max-[1024px]:block max-md:h-auto   "
            data-aos="fade-up">
            <div class="w-4/5 max-[1024px]:w-[100%] max-[1024px]:px-2 ">
                <div class="lg:w-full max-[1024px]:pt-40  max-[1024px]:text-center ">
                    <h1 class="text-[7rem] max-[1400px]:text-5xl font-bold text-white">Our Services</h1>
                    <!-- <p class="text-white text-lg mt-4">We build websites that are fast, secure, and easy to manage. We
                    develop websites that are responsive and mobile-friendly. We also provide website maintenance and
                    support.</p> -->
                    <div class="flex flex-wrap lg:justify-start justify-center gap-8 mt-6">
                        <a id="button" href="#" v-for="service in servicesGroup" :key="service.title"
                            class="cursor-pointer text-white font-bold relative p-4 text-xl text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700"
                            @click.prevent="scrollToSection(service.id)">
                            {{ service.title }}
                        </a>
                    </div>
                </div>
            </div>
            <div class="services-top w-1/2 max-[1024px]:w-[100%] max-[1024px]:px-2  max-[1024px]:mt-[4rem]">
                <img src="~/assets/services/website_1.gif" class="max-[1024px]:mx-auto " alt="" id="close-select">
            </div>
        </div>
        <div class="h-screen flex lg:flex w-full justify-evenly items-center lg:px-32   mission max-[1024px]:block   "
            data-aos="fade-up" data-aos-anchor-placement="top-center">
            <div class="w-1/2 max-[1024px]:w-[100%] max-[1024px]:px-2  max-[1024px]:mt-[4rem]">
                <img data-aos="fade-down-left" src="~/assets/services/Write_Articles.png"
                    class="max-[1024px]:mx-auto  w-[80%]" id="close-select" alt="">
            </div>
            <div class="w-4/5 max-[1024px]:w-[100%] max-[1024px]:px-2 ">
                <div class="lg:w-full max-[1024px]:pt-40  max-[1024px]:text-center ">
                    <h1 class="text-[7rem] max-[1400px]:text-5xl font-bold text-primary dark:text-white "
                        id="content-marketing">Content Marketing</h1>

                    <h1 class="text-[5rem] max-[1400px]:text-5xl font-bold text-primary dark:text-white ">Write Articles
                    </h1>
                    <div class="flex flex-wrap lg:justify-start justify-center gap-8 mt-6 dark:text-white">
                        <p class="text-2xl text-justify">&nbsp;&nbsp; We offer professional writing services for all needs.
                            Our team creates engaging articles on many topics. Need content for your site, blog, or
                            magazine? We deliver quality writing that grabs attention. Our work is tailored,
                            well-researched, and on time. Trust us to make your project stand out with great writing.</p>
                    </div>
                </div>
            </div>

        </div>
        <div class="h-screen flex flex-col lg:flex-row items-center  justify-around p-4 md:mt-10 bg-primary  dark:bg-gray-900  mission max-[1024px]:block  "
            data-aos="fade-up" data-aos-anchor-placement="top-center">
            <div class="w-4/5 max-[1024px]:w-[100%] max-[1024px]:px-2 ">
                <div class="lg:w-full max-[1024px]:pt-40  max-[1024px]:text-center text-white ">
                    <h1 class="text-[7rem] max-[1400px]:text-5xl font-bold  ">Join Event</h1>
                    <div class="flex flex-wrap lg:justify-start justify-center gap-8 mt-6 ">
                        <p class="text-2xl text-justify ">&nbsp;&nbsp; We offer professional writing services for all needs.
                            Our team creates engaging articles on many topics. Need content for your site, blog, or
                            magazine? We deliver quality writing that grabs attention. Our work is tailored,
                            well-researched, and on time. Trust us to make your project stand out with great writing.</p>
                    </div>
                </div>
            </div>
            <div class="w-1/2 max-[1024px]:w-[100%] max-[1024px]:px-2  max-[1024px]:mt-[4rem]">
                <img data-aos="flip-down" src="~/assets/services/Join_Event.png" class="max-[1024px]:mx-auto  w-[80%]"
                    id="close-select" alt="">
            </div>
        </div>
        <!-- <div id="paid-advertisement" class="p-2 text-white text-center text-2xl bg-gray-900">Paid Advertisement</div> -->
        <div v-for="service in services" :key="service.id" data-aos="fade-up" data-aos-anchor-placement="top-center"
            class="h-screen flex flex-col lg:flex-row items-center max-sm:flex-col-reverse  justify-around p-4 max-md:h-auto ">
            <div v-if="service.imageLeft" class="flex-shrink-0 lg:w-2/5">
                <img :src="service.image" :alt="service.alt" class="w-full  max-md:w-2/3 max-sm:w-full lg:w-auto">
            </div>
            <div class="text-center lg:text-left text-primary" id="paid-advertisement">
                <h1 v-if="service.id === 'paid-advertisement'" class="text-4xl lg:text-5xl font-bold mb-4" :id="service.id">
                    {{ service.title }} </h1>
                <h2 v-else class="text-4xl lg:text-5xl font-bold mb-4">{{ service.content }} <br> {{ service.title }}</h2>
                <p class="text-lg lg:text-xl text-gray-900 dark:text-white">
                    {{ service.description }}
                </p>
            </div>
            <div v-if="!service.imageLeft" class="flex-shrink-0 lg:w-2/5">
                <img :src="service.image" :alt="service.alt" class="w-full max-md:w-2/3 max-sm:w-full lg:w-auto">
            </div>
        </div>
        <div id="intro-web-bg"
            class="h-screen flex lg:flex w-full justify-evenly items-center lg:px-32 md:flex sm:block bg-gray-600 dark:bg-gray-800 mission max-[1024px]:block max-md:h-[85rem]  "
            data-aos="fade-up">
            <div class="w-1/2 max-[1024px]:w-[100%] max-[1024px]:px-2  md:w-full ">
                <div class="lg:w-full  max-[1024px]:pt-40 md:pt-10  max-[1024px]:text-center  ">
                    <h1 class="max-sm:text-[3rem]  max-md:text-[3rem] lg:text-5xl  font-bold text-primary">{{
                        deail_web[0].title }}</h1>
                    <p class="text-white text-lg md:text-sm mt-4" id="web-development">{{ deail_web[0].detail }}</p>
                    <div class="flex flex-wrap lg:justify-start justify-center gap-8 mt-6">
                        <a id="button" href="#" v-for="Webservice in web_services" :key="Webservice.title"
                            class="cursor-pointer text-white font-bold relative p-4 text-xl md:text-sm  text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700"
                            @click.prevent="scrollToSection(Webservice.id)">
                            {{ Webservice.title }}
                        </a>
                    </div>
                </div>
            </div>
            <div class="w-1/2 max-[1024px]:w-[100%] max-[1024px]:px-2  max-[1024px]:mt-[4rem] web-deve ">
                <img src="~/assets/services/web_development.png" class="w-full   max-[1024px]:mx-auto " alt=""
                    id="close-select">
            </div>
        </div>

        <div v-for="web_features in  web_services_features" :key="web_features.id" data-aos="fade-up"
            data-aos-anchor-placement="top-center"
            class="h-screen flex flex-col lg:flex-row items-center  justify-around p-4 md:mt-10">
            <div v-if="web_features.imageLeft" class="flex-shrink-0 lg:w-2/5">
                <img :src="web_features.image" :alt="web_features.alt" class="w-full lg:w-auto">
            </div>
            <div class="text-center lg:text-left text-primary " id="web-development">
                <h1 v-if="web_features.id === 'paid-advertisement'" class="text-4xl lg:text-5xl font-bold mb-4"
                    :id="web_features.id">
                    {{ web_features.title }} </h1>
                <h2 v-else class="text-4xl lg:text-5xl font-bold mb-4">
                    {{ web_features.title }}
                </h2>
                <p class="text-lg lg:text-xl text-gray-900 dark:text-white">
                    {{ web_features.description }}
                </p>
            </div>
            <div v-if="!web_features.imageLeft" class="flex-shrink-0 lg:w-2/5">
                <img :src="web_features.image" :alt="web_features.alt" class="w-full lg:w-auto">
            </div>
        </div>
          <CardSlider />
        <BackToTopButton />
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
const sliderRef: Ref<HTMLElement | null> = ref(null);
// import image from assets/services/Clients

const servicesGroup = ref([
    {
        title: 'Content Marketing',
        id: 'content-marketing',
    },
    {
        title: 'Paid Advertisement',
        id: 'paid-advertisement',
    },
    {
        title: 'Web Development',
        id: 'web-development',
    }
]);

const deail_web = ref([
    {
        title: 'Web Development',
        detail: 'We specialize in crafting fast-loading, secure, and user-friendly websites. Our expert team excels in responsive web design and mobile optimization, ensuring your site offers an optimal experience on any device. Additionally, we offer comprehensive website maintenance and support services to keep your site running smoothly.'
    }
]);
// web development loop data
const web_services = ref([
    {
        title: 'Offer Custom Web Solutions',
        id: 'content-marketing',

    },
    {
        title: 'E-commerce Development',
        id: 'content-marketing',

    },
    {
        title: 'Website Hosting',
        id: 'content-marketing',

    },
    {
        title: 'Maintenance and Updates:',
        id: 'content-marketing',
    },
    {
        title: 'Sell Website Templates',
        id: 'content-marketing',
    },
    {
        title: 'Training and Workshops',
        id: 'content-marketing',
    }
])
const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
        const offset = 33 * parseFloat(getComputedStyle(document.documentElement).fontSize);
        const topPosition = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
            top: topPosition,
            behavior: 'smooth'
        });

        // Update the URL with the service title using a query parameter, without affecting the history
        window.history.replaceState(null, '', `?id=${id}`);
    }
};

onMounted(() => {
    const url = new URL(window.location.href); // Use .href to get the string representation
    url.searchParams.delete('id'); // Remove only the 'id' query parameter
    history.replaceState(null, '', url.pathname + url.search);
});
// web development data loop
import custom_web_solution from '~/assets/services/Custom_Web_Solution.png';
import e_commerce_development from '~/assets/services/E-commerce_Development.png';
import web_hosting from '~/assets/services/web-hosting.gif';
import maintenance_update from '~/assets/services/maintenance_update.gif';
import sell_website_templates from '~/assets/services/sell_web_templates.png';
const web_services_features = ref([
    {
        id: 'custom-web-solutions',
        title: 'Offer Custom Web Solutions',
        description: "Our team specializes in crafting bespoke websites tailored to the unique requirements of each client. From eye-catching designs to innovative functionalities, we ensure your digital presence stands out. Whether you're looking for an interactive portfolio, a dynamic data-driven site, or custom web applications, we've got you covered.",
        image: custom_web_solution,
        alt: 'custom web solutions image',
        imageLeft: false
    },
    {
        id: 'e-commerce-development',
        title: 'E-commerce Development',
        description: "Unlock the potential of online retail with our specialized e-commerce development services. From product catalogs and shopping carts to secure payment processing, we provide end-to-end solutions to help you sell online effectively.",
        image: e_commerce_development,
        alt: 'custom web solutions image',
        imageLeft: true
    },
    {
        id: 'web-hosting',
        title: 'Website Hosting',
        description: " Elevate your online experience with our reliable web hosting services. We provide the essential infrastructure and support to ensure your website is always accessible, secure, and performing.",
        image: web_hosting,
        alt: 'web_hosting',
        imageLeft: false

    },
    {
        id: 'maintenance-update',
        title: 'Maintenance & Updates',
        description: "Keep your website in top condition with our comprehensive maintenance services. We offer regular updates to ensure your site remains secure, fast, and user-friendly, covering everything from content updates and bug fixes to performance enhancements.",
        image: maintenance_update,
        alt: "Updating website",
        imageLeft: true
    },
    {
        id: 'sell-website-templates',
        title: 'Sell Website Templates',
        description: "Discover our wide range of professionally designed website templates. Perfect for startups and businesses on a budget, these templates provide a quick and cost-effective solution for establishing an online presence without compromising on quality and design.",
        image: sell_website_templates,
        alt: "Selling website templates",
        imageLeft: false
    },

])

// Services data loop
import introAdsImage from '~/assets/services/Intro_Ads.png';
import lower_third from '~/assets/services/Paid-Ads-lower-third.png';
import product_placement from '~/assets/services/Product_Placement.png';
const services = ref([
    {
        id: 'intro-ads',
        content: 'Paid Advertisement',
        title: 'Intro Ads Or Shout Out',
        description: 'We offer professional writing services for all needs. Our team creates engaging articles on many topics. Need content for your site, blog, or magazine? We deliver quality writing that grabs attention. Our work is tailored, well-researched, and on time. Trust us to make your project stand out with great writing.',
        image: introAdsImage,
        alt: 'Intro Ads Image',
        imageLeft: true
    },
    {
        id: ' Lower-Third ',
        title: ' Lower Third ',
        description: 'Elevate your brand with our content marketing strategies. Our experts craft compelling content that resonates with your audience, builds brand authority, and drives engagement.',
        image: lower_third,
        alt: 'Content Marketing Image',
        imageLeft: false
    },
    {
        id: ' Product-Placement ',
        title: ' Product Placement ',
        description: 'Elevate your brand with our content marketing strategies. Our experts craft compelling content that resonates with your audience, builds brand authority, and drives engagement.',
        image: product_placement,
        alt: 'Content Marketing Image',
        imageLeft: true
    },

    // ... add other service objects here
]);
</script>
<style scoped>
#close-select {
    pointer-events: none;
    user-select: none;
    overflow: hidden;
}

#image-gif {
    background-image: url('~/assets/services/website.gif');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-blend-mode: multiply;
}

#intro-web-bg {
    background-image: url('~/assets/services/intro_web_bg.gif');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-blend-mode: multiply;

}

.services-top {
    perspective: 454px;
}

.web-deve img {
    filter: drop-shadow(7px 21px 21px #1352e7);

}

.services-top img {
    transform: rotateX(0deg) rotateY(336deg);
    transform-style: preserve-3d;
    filter: drop-shadow(7px 11px 21px #1352e7);
}

.drop-shadows {
    filter: drop-shadow(7px 11px 15px #1352e7);
}

#button {
    filter: drop-shadow(7px 11px 21px #1352e7);
}

@media screen and (max-width: 774px) {
    .services-top img {
        transform: none;
        transform-style: none;
        filter: drop-shadow(7px 11px 21px #1352e7);
    }
}
</style>