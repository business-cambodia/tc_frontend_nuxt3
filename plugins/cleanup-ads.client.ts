// Plugin to cleanup GPAS/Revive underlay ads on route navigation
export default defineNuxtPlugin((nuxtApp) => {
    const cleanupGpasAds = () => {
        if (typeof document === 'undefined') return;

        // Remove all Revive Adserver related elements that are outside main content
        const selectors = [
            // Revive specific
            '[id^="revive"]',
            '[class*="revive"]',
            '[id*="rv_"]',
            '[class*="rv_"]',
            'div[id^="ox_"]',
            'div[id^="oad_"]',
            // Underlay specific
            '.bodybg',
            '.revive-0-bodybg',
            '.revive-0-bg',
            // GPAS specific
            '[id*="gpas"]',
            '[class*="gpas"]',
        ];

        selectors.forEach((selector) => {
            try {
                document.querySelectorAll(selector).forEach((el) => {
                    // Only remove if it's a direct child of body (underlay/overlay)
                    if (el.parentElement === document.body || el.parentElement === document.documentElement) {
                        el.remove();
                    }
                });
            } catch (e) {
                // Ignore selector errors
            }
        });

        // Remove any iframes from ad servers that are direct children of body
        document.querySelectorAll('body > iframe, html > iframe').forEach((iframe) => {
            const src = (iframe as HTMLIFrameElement).src || '';
            if (src.includes('adservermsa.gpas.co') || src.includes('revive') || src.includes('delivery')) {
                iframe.remove();
            }
        });

        // Remove fixed/absolute positioned overlay divs that are direct children of body
        document.querySelectorAll('body > div').forEach((el) => {
            const style = window.getComputedStyle(el);
            const position = style.position;
            const zIndex = parseInt(style.zIndex) || 0;

            // High z-index fixed/absolute positioned elements are likely ad overlays
            if ((position === 'fixed' || position === 'absolute') && zIndex > 1000) {
                // Check if it contains ad-related content
                const innerHTML = el.innerHTML.toLowerCase();
                const id = el.id.toLowerCase();
                const className = (typeof el.className === 'string' ? el.className : '').toLowerCase();

                if (
                    innerHTML.includes('revive') ||
                    innerHTML.includes('gpas') ||
                    innerHTML.includes('angkor') ||
                    id.includes('revive') ||
                    id.includes('gpas') ||
                    className.includes('revive') ||
                    className.includes('gpas') ||
                    el.querySelector('iframe[src*="adserver"]') ||
                    el.querySelector('iframe[src*="delivery"]')
                ) {
                    el.remove();
                }
            }
        });

        // Reset body and html background styles
        document.body.style.backgroundImage = '';
        document.body.style.backgroundColor = '';
        document.body.style.background = '';
        document.documentElement.style.backgroundImage = '';
        document.documentElement.style.backgroundColor = '';
        document.documentElement.style.background = '';

        // Remove any dynamically added style tags for underlay
        document.querySelectorAll('style').forEach((style) => {
            const content = style.textContent?.toLowerCase() || '';
            if (content.includes('revive') || content.includes('bodybg') || content.includes('underlay')) {
                style.remove();
            }
        });
    };

    // Cleanup on route change
    nuxtApp.hook('page:start', () => {
        cleanupGpasAds();
    });

    // Also use router beforeEach
    const router = useRouter();
    router.beforeEach((to, from) => {
        // Only cleanup when navigating AWAY from article pages
        if (from.path.includes('/articles/') || from.path.includes('/article/')) {
            cleanupGpasAds();
            setTimeout(cleanupGpasAds, 50);
            setTimeout(cleanupGpasAds, 200);
            setTimeout(cleanupGpasAds, 500);
        }
    });

    // Provide cleanup function globally
    return {
        provide: {
            cleanupGpasAds
        }
    };
});
