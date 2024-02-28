<template>
    <!-- Damrei pop up ads -->
    <ins data-revive-zoneid="168" data-revive-id="4ff484e57e8020025aee8261064e4569"></ins>
    <AdsAboveArticle :ads="aboveArticleAds" id="type_above-article" type="above-article" :page="page" />


    <div class="flex max-lg:block mb-5">
        <div class="pb-6 pt-2 w-full ">
            <!-- headings like titles and details -->
            <div id="title">
                <div
                    class="flex flex-col justify-center px-4 lg:px-36 text-black dark:text-white my-6 object-cover bg-center bg-no-repeat bg-cover">

                    <div class="text-3xl lg:text-5xl font-bold article-title text-center ">
                        {{ article.title }}
                    </div>
                    <div
                        class="flex items-center justify-center text-xs lg:text-sm font-light text-gray-500 dark:text-white mt-2 ">
                        <NuxtLink :to="'/authors/' + article.user_created.id"
                            class="hover:text-primary hover:text-bold duration-200 ">
                            <span>{{
                                article.user_created.first_name +
                                ' ' +
                                article.user_created.last_name
                            }}</span>
                        </NuxtLink>
                        <span class="mx-2">•</span>
                        <span>
                            {{ $formatDate(article.date_created) }}
                        </span>
                        <span class="mx-2">•</span>
                        <span class="font-bold">
                            {{ $kFormatter(article.views) }} views
                        </span>
                        <span class="mx-2">•</span>
                        <span>
                            {{ article.category.name }}
                        </span>
                        <span class="mx-2">•</span>
                        <span class="bg-primary rounded-lg p-1 text-white">
                            {{ $calculateReadTime(article.body) }}
                        </span>
                    </div>
                </div>
            </div>
            <!-- body -->
            <div class="grid grid-cols-1 lg:grid-cols-left_expand gap-x-6 mt-4 px-6 lg:px-36 text-xl font-light text-black dark:text-white"
                id="article-body">
                <!-- content -->
                <div>
                    <AdsUnderTitle type="under-title" id="type_under-title" :ads="underTitleAds" :page="page" />
                    <div id="article_thumbnail">
                        <img :src="useImg(article.thumbnail)" alt="" srcset="" v-if="showElements.article_thumbnail" />
                    </div>
                    <div class="body_content pt-2">
                        <div id="part_1_container">
                            <div v-html="splitBody().firstPart" class="article_body" id="part-1"></div>
                            <AdsBody :ads="firstParagraphAds" :type="'paragraph-1'" :page="page" :body="1"
                                id="type_paragraph-1" />
                            <span id="innity-in-post"></span>
                            <!-- <BodyAd :ads="firstParagraphAds" id="paragraph-1" /> -->
                            <span id="innity-in-post"></span>
                        </div>

                        <!--Damrei - Mobile Grow-->
                        <div id="gax-inpage-async-1700708404"></div>
                        <!-- ads line 54-69 -->
                        <div>
                            <!-- Revive Adserver Interstitial or Floating DHTML Tag - Generated with Revive Adserver v5.4.1 -->
                            <!-- Revive Adserver Asynchronous JS Tag - Generated with Revive Adserver v5.4.1 -->
                            <ins data-revive-zoneid="5" data-revive-id="be324e6560a50470e76f3c9d22c2ea27"></ins>
                        </div>
                        <!-- Damrei Digital - MR1 2023 -->
                        <!-- Damrei Digital - MR1 2023 -->
                        <!-- Damrei Digital - MR-1 2023 -->
                        <ins data-revive-zoneid="71" data-revive-id="4ff484e57e8020025aee8261064e4569"></ins>
                        <div id="part_2_container">
                            <!--Damrei - Mobile Underlay-->
                            <div id="gax-inpage-async-1706848424"></div>
                            <div v-html="splitBody().secondPart" class="article_body" id="part-2"
                                v-if="showElements.part_2_container"></div>

                            <AdsBody v-if="secondParagraphAds" :ads="secondParagraphAds" :type="'paragraph-2'" :page="page"
                                :body="2" id="type_paragraph-2" />
                        </div>
                        <div id="part_3_container">
                            <div v-html="splitBody().thirdPart" class="article_body" id="part-3"
                                v-if="showElements.part_3_container"></div>

                            <AdsBody :ads="thirdParagraphAds" :type="'paragraph-3'" :page="page" :body="3"
                                id="type_paragraph-3" />
                            <div id="domrei-ads">
                                <!-- Damrei Digital - Mobile Underlay 2023 -->
                                <ins data-revive-zoneid="74" data-revive-id="4ff484e57e8020025aee8261064e4569"></ins>
                            </div>
                            <!--Damrei - Mobile Underlay-->
                            <div id="gax-inpage-async-1700708647"></div>
                        </div>
                        <div class="pb-10" id="the_rest_container">
                            <div v-html="splitBody().theRest" class="article_body" id="the-rest"
                                v-if="showElements.the_rest_container"></div>
                        </div>
                    </div>
                    <!--Damrei - MR1-->
                    <div id="gax-inpage-async-1700708881"></div>
                    <div id="author">
                        <NuxtLink :to="'/authors/' + article.user_created.id">
                            <ArticlesAuthor :user="article.user_created" v-if="showElements.author" />
                        </NuxtLink>
                    </div>
                </div>
                <!-- ads -->
                <div>
                    <AdsSide id="type_side-bar" :ads="sideBarAds" :page="page" />
                </div>
            </div>
        </div>
        <div class=" px-1 bg-white dark:bg-gray-900 shadow-md lg:w-1/4 sm:w-full  h-screen overflow-y-auto sticky top-[0%]">
            <div
                class="flex flex-col mt-5 h-20 justify-center px-1  text-primary dark:text-white text-2xl font-bold bg-white sticky top-[0%] z-10 dark:rounded-xl ">
                <span class="dark:text-black">អត្ថបទពេញនិយម</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 justify-center gap-x-4 gap-y-8 mt-8 lg:px-1"
                v-if="articles != undefined && articles.length > 0">
                <div v-for="(a, n) in articles" :key="n" class="flex justify-center">
                    <ReusablesArticleCard :article="a" />
                </div>
            </div>
        </div>
    </div>
    <BackToTopButton />
</template>
  
<script setup lang="ts">
import { IAd } from '~~/types/ad';
import { IArticle } from '~~/types/article';
import { IResponse } from "~~/types/api";
import { IAuthor } from "~~/types/author";
    
const now = new Date();
const firstday = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
const { $handleAdSeen } = useNuxtApp();

const articles = ref(
    (
        await (<Promise<IResponse<IArticle[]>>>(
            useApi(
                `/items/articles?filter[date_created][_between]=${firstday}, ${now.toISOString()}&sort[]=-views&limit=10&fields=title, date_created,slug, thumbnail,body,category.name, user_created.first_name, user_created.last_name, user_created.avatar,views,slug`,
                { method: "GET" }
            )
        ))
    ).data
);

const props = defineProps<{
    aboveArticleAds: Array<IAd>;
    article: IArticle;
    firstParagraphAds: Array<IAd>;
    secondParagraphAds: Array<IAd>;
    thirdParagraphAds: Array<IAd>;
    sideBarAds: Array<IAd>;
    underTitleAds: Array<IAd>;
    showElements: any;
    page: number;
}>();

const splitBody = () => {
    const bodyParts = props.article.body.split('\n');

    return {
        firstPart: bodyParts[0],
        secondPart: bodyParts[1] ? bodyParts[1] + '\n' : '\n',
        thirdPart: bodyParts[2] ? bodyParts[2] : '\n',
        theRest: bodyParts.length > 3 ? bodyParts.slice(3).join('') : '\n',
    };
};

// here where i toggle impression on ads seen
onMounted(() => {
    var adUnits = [
        {
            code: 'block_23',
            placement_id: 23,
            sizes: [640, 1386],
        },
    ];
    if (typeof DAMREIX !== 'undefined') {
        DAMREIX.buildUnits(adUnits);
    } else {
        console.warn('DAMREIX library not loaded.');
    }
    // add damrei script on new article loaded
    const scpt = document.createElement('script');
    scpt.async = true;
    scpt.src = '//gamma.cachefly.net/js/gaxpt.min.js';
    document.body.appendChild(scpt);
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
        props.underTitleAds.forEach((a, index) => {
            observer.observe(
                document.getElementById('under_article_' + index + '_' + props.page)!
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

p,
.article_body {
    word-wrap: break-word;
    hyphens: auto;
    max-width: 100%;
}

.article-title {
    line-height: 1.5;
}

.body_content {
    white-space: pre-wrap;
}

.article_body a {
    text-decoration: underline;
    color: #ed1c24;
}

.article_body {
    line-height: 2;
    display: inline-block;
}

.article_body ul {
    list-style: disc;
}

.article_body ol {
    list-style: decimal;
}

.article_body h1 {
    font-weight: bold;
}
</style>