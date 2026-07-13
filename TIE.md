# TIE: everywhy-course Skill

## Intent

- Make it possible for mainstream agent harnesses to create accurate, visually reasoned, high-quality everywhy courses.
- Keep the portable core in plain Markdown, self-contained HTML, and deterministic zero-dependency validators.
- Treat creating, validating, visually reviewing, and publishing as separate actions; publishing always requires explicit user authorization.

## Taste

- The Skill should feel like expert guidance with a narrow correctness boundary and a wide creative middle.
- Audience level, narrative structure, visual language, interaction mode, stage count, and pacing are judgment calls, not fixed templates.
- Examples demonstrate a range of mechanisms and quality; they are not layouts to copy.
- Technical recipes should remove fragile implementation bugs without deciding what a course should look or sound like.

## Eval

- A generated course teaches one clear idea through visible pieces and a genuine reassembly moment.
- Verifiable claims can be independently re-derived; validators pass; the complete rendered course is visually inspected when browser capability exists.
- Scroll and time-driven interactions preserve learner control, reduced-motion behavior, replayability where required, and coherent final states.
- Cross-harness outputs remain recognizably different when topics call for different visual and narrative solutions.

## Non-Goals And Drift Risks

- Do not encode aesthetic taste, age bands, fixed section counts, animation timings, or one preferred composition as validator rules.
- Do not turn optional references or shipped examples into mandatory templates.
- Do not let validator success stand in for pedagogical correctness or real-render review.
- Drift risks: rules accumulating from individual course bugs; recipes silently becoming required architecture; harness-specific setup leaking into the portable core.

## Open Questions

- Which small cross-harness eval set best detects both teaching failure and visual sameness without prescribing a style?
