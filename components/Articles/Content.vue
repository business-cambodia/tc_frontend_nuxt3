<template>
  <AdsAboveArticle
    :ads="aboveArticleAds"
    id="type_above-article"
    type="above-article"
    :page="page"
  />

  <!-- Header -->
  <div class="px-2">
    <div class="lg:px-24 my-2">
      <!-- <AboveTitleAd :ads="aboveTitleAds" /> -->
      <div
        class="text-center text-grey-800 text-2xl lg:text-4xl font-medium lg:font-semibold article-title dark:text-white"
      >
        {{ article.title }}
      </div>
    </div>

    <div class="flex flex-col items-center pt-2 text-xs lg:text-base">
      <div
        class="flex flex-wrap justify-center items-center text-gray-600 dark:text-white"
      >
        <NuxtLink :to="`/authors/${article.user_created.id}`"
          ><div class="transfrom hover:underline">
            {{
              article.user_created.first_name +
              ' ' +
              article.user_created.last_name
            }}
          </div></NuxtLink
        >

        <div class="text-lg mx-2 lg:mx-4">•</div>
        <div>{{ $formatDate(article.date_created) }}</div>
        <div class="text-lg mx-2 lg:mx-4">•</div>
        <div>{{ article.category.name }}</div>
        <div class="text-lg mx-2 lg:mx-4">•</div>
        <div class="font-bold">{{ $kFormatter(article.views) }} views</div>
        <div class="text-lg mx-2 lg:mx-4">•</div>
        <div>{{ $calculateReadTime(article.body) }}</div>
      </div>
    </div>
    <div class="flex justify-center mt-4">
      <hr class="w-10 h-1 bg-primary" />
    </div>
  </div>

  <!-- Body -->
  <div class="mt-4 pb-10 grid grid-cols-1 lg:grid-cols-10">
    <div class="col-span-2"></div>
    <div class="pt-4 px-4 col-span-6">
      <!-- content -->
      <div class="">
        <!-- above thumbnail ads -->
        <AdsAboveThumbnailAds
          :ads="aboveThumbnailAds"
          id="above-thumbnail"
          :page="page"
        />
        <!-- thumbnail -->
        <img
          format="webp"
          loading="lazy"
          :src="useImg(article.thumbnail)"
          alt=""
          class="w-full rounded-xl object-cover bg-no-repeat bg-center lg:block mb-3"
        />

        <!-- article body -->
        <div
          class="text-lg lg:text-xl list-disc font-light dark:text-white break-words"
          id="article-body"
        >
          <div>
            <AdsBody
              :ads="firstParagraphAds"
              id="paragraph-1"
              :page="page"
              :body="1"
            />
            <div id="part-1">
              <div v-html="splitBody().firstPart" class="article_body"></div>
            </div>
            <!--Mobile Underlay - Zone 1-->
            <div id="gax-inpage-async-1700709319"></div>
          </div>

          <!-- Zone Tag : Technology Cambodia Mobile Inpage UT-->

          <!-- <div id="div-ad-innity-101009/0"></div> -->

          <div id="part-2">
            <AdsBody
              :ads="secondParagraphAds"
              id="paragraph-2"
              :page="page"
              :body="2"
            />
            <div v-html="splitBody().secondPart" class="article_body"></div>
            <!--Mobile Underlay - Zone 2-->
            <div id="gax-inpage-async-1706848793"></div>
          </div>

          <div id="part-3">
            <AdsBody
              :ads="thirdParagraphAds"
              id="paragraph-3"
              :page="page"
              :body="3"
            />
            <div v-html="splitBody().thirdPart" class="article_body"></div>
          </div>

          <div id="the-rest">
            <div v-html="splitBody().theRest" class="article_body"></div>
          </div>
        </div>
      </div>
      <div v-if="article.telegram_embed" v-html="article.telegram_embed"></div>
      <!--Damrei - MR1 Desktop-->
      <div id="gax-inpage-async-1709623758" class="flex justify-center"></div>
      <ArticlesAuthor :user="article.user_created" />
    </div>
    <div class="col-span-2"></div>
  </div>

  <BackToTopButton />
</template>

<script setup lang="ts">
import { IAd } from '~~/types/ad';
import { IArticle } from '~~/types/article';
const { $handleAdSeen } = useNuxtApp();

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

const splitBody = () => {
  const bodyParts = props.article.body.split('\n');
  return {
    firstPart: bodyParts[0],
    secondPart: bodyParts[1] ? bodyParts[1] + '' : '\n',
    thirdPart: bodyParts[2] ? bodyParts[2] + '' : '\n',
    theRest: bodyParts.length > 3 ? bodyParts.slice(3).join('') : '\n',
  };
};

// here where i toggle impression on ads seen
onMounted(() => {
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
      observer.observe(
        document.getElementById('side_ads_' + index + '_' + props.page)!
      );
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

.article_body ul li {
  line-height: 180%;
}
</style>
