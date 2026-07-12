# Harness notes — loading this skill outside Claude Code

The portability contract comes first: everything in this repo is plain Markdown plus zero-dependency Node scripts. No harness-specific format is *required* — any agent that can read files and run `node` can use all of it. This file just shortens the setup for the harnesses we know about, and defines the render-acceptance ladder every harness should follow.

## Claude Code

`SKILL.md`'s frontmatter (`name`/`description`) is the trigger. Install by placing this repo (or a copy) in your skills directory, or point Claude Code at it as a skill source. Browser verification: use the built-in browser/preview tools for step 7 (render acceptance).

## Codex

Codex supports Agent Skills natively, and **this repo already is one** — same `SKILL.md` frontmatter format, and the `scripts/` and `references/` subdirectory conventions match Codex's documented layout. Per OpenAI's docs:

- Install paths (discovery order): `$CWD/.agents/skills` → repo root `.agents/skills` → `$HOME/.agents/skills` (user scope) → `/etc/codex/skills`. So: `git clone https://github.com/ericqian77/everywhy-skill ~/.agents/skills/everywhy-course` (or use Codex's `$skill-installer`).
- Trigger: explicitly via `/skills` or `$everywhy-course`, or implicitly on matching tasks (enabled in `agents/openai.yaml`, which also carries display metadata).
- Note: some earlier writeups mention `~/.codex/skills`; the documented location is `~/.agents/skills`.

## Cursor (and other rules-based editors)

No skills mechanism — use a project rule that points here. Create `.cursor/rules/everywhy-course.mdc` containing an instruction like: *"When asked to create a course/lesson/explainer for everywhy.ai, read SKILL.md and SPEC.md from <path or URL of this repo> and follow them."* Or simply paste `SKILL.md` + `SPEC.md` into context. The validators run the same everywhere: `node scripts/validate-course.js …`.

## Any other harness

Read `SKILL.md` first, then `SPEC.md`; treat them as the instructions. The only executable dependency is Node for the two validators. If the harness can't run Node, a human can — say so in the delivery note rather than skipping validation.

## Render-acceptance ladder (SKILL.md step 7, by capability)

Use the most reliable path your environment actually has, in this order — and never claim visual acceptance from a rung you didn't stand on:

1. **Native browser tooling** (Claude Code browser pane, a Codex browser plugin, Playwright if the harness ships it): load the page, walk every stage, check console errors, test 360px width and reduced-motion.
2. **Headless Chrome screenshots** (any harness with shell access):
   ```
   "…/Google Chrome" --headless --disable-gpu --screenshot=out.png \
     --window-size=390,844 --hide-scrollbars --virtual-time-budget=5000 "file://$PWD/course.html"
   ```
   This captures only the initial viewport — enough to catch blank canvases, broken fonts, and layout collapse in the hero, **not** enough to verify scroll stages. Say which states you did and didn't see.
3. **Local static server + human pass**: `python3 -m http.server` (or any static server), hand the URL to the user with a checklist of what to look at.
4. **Static validation only**: if none of the above exists, run the validators, and state explicitly in the delivery note that the course is *not visually verified*. An honestly flagged gap is acceptable; a silent one ships broken pages.
