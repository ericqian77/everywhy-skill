#!/usr/bin/env node
// Variant-group validator (DCF v1). Checks the consistency of a group of
// sister variants (same idea in another language or difficulty level).
// Usage: node scripts/validate-variants.js a.html a.json b.html b.json [...]
// Zero dependencies. Run validate-course.js on each variant first — this
// script only checks properties that exist BETWEEN variants, not within one.

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length < 4 || args.length % 2 !== 0) {
  console.error('Usage: node validate-variants.js <a.html> <a.json> <b.html> <b.json> [...]');
  console.error('Provide 2+ (html, json) pairs.');
  process.exit(1);
}

const errors = [];
const warns = [];
const err = m => errors.push(`  ${m}`);
const warn = m => warns.push(`  ${m}`);

const variants = [];
for (let i = 0; i < args.length; i += 2) {
  const [htmlPath, jsonPath] = [args[i], args[i + 1]];
  for (const p of [htmlPath, jsonPath]) {
    if (!fs.existsSync(p)) { console.error(`✗ file not found: ${p}`); process.exit(1); }
  }
  let meta;
  try { meta = JSON.parse(fs.readFileSync(jsonPath, 'utf8')); }
  catch (e) { console.error(`✗ ${jsonPath} is not valid JSON: ${e.message}`); process.exit(1); }
  variants.push({ htmlPath, html: fs.readFileSync(htmlPath, 'utf8'), meta, name: path.basename(htmlPath) });
}

// ---- group consistency ----
const topics = new Set(variants.map(v => v.meta.topic));
if (topics.size !== 1) err(`variants must share one topic, found: ${[...topics].join(', ')}`);

const slugs = variants.map(v => v.meta.slug);
if (new Set(slugs).size !== slugs.length) err(`slugs must be distinct, found: ${slugs.join(', ')}`);

for (const field of ['format_version', 'license']) {
  const values = new Set(variants.map(v => JSON.stringify(v.meta[field])));
  if (values.size !== 1) err(`${field} differs across variants: ${[...values].join(' vs ')}`);
}

const combos = variants.map(v => `${v.meta.level}|${v.meta.lang}`);
combos.forEach((c, i) => {
  if (combos.indexOf(c) !== i)
    err(`${variants[i].name}: duplicate level+lang combo "${c}" — variants would be indistinguishable`);
});

// ---- per-variant checks that only make sense in a group ----
variants.forEach(v => {
  // <html lang> vs metadata lang (primary subtag)
  const langAttr = (v.html.match(/<html[^>]*\blang=["']([^"']+)["']/i) || [])[1];
  if (!langAttr) warn(`${v.name}: <html> has no lang attribute`);
  else if (v.meta.lang && langAttr.toLowerCase().split('-')[0] !== String(v.meta.lang).toLowerCase())
    err(`${v.name}: <html lang="${langAttr}"> does not match course.json lang "${v.meta.lang}"`);

  // reciprocal links: every variant links to every sibling as <sibling-slug>.html
  variants.forEach(s => {
    if (s === v) return;
    if (!v.html.includes(`${s.meta.slug}.html`))
      err(`${v.name}: no link to sibling variant "${s.meta.slug}" (expected a reference to ${s.meta.slug}.html)`);
  });
});

// ---- output ----
if (errors.length) {
  console.error(`✗ variant group failed, ${errors.length} issue(s):\n` + errors.join('\n'));
  process.exit(1);
}
if (warns.length) console.warn(`⚠ ${warns.length} warning(s):\n` + warns.join('\n'));
console.log(`✓ ${variants.length} variants form a consistent group (topic: ${variants[0].meta.topic})`);
