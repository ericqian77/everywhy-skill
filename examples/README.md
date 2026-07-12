# Examples — what to study in each

Every pair here is a real, fully-reviewed course that shipped on everywhy.ai (independently re-derived math/physics, rendering-verified). They demonstrate the **range** of valid quality, not layouts to reuse — if your course visually resembles one of these, that's a failure signal (see `../references/design-craft.md`). Study each for the craft it demonstrates:

| Example | Driving mode | Study it for |
|---|---|---|
| `buoyancy` (zh) | scroll-driven physics | The derivation-comment discipline (density → volume → draft → max load, all re-checkable in one comment block); a secondary "ledger" visualization (the measuring cup racing the redline); semantic color (coral = gravity, cyan = buoyancy); a finale that echoes the hero at ship scale. |
| `pythagorean-theorem` + `-en` (bilingual pair) | scroll-driven geometric proof | Shoelace-verified vertex coordinates in comments; color as meaning (terracotta props vs jade theorem); a slide-only rearrangement chosen because it's fully verifiable; careful historical claims. Run `validate-variants.js` on this pair to see group checks pass. |
| `equivalent-fractions` + `-en` (bilingual pair) | scroll + interactive lab | A misconception section used *because a real misconception exists* ("bigger denominator = bigger fraction") — the judgment call, made correctly; a ×k subdivision lab where interacting changes understanding; `aria-live` captions. Came through the public submission channel. |
| `moon-phases` (zh) | scroll-driven astronomy | Phase-chip navigation rail; the illuminated-fraction formula (1+cosθ)/2 verified in comments; refuting a genuinely widespread wrong model (Earth's shadow). |
| `light-refraction` (zh) | scroll-driven optics | Decomposing an everyday illusion ("seeing" split into three pieces); Snell's-law-driven ray geometry. |
| `circle-area-proof` (en) | direct manipulation | A slider (slice count n) as the main teaching instrument; the reader performs the limit themselves. |
| `tau-sweep` (en) | **time-driven** | Continuous sweep animation on a dark ground — the one mode the others don't use; a live readout chip tied to the animation clock; IntersectionObserver-gated loops. |

Note: these files were extracted from the main site, so they carry `../favicon.svg`-style relative references — the validator warns about them, which is correct (they don't resolve standalone). New courses built from `../templates/lesson-shell.html` use absolute URLs and won't have this.
