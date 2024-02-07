<template>
  <div>
    <div>
      <IndexHeroSection :hero-articles="heroArticles" />
    </div>

    <div class="px-4 lg:px-8">
      <div class="mt-8 pb-4">
        <IndexCategoryArticles
          :articles="popularArticles"
          title="អត្ថបទពេញនិយមប្រចាំខែ"
          seeMoreLink="/popular"
        />
      </div>
      <div class="mt-8 pb-4">
        <IndexCategoryArticles
          :articles="newestArticles"
          title="អត្ថបទថ្មីៗ"
          seeMoreLink="/articles"
        />
      </div>
      <div class="mt-8 pb-4">
        <IndexCategoryArticles
          v-for="(c, n) in categoriesNews"
          :key="n"
          :articles="c.articles"
          :title="c.name"
          :name="c.slug"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IResponse } from 'types/api';
import { IArticle } from 'types/article';
import { ICategory } from 'types/category';


// to be used in monthly article
const now = new Date();
const firstday = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

const heroArticles: IArticle[] = (
  await (<Promise<IResponse<IArticle[]>>>(
    useApi(
      '/items/articles?filter[status]=published&limit=5&sort=-date_created&fields=title, date_created,slug, thumbnail,category.name, user_created.first_name, user_created.last_name, user_created.avatar,views,body',
      { method: 'GET' }
    )
  ))
).data;

const popularArticles: IArticle[] = (
  await (<Promise<IResponse<IArticle[]>>>(
    useApi(
      `/items/articles?filter[date_created][_between]=${firstday}, ${now.toISOString()}&sort[]=-views&limit=5&fields=title, date_created,slug, thumbnail,body,category.name, user_created.first_name, user_created.last_name, user_created.avatar,views,slug`,
      { method: 'GET' }
    )
  ))
).data;

const newestArticles: IArticle[] = (
  await (<Promise<IResponse<IArticle[]>>>(
    useApi(
      '/items/articles?filter[status]=published&limit=5&sort=-date_created&fields=title, date_created,slug, thumbnail,body ,category.name, user_created.first_name, user_created.last_name, user_created.avatar,views',
      { method: 'GET' }
    )
  ))
).data;

const categoriesNews: ICategory[] = (
  await (<Promise<IResponse<ICategory[]>>>(
    useApi(
      '/items/categories?filter[slug][_neq]=pr&filter[status]=published&fields=name, description, thumbnail, slug, articles.title, articles.body, articles.views,articles.thumbnail, articles.user_created.first_name, articles.user_created.last_name,articles.user_created.last_name, articles.date_created, articles.slug, articles.user_created.avatar,articles.category.name&deep[articles][_limit]=5&deep[articles][_sort]=-date_created&deep[articles][_filter][status]=published',
      { method: 'GET' }
    )
  ))
).data;
</script>

<style scoped></style>
