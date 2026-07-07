---
name: everywhy-course
description: Create an interactive "拆解" (Disassemble) teaching course for everywhy.ai — decompose one idea into visible, animated pieces and reassemble them into an "aha" moment. Use this whenever asked to create/write/generate a lesson, course, or interactive explainer for everywhy.ai, or to produce content in the Disassemble Course Format (DCF).
---

# Creating an everywhy.ai course

You are producing one interactive teaching page in the **Disassemble Course Format (DCF)**. Read `SPEC.md` in this same directory first — it defines what makes a submission valid. This file tells you *how* to get there; SPEC.md tells you *what counts*.

**This is a validated process, not a suggestion.** Every step below exists because skipping it produced a real defect in earlier courses built without it. Follow the order.

## The five steps

### 1. Design the "aha" moment first, then work backward

Before writing anything, answer four questions (the first three are SPEC.md's three-part test):
- What is the one idea, in one sentence?
- What visible, animatable pieces does it break into?
- What is the exact moment the pieces recombine and the idea becomes obvious?
- **What are the common WRONG explanations of this idea?** Almost every good "why" question has a popular folk answer that's incorrect ("the sky reflects the ocean", "ships float because of air under the hull", "moon phases are Earth's shadow"). List them, and make sure your page explicitly names and refutes at least the most common one — a reader who arrives holding the wrong model needs it dislodged, not just papered over.

Design the reassembly moment first. Everything before it exists to set up that moment. If you can't state it in one sentence, you don't understand the idea well enough yet to start building — go back and think, don't start coding.

### 2. If the content involves math, physics, or any checkable fact — derive and verify the numbers on paper before writing any drawing code

This is the single step most likely to be skipped, and the one that has caught the most real errors in practice. Before you write a line of canvas/SVG code:

- Pick concrete numbers (not abstract variables) wherever the idea allows it. Concrete numbers are what let you (and a later reviewer) actually check the arithmetic.
- Compute the answer by hand or with a throwaway script — shoelace formula for areas, dot products for perpendicularity, direct substitution for physics formulas (F = ma, Archimedes' principle, Snell's law, whatever applies).
- Write the verification into a code comment near the constants you derived, so a reviewer can re-check your arithmetic without re-deriving it from scratch.
- Make sure every geometric ratio or animated position in the final page is *driven by* these verified numbers, not eyeballed to "look about right." An arrow whose length represents a force must be computed from the force value, not drawn at a length that merely looks plausible.

If you're not fully certain of a construction (e.g. an exact geometric dissection), prefer the simplest version you can verify completely over a more elaborate one you're unsure of. A correct simple animation beats an impressive wrong one.

### 3. Start from the template

Copy `templates/lesson-template.html` in this directory. It already has:
- The self-contained structure (inline CSS/JS, Google Fonts CDN only)
- `prefers-reduced-motion` handling wired up
- Canvas resize/DPR handling
- The navigation scaffolding (`dz-back`, optional `dz-alt` for sister variants, `dz-end` footer)

Fill in the `【【...】】` placeholders. Do not introduce a build step, a framework, or a shared CSS/JS file — the page must remain a single file that opens correctly via `file://`.

**Visual style is yours to invent.** The template gives you structural conventions, not a visual identity. Every course on this platform has its own color palette, typography, and personality — sameness across courses is a failure mode, not a goal. Look at the three examples in `examples/` for a sense of the *range* of visual styles that are all valid, not a style to copy.

### 4. Render it and LOOK at it — then walk the checklist

**Correct data does not guarantee correct rendering.** A real bug from a real test run: a set of comparison bars had their widths computed perfectly by JS (the physics ratios were verified and exact), but the bars rendered at 0×0 because the CSS was missing one `display:block` — inline elements ignore `width`. No console error, no validator warning, values all correct in the DOM. The *only* way this class of bug gets caught is by rendering the page and looking at it.

So, before considering the draft done:

- **Open the page in a real browser (or take headless-browser screenshots) and visually confirm every visual component actually renders**: every canvas state, every DOM-based chart/meter/bar, every label. For data visualizations, check that the rendered geometry *visibly reflects the data* (four bars representing 1.00/1.95/4.35/6.97 must be four visibly different lengths). If you can inspect computed styles, verify rendered sizes are non-zero and proportional — don't just confirm the JS set the values.
- **If your environment cannot render a browser at all, say so explicitly in your delivery note** ("not visually verified — needs a human/browser pass") instead of silently skipping. An honestly flagged gap is fine; a silent one ships broken pages.

Then verify the rest (see SPEC.md §4 for the authoritative list):

- Works at 360px width — no horizontal scroll, text readable, animation intact
- Works with `prefers-reduced-motion` enabled — content still makes sense (scroll-driven pages degrade to step-by-step or a static frame; time-driven animations pause by default or hide their play control)
- Opens cleanly via `file://` — no console errors, no `fetch`/network dependency
- `<title>`, meta description, and the OG trio (`og:title`, `og:description`, `og:image` with an absolute URL) are filled in
- If this is a sister variant of an existing topic (another language or difficulty level), it links to the existing variant(s) and — critically — you must also add a link *from* the existing variant(s) *to* this new one

### 5. Run the validator until it is green

```
node scripts/validate-course.js <your-file.html> <your-course.json>
```

Fix every error it reports. Warnings don't block, but read them — they usually point at something worth fixing anyway. A course is not done until this passes.

## Producing the output

Your deliverable is exactly two files:
1. The self-contained HTML page
2. A `course.json` alongside it, matching the schema in SPEC.md §3

See `examples/*.course.json` for three real, validator-passing examples paired with their `.html` files — these are working reference pairs, not just schema illustrations.

## When you're unsure

If you're not confident a mathematical or physical claim in your draft is correct, say so explicitly in your output rather than presenting it with false confidence. A flagged uncertainty is useful; a confidently wrong animation that teaches something incorrect is the worst possible outcome for this platform.
