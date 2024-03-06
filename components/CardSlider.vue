<template>
        <div ref="sliderRef" class=" flex lg:w-[80%] m-auto overflow-x-auto  scrollbar-thumb-white scrollbar-track-sky-500 scrollbar-thin gap-4 p-4 h-auto sm:w-full"  data-aos="fade-up">
            <div v-for="card in cards" :key="card.id" class="min-w-[600px] h-[450px] shadow-lg rounded-lg p-4">
                <h1 class="text-center text-2xl font-bold text-primary">Our Clients</h1>
                <img :src="card.image" alt="Card Image" class="rounded-lg w-full h-[85%]">
                <div class="flex justify-between ">
                    <h3 class="text-lg text-primary font-bold ">{{ card.title }}</h3>
                <a :href="card.url" target="_blank" class=" p-2 bg-primary  text-white rounded-full duration-300 hover:bg-red-600  hover:scale-110">{{ card.viewsite }}</a>
                </div>
            </div>
        </div>
        <br>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import BC_Cambodia from '~/assets/services/Clients/BC_Cambodia.png';
import bay_of_flights from '~/assets/services/Clients/Bay_of_lights.png';
import clinic from '~/assets/services/Clients/clinic.png';
import lch_investment from '~/assets/services/Clients/Lch_investment_group.png';
import task_force from '~/assets/services/Clients/task_force.png';
import attaccapital from '~/assets/services/Clients/Attcapital.png';
const sliderRef: Ref<HTMLElement | null> = ref(null);
    const cards = ref([
    {
        id: 1,
        title: 'Business Cambodia',
        viewsite: 'View Site',
        image: BC_Cambodia,
        url: 'http://business-cambodia.com' // Add the actual URL here
    },
    {
        id: 2,
        title: 'Bay Of Flights',
        viewsite: 'View Site',
        image: bay_of_flights,
        url: 'https://bayoflights-entertainment.com/' // Add the actual URL here
    },
    {
        id: 3,
        title: 'Clinic',
        viewsite: 'View Site',
        image: clinic,
        url: 'https://www.cysclinic.com/'
    },
    {
        id:4,
        title: 'LCH Investment Group',
        viewsite: 'View Site',
        image: lch_investment,
        url: 'https://www.lch-investment.com/'
    },
    {
        id: 5,
        title: 'Task Force',
        viewsite: 'View Site',
        image: task_force,
        url:'https://taskforce.asia/'
    },
    {
        id: 6,
        title: 'Attcapital',
        viewsite: 'View Site',
        image: attaccapital,
        url: 'https://attcapital.fund/'

    },
    
    // Add more cards as needed
]);


// Ref for the slider container

// Function to auto-slide the cards
const slideCards = () => {
    if (sliderRef.value) {
        let newScrollPosition = sliderRef.value.scrollLeft + 50; // Adjust the 50 to control the sliding speed and distance
        sliderRef.value.scrollTo({ left: newScrollPosition, behavior: 'smooth' });

        // Reset scroll position to start when it reaches the end
        if (sliderRef.value.scrollWidth - newScrollPosition <= sliderRef.value.clientWidth) {
            sliderRef.value.scrollTo({ left: 0, behavior: 'smooth' });
        }
    }
};

// Interval to continuously slide cards
let slideInterval: number | undefined;

onMounted(() => {
    slideInterval = window.setInterval(slideCards, 2000); // window.setInterval to make TypeScript happy
});

onUnmounted(() => {
    if (slideInterval) window.clearInterval(slideInterval);
});

onUnmounted(() => {
    clearInterval(slideInterval);
});
</script>
<style scoped>

</style>