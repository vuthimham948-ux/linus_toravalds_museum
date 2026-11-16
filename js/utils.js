import { CONFIG as e } from './config.js';
export const motionOK = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () => window.matchMedia('(pointer: fine)').matches;
export const narrowScreen = () => window.matchMedia(e.breakpoints.narrow).matches;
export const clamp = (e, t, n) => Math.min(Math.max(e, t), n);
export function debounce(e, t) {
    let n = null;
    return (...o) => {
        (clearTimeout(n), (n = setTimeout(() => e(...o), t)));
    };
}
export function onFirstVisible(e, t, { threshold: n = 0.2 } = {}) {
    if (!('IntersectionObserver' in window)) return void t(e);
    const o = new IntersectionObserver(
        (e) => {
            e[0].isIntersecting && (o.disconnect(), t(e[0].target));
        },
        { threshold: n }
    );
    o.observe(e);
}
