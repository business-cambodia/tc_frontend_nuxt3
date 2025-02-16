<template>
  <div>
    <LayoutsNavbar />
    <ClientOnly>
      <AdsPopup :ad="ad[0]" id="popup" :handleClosePopup="handleClosePopup" />
    </ClientOnly>
    <LayoutsBottomBar />
  </div>
</template>

<script setup lang="ts">
import { IAd } from '~~/types/ad';
import { IResponse } from '~~/types/api';

const handleClosePopup = () => {
  const popup = document.getElementById('popup');
  if (popup) {
    popup.remove();
  }
};

const ad: IAd[] = (
  await (<Promise<IResponse<IAd[]>>>(
    useApi(
      '/items/advertisement?filter[advertisement_type][type][_eq]=pop-up&fields=name, id , file,link,advertisement_type.type, advertiser.slug, home_page, detail_page, slug&filter[status]=published&sort=date_created',
      { method: 'GET' }
    )
  ))
).data;
</script>

<style scoped></style>
