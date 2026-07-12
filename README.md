# everywhy-skill

Create interactive teaching courses for [everywhy.ai](https://everywhy.ai) ("拆解" / Disassemble) — from Claude Code, Codex, Cursor, or any compatible agent harness.

**What "拆解" is:** every course takes one idea, breaks it into visible animated pieces, and reassembles them into an "aha" moment — no build step, one self-contained HTML file per course, chosen for both browser-native portability and independent review.

## What's in this repo

| File | Purpose |
|---|---|
| [`SKILL.md`](SKILL.md) | The process: read this first. Constraints are classed Mandatory / Judgment / Recipe — correctness and evidence are mandatory; creative decisions are yours. |
| [`SPEC.md`](SPEC.md) | The format contract: what makes a submission valid — hard technical requirements, `course.json` schema, checklist. |
| [`templates/lesson-shell.html`](templates/lesson-shell.html) | A deliberately design-free technical shell: metadata, self-containment, reduced-motion hook, navigation placeholders. Not a visual template. |
| [`snippets/`](snippets/) | Recipes for mechanics that are easy to get subtly wrong (scroll stages + autoplay, time-driven loops, canvas DPR, layout-stable captions, variant navigation). Inline and adapt what you need. |
| [`references/`](references/) | Craft references: [`design-craft.md`](references/design-craft.md) (color/type/stage/annotation principles distilled from shipped courses) and [`quality-rubric.md`](references/quality-rubric.md) (final-pass judgment questions). |
| [`scripts/validate-course.js`](scripts/validate-course.js) | Zero-dependency single-course validator. Run it before considering a course done. |
| [`scripts/validate-variants.js`](scripts/validate-variants.js) | Zero-dependency group validator for sister variants (shared topic, distinct slugs, reciprocal links, lang consistency). |
| [`examples/`](examples/) | Real, validator-passing course + `course.json` pairs spanning different visual styles and driving modes, with [an annotated index](examples/README.md) of what to study in each. They show the *range* of valid quality — courses that visually resemble them are a failure signal, not compliance. |

## Install

Everything here is plain Markdown + zero-dependency Node scripts — no harness-specific format required. Details and the render-verification capability ladder: [`references/harness-notes.md`](references/harness-notes.md).

**Claude Code:** drop this repo's contents into your skills directory (or point Claude Code at this repo as a skill source), then ask it to create an everywhy.ai course. `SKILL.md`'s frontmatter (`name`/`description`) is what triggers it.

**Codex:** this repo is a valid Codex Agent Skill as-is (same `SKILL.md` format; `agents/openai.yaml` carries display metadata). Install:

```bash
git clone https://github.com/ericqian77/everywhy-skill ~/.agents/skills/everywhy-course
```

Then trigger via `$everywhy-course`, `/skills`, or implicitly by asking for an everywhy.ai course.

**Cursor or any other harness:** point the agent at `SKILL.md` and `SPEC.md` as instructions (a project rule, or paste into context) and ask it to follow the process. The validators run the same everywhere.

## Usage

```
node scripts/validate-course.js path/to/your-course.html path/to/your-course.json
```

Exits non-zero with a list of errors if the course doesn't meet the format contract. Warnings are non-blocking but worth reading.

Once it's green, submit it — no GitHub account needed:

```
curl -X POST https://submit.everywhy.ai/v1/courses \
  -F "html=@your-course.html" -F "meta=@your-course.json"
```

Accepted submissions open a PR in the public review inbox, [`everywhy-submissions`](https://github.com/ericqian77/everywhy-submissions); a human reviews pedagogical correctness and safety before anything ships to everywhy.ai. See `SKILL.md`'s "Submitting to everywhy.ai" section for the full flow (status polling, rejection format).

## License

- **Code and instructional text in this repo** (`SKILL.md`, `SPEC.md`, `scripts/`, `templates/`): MIT.
- **Example course content** (`examples/*.html`, `examples/*.course.json`): CC BY-SA 4.0, matching the license terms for content on everywhy.ai — see `SPEC.md` §6.
