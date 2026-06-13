# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project overview

A **Next.js (App Router) web app** whose UI is built with **shadcn/ui + Tailwind CSS v4**, driven
by a **design system whose source of truth is a DTCG token set** (`.claude/skills/_ux-ui-shared/tokens/*.json`).
The tokens compile into `app/globals.css` and stay in sync with Figma — so code and design stay in lockstep.

The theme is **blue-primary** (`--primary` = blue-600), with full light + dark support.

### Two design skill bundles (how they fit together)
- **`shadcn-ui-design`** — the **authority for building/editing UI** in this Next.js app (semantic Tailwind utilities, shadcn CLI, no forking `components/ui/*`). Read it for any component/page/styling work.
- **`_ux-ui-shared/` + the 17 `ux-ui` skills** (`design-tokens`, `a11y-audit`, `design-qa`, `design-review`, `performance`, `ux-writing`, …) — generic design knowledge + tooling. They **own the DTCG token source of truth** and provide gates (contrast, a11y, taste). For *building UI* they defer to `shadcn-ui-design`. See **Skill map** below.

### Current status
- ✅ App scaffolded and running (`npm run dev`); this **is** a git repo.
- ✅ `shadcn-ui-design` skill in place (`.claude/skills/shadcn-ui-design/`).
- ✅ `ux-ui` skills + shared assets installed under `.claude/skills/_ux-ui-shared/`.

## Tech stack

- **Next.js** (App Router) · **React** · **TypeScript**
- **Tailwind CSS v4** (CSS-first config — no `tailwind.config` for colors; theme lives in `app/globals.css` via `@theme inline`)
- **shadcn/ui** (style: new-york, baseColor: neutral, CSS variables, lucide icons)
- **next-themes** (class-based dark mode) · **clsx** + **tailwind-merge** (`cn()` helper)
- Package manager: **npm**

## Directory structure (intended)

```
.
├─ CLAUDE.md                         # this file
├─ app/                             # Next.js App Router (pages, layout, globals.css)
├─ components/
│  ├─ ui/                           # shadcn primitives (added via CLI — don't fork)
│  └─ *.tsx                         # app components (theme-provider, docs, …)
├─ lib/                             # utils.ts (cn()), tokens.ts, navigation.ts, registry.tsx
├─ components.json                  # shadcn config
├─ scripts/figma/                   # Figma tooling (figma-pull, audit-components/variants, extract-tokens)
└─ .claude/skills/
   ├─ shadcn-ui-design/             # AUTHORITY for building UI (semantic tokens, CLI)
   │  ├─ SKILL.md · references/{DESIGN.md, variables-export.json} · assets/ · scripts/generate-tokens.py
   ├─ _ux-ui-shared/                # shared assets for the ux-ui skills (NOT a skill — no SKILL.md)
   │  ├─ tokens/*.json              # DTCG token SOURCE OF TRUTH (14 files)
   │  ├─ components/ taste/ design-systems/ frameworks/ accessibility/ workflows/ content/
   │  └─ scripts/                   # validators + build_tokens.mjs + a11y/contrast/taste gates
   └─ design-tokens/ a11y-audit/ design-qa/ … (17 ux-ui skills)
```

## Commands

```bash
# Dev loop (after Setup)
npm run dev                 # start dev server (http://localhost:3000)
npm run build && npm start  # production build
npm run lint                # eslint
npx tsc --noEmit            # typecheck

# Storybook — dev/QA workbench (Storybook 10 + nextjs-vite). Stories in stories/<Component>.stories.tsx
npm run storybook           # dev → http://localhost:6006
npm run build-storybook     # static build
npm run test-storybook      # run every story's play() as a Vitest browser test (chromium)

# shadcn components
npx shadcn@latest add button card dialog input form table   # add primitives

# Build app/globals.css from the DTCG token source of truth (see Token workflow)
node .claude/skills/_ux-ui-shared/scripts/build_tokens.mjs

# Validate tokens (JSON + alias resolution) and contrast
python3 .claude/skills/_ux-ui-shared/scripts/validate_tokens.py
python3 .claude/skills/_ux-ui-shared/scripts/validate_contrast.py

# Figma sync (downstream) + legacy Figma-export generator
node scripts/figma/figma-pull.mjs
python3 .claude/skills/shadcn-ui-design/scripts/generate-tokens.py
```

## The design system & the skill

**`.claude/skills/shadcn-ui-design/` is the authority for all UI/styling.** Whenever you add or edit
a component, build a page, style anything, theme, or wire dark mode, **follow that skill** and treat
`references/DESIGN.md` as the source of truth for tokens.

Core rules (full detail in `SKILL.md`):
- **Semantic tokens only** — `bg-background`, `text-muted-foreground`, `bg-primary text-primary-foreground`, `border-border`. **Never** hardcode colors (`bg-white`, `bg-blue-600`, `bg-[#...]`); the theme is blue → use `bg-primary`, not `bg-blue-*`.
- **Add components via the CLI** (`npx shadcn@latest add …`) — don't hand-write or fork `components/ui/*`.
- **Pair surface/foreground** (on `card` → `text-card-foreground`).
- **Keep a11y** — `focus-visible` rings, `aria-*`, `Label htmlFor`.

## Token workflow (DTCG → code)

The **DTCG token files are the source of truth**; `app/globals.css` is **generated, never hand-edited**.
The DTCG set already holds the real blue-primary theme (blue-600 `#2563eb`, dark overrides, WCAG-verified).

```
.claude/skills/_ux-ui-shared/tokens/*.json   ← SOURCE OF TRUTH (14 DTCG files)
   │  node .claude/skills/_ux-ui-shared/scripts/build_tokens.mjs
   ▼
app/globals.css (consumed by Tailwind v4 @theme inline)
   ▲
   └── Figma (downstream sync) — mirror tokens ↔ Variables via the `figma-integration` skill
```

**To change a token:** edit the relevant `_ux-ui-shared/tokens/*.json` → run `validate_tokens.py`
(+ `validate_contrast.py` for colors) → rebuild `app/globals.css`. Then optionally push to Figma.
Never edit color values in `app/globals.css` by hand.

> **Legacy Figma-export pipeline** (`shadcn-ui-design/references/variables-export.json` +
> `generate-tokens.py`, 1,804 vars) is retained as a Figma snapshot/reference. The DTCG set is now
> upstream; keep the two consistent rather than diverging.

## Figma integration (MCP)

A Figma MCP server is available. Figma file: `<FIGMA_FILE_URL>` *(fill in when available)*.

- **Before any Figma write/read-via-JS**, load the required skill first (e.g. `/figma-use`, `/figma-generate-design`) — they are mandatory prerequisites for `use_figma` / design generation.
- **Design → code:** use `get_design_context` / `get_screenshot` / `get_metadata` to read a frame, then implement it as a Next.js page/component using **only this project's tokens** (never the raw colors Figma reports).
- **Code → design / mapping:** use Code Connect (`get_code_connect_map`, `add_code_connect_map`) to map `components/ui/*` to their Figma components, so design-to-code stays consistent.
- **Tokens:** the DTCG `_ux-ui-shared/tokens/*.json` are upstream; **Figma is a downstream sync target**. Mirror tokens → Figma Variables (and pull design frames back) via the `figma-integration` skill; keep them consistent (see Token workflow).

## Setup (scaffold the app)

Run once to create the Next.js app at the repo root and wire the design tokens:

```bash
npx create-next-app@latest .          # TypeScript, App Router, Tailwind, ESLint, alias @/*
npx shadcn@latest init                # baseColor = Neutral, CSS variables = yes
npm i next-themes tw-animate-css clsx tailwind-merge

# Wire this project's tokens (overwrite shadcn defaults)
cp .claude/skills/shadcn-ui-design/assets/globals.css     app/globals.css
cp .claude/skills/shadcn-ui-design/assets/components.json  components.json
cp .claude/skills/shadcn-ui-design/assets/lib/utils.ts     lib/utils.ts
```

For dark mode, wrap `app/layout.tsx` in a `next-themes` `ThemeProvider`
(`attribute="class"`, `defaultTheme="system"`, `enableSystem`) and add `suppressHydrationWarning`
on `<html>`. The `.dark` token values are already in `globals.css`.

## Do / Don't

**Do**
- Follow the `shadcn-ui-design` skill for every UI change; read `references/DESIGN.md` §A first.
- Change tokens by editing `_ux-ui-shared/tokens/*.json` then rebuilding — never hand-edit `globals.css`.
- Run the gates and report real output (see **Verification Protocol**) before claiming done.
- Verify before done: no hardcoded colors, light+dark both work, responsive, a11y, `npm run lint` + `tsc` pass.

**Don't**
- ❌ Hardcode colors/spacing/radius outside the token set (no raw hex/px or `bg-blue-*` palette utilities).
- ❌ Fork `components/ui/*`; override with `className` + `cn()` instead.
- ❌ Edit generated `app/globals.css` values by hand — change the DTCG tokens and rebuild.
- ❌ Use raw Figma color values when implementing a design — map them to this project's semantic tokens.

---

## Skill map (which skill for what)

| Need | Use |
|------|-----|
| Build/edit a component, page, styling, dark mode | **`shadcn-ui-design`** (authority) |
| Create/extend/audit DTCG tokens, palettes, type/spacing scales | `design-tokens`, `token-build`, `brandkit` |
| Apply a look/brand (138 systems), redesign/polish | `apply-aesthetic`, `redesign` |
| Accessibility check, QA gates, design critique | `a11y-audit`, `design-qa`, `design-review` |
| Perf (Web Vitals), prototyping, UX copy, governance | `performance`, `prototype`, `ux-writing`, `governance` |
| Screenshot/image → code; migrate from another DS | `image-to-code`, `migrate-design-system` |
| Figma ↔ code sync | `figma-integration` (+ `/figma-*` MCP skills) |

The `ux-ui` skills are **knowledge + gates**; for *building UI* they defer to `shadcn-ui-design`.
Their shared assets (tokens, specs, scripts, design-system library) live in `.claude/skills/_ux-ui-shared/`.

## Token System

3-tier DTCG hierarchy (used by `design-tokens`, `brandkit`, `token-build`):

- **Primitive** — raw palette values (`blue.600` = `#2563eb`). Never referenced directly.
- **Semantic** — purpose aliases (`action.primary` → `{primitive.blue.600}`). Used in styling.
- **Component** — component-scoped (`button.primary-bg-hover`). Used in implementations.

All tokens are DTCG (`$type`/`$value`) in `.claude/skills/_ux-ui-shared/tokens/` (14 files: `colors`,
`typography`, `spacing`, `shadows`, `borders`, `breakpoints`, `motion`, `gradients`, `opacity`, `blur`,
`sizing`, `states`, `theming`, `data-viz`). Naming: `{category}.{property}.{variant}-{state}`.
**Dark mode** swaps at the **semantic** layer (`colors.json` → `dark` section), not at primitives.

## Verification Protocol — run gates, never claim

Trust comes from reproducible gate output, not assertions. Build *with* the gates, not after.

1. **Never state a number you didn't measure** — any contrast ratio / "WCAG pass" / "100%" must come from running a gate. If not run, say "not verified yet."
2. **Verify ALL states**, not just resting — `node .claude/skills/_ux-ui-shared/scripts/verify_states.mjs <file> [--dark]` (default/hover/focus).
3. **One-command gate before done** — `node .claude/skills/_ux-ui-shared/scripts/accuracy_report.mjs` (tokens + contrast + spec + no-hardcode + theme-refs + no-emoji + real-render WCAG, light & dark). Report the actual `N/N`.
4. **Responsive is gated** — `node .claude/skills/_ux-ui-shared/scripts/verify_responsive.mjs <file|dir>` (no overflow at 280/320/414px).
5. **Render and LOOK** — gates don't prove pixels; screenshot the harness and click each control to confirm state changes.
6. **Zero emoji as icons** — use lucide SVG or plain words; `python3 .claude/skills/_ux-ui-shared/scripts/check_no_emoji.py` fails the build on any emoji.

## Single-Theme Consistency (non-negotiable)

Every page/screen/component renders from **one shared token theme** — never a per-page palette.

1. **One source of truth** — `_ux-ui-shared/tokens/*.json` → one CSS-variable layer (`app/globals.css`) imported once at the app root.
2. **No off-theme values** — zero hardcoded hex/px/timing in component code (`lint_hardcodes.py`). Exception: adapter config mapping our tokens into a 3rd-party API.
3. **Real WCAG on the source** — the theme passes WCAG 2.2 in light AND dark before shipping (`validate_contrast.py`).
4. **A page that "looks different" is a bug** — it bypassed the theme.

## Component Guidelines

**Quality bar** — every component has: anatomy, variants, sizes (sm/md/lg), the 8 states, token mapping, accessibility (ARIA + keyboard + SR). Specs: `.claude/skills/_ux-ui-shared/components/{atoms,molecules,organisms,templates,navigation,feedback,forms-advanced,overlays}.md`.

**The 8 states** (all interactive components): Default · Hover (`-hover`) · Focus (`shadow.focus-ring`) · Active (`-active`) · Disabled (opacity + no pointer events) · Loading (spinner + `aria-busy`, if async) · Error (`border.error` + message, if input) · Selected (`interactive.selected-bg`, if selectable).

## File Reference Map

```
.claude/skills/
├─ shadcn-ui-design/        ← AUTHORITY for building UI; references/DESIGN.md (legacy Figma snapshot)
└─ _ux-ui-shared/
   ├─ tokens/*.json         ← DTCG token SOURCE OF TRUTH (14 files)
   ├─ components/*.md       ← component specs (atoms → templates)
   ├─ taste/                ← anti-slop doctrine, 138 aesthetic systems, motion grammar
   ├─ design-systems/       ← interop crosswalk + library/<name>/DESIGN.md (138 brands)
   ├─ frameworks/           ← adapter protocol + React/Next/SwiftUI/… adapters
   ├─ accessibility/        ← WCAG checklist, ARIA patterns, i18n-rtl, cognitive, vision
   ├─ workflows/            ← design-review, qa, handoff, prototyping, redesign-audit, governance
   ├─ content/voice-tone.md ← UX writing / voice & tone
   └─ scripts/              ← validate_tokens · validate_contrast · lint_hardcodes · accuracy_report ·
                              verify_states · verify_responsive · measure_render · build_tokens · …
scripts/figma/              ← figma-pull · audit-components · audit-variants · extract-tokens
```
