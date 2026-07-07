# everywhy-skill

Create interactive teaching courses for [everywhy.ai](https://everywhy.ai) ("拆解" / Disassemble) — from Claude Code, Codex, Cursor, or any compatible agent harness.

**What "拆解" is:** every course takes one idea, breaks it into visible animated pieces, and reassembles them into an "aha" moment — no build step, one self-contained HTML file per course, chosen for both browser-native portability and independent review.

## What's in this repo

| File | Purpose |
|---|---|
| [`SKILL.md`](SKILL.md) | The process: read this first. Encodes the 5-step workflow that has been validated across multiple real courses. |
| [`SPEC.md`](SPEC.md) | The format contract: what makes a submission valid — hard technical requirements, `course.json` schema, checklist. |
| [`templates/lesson-template.html`](templates/lesson-template.html) | Starting skeleton for a new course. |
| [`scripts/validate-course.js`](scripts/validate-course.js) | Zero-dependency validator. Run it before considering a course done. |
| [`examples/`](examples/) | Three real, validator-passing course + `course.json` pairs, spanning different visual styles and driving modes (scroll-driven and reference material for time-driven). Read for the *range* of valid styles, not a template to copy verbatim. |

## Install

**Claude Code:** drop this repo's contents into your skills directory (or point Claude Code at this repo as a skill source), then ask it to create an everywhy.ai course. `SKILL.md`'s frontmatter (`name`/`description`) is what triggers it.

**Codex, Cursor, or any other harness:** there's no special integration — just point the agent at `SKILL.md` and `SPEC.md` as instructions (e.g. paste them into context, or reference the files) and ask it to follow the process. Every file here is plain markdown/JS with no harness-specific format.

## Usage

```
node scripts/validate-course.js path/to/your-course.html path/to/your-course.json
```

Exits non-zero with a list of errors if the course doesn't meet the format contract. Warnings are non-blocking but worth reading.

## License

- **Code and instructional text in this repo** (`SKILL.md`, `SPEC.md`, `scripts/`, `templates/`): MIT.
- **Example course content** (`examples/*.html`, `examples/*.course.json`): CC BY-SA 4.0, matching the license terms for content on everywhy.ai — see `SPEC.md` §6.
