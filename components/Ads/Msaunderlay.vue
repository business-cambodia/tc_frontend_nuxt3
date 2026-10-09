<template>
  <!-- Revive Adserver Asynchronous JS Tag - Generated with Revive Adserver v6.0.5 -->
  <!-- Mobile underlay script - Sting (TC Zone 117) -->
  <div class="msa-underlay-slot">
    <ins
      data-revive-zoneid="117"
      data-revive-id="787804e582d413f05180b1bcf7b4d832"
    ></ins>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from 'vue';

const loadReviveScript = () => {
  if (document.querySelector('script[src*="sknteam.com/www/delivery/asyncjs.php"]')) {
    const w = window as any;
    w.reviveAsync = w.reviveAsync || [];
    w.reviveAsync.push({});
    return;
  }
  const script = document.createElement('script');
  script.src = '//sknteam.com/www/delivery/asyncjs.php';
  script.async = true;
  document.head.appendChild(script);
};

onMounted(() => {
  nextTick(() => {
    loadReviveScript();
  });
});
</script>

<style scoped>
.msa-underlay-slot {
  line-height: 0;
}
</style>
