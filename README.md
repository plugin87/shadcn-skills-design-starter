<div align="center">

# 🎨 shadcn-skills-design-starter

### A Next.js design-system starter where **DTCG tokens are the source of truth**, **Figma stays in lockstep**, and **Claude Code knows how to build with all of it.**

A production-ready **Next.js (App Router) + shadcn/ui + Tailwind v4** app, wired to a
**3-tier DTCG token system**, a **138-brand aesthetic library**, **any-framework code adapters**,
and **18 Claude Code skills** that turn design intent into on-token, accessible, gated UI.

<br/>

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-new--york-000000)
<br/>
![DTCG tokens](https://img.shields.io/badge/DTCG%20tokens-14%20files-2563EB)
![Claude Code skills](https://img.shields.io/badge/Claude%20skills-18-8B5CF6)
![Design systems](https://img.shields.io/badge/aesthetic%20library-138%20brands-EC4899)
![WCAG](https://img.shields.io/badge/WCAG-2.2%20AA%2FAAA-16A34A)
![Quality gates](https://img.shields.io/badge/quality%20gates-19%20scripts-F59E0B)

</div>

---

## 📖 Table of contents

- [What is this?](#-what-is-this)
- [Why it's different](#-why-its-different)
- [Tech stack](#-tech-stack)
- [Quick start](#-quick-start)
- [Project structure](#-project-structure)
- [The skill system](#-the-skill-system--18-skills-in-2-layers)
- [Design token workflow](#-design-token-workflow-dtcg--code--figma)
- [Component documentation site](#-component-documentation-site)
- [Quality gates & verification](#-quality-gates--verification-protocol)
- [Figma integration](#-figma-integration)
- [Working with Claude Code](#-working-with-claude-code)
- [Command cheatsheet](#-command-cheatsheet)
- [Security](#-security)

---

## 🌟 What is this?

This is a **batteries-included design-system workspace** for building UI with Claude Code. It bundles four things that normally live in four different repos:

| | |
| --- | --- |
| 🎯 **A real app** | Next.js 16 + React 19 + Tailwind v4 + shadcn/ui (`new-york`, neutral, light + dark), with a live **component documentation site** at `/docs`. |
| 🎨 **A token system** | A 3-tier **DTCG** (W3C Design Tokens) source of truth — 14 files (color, type, spacing, motion, shadow…) that compile to CSS variables and sync to Figma. |
| 🧠 **18 Claude Code skills** | One **authority skill** for building UI in *this* project + 17 portable **`ux-ui` skills** for tokens, a11y, QA, aesthetics, code-gen for any framework, and more. |
| 🛡️ **19 quality gates** | Runnable scripts that prove contrast, token-purity, a11y, responsiveness, and taste — so "done" means *measured*, not *claimed*. |

The theme is **blue-primary** (`--primary` = blue-600 `#2563eb`), WCAG-verified in both light and dark.

## 💡 Why it's different

Most starters give you components. This one gives you a **closed loop** between design and code, enforced by gates:

```
        DESIGN INTENT                 SOURCE OF TRUTH                 CODE                  PROOF
   ┌────────────────────┐        ┌────────────────────┐      ┌────────────────┐     ┌────────────────┐
   │  Figma file        │◀──────▶│  DTCG tokens/*.json │─────▶│  app/globals   │────▶│  19 gates pass │
   │  (downstream sync) │  REST  │  (14 files, 3-tier) │ build│  + components  │ run │  (contrast,    │
   │                    │  + MCP │                     │      │  + /docs site  │     │   a11y, taste) │
   └────────────────────┘        └────────────────────┘      └────────────────┘     └────────────────┘
```

- **One theme, everywhere** — every page renders from one CSS-variable layer. A page that "looks different" is a bug.
- **Nothing hardcoded** — no raw hex / px / `bg-blue-600`. A linter fails the build on drift.
- **Trust comes from gates** — contrast ratios and "WCAG pass" come from running a script, never from a confident sentence.

## 🧱 Tech stack

| Layer | Choice |
| --- | --- |
| **Framework** | Next.js 16 (App Router) · React 19 · TypeScript 5 |
| **Styling** | Tailwind CSS v4 (CSS-first `@theme inline`, no color config file) |
| **Components** | shadcn/ui — `new-york` style, baseColor `neutral`, CSS variables, lucide icons |
| **Primitives** | Radix UI · `cmdk` · `vaul` · `embla-carousel` · `react-day-picker` · `input-otp` · `sonner` · `recharts` · `@tanstack/react-table` |
| **Utilities** | `clsx` + `tailwind-merge` (`cn()`) · `class-variance-authority` · `next-themes` (class-based dark mode) · `date-fns` |
| **Tokens** | 3-tier **DTCG** set → `build_tokens.mjs` → CSS variables ↔ Figma Variables |
| **Skills** | [`ux-ui-agent-skills`](https://www.npmjs.com/package/ux-ui-agent-skills) `^2.3.1` + project-local `shadcn-ui-design` |

## 🚀 Quick start

```bash
npm install
npm run dev          # → http://localhost:3000  (landing + /docs component gallery)
```

Add shadcn primitives — they automatically pick up this project's config and tokens (don't fork them):

```bash
npx shadcn@latest add button card dialog input form table
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Typecheck |

## 📁 Project structure

```
.
├─ app/                          # App Router
│  ├─ layout.tsx                 # next-themes ThemeProvider (class-based dark mode)
│  ├─ page.tsx                   # landing
│  ├─ globals.css                # GENERATED theme tokens (never hand-edit color values)
│  └─ docs/[slug]/               # component documentation site (static-generated)
├─ components/
│  ├─ ui/                        # shadcn primitives (added via CLI — not forked)
│  └─ docs/                      # demos, showcase, app-sidebar, color-tokens, …
├─ lib/
│  ├─ utils.ts                   # cn() helper
│  ├─ registry.tsx               # slug → title/description/install/examples
│  ├─ navigation.ts              # sidebar nav data (plain, no JSX)
│  └─ tokens.ts                  # token helpers
├─ scripts/figma/                # Figma REST tooling (pull · audit · extract)
├─ AUDIT.md · VARIANTS.md        # reproducible coverage + variant audits
├─ CLAUDE.md                     # the project guide Claude Code reads first
└─ .claude/skills/
   ├─ shadcn-ui-design/          # ⭐ AUTHORITY for building UI in this app
   ├─ _ux-ui-shared/             # shared assets for the ux-ui skills (not a skill itself)
   │  ├─ tokens/*.json           # 🎯 DTCG token SOURCE OF TRUTH (14 files)
   │  ├─ components/*.md          # component specs (atoms → templates)
   │  ├─ taste/                   # anti-slop doctrine + motion grammar
   │  ├─ design-systems/library/  # 138 named aesthetic systems
   │  ├─ frameworks/              # adapter protocol + 16 framework adapters
   │  ├─ accessibility/           # WCAG checklist · ARIA patterns · i18n-rtl
   │  ├─ workflows/               # review · qa · handoff · governance
   │  ├─ content/                 # voice & tone
   │  └─ scripts/                 # 19 validators + gates + build_tokens.mjs
   └─ {design-tokens, a11y-audit, design-qa, …}/   # 17 ux-ui skills
```

## 🧠 The skill system — 18 skills in 2 layers

When you ask Claude Code to do design work, it loads the right skill automatically. There are **two layers**, and they have a clear contract: the `ux-ui` skills own *knowledge & gates*; for **building UI in this app they defer to `shadcn-ui-design`**.

### ⭐ Layer 1 — the authority

| Skill | Role |
| --- | --- |
| **`shadcn-ui-design`** | The single authority for **building/editing UI** in this Next.js app — semantic Tailwind utilities, shadcn CLI, no forking `components/ui/*`, blue-primary light+dark. Read it for any component / page / styling / dark-mode work. |

### 🎛️ Layer 2 — the 17 `ux-ui` skills

<details open>
<summary><b>Pick a skill by what you need</b></summary>

| Need | Skill(s) |
| --- | --- |
| Build/edit a component, page, styling, dark mode | **`shadcn-ui-design`** (authority) |
| Generate component code for **any framework** | `design-code` (React, Next, Vue, Svelte, Angular, Solid, Lit, SwiftUI, Flutter, Compose, RN, CSS-in-JS…) |
| Spec a component to the house quality bar | `design-component` |
| Create / extend / audit DTCG tokens, palettes, scales | `design-tokens`, `token-build`, `brandkit` |
| Apply a look or brand, redesign / polish | `apply-aesthetic` (138 systems), `redesign` |
| Accessibility, QA gates, design critique | `a11y-audit`, `design-qa`, `design-review` |
| Web Vitals, prototyping, UX copy, governance | `performance`, `prototype`, `ux-writing`, `governance` |
| Screenshot/image → code; migrate from another DS | `image-to-code`, `migrate-design-system` |
| Keep Figma ↔ code in sync | `figma-integration` |

</details>

## 🎨 Design token workflow (DTCG → code → Figma)

The **DTCG token files are the source of truth**. `app/globals.css` is **generated, never hand-edited**. Figma is a **downstream sync target**.

```
.claude/skills/_ux-ui-shared/tokens/*.json   ← SOURCE OF TRUTH (14 DTCG files)
        │
        │  node .claude/skills/_ux-ui-shared/scripts/build_tokens.mjs --out <css>
        ▼
   CSS variables  ──▶  consumed by Tailwind v4 @theme inline  ──▶  every component
        ▲
        └── Figma (downstream) — mirror tokens ↔ Variables via the `figma-integration` skill
```

### 3-tier architecture

| Tier | Example | Used where |
| --- | --- | --- |
| **Primitive** | `blue.600` = `#2563eb` | never referenced directly |
| **Semantic** | `action.primary` → `{primitive.blue.600}` | styling — **dark mode swaps here** |
| **Component** | `button.primary-bg-hover` | implementations |

The 14 files: `colors`, `typography`, `spacing`, `shadows`, `borders`, `breakpoints`, `motion`, `gradients`, `opacity`, `blur`, `sizing`, `states`, `theming`, `data-viz`. The build emits the **full** layer — colors **and** spacing / sizing / radius / opacity / shadow / motion / typography — so generated code in *any* framework resolves, not just colors.

### To change a token

```bash
# 1. edit the relevant DTCG file
#    .claude/skills/_ux-ui-shared/tokens/colors.json   (or spacing.json, …)

# 2. validate structure + alias resolution
python3 .claude/skills/_ux-ui-shared/scripts/validate_tokens.py

# 3. for color changes, prove contrast in light AND dark
python3 .claude/skills/_ux-ui-shared/scripts/validate_contrast.py

# 4. rebuild the CSS-variable layer
node .claude/skills/_ux-ui-shared/scripts/build_tokens.mjs --out dist/tokens.css

# 5. (optional) push to Figma via the figma-integration skill
```

> ⚠️ Never edit color/spacing/radius values in `app/globals.css` by hand — change the DTCG tokens and rebuild.

## 📚 Component documentation site

`/docs` is a static-generated gallery of the shadcn primitives, driven by a registry.

- **Coverage** (per [`AUDIT.md`](AUDIT.md)): **55** Figma components · **52** installed primitives · **54** documented pages · **0** hardcoded-color violations outside `ui/`.
- **Add a component** = add a nav item (`lib/navigation.ts`) + a registry entry (`lib/registry.tsx`) + a demo (`components/docs/`).
- **Reproducible audits**: `scripts/figma/audit-components.mjs` → `AUDIT.md` (coverage); `scripts/figma/audit-variants.mjs` → `VARIANTS.md` (variant axes).

## 🧪 Storybook — the dev/QA workbench

`/docs` is for **browsing**; **Storybook** is the **interactive workbench** for the dev & QA team — toggle props live, see every variant/state, flip light↔dark, run a11y checks, and run interaction tests in CI. It renders from the **same tokens** (`app/globals.css`) so it never drifts from the app.

```bash
npm run storybook        # dev workbench → http://localhost:6006
npm run build-storybook  # static build (storybook-static/)
npm run test-storybook   # run every story's play() as a Vitest browser test (chromium)
```

- **Stack** — Storybook 10 + `@storybook/nextjs-vite` (Vite builder, reuses `postcss.config.mjs`).
- **Addons** — **a11y** (axe on every story) · **themes** (light/dark toolbar, toggles `.dark` on `<html>`) · **vitest** (interaction tests) · **docs** (autodocs + prop tables from `argTypes`).
- **Stories** live in [`stories/`](stories) — currently a **core set of 16** primitives with rich controls and the 8 states (Button, Badge, Input, Label, Card, Checkbox, Switch, Select, Tabs, Dialog, Alert, Avatar, Tooltip, Spinner, Skeleton, Sonner). **Add one** = `stories/<Component>.stories.tsx` (CSF3 `Meta`/`StoryObj`, import from `@/components/ui/*`).
- Config: [`.storybook/main.ts`](.storybook/main.ts), [`.storybook/preview.tsx`](.storybook/preview.tsx), [`vitest.config.ts`](vitest.config.ts).

## 🛡️ Quality gates & verification protocol

> **Trust comes from reproducible gate output, not assertions.** Build *with* the gates, not after. Never state a contrast ratio or "WCAG pass" you didn't just measure.

<details open>
<summary><b>The 19 scripts in <code>_ux-ui-shared/scripts/</code></b></summary>

| Script | Proves |
| --- | --- |
| `build_tokens.mjs` | DTCG tokens → CSS variables (full layer) |
| `validate_tokens.py` | JSON validity + alias resolution |
| `validate_contrast.py` · `contrast.py` | WCAG 2.2 contrast, light + dark |
| `validate_theme_refs.py` | every `var(--…)` resolves to a defined token (no floating tokens) |
| `lint_hardcodes.py` | zero raw hex / px / ms / `bg-blue-600` palette utilities |
| `lint_taste.py` · `taste_audit.mjs` | anti-slop: type-scale contrast, repetition, palette sprawl, emoji-as-icon |
| `check_no_emoji.py` | no emoji used as icons |
| `verify_states.mjs` | the 8 states (default/hover/focus/active/disabled/loading/error/selected) |
| `verify_responsive.mjs` | no overflow at 280 / 320 / 414px |
| `verify_rtl.mjs` · `verify_focustrap.mjs` | RTL mirroring · modal focus trap + return focus |
| `axe_audit.mjs` | automated a11y (axe) |
| `validate_component_spec.py` · `scaffold_component.py` | spec completeness · scaffold a new component |
| `measure_render.mjs` | real-render measurement |
| `accuracy_report.mjs` | **one-command gate** — tokens + contrast + spec + no-hardcode + theme-refs + no-emoji + real-render WCAG (light & dark) |
| `design_systems.py` | resolve a named aesthetic from the 138-brand library |

</details>

```bash
# the single command to run before declaring UI "done"
node .claude/skills/_ux-ui-shared/scripts/accuracy_report.mjs
```

## 🔗 Figma integration

Two paths, because the MCP tool-call limit on lower Figma tiers is hit fast:

- **MCP server** (`.mcp.json`) — `get_design_context` / `get_screenshot` / `get_metadata` to read a frame and implement it with **this project's tokens** (never raw Figma colors); Code Connect to map `components/ui/*` ↔ Figma components.
- **REST tooling** (`scripts/figma/`) — `figma-pull.mjs` reads colors + variable bindings and maps Figma sRGB → tokens via OKLab ΔE; `extract-tokens.mjs`, `audit-components.mjs`, `audit-variants.mjs` for drift checks. Reads the PAT from `$FIGMA_PERSONAL_ACCESS_TOKEN`.

> Load the relevant `/figma-*` skill **before** any Figma write/read-via-JS — they're mandatory prerequisites for `use_figma` / design generation. Tokens flow **DTCG → Figma** (Figma is downstream); keep the two consistent.

## 🤖 Working with Claude Code

This repo ships a project guide ([`CLAUDE.md`](CLAUDE.md)) that Claude Code reads first. Core rules it enforces on every UI change:

- ✅ **Semantic tokens only** — `bg-primary`, `text-muted-foreground`, `bg-primary text-primary-foreground`, `border-border`.
- ❌ **Never hardcode** colors/spacing/radius — no raw hex/px, no `bg-blue-*` palette utilities. The theme is blue → use `bg-primary`.
- 🧩 **Add primitives via the CLI** (`npx shadcn@latest add …`) — override with `className` + `cn()`, never fork `components/ui/*`.
- 🌗 **Pair surface/foreground** (`bg-card` → `text-card-foreground`), keep `focus-visible` rings and `aria-*` intact.
- 🔁 **Change tokens at the source** — edit DTCG `tokens/*.json` and rebuild; never hand-edit generated CSS.
- 📊 **Run the gates and report real output** before claiming done.

## ⌨️ Command cheatsheet

```bash
# Dev loop
npm run dev                         # dev server
npm run build && npm start          # production
npm run lint && npx tsc --noEmit    # lint + typecheck

# Storybook (dev/QA workbench)
npm run storybook                   # → http://localhost:6006
npm run build-storybook             # static build
npm run test-storybook              # interaction tests (Vitest browser / chromium)

# shadcn primitives
npx shadcn@latest add button card dialog input form table

# Tokens
node .claude/skills/_ux-ui-shared/scripts/build_tokens.mjs --out dist/tokens.css
python3 .claude/skills/_ux-ui-shared/scripts/validate_tokens.py
python3 .claude/skills/_ux-ui-shared/scripts/validate_contrast.py

# Quality gate (run before "done")
node .claude/skills/_ux-ui-shared/scripts/accuracy_report.mjs

# Figma sync + audits
node scripts/figma/figma-pull.mjs
node scripts/figma/audit-components.mjs   # → AUDIT.md
node scripts/figma/audit-variants.mjs     # → VARIANTS.md
```

## 🔒 Security

- **`.mcp.json` is gitignored** — it holds a live Figma Personal Access Token (`figd_…`) and must never be committed. If your token has ever been shared, **revoke and reissue it** in Figma → Settings → Personal access tokens, then update your local `.mcp.json`.
- Token-consuming scripts read from the `$FIGMA_PERSONAL_ACCESS_TOKEN` environment variable — they never hardcode the secret.

---

<div align="center">
<sub><b>DTCG tokens are the source of truth · code and Figma stay in lockstep · every "done" is gated.</b></sub>
</div>
