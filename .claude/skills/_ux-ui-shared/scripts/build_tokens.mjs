#!/usr/bin/env node
/**
 * TOKEN BUILD — a real, working reference implementation of workflows/token-build.md.
 * Reads the DTCG tokens in tokens/*.json (source of truth), resolves every alias
 * (incl. cross-file {../colors.*} and the dark override map), and emits a single
 * CSS-variable theme: `:root { … }` + `:root[data-theme="dark"] { … }`.
 *
 * Scope: the full token layer the framework adapters reference —
 *   - colors  (semantic + component + dark)  → --color-*   (e.g. semantic.action.primary → --color-action-primary)
 *   - spacing → --space-* · sizing.control → --size-control-* · radius-semantic → --radius-*
 *   - opacity → --opacity-* · shadows → --shadow-* · motion.transition → --transition-* · typography.textStyle → --text-*
 * Composite types (shadow/transition/typography) are flattened to valid CSS shorthands so
 * generated components in ANY framework (Svelte/Vue/Lit/CSS-in-JS/…) resolve, not just colors.
 *
 * Usage:
 *   node scripts/build_tokens.mjs            # prints CSS to stdout
 *   node scripts/build_tokens.mjs --out dist/tokens.css
 */
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const TOKENS = join(ROOT, 'tokens');
const out = (process.argv.find(a => a.startsWith('--out=')) || '').split('=')[1]
  || (process.argv.includes('--out') ? process.argv[process.argv.indexOf('--out') + 1] : null);

// 1) load every token file into a global path->value map (file-namespaced + bare)
const all = {};
for (const f of readdirSync(TOKENS).filter(n => n.endsWith('.json'))) {
  const data = JSON.parse(readFileSync(join(TOKENS, f)));
  const stem = f.replace(/\.json$/, '');
  (function walk(o, p) {
    if (o && typeof o === 'object') {
      if ('$value' in o) { all[p] = o.$value; all[`${stem}.${p}`] = o.$value; }
      for (const k of Object.keys(o)) if (!k.startsWith('$')) walk(o[k], p ? `${p}.${k}` : k);
    }
  })(data, '');
}

// 2) resolve a value (follow {ref} chains incl. ../ and file prefixes)
function res(v, depth = 0) {
  if (depth > 16 || typeof v !== 'string') return v;
  const m = v.match(/^\{(.+)\}$/);
  if (!m) return v;
  let ref = m[1].trim();
  while (ref.startsWith('../') || ref.startsWith('./')) ref = ref.startsWith('../') ? ref.slice(3) : ref.slice(2);
  let val = all[ref];
  if (val === undefined) { const tail = ref.split('.').slice(1).join('.'); val = all[ref] ?? all[tail]; }
  return val === undefined ? v : res(val, depth + 1);
}

// 3) emit semantic + component color tokens as --color-* ; dark section as overrides
const colors = JSON.parse(readFileSync(join(TOKENS, 'colors.json')));
const lines = { light: [], dark: [] };
function emit(obj, prefix, bucket) {
  for (const [k, v] of Object.entries(obj || {})) {
    if (k.startsWith('$')) continue;
    if (v && typeof v === 'object' && '$value' in v) {
      const hex = res(v.$value);
      if (typeof hex === 'string' && /^(#|rgb|hsl)/.test(hex)) lines[bucket].push(`  --color-${prefix}${k}: ${hex};`);
    } else if (v && typeof v === 'object') {
      emit(v, `${prefix}${k}-`, bucket);
    }
  }
}
emit(colors.semantic, '', 'light');
if (colors.component) emit(colors.component, '', 'light');
if (colors.dark) emit(colors.dark, '', 'dark');

// adapter alias: components reference --color-on-action (text on a filled action);
// the source path is semantic.text.on-action → would otherwise emit as --color-text-on-action.
const onAction = res(all['semantic.text.on-action']);
if (typeof onAction === 'string' && /^(#|rgb|hsl)/.test(onAction)) {
  lines.light.push(`  --color-on-action: ${onAction};`);
}

// 4) emit the non-color scales the framework adapters reference (spacing, sizing,
//    radius, opacity, shadows, motion, typography) so generated components in ANY
//    framework resolve against the theme — not just React. Light-only (no dark variants).
const load = (f) => JSON.parse(readFileSync(join(TOKENS, f)));
// a cubicBezier token is an array [x1,y1,x2,y2]; render it as a CSS timing function.
const easing = (v) => (Array.isArray(v) ? `cubic-bezier(${v.join(',')})` : v);
const fmt = {
  dimension: (v) => res(v),
  number: (v) => String(res(v)),
  duration: (v) => res(v),
  shadow: (v) => typeof v === 'string' ? res(v)  // keyword shadows like "none"
    : (Array.isArray(v) ? v : [v])
      .map((s) => [s.offsetX, s.offsetY, s.blur, s.spread, res(s.color)].filter((x) => x != null && x !== '').join(' '))
      .join(', '),
  transition: (v) => [res(v.duration), easing(res(v.timingFunction)), res(v.delay)].filter(Boolean).join(' '),
  typography: (v) => [res(v.fontWeight), `${res(v.fontSize)}/${res(v.lineHeight)}`, res(v.fontFamily)].filter(Boolean).join(' '),
};
function emitScale(obj, prefix) {
  for (const [k, v] of Object.entries(obj || {})) {
    if (k.startsWith('$')) continue;
    const key = k.replace(/\./g, '_'); // dots are invalid in a CSS custom-property ident (e.g. 2.5 → 2_5)
    if (v && typeof v === 'object' && '$value' in v) {
      const f = fmt[v.$type];
      if (f) lines.light.push(`  --${prefix}${key}: ${f(v.$value)};`);
    } else if (v && typeof v === 'object') {
      emitScale(v, `${prefix}${key}-`);
    }
  }
}
const spacing = load('spacing.json');
const sizing = load('sizing.json');
const borders = load('borders.json');
const motion = load('motion.json');
const typography = load('typography.json');
emitScale(spacing.scale, 'space-');                 // --space-2 …
emitScale(sizing.control, 'size-control-');          // --size-control-md …
emitScale(borders['radius-semantic'], 'radius-');    // --radius-button …
emitScale(load('opacity.json'), 'opacity-');         // --opacity-disabled …
emitScale(load('shadows.json'), 'shadow-');          // --shadow-focus-ring …
emitScale(motion.transition, 'transition-');         // --transition-micro …
emitScale(typography.textStyle, 'text-');            // --text-label …

const css = `/* Generated by scripts/build_tokens.mjs from tokens/*.json — do not edit by hand. */
:root {
${[...new Set(lines.light)].join('\n')}
}
:root[data-theme="dark"] {
${[...new Set(lines.dark)].join('\n')}
}
`;

if (out) {
  mkdirSync(dirname(resolve(out)), { recursive: true });
  writeFileSync(resolve(out), css);
  console.log(`wrote ${[...new Set(lines.light)].length} light + ${[...new Set(lines.dark)].length} dark vars (color + spacing/sizing/radius/opacity/shadow/motion/typography) → ${out}`);
} else {
  process.stdout.write(css);
}
