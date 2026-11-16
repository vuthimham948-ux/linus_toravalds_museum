# The Linus Torvalds Museum

An unofficial, fan-made interactive museum about Linus Torvalds — the hobby
that became Linux, the tool that became Git, and the personality behind both.
Pure HTML + CSS + vanilla JavaScript ES modules. No framework, no build step.

> Not affiliated with Linus Torvalds, the Linux Foundation, or any project
> mentioned. All photography is from Wikimedia Commons (see credits in the
> page footer); interviews are embedded from YouTube.

## Run it

```bash
cd "HTML &CSS/projects/porfolio_html_css"
python3 -m http.server 8000
# open http://localhost:8000
```

Any static file server works. ES modules require `http://` — opening
`index.html` directly via `file://` will not load the JavaScript.

## Architecture — how to read this project

### CSS cascade (`css/`, loaded in numeric order)

| File | Owns |
|---|---|
| `00-reset.css` | Modern reset, `prefers-reduced-motion` base |
| `01-tokens.css` | Design tokens: colors, fonts, spacing, light/dark themes |
| `02-base.css` | Element defaults, grid background, focus styles |
| `03-layout.css` | Containers, grids, `.reveal` scroll animation |
| `04-components.css` | Header, nav, buttons, cards, terminal, tabs, FAQ |
| `05-sections.css` | Section layouts (hero, about, timeline, work, quotes) |
| `06-animations.css` | Keyframes, hero entrance, terminal lines, scroll progress |
| `07-responsive.css` | Breakpoints 1080px → 420px |
| `08-print.css` | Print stylesheet |
| `09-museum.css` | Museum exhibits: visit cards, gallery, awards, daily life, contributor path, screening room |
| `10-effects.css` | The effects layer: spotlight, tilt, ripples, ticker, scroll-spy dots, FAB, shine sweep, directional reveals, gallery mask-wipe, CRT scanlines |

### JavaScript modules (`js/`, ES modules — `main.js` is the entry point)

```
main.js       wires every init*() together; one try/catch per module
config.js     SINGLE SOURCE OF TRUTH: storage keys, breakpoints, timings,
              section list for scroll-spy. Change values here, not in features.
utils.js      shared helpers: motionOK, finePointer, narrowScreen, clamp,
              debounce, onFirstVisible (IntersectionObserver once-helper)
motion.js     ANIMATION TOOLKIT — declarative presets via data attributes:
                <div data-animate="fadeUp">          fade + rise
                <div data-animate="popIn">           scale-in
                <div data-animate="slideLeft">       from right
                <div data-animate="slideRight">      from left
                <div data-animate="fadeIn" data-animate-delay="120">
              Presets: fadeUp, fadeIn, popIn, slideLeft, slideRight.
              Powered by the Web Animations API; runs once on first view.
theme.js      light/dark persistence (localStorage, mirrors the CSS-only
              :has(#theme-toggle:checked) switch)
nav.js        mobile menu behaviour
counters.js   animated stat counters (IntersectionObserver + rAF)
lightbox.js   gallery photo viewer (focus trap, Esc, backdrop)
search.js     archive search over [data-exhibit] + "/" and "t" shortcuts
fx.js         cursor spotlight, 3D tilt, magnetic buttons, ripples,
              hero parallax, letter stagger, staggered reveals
chrome.js     scroll-spy floor-guide dots + back-to-top FAB
```

### The `data-*` contract (how HTML talks to JS)

| Attribute | Used by | Effect |
|---|---|---|
| `data-exhibit` | search.js | element is filterable by archive search |
| `data-search="keywords"` | search.js | extra keywords for the filter |
| `data-count="40000000"` | counters.js | animate this number into view |
| `data-lightbox` | lightbox.js | click opens the photo viewer |
| `data-animate="preset"` | motion.js | one-shot entrance animation |
| `data-animate-delay="ms"` | motion.js | stagger delay |

### CSS-only features (work with JavaScript disabled)

- Light/dark theme (`#theme-toggle` checkbox + `:has()`)
- Project tabs (radio inputs + sibling selectors)
- Mobile nav (`#nav-toggle` checkbox)
- FAQ accordion (`<details>`/`<summary>`)
- Scroll reveals (scroll-driven `animation-timeline: view()`)

### Conventions for scaling up

- **New section?** Add `<section class="section" id="…">`, a nav link, a
  `CONFIG.sections` entry (dots appear automatically), and exhibit cards with
  `data-exhibit` so search covers them.
- **New animation?** Prefer `data-animate` presets; add a preset in
  `motion.js → PRESETS` or a scroll-driven rule in `10-effects.css`.
- **New timing/selector?** Put it in `CONFIG` (`js/config.js`).
- **New feature?** New `js/<feature>.js` exporting `init<Feature>()`, then
  add it to the `modules` array in `main.js`.
- **Perf rules:** transform/opacity only for motion; passive listeners;
  `content-visibility: auto` on `.section`; guard hover FX with
  `(pointer: fine)`; everything respects `prefers-reduced-motion`.
