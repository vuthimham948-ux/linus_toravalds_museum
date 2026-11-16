import { CONFIG as e } from './config.js';
export function initTheme() {
    const t = document.getElementById('theme-toggle');
    t &&
        (document.documentElement.classList.contains('theme-light') && (t.checked = !0),
        t.addEventListener('change', () => {
            const c = t.checked;
            document.documentElement.classList.toggle('theme-light', c);
            try {
                localStorage.setItem(e.storageKeys.theme, c ? 'light' : 'dark');
            } catch {}
        }));
}
