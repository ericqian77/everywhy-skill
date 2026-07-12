# Design craft — principles observed across shipped courses

Read this when you're inventing a course's visual system (SKILL.md step 4–5). These are **principles distilled from courses that shipped and taught well, not rules** — every one of them can be broken, but break it on purpose, not by accident. Nothing here is enforced by the validator; this is the difference between a page that validates and a page that feels made.

## Color: assign meaning, then stay loyal to it

The strongest shipped courses give every hue a *semantic job* and never reassign it:

- buoyancy: coral = gravity, cyan = displaced water / buoyancy, gray = iron. When the buoyancy arrow finally matches the gravity arrow's length, the color system has been quietly teaching the whole time.
- pythagorean-theorem: terracotta = the four triangles (the props), jade = the hole (the theorem itself). The reader tracks the proof by tracking the jade.

Practical defaults: one warm neutral ground (paper/rice tones) or one deep ground (near-black), an ink color for text, and **at most 2–3 semantic hues**. Put the mapping in a visible legend if the canvas uses more than one. More than four hues almost always reads as noise, not richness.

## Typography: one display face, one text face

Every strong course pairs a characterful display face (headlines, stage captions) with a quiet text face (body) — serif + sans, or a display grotesque + humanist sans. For Chinese: Noto Serif SC + Noto Sans SC is a proven pair; ZCOOL KuaiLe works for kids-level pages. Two families is the ceiling; system-font-only pages consistently read as unfinished drafts. Body text: 15–17px, line-height 1.7–1.85, prose measure 34–46ch.

## The stage: reserve space, never let text move the picture

The sticky stage is the heart of a scroll-driven course, and its most common defect is layout shift: a caption two lines longer than the last one shoves the canvas upward mid-animation.

- Give captions a fixed `min-height` sized for the longest caption (see `snippets/stage-captions.js`).
- Two tiers: a display-face headline (the *what*) + a smaller sub-line (the *why/number*), crossfading on change — disabled under reduced-motion.
- Size the canvas with `min(<px>, <vw>, <vh>)` so stage + caption + controls always fit one viewport, including short landscape screens.

## Annotation: every number on the canvas earns its place

- Any quantity drawn to scale must be *literally* to scale, from your verified constants — and say so ("arrow length ∝ force"). An arrow that merely looks longer is a lie the validator can't catch.
- Label magnitudes at the moment they matter ("浮力 127 克" as the block sinks), not all at once.
- A secondary "ledger" visualization pays off: buoyancy's measuring cup tracks displaced water beside the main tank, so the reader watches the *number* race the redline while the *picture* shows why. If your idea has one running quantity, consider giving it its own small instrument.

## Motion: it carries meaning or it goes

Knife cuts, slides, fills, sweeps — motion in shipped courses is always the mechanism itself, never garnish. Idle hero animations are gated by IntersectionObserver (pause offscreen) and every animated element has a meaningful static frame for reduced-motion. If you can't say what a movement *teaches*, cut it.

## Composition patterns that keep working

- Hero: statement on one side, a living preview of the idea on the other; below 760px, single column with the visual first (`order:-1`).
- After the aha: don't drop the reader. The shipped arc is *aha → recap cards (the pieces, numbered) → the law in a highlighted block with the concrete numbers substituted back in → a finale that echoes the hero at full scale → dz-end*. You don't need every station, but land somewhere.
- Mobile at 360px is a hard requirement (SPEC) — but check 720px-tall desktop windows too; sticky stages overflow there first.

## Failure modes actually observed

- Two courses independently grew the same "dark band + circled ×" misconception section — that's what copying example composition looks like. Study *why* the examples work; invent your own *how*.
- Bars computed correctly but rendered 0×0 (a `<span>` given `width` but no `display:block`). Rendered geometry is design too: look at it.
- Captions without reserved height, jittering the canvas on every stage change.
- A hue used for two unrelated meanings in the same course.
