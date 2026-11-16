import { initChrome as f } from './chrome.js';
import { initCounters as r } from './counters.js';
import { initFX as e } from './fx.js';
import { initLightbox as t } from './lightbox.js';
import { initMotion as i } from './motion.js';
import { initNav as m } from './nav.js';
import { initSearch as s } from './search.js';
import { initTheme as o } from './theme.js';
document.documentElement.classList.add('js');
const c = [o, m, r, t, s, e, i, f];
for (const o of c)
    try {
        o();
    } catch (o) {
        console.error('[museum] module failed to init:', o);
    }

// PWA: register the service worker so the museum can be installed as an app.
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
}
