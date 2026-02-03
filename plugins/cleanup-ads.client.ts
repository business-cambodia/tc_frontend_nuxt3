// Plugin to cleanup GPAS/Revive underlay ads on route navigation
// TEMPORARILY DISABLED - Testing if cleanup is causing underlay issues
export default defineNuxtPlugin((nuxtApp) => {
    const cleanupGpasAds = () => {
        // DISABLED: Do nothing - let GPAS ads persist
        // The underlay works by injecting background styles on body
        // Any cleanup here was preventing the underlay from displaying
        console.log('[GPAS Debug] Cleanup disabled - ads should persist');
    };

    // Provide cleanup function globally (but it does nothing now)
    return {
        provide: {
            cleanupGpasAds
        }
    };
});
