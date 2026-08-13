<template>
  <div class="msa-popup-wrapper" :class="{ 'msa-visible': isVisible }">
    <!-- Background overlay -->
    <div class="msa-popup-overlay" @click="closePopup"></div>

    <div class="msa-popup-container" :class="isDesktop ? 'msa-popup-desktop' : 'msa-popup-mobile'">
      <div class="msa-ad-slot" ref="adSlot">
        <!-- Mobile popup (zone 70) -->
        <ins v-if="!isDesktop"
          data-revive-zoneid="70"
          data-revive-id="787804e582d413f05180b1bcf7b4d832"
        ></ins>
        <!-- Desktop popup (zone 78) -->
        <ins v-else
          data-revive-zoneid="78"
          data-revive-id="787804e582d413f05180b1bcf7b4d832"
        ></ins>
      </div>

      <div class="msa-close-bar" v-if="isVisible">
        <span class="msa-close-timer" v-if="timer > 0">
          បិទដោយខ្លួនឯងនៅ {{ timer }}
        </span>
        <button class="msa-close-btn" @click="closePopup">
          បិទឥឡូវនេះ
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

const isVisible = ref(false);
const timer = ref(5);
const isDesktop = ref(false);
const adSlot = ref<HTMLElement | null>(null);
const popupClosed = ref(false);
let observer: MutationObserver | null = null;
let countdownId: any = null;

const closePopup = () => {
  if (popupClosed.value) return;
  popupClosed.value = true;
  isVisible.value = false;
  if (countdownId) clearInterval(countdownId);
};

const startCountdown = () => {
  countdownId = setInterval(() => {
    if (timer.value <= 0) {
      closePopup();
    } else {
      timer.value--;
    }
  }, 1000);
};

const checkCreative = () => {
  if (!adSlot.value) return false;
  // If ad server returns an iframe
  if (adSlot.value.querySelector('iframe, img, video, object, embed')) {
    return true;
  }
  // If ad server fills the ins tag with raw HTML
  const ins = adSlot.value.querySelector('ins');
  return ins && ins.innerHTML && ins.innerHTML.trim().length > 0;
};

const loadReviveScript = () => {
  if (document.querySelector('script[src*="sknteam.com/www/delivery/asyncjs.php"]')) {
    // Already loaded, just tell it to scan the new tags
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
  isDesktop.value = window.innerWidth >= 1024;
  
  nextTick(() => {
    loadReviveScript();

    if (adSlot.value) {
      observer = new MutationObserver(() => {
        if (checkCreative() && !popupClosed.value) {
          // Ad has loaded! Show the popup.
          isVisible.value = true;
          startCountdown();
          if (observer) {
            observer.disconnect();
            observer = null;
          }
        }
      });
      observer.observe(adSlot.value, { childList: true, subtree: true, attributes: true });
      
      // Safety timeout: if ad doesn't load in 5 seconds, stop observing
      setTimeout(() => {
        if (observer) {
          observer.disconnect();
          observer = null;
        }
      }, 5000);
    }
  });
});
</script>

<style scoped>
.msa-popup-wrapper {
  position: fixed;
  inset: 0;
  z-index: 9999999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.msa-popup-wrapper.msa-visible {
  opacity: 1;
  pointer-events: auto;
}

.msa-popup-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
}

.msa-popup-container {
  position: relative;
  z-index: 10;
  border-radius: 0.75rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-width: 90vw;
  max-height: 90vh;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.msa-popup-mobile {
  width: auto;
}

.msa-popup-desktop {
  width: min(900px, 90vw);
}

.msa-ad-slot {
  line-height: 0;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
}

.msa-ad-slot :deep(iframe) {
  max-width: 100%;
  display: block;
}

.msa-close-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  background: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0 0 0.75rem 0.75rem;
}

.msa-close-timer {
  font-size: 0.875rem;
  color: #333;
}

.msa-close-btn {
  background: #e53e3e;
  color: #fff;
  border: none;
  padding: 0.35rem 1.25rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.msa-close-btn:hover {
  background: #c53030;
}
</style>

