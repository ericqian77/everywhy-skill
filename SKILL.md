---
name: everywhy-course
description: Create an interactive "拆解" (Disassemble) teaching course for everywhy.ai — decompose one idea into visible, animated pieces and reassemble them into an "aha" moment. Use this whenever asked to create/write/generate a lesson, course, or interactive explainer for everywhy.ai, or to produce content in the Disassemble Course Format (DCF).
---

# Creating an everywhy.ai course

You are producing one interactive teaching page in the **Disassemble Course Format (DCF)**. Read `SPEC.md` in this directory first — it defines what makes a submission valid. This file tells you *how* to get there.

## How this skill constrains you — and how it doesn't

Everything here falls into three classes. Know which one you're in:

- **Mandatory (M)** — violating these makes the artifact invalid, unsafe, or unreviewable. They live in SPEC.md: verifiable facts independently re-derivable; fully self-contained HTML; accessibility and reduced-motion handling; no outbound requests. Two more live here: **report honestly what you did and didn't verify**, and **never submit or publish unless the user explicitly asked**.
- **Judgment (J)** — questions you must think through, whose answers this skill deliberately does not prescribe: who the learner is and what they already know; what visible pieces the idea breaks into; how deep the abstraction goes; what the reassembly moment is; whether a misconception is worth addressing.
- **Recipes (R)** — optional technical patterns in `snippets/`, for mechanics that are easy to get subtly wrong, and craft references in `references/`. Load one only when the step you're on calls for it.

Everything visual and narrative — palette, typography, composition, voice, step count, animation timing — is yours to invent *for this concept*. The files in `examples/` show the **range** of valid quality, not layouts to copy. Two courses on different topics that share a visual skeleton are a failure signal, not compliance.

## The flow

### 1. Preflight

Before designing, answer: What language(s), and how many variants? Who is the learner and what do they already know? Do you have a browser or preview path in this environment? (Capability differs by harness — see the render-acceptance ladder in `references/harness-notes.md`. No browser doesn't block creating, but you must report the verification gap at the end.) Does a course on this topic already exist? (Then you're adding a variant — see Variants below.) Did the user ask you to *create*, or also to *submit*? **Creating never implies submitting.**

### 2. Design the understanding change

Write down, in this order: the one idea, in one sentence; the learner's likely starting model; the visible, animatable pieces the idea breaks into; the exact reassembly moment where the pieces recombine and the idea becomes obvious. Design that moment first, then work backward — everything before it exists to set it up. If you can't state the idea in one sentence, you don't understand it well enough to start building.

Then ask: **is there a real, popular wrong explanation of this idea?** ("The sky reflects the ocean", "moon phases are Earth's shadow.") If yes, naming and dislodging it is powerful — a learner holding a wrong model needs it removed, not papered over. If no genuine misconception exists, **don't invent one to fill a section**. That is exactly how template-shaped courses happen.

### 3. Verify the subject matter — before writing any drawing code

The step most often skipped, and the one that has caught the most real errors:

- Pick concrete numbers wherever the idea allows; concrete numbers are what let a reviewer actually check the arithmetic.
- Compute the answer by hand or throwaway script — shoelace formula, dot products, direct formula substitution, whatever applies.
- Leave a short derivation comment near the constants you derived, so a reviewer can re-check without re-deriving.
- Every geometric ratio or animated position must be *driven by* these verified numbers, not eyeballed.
- Prefer the simplest construction you can verify completely over an elaborate one you're unsure of.

### 4. Choose the interaction mode

Match mechanism to concept — the skill prescribes no step count, layout, or duration:

- Discrete transformations and proofs → scroll-driven, stepped, or direct manipulation (see `snippets/scroll-stages.js`).
- Continuously varying quantities → time-driven animation or a manipulable simulation (see `snippets/time-driven.js`).
- Comparisons → synchronized states or overlays. Exploration → controls with visible consequences.
- Canvas, SVG, DOM, CSS, or a mix — whatever the spatial reasoning needs (`snippets/canvas-dpr.js` for canvas).

### 5. Assemble from the shell

Copy `templates/lesson-shell.html`. It is a **technical shell** — metadata head, self-containment skeleton, reduced-motion hook, navigation placeholders — and deliberately *not* a design. Before inventing the visual system, read `references/design-craft.md`: principles distilled from shipped courses (semantic color, type pairing, layout-stable captions) — defaults to deviate from deliberately, not accidentally. Fill every `【【…】】` placeholder (the validator blocks on leftovers). Inline and adapt any snippet code you use. Do not introduce a build step, a framework, or a shared CSS/JS file — the page must open correctly via `file://`.

### 6. Static validation

```
node scripts/validate-course.js <your-course.html> <your-course.json>
```

Fix every error. For a variant group, also run:

```
node scripts/validate-variants.js a.html a.json b.html b.json [...]
```

Green proves *format* compliance only — it is not evidence the course teaches correctly or renders correctly.

### 7. Render it and LOOK at it

**Correct data does not guarantee correct rendering.** A real bug from a real test run: comparison bars whose widths were computed perfectly by JS rendered at 0×0 because one CSS `display` was missing — no console error, no validator warning. The only way to catch this class of bug is to render the page and look.

Walk the **whole** course, not just the hero: every canvas state, every stage of the scroll sequence, every DOM chart/meter/label, the interactive controls, the ending. Verify rendered geometry visibly reflects the data. Then: 360px width (no horizontal scroll, animation intact); reduced-motion enabled (content still makes sense); `file://` open (no console errors). If your environment cannot render a browser, say so explicitly in your delivery note instead of silently skipping.

### 8. Deliver with evidence

First walk `references/quality-rubric.md` — judgment questions on understanding, correctness, audience fit, visual reasoning, interaction, and originality; a bad answer there is a revision, not a footnote. Then your final note must state: which artifacts you created; the validator commands and their results; what you rendered and at which viewports/stages; any remaining verification gaps; and that you have **not** submitted anything (unless the user asked you to).

## Variants (bilingual / multi-level)

One variant = one self-contained HTML + one `course.json`. Design the concept and stage structure once; then localize language, examples, and pacing per variant — good variants are re-tellings, not sentence-by-sentence translations. Each variant gets its own `slug` (file named `<slug>.html`); all variants share one `topic`; every variant links to every sibling, both directions. Validate each variant separately, visually accept each separately (shared code does not mean the text fits), then check group consistency with `validate-variants.js`.

## Submitting to everywhy.ai — only when asked

**Validator green ≠ permission to publish. Acceptance in the review inbox ≠ live on the site** — a human curator promotes accepted courses. Submit only when the user explicitly requests it:

```
curl -X POST https://submit.everywhy.ai/v1/courses \
  -F "html=@your-course.html" -F "meta=@your-course.json" \
  [-F "contact=your-handle-or-email"]
```

A 422 lists the errors — fix and resubmit; nothing public is created. A 201 returns the inbox PR (`submission_url`) and a `status_url` you can poll (`in_review` / `accepted` / `closed`). Submitting licenses the content under CC BY-SA 4.0 (SPEC.md §6).

## When you're unsure

If you're not confident a mathematical or physical claim is correct, say so explicitly in your output rather than presenting it with false confidence. A flagged uncertainty is useful; a confidently wrong animation that teaches something incorrect is the worst possible outcome for this platform.
