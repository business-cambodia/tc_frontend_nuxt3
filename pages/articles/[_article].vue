<template>
  <!-- <LayoutsNavbarWhite /> -->

  <div class="pt-16 lg:pt-20" id="article_detail">
    <div v-for="(article, index) in articles" :key="index">
      <ArticlesContent
        :aboveArticleAds="aboveArticleAds"
        :article="article"
        id="content"
        :firstParagraphAds="firstParagraphAds"
        :secondParagraphAds="secondParagraphAds"
        :thirdParagraphAds="thirdParagraphAds"
        :sideBarAds="sideBarAds"
        :aboveThumbnailAds="aboveThumbnailAds"
        :showElements="showElements"
        :page="index"
      />
    </div>
    <!--Damrei - Footer-->
    <div id="gax-inpage-async-1700710572"></div>
    <ArticlesNext
      :articles="nextArticles"
      title="បន្តអានអត្ថបទបន្ទាប់"
      to="/latest"
    />
    <!-- <AdsBottom :ad="bottomAd" /> -->
  </div>
</template>

<script setup lang="ts">
import { IAd } from '~~/types/ad';
import { IResponse } from '~~/types/api';
import { IArticle } from '~~/types/article';
const route = useRoute();
let currentPage = 0;
let requesting = false;

const ads: IAd[] = (
  await (<Promise<IResponse<IAd[]>>>(
    useApi(
      '/items/advertisement?fields=name, slug,id , file,link,mobile_only, file_mobile,advertisement_type.type, advertiser.slug, detail_page&filter[status]=published&filter[detail_page]=true&sort[]=-order',
      { method: 'GET' }
    )
  ))
).data;
const articles = ref(
  (
    await (<Promise<IResponse<IArticle[]>>>(
      useApi(
        `/items/articles?filter[status]=published&filter[slug][_eq]=${route.params._article}&fields=title,id,keywords,body,telegram_embed,slug,thumbnail, thumbnail_facebook,date_created,views,category.name,category.slug,user_created.first_name,user_created.last_name,user_created.email ,user_created.avatar,user_created.cover_pic, user_created.description, user_created.id, user_created.facebook_link, user_created.youtube_link,user_created.instagram_link,user_created.count(articles)`,
        { method: 'GET' }
      )
    ))
  ).data
);
const nextArticles = ref(
  (
    await (<Promise<IResponse<IArticle[]>>>(
      useApi(
        `/items/articles?limit=5&sort=-date_created&filter[status]=published&filter[slug][_neq]=${route.params._article}&filter[user_created][email][_eq]=${articles.value[0].user_created.email}&fields=*,category.name,category.slug,user_created.first_name, user_created.last_name, user_created.avatar`,
        { method: 'GET' }
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
      type: 'text/javascript',
      src: 'https://platform.twitter.com/widgets.js',
      async: true,
    },
    {
      src: '//ads1.damrei.digital/www/delivery/asyncjs.php',
      async: true,
      defer: true,
    },
    {
      src: '//ads.health.com.kh/www/delivery/asyncjs.php',
      async: true,
      defer: true,
    },
    {
      src: '//gamma.cachefly.net/js/gaxpt.min.js',
      async: true,
    },
    {
      type: 'text/javascript',
      src: 'https://cdn.innity.net/admanager-async.js',
      async: true,
    },
    {
      type: 'text/javascript',
      src: 'https://www.tiktok.com/embed.js',
      async: true,
    },
    {
      type: 'text/javascript',
      src: 'https://platform.twitter.com/widgets.js',
      async: true,
    },
    {
      type: 'text/javascript',
      innerHTML: `
        var innity_adZoneAsync = innity_adZoneAsync || {}; 
        innity_adZoneAsync.q = innity_adZoneAsync.q || []; 
        `,
    },
    {
      type: 'text/javascript',
      innerHTML: `
        innity_adZoneAsync.q.push(function (){innity_adZoneAsync.display("386854131f58a556343e056f03626e00", "101009", {"target": "div-ad-innity-101009/0"});});
        `,
    },
    {
      type: 'text/javascript',
      innerHTML: `
        innity_adZoneAsync.q.push(function (){innity_adZoneAsync.display("386854131f58a556343e056f03626e00", "101010", {"target": "div-ad-innity-101010/0"});});
        `,
    },
    {
      type: 'text/javascript',
      innerHTML: `
        var gammatag = gammatag || {};
        gammatag.cmd = gammatag.cmd || [];
        `,
    },
    {
      type: 'text/javascript',
      innerHTML: `
      gammatag.cmd.push(function() {
        <!--Mobile Underlay - Zone 1-->
        gammatag.defineZone({code:"gax-inpage-async-1700709319",size:[640,1386],params:{siteId:"1700707438",zoneId:"1700709319",zoneType:"Inpage"}});

        <!--Mobile Underlay - Zone 2-->
        gammatag.defineZone({code:"gax-inpage-async-1706848793",size:[640,1386],params:{siteId:"1700707438",zoneId:"1706848793",zoneType:"Inpage"}});
        
        //MR1 Desktop
        gammatag.defineZone({code:"gax-inpage-async-1709623758",size:[300,250],params:{siteId:"1706775465",zoneId:"1709623758",zoneType:"Inpage"}});

        //Footer
        gammatag.defineZone({code:"gax-inpage-async-1700710572",size:[720,250],params:{siteId:"1700707438",zoneId:"1700710572",zoneType:"Inpage"}});
        
        //Define more zone(s) here, each zone per line, if you have multiple zones on the same page.
        gammatag.sendRequest();
        });
      `,
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
      property: 'og:image',
      content: 'https://tech-cambodia.com/cms' + '/assets/' + thumbnail,
    },
    {
      hid: 'og:description',
      name: 'og:description',
      content: articles.value[0].body,
    },
    {
      hid: 'og:title',
      name: 'og:title',
      content: articles.value[0].title,
    },
    {
      hid: 'description',
      name: 'description',
      content: articles.value[0].body,
    },
    {
      hid: 'keywords',
      name: 'keywords',
      content: articles.value[0].keywords
        ? articles.value[0].keywords
        : 'Technology Cambodia, articles',
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

const aboveArticleAds = ads.filter((a) => {
  return a.advertisement_type.type == 'above-article';
});

const firstParagraphAds = ads.filter((a) => {
  return a.advertisement_type.type == 'paragraph-1';
});

const secondParagraphAds = ads.filter((a) => {
  return a.advertisement_type.type == 'paragraph-2';
});

const thirdParagraphAds = ads.filter((a) => {
  return a.advertisement_type.type == 'paragraph-3';
});

const sideBarAds = ads.filter((a) => {
  return a.advertisement_type.type == 'side-bar';
});

const aboveThumbnailAds = ads.filter((a) => {
  return a.advertisement_type.type == 'above-thumbnail';
});

const bottomAd = ads.filter((a) => {
  return a.advertisement_type.type == 'bottom';
})[0];

onMounted(() => {
  // infinite scroll
  // window.addEventListener("scroll", handleScrollPagination);
  handleArticleViewed(articles.value[0]);
  // handleElementSeen();
});

const handleArticleViewed = async (article: IArticle) => {
  const articleId = article.id;
  await useApi('/items/articles/' + articleId, {
    method: 'PATCH',
    data: {
      views: article.views + 1,
    },
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
    let article_detail = document.getElementById('article_detail');
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let thumbnail = document.getElementById('article_thumbnail');
    let part2 = document.getElementById('part_2_container');
    let part3 = document.getElementById('part_3_container');
    let theRest = document.getElementById('the_rest_container');
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
