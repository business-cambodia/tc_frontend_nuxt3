<template>
    <!-- <LayoutsNavbarWhite /> -->
   
    <div class="pt-28 lg:pt-24" id="article_detail">
      <!-- {{ ads }} -->
        <div v-for="(article, index) in articles" :key="index">
            <ArticlesContent 
                :aboveArticleAds="aboveArticleAds"
                :article="article"
                id="content"
                :firstParagraphAds="firstParagraphAds"
                :secondParagraphAds="secondParagraphAds"
                :thirdParagraphAds="thirdParagraphAds"
                :sideBarAds="sideBarAds"
                :underTitleAds="underTitleAds"
                :showElements="showElements"
                :page="index"/>
        </div> 
        <AdsBottom :ad="bottomAd" />
    </div>
</template>

<script setup lang="ts">
import { IAd } from "~~/types/ad";
import { IResponse } from "~~/types/api";
import { IArticle } from "~~/types/article";
const route = useRoute();
let currentPage = 0;
let requesting = false;

const ads: IAd[] = (
  await (<Promise<IResponse<IAd[]>>>(
    useApi(
      "items/advertisement?fields=name, slug,id , file,link,mobile_only, file_mobile,advertisement_type.type, advertiser.slug, detail_page&filter[status]=published&filter[detail_page]=true&sort[]=-order",
      { method: "GET" }
    )
  ))
).data;
const articles = ref(
  (
    await (<Promise<IResponse<IArticle[]>>>(
      useApi(
        `/items/articles?filter[status]=published&filter[slug][_eq]=${route.params._article}&fields=title,id,keywords,body,slug,thumbnail, thumbnail_facebook,date_created,views,category.name,category.slug,user_created.first_name,user_created.last_name,user_created.email ,user_created.avatar, user_created.description, user_created.id, user_created.facebook_link, user_created.youtube_link,user_created.instagram_link,user_created.count(articles)`,
        { method: "GET" }
      )
    ))
  ).data 
);
let thumbnail = articles.value[0].thumbnail
  ? articles.value[0].thumbnail_facebook
  : articles.value[0].thumbnail;
useHead({
  script: [
    {
      type: "text/javascript",
      src: "https://platform.twitter.com/widgets.js",
      async: true,
    },
    {
      src: "//ads1.damrei.digital/www/delivery/asyncjs.php",
      async: true,
      defer: true,
    },
    {
      src: "//ads.health.com.kh/www/delivery/asyncjs.php",
      async: true,
      defer: true,
    },
    {
      src: "//gamma.cachefly.net/js/gaxpt.min.js",
      async: true,
    },
    {
      type: "text/javascript",
      innerHTML: `
        var gammatag = gammatag || {};
        gammatag.cmd = gammatag.cmd || [];
        `,
    },
    {
      innerHTML: `
      gammatag.cmd.push(function() {
      //MR1
      gammatag.defineZone({code:"gax-inpage-async-1700708881",size:[300,250],params:{siteId:"1700707025",zoneId:"1700708881",zoneType:"Inpage"}});
      //Mobile Underlay
      gammatag.defineZone({code:"gax-inpage-async-1706848424",size:[640,1386],params:{siteId:"1700707025",zoneId:"1706848424",zoneType:"Inpage"}});
      //Mobile Underlay
      gammatag.defineZone({code:"gax-inpage-async-1700708647",size:[640,1386],params:{siteId:"1700707025",zoneId:"1700708647",zoneType:"Inpage"}});
      //Mobile Grow
      gammatag.defineZone({code:"gax-inpage-async-1700708404",size:[640,853],params:{siteId:"1700707025",zoneId:"1700708404",zoneType:"Inpage"}});
      gammatag.sendRequest();
      });
      `
    },
    // {
    //   src: "https://sspendpoint1.damreix.com/?c=res&m=async",
    //   async: true,
    //   defer: true,
    // },

  ], 
  title: articles.value[0].title,
  meta: [
    {
      property: "og:image",
      content: "https://tech-cambodia.com/cms" + "/assets/" + thumbnail,
    },
    // {
    //   hid: "og:image",
    //   name: "og:image",
    //   content: "https://tech-cambodia.com/cms" + "/assets/" + thumbnail,
    // },
    {
      hid: "og:description",
      name: "og:description",
      content: articles.value[0].body,
    },
    {
      hid: "og:title",
      name: "og:title",
      content: articles.value[0].title,
    },
    {
      hid: "description",
      name: "description",
      content: articles.value[0].body,
    },
    {
      hid: "keywords",
      name: "keywords",
      content: articles.value[0].keywords
        ? articles.value[0].keywords
        : "Technology Cambodia, articles",
    },
  ],
});

const showElements: {
  [key: string]: boolean;
  title: boolean;
  author: boolean;
  part_1_container: boolean;
  part_2_container: boolean;
  part_3_container: boolean;
  the_rest_container: boolean;
  article_thumbnail: boolean;
} = {
  title: true,
  author: true,
  part_1_container: true,
  part_2_container: true,
  part_3_container: true,
  the_rest_container: true,
  article_thumbnail: true,
};

const aboveArticleAds: IAd[] = ads.filter((a) => {
  return a.advertisement_type.type == "above-article";
});

const firstParagraphAds = ads.filter((a) => {
  return a.advertisement_type.type == "paragraph-1";
});

const secondParagraphAds = ads.filter((a) => {
  return a.advertisement_type.type == "paragraph-2";
});

const thirdParagraphAds = ads.filter((a) => {
  return a.advertisement_type.type == "paragraph-3";
});

const sideBarAds = ads.filter((a) => {
  return a.advertisement_type.type == "side-bar";
});

const underTitleAds = ads.filter((a) => {
  return a.advertisement_type.type == "under-title";
});

const bottomAd = ads.filter((a) => {
  return a.advertisement_type.type == "bottom";
})[0];

const handleArticleViewed = async (article: IArticle) => {
  const articleId = article.slug;
  await useApi("/articles/views/" + articleId, {
    method: "GET",
  });
};

const handleElementSeen = () => {
  try {
    let observer = new IntersectionObserver(
      async (entries) => {
        if (entries.length) {
          entries.forEach((e) => {
            // console.log(e.target.id, e.isIntersecting);
            if (e.isIntersecting) {
              showElements[e.target.id] = true;
            }
          });
        }
      },
      { threshold: 0 }
    );
    let article_detail = document.getElementById("article_detail");
    let title = document.getElementById("title");
    let author = document.getElementById("author");
    let thumbnail = document.getElementById("article_thumbnail");
    let part2 = document.getElementById("part_2_container");
    let part3 = document.getElementById("part_3_container");
    let theRest = document.getElementById("the_rest_container");
    // use a type assertion (!) to tell TypeScript that the value is not null.
    observer.observe(article_detail!);
    observer.observe(title!);
    observer.observe(author!);
    observer.observe(thumbnail!);
    observer.observe(part2!);
    observer.observe(part3!);
    observer.observe(theRest!);
  } catch (error) {
    // console.log(error);
  }
};



</script>
<style>
/* Custom styles if needed */

</style>