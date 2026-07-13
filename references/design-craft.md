# Design craft — principles observed across shipped courses

Read this when you're inventing a course's visual system (SKILL.md step 4–5). These are **questions and observations from courses that shipped, not defaults to reproduce**. Use only what helps the current concept. Nothing here belongs in the validator, and none of the examples, numbers, or compositions below is a requirement.

## Color: assign meaning, then stay loyal to it

The strongest shipped courses give every hue a *semantic job* and never reassign it:

- buoyancy: coral = gravity, cyan = displaced water / buoyancy, gray = iron. When the buoyancy arrow finally matches the gravity arrow's length, the color system has been quietly teaching the whole time.
- pythagorean-theorem: terracotta = the four triangles (the props), jade = the hole (the theorem itself). The reader tracks the proof by tracking the jade.

Ask of every color: what does it mean, and does that meaning stay stable? A restrained palette often makes the mechanism easier to track, but a richer palette can be right when the concept genuinely has more categories. If the mapping is not obvious, make it visible rather than relying on decoration to explain itself.

## Typography: make the hierarchy legible

Typography should make the explanation's hierarchy effortless to scan. A display/text pairing is one useful option; a deliberate single-family or system-font treatment can work just as well. For Chinese, Noto Serif SC + Noto Sans SC and ZCOOL KuaiLe are examples that have worked, not prescribed choices. Judge body size, line height, and measure in the actual language and viewport instead of inheriting fixed values.

## The stage: reserve space, never let text move the picture

The sticky stage is the heart of a scroll-driven course, and its most common defect is layout shift: a caption two lines longer than the last one shoves the canvas upward mid-animation.

- If changing caption height moves the visual, reserve enough space or choose a stage layout where text reflow cannot displace the mechanism (`snippets/stage-captions.js` shows one option).
- A two-tier caption can separate the *what* from the *why/number*; a single caption or direct labels may be clearer for another concept. Any transition should disappear under reduced motion.
- Constrain the stage against both viewport width and height so the visual, captions, and controls fit together, including short landscape screens.
- Give the reader some sense of how far through a long scroll sequence they are — a "step X of Y" line, a phase-chip rail, a progress bar, whatever fits the page. Without one, a reader who jumps in mid-scroll (or drags the scrollbar) has no idea whether they're near the start or the end. Drive it off the same stage index that drives the caption, so the two can never disagree.

## Annotation: every number on the canvas earns its place

- Any quantity drawn to scale must be *literally* to scale, from your verified constants — and say so ("arrow length ∝ force"). An arrow that merely looks longer is a lie the validator can't catch.
- Label magnitudes at the moment they matter ("浮力 127 克" as the block sinks), not all at once.
- A secondary "ledger" visualization pays off: buoyancy's measuring cup tracks displaced water beside the main tank, so the reader watches the *number* race the redline while the *picture* shows why. If your idea has one running quantity, consider giving it its own small instrument.

## Motion: it carries meaning or it goes

Knife cuts, slides, fills, sweeps — motion in shipped courses is always the mechanism itself, never garnish. Idle hero animations are gated by IntersectionObserver (pause offscreen) and every animated element has a meaningful static frame for reduced-motion. If you can't say what a movement *teaches*, cut it.

## Composition questions worth asking

- Does the first viewport reveal the actual phenomenon or question, rather than merely describing the course? A side-by-side statement and preview is one option, not the default.
- After the aha, what does this learner need in order to retain or transfer the idea: a compact recap, a concrete substitution, a new example, a chance to manipulate it, or simply a strong final state? Choose the smallest useful landing.
- Mobile at 360px is a hard requirement (SPEC) — but check 720px-tall desktop windows too; sticky stages overflow there first.

## Failure modes actually observed

- Two courses independently grew the same "dark band + circled ×" misconception section — that's what copying example composition looks like. Study *why* the examples work; invent your own *how*.
- Bars computed correctly but rendered 0×0 (a `<span>` given `width` but no `display:block`). Rendered geometry is design too: look at it.
- Captions without reserved height, jittering the canvas on every stage change.
- A hue used for two unrelated meanings in the same course.
