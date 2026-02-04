<!-- components/Articles/COntent.vue -->
<template>
  <AdsAboveArticle :ads="aboveArticleAds" id="type_above-article" type="above-article" :page="page" />

  <!-- Header -->
  <div class="px-2">
    <div class="lg:px-24 my-2">
      <!-- <AboveTitleAd :ads="aboveTitleAds" /> -->
      <div
        class="text-center text-grey-800 text-2xl lg:text-4xl font-medium lg:font-semibold article-title dark:text-white">
        {{ article.title }}
      </div>
    </div>

    <div class="flex flex-col items-center pt-2 text-xs lg:text-base">
      <div class="flex flex-wrap justify-center items-center text-gray-600 dark:text-white">
        <NuxtLink :to="`/authors/${article.user_created.id}`">
          <div class="transfrom hover:underline">
            {{
              article.user_created.first_name +
              ' ' +
              article.user_created.last_name
            }}
          </div>
        </NuxtLink>

        <div class="text-lg mx-2 lg:mx-4">•</div>
        <div>{{ $formatDate(article.date_created) }}</div>
        <div class="text-lg mx-2 lg:mx-4">•</div>
        <div>{{ article.category.name }}</div>
        <div v-if="article.category.name !== 'PR'" class="text-lg mx-2 lg:mx-4">
          •
        </div>
        <div v-if="article.category.name !== 'PR'" class="font-bold">
          {{ $kFormatter(article.views) }} views
        </div>
        <div class="text-lg mx-2 lg:mx-4">•</div>
        <div>{{ $calculateReadTime(article.body) }}</div>
        <div class="text-lg mx-2 lg:mx-4">•</div>
        <div class="flex items-center justify-between dark:text-white ">
          <div class="flex items-center space-x-2">
            <!-- Favorite button -->
            <Icon :icon="isFavorite ? 'material-symbols:favorite' : 'material-symbols:favorite-outline'" width="24"
              height="24" @click.stop.prevent="handleToggleFavorite" />
          </div>
        </div>


      </div>
    </div>
    <!-- Replace the old modal with our new AppleIntelligenceModal component -->
    <SummarizeModalAI :is-visible="showModal" :is-loading="isSummarizing" :summary-content="summary"
      :thumbnail="article.thumbnail ? useImg(article.thumbnail) : ''" @close="closeModal" />
    <div class="flex justify-center mt-4">
      <hr class="w-10 h-1 bg-primary" />
    </div>
  </div>

  <!-- Body -->
  <div class="mt-4 pb-10 px-2 lg:px-32 grid grid-cols-1 lg:grid-cols-12">
    <div class="pt-4 px-4 col-span-8">
      <!-- content -->
      <div class="">
        <!-- above thumbnail ads -->
        <AdsAboveThumbnailAds :ads="aboveThumbnailAds" id="above-thumbnail" :page="page" />
        <!-- thumbnail -->
        <img format="webp" loading="lazy" :src="useImg(article.thumbnail)" alt=""
          class="w-full rounded-xl object-cover bg-no-repeat bg-center lg:block mb-3" />
        <!--Damrei - MR1-->
        <div id="gax-inpage-async-1700709408"></div>
        <!--Damrei - MR1 Zone2 Mobile-->
        <div id="gax-inpage-async-1726803747"></div>

        <!-- article body -->
        <div class="text-lg lg:text-xl list-disc font-light dark:text-white break-words" id="article-body">
          <!-- Angkor Underlay Feb-2026 V2 - TC (Moved to top for better loading) -->
          <ClientOnly>
            <ins v-if="adsReady" data-revive-zoneid="690" data-revive-id="2d10743d9880200bf17a894cfa35dba0"></ins>
          </ClientOnly>

          <div>
            <AdsBody :ads="firstParagraphAds" id="paragraph-1" :page="page" :body="1" />
            <div id="part-1">
              <div v-html="splitBody().firstPart" class="article_body"></div>

            </div>
            <!--Mobile Underlay - Zone 1-->
            <div id="gax-inpage-async-1700709319"></div>
            <!-- GPAS Mobile Underlay -->
            <!-- Sting Underlay -->
            <ClientOnly>
              <ins v-if="adsReady" data-revive-zoneid="665" data-revive-id="2d10743d9880200bf17a894cfa35dba0"></ins>
            </ClientOnly>

            <!-- <ins data-revive-zoneid="125" data-revive-id="2d10743d9880200bf17a894cfa35dba0"></ins> -->
          </div>

          <div id="part-2">
            <AdsBody :ads="secondParagraphAds" id="paragraph-2" :page="page" :body="2" />
            <div v-html="splitBody().secondPart" class="article_body"></div>
            <!--Mobile Underlay - Zone 2-->
            <!-- <div id="gax-inpage-async-1706848793"></div> -->
            <!-- GPAS Mobile Underlay -->

            <!-- End Gpas Mobile Underlay -->
          </div>

          <div id="part-3">
            <AdsBody :ads="thirdParagraphAds" id="paragraph-3" :page="page" :body="3" />
            <!-- Updated AI summary button with animation -->
            <div class="flex items-center justify-between dark:text-white ml-2">
              <button @click="summarizeArticle"
                class="relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
                :disabled="isSummarizing">
                <span class="relative z-10 flex items-center justify-center">
                  <Icon icon="fluent:arrow-right-12-filled" width="24" height="24" /> {{ isSummarizing ?
                    'កំពុងសង្ខេប...' : 'សង្ខេបអត្ថបទប្រើ AI ' }}
                </span>
                <!-- Button background animation -->
                <span
                  class="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-size-200 animate-gradient-x"></span>
              </button>
            </div>
            <div v-html="splitBody().thirdPart" class="article_body"></div>
            <!--Mobile Underlay - Zone 2-->
            <div id="gax-inpage-async-1706848793"></div>
            <!-- Zone Tag : Technology Cambodia Mobile Overlay UT-->
            <div id="div-ad-innity-101010/0"></div>



            <!-- Zone Tag : Technology Cambodia Rectangle UT-->
            <div id="div-ad-innity-102478/0" class="flex justify-center"></div>

            <!-- GPAS MR1 -->
            <div class="flex justify-center my-4 min-h-[250px]">
              <ClientOnly>
                <ins v-if="adsReady" data-revive-zoneid="618" data-revive-id="2d10743d9880200bf17a894cfa35dba0"></ins>
              </ClientOnly>
            </div>

            <!-- Angkor MR1 Feb-2026 - TC -->
            <div class="flex justify-center my-4 min-h-[250px]">
              <ClientOnly>
                <ins v-if="adsReady" data-revive-zoneid="684" data-revive-id="2d10743d9880200bf17a894cfa35dba0"></ins>
              </ClientOnly>
            </div>
          </div>

          <div id="the-rest">
            <div v-html="splitBody().theRest" class="article_body"></div>
          </div>
          <!-- Zone Tag : Technology Cambodia Mobile Inpage UT-->
          <div id="div-ad-innity-101009/0"></div>
        </div>
      </div>
      <div v-if="article.telegram_embed" v-html="article.telegram_embed"></div>

      <ArticlesAuthor :user="article.user_created" />
      <div class="fb-comments" :data-href="'https://tech-cambodia.com' + $router.currentRoute.value.path"
        data-width="100%" data-numposts="5"></div>
    </div>
    <div class="col-span-4 md:px-2 lg:px-8">
      <AdsSideBarRight :ads="sideBarAds" id="side-bar" :page="page" />
      <!-- MR1 Desktop Tech Cambodia -->
      <div id="gax-inpage-async-1709623758" class="flex justify-center my-4"></div>
      <div id="gax-inpage-async-1750151641" class="flex justify-center my-4"></div>



    </div>
  </div>

  <BackToTopButton />
</template>

<script setup lang="ts">
import { IAd } from '~~/types/ad';
import { IArticle } from '~~/types/article';
import { Icon } from '@iconify/vue';



const { $handleAdSeen } = useNuxtApp();
// Get toggleFavorite function
const { toggleFavorite } = useFavorite();

// Favorite state
const isFavorite = ref(false);

// Ads ready state - prevents postMessage null errors by delaying ad render until DOM is ready
const adsReady = ref(false);

// Check if the article is already in favorites
const checkIfFavorite = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  isFavorite.value = favorites.some((item: { id: string }) => props.article.id === item.id);
};
// Summarize the article using AI
const isSummarizing = ref(false);
const summary = ref<string | null>(null);
const showModal = ref(false);

const props = defineProps<{
  aboveArticleAds: Array<IAd>;
  article: IArticle;
  firstParagraphAds: Array<IAd>;
  secondParagraphAds: Array<IAd>;
  thirdParagraphAds: Array<IAd>;
  sideBarAds: Array<IAd>;
  aboveThumbnailAds: Array<IAd>;
  showElements: any;
  page: number;
}>();

const summarizeArticle = async () => {
  if (!props.article || !props.article.body) return;

  isSummarizing.value = true;
  summary.value = null;
  showModal.value = true; // Show the modal when summarizing starts

  // Prevent body scrolling when modal is open
  document.body.style.overflow = 'hidden';

  try {
    const response = await useFetch<{ responseText: string }>('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        prompt: `សង្ខេបអត្ថបទជាភាសាខ្មែរ បន្ទាប់មក List ចំណុចសំខាន់ៗនៅក្នុងប្រអប់: ${props.article.body}`
      }
    });

    summary.value = response.data.value?.responseText || 'Failed to generate summary.';
    // We don't hide the modal here as we want to show the summary in the modal
  } catch (error) {
    console.error('Error summarizing article:', error);
    summary.value = 'Failed to generate summary.';
  } finally {
    isSummarizing.value = false;
  }
};// Close the modal
const closeModal = () => {
  showModal.value = false;
  // Re-enable body scrolling when modal is closed
  document.body.style.overflow = 'auto';
};

// Function to toggle favorite status
const handleToggleFavorite = () => {
  toggleFavorite(isFavorite, props.article);
};

onMounted(async () => {
  checkIfFavorite();

  // Wait for DOM to be fully ready
  await nextTick();

  // Enable ads rendering - this allows the ClientOnly wrapped ads to render
  adsReady.value = true;

  // Wait another tick for ads to be rendered in DOM
  await nextTick();

  const w = window as any;

  const trigger = () => {
    // Method 1: reviveAsync (Revive Adserver async API)
    if (w.reviveAsync && typeof w.reviveAsync === 'object') {
      const keys = Object.keys(w.reviveAsync);

      // Call refresh on each Revive instance (skip apply() - it's broken)
      keys.forEach(key => {
        const instance = w.reviveAsync[key];
        if (instance && typeof instance.refresh === 'function') {
          try {
            instance.refresh();
          } catch (e) {
            // Ignore refresh errors - the ad script might not be fully loaded yet
          }
        }
      });

      return true;
    }

    // Method 2: oxAsyncRequest (older API)
    if (typeof w.oxAsyncRequest === 'function') {
      try {
        w.oxAsyncRequest();
      } catch (e) {
        // Ignore errors
      }
      return true;
    }

    return false;
  };

  // Give Revive script time to fully initialize before triggering refresh
  // This prevents postMessage null errors from scripts trying to communicate before iframes exist
  setTimeout(() => {
    if (!trigger()) {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (trigger() || attempts > 5) {
          clearInterval(interval);
        }
      }, 1000);
    }
  }, 500);
});

const isMobile = ref(false);



const splitBody = () => {

  const bodyParts = props.article.body.split('\n').map((html) => {
    // add sandbox attribute to iframe for facebook embed
    return html.replace(
      /sandbox=""/g,
      'sandbox="allow-scripts allow-same-origin allow-popups"'
    );
  });
  return {
    firstPart: bodyParts[0],
    secondPart: bodyParts[1] ? bodyParts[1] + '' : '\n',
    thirdPart: bodyParts[2] ? bodyParts[2] + '' : '\n',
    theRest: bodyParts.length > 3 ? bodyParts.slice(3).join('') : '\n',
  };
};


// here where i toggle impression on ads seen
onMounted(() => {
  if (window.innerWidth < 768) {
    isMobile.value = true;
  }
  try {
    let observer = new IntersectionObserver(
      async (entries) => {
        if (entries.length) {
          entries.forEach((e) => {
            // if we scroll to see the ad
            if (
              e.isIntersecting
              // !document.getElementById(e.target.id)?.classList.contains("seen")
            ) {
              $handleAdSeen(e.target.children[0].id);
              // // make it seen and not count impression again next time
              // document.getElementById(e.target.id)?.classList.add("seen");
            }
          });
        }
      },
      { threshold: 0 }
    );

    // observer each ads from each article

    // --> above article page
    props.aboveArticleAds.forEach((a, index) => {
      observer.observe(
        document.getElementById('above_ads_' + index + '_' + props.page)!
      );
    });
    // --> under article page
    props.aboveThumbnailAds.forEach((a, index) => {
      observer.observe(
        document.getElementById('above_thumbnail_' + index + '_' + props.page)!
      );
    });
    // --> body ads
    props.firstParagraphAds.forEach((a, index) => {
      observer.observe(
        document.getElementById(
          'body_ads_' + index + '_' + props.page + '_' + 1
        )!
      );
    });
    props.secondParagraphAds.forEach((a, index) => {
      observer.observe(
        document.getElementById(
          'body_ads_' + index + '_' + props.page + '_' + 2
        )!
      );
    });
    props.thirdParagraphAds.forEach((a, index) => {
      observer.observe(
        document.getElementById(
          'body_ads_' + index + '_' + props.page + '_' + 3
        )!
      );
    });
    // --> side bar ads
    props.sideBarAds.forEach((a, index) => {
      observer.observe(document.getElementById('side_ads_' + index)!);
    });
  } catch (error) {
    // console.log(error);
  }
});
</script>

<style>
iframe {
  max-width: 100%;
}

.article_body a {
  text-decoration: underline;
  color: blue;
}

.article_body {
  white-space: pre-wrap;
  line-height: 1.75;
}

.article_body p {
  padding: 9px 0px;
}

.profile-avatar {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 12%;
  text-align: center;
  z-index: 1;
}

#article-body img {
  height: 100%;
  width: 100%;
}

.article_body ul {
  list-style: disc;
  padding-left: 1rem;
  line-height: normal;
}

.article_body ol {
  list-style: decimal;
  padding-left: 1rem;
}

.article_body li {
  line-height: normal;
}

.article_body h1 {
  font-size: 2em;
  font-weight: bold;
  color: #089cf4;
  line-height: normal;
}

.article_body h2 {
  font-size: 1.5em;
  font-weight: bold;
  color: #777777;
  line-height: normal;
}

.article_body h3 {
  font-size: 1.17em;
  font-weight: bold;
}

.article_body p,
span {
  font-family: 'Kantumruy Pro' !important;
}

.article_body strong {
  font-weight: 600;
}

.article_body ul li {
  line-height: 180%;
}

table {
  max-width: fit-content;
}
</style>
