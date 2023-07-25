<template>
  <div>
    <IndexHeroSection :hero-articles="heroArticles"/>
  </div>
</template>

<script setup lang="ts">
import { IResponse } from 'types/api';
import { IArticle } from 'types/article';

  const heroArticles: IArticle[] = (
  await (<Promise<IResponse<IArticle[]>>>(
    useApi(
      "/items/articles?limit=3&sort%5B%5D=-date_created&fields=date_created,title,views,slug,thumbnail,body,user_created.first_name,user_created.last_name,%20user_created.avatar,%20user_created.id%20,category.name,category.slug&filter%5Bstatus%5D=published",
      { method: "GET" }
    )
  ))
).data;
</script>

<style scoped></style>
