<div align="center">

# shadcn-skills-design-starter

**A Next.js starter where the design system is driven by Figma — and Claude Code knows how to build with it.**

Figma variables → design tokens → a fully wired **Next.js + shadcn/ui + Tailwind v4** app,
with a built-in **Claude Code skill** that keeps every UI change on-token.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-new--york-000000)
![Design tokens](https://img.shields.io/badge/design%20tokens-1%2C804-2563EB)

</div>

---

## ✨ What's inside

- **Token-driven theme** — `1,804` design variables exported from Figma, compiled 1:1 into CSS tokens. The theme is **blue-primary** (`--primary` = blue-600) with full **light + dark** support.
- **Single source of truth** — colors, radius, typography, spacing, opacity and more all live in one generated reference. Nothing is hardcoded.
- **shadcn/ui + Tailwind v4** — CSS-first config (`@theme inline`), `new-york` style, neutral base, lucide icons.
- **A Claude Code skill** — [`.claude/skills/shadcn-ui-design`](.claude/skills/shadcn-ui-design) teaches the agent the rules, tokens, and workflow so AI-assisted UI work stays consistent.
- **Reproducible** — a single script regenerates the token reference and all assets from the Figma export and asserts the count is exactly `1,804`.

## 🧱 Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) · React 19 · TypeScript |
| Styling | Tailwind CSS v4 (CSS-first, OKLCH colors) |
| Components | shadcn/ui (`new-york`, baseColor `neutral`, CSS variables) |
| Utilities | `clsx` + `tailwind-merge` (`cn()`), `class-variance-authority`, `lucide-react`, `next-themes` |
| Tokens | Figma variables → `variables-export.json` → generated `DESIGN.md` + `globals.css` |

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Add components with the shadcn CLI — they automatically pick up this project's config and tokens:

```bash
npx shadcn@latest add button card dialog input form
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## 📁 Project structure

```
.
├─ app/                     # App Router — layout, pages, globals.css (theme tokens)
├─ components/ui/           # shadcn primitives (added via CLI — not forked)
├─ lib/utils.ts             # cn() helper
├─ components.json          # shadcn config
├─ CLAUDE.md                # project guide for Claude Code
└─ .claude/skills/shadcn-ui-design/
   ├─ SKILL.md              # how to build UI in this project
   ├─ references/
   │  ├─ DESIGN.md          # full token reference — 1,804 vars (§A–§P)
   │  └─ variables-export.json   # the Figma export (source of truth)
   ├─ assets/               # globals.css · components.json · lib/utils.ts
   └─ scripts/generate-tokens.py  # regenerates the reference + assets
```

## 🎨 Design tokens & Figma workflow

Tokens are **generated, never hand-edited**. The source of truth is the Figma file; code follows it.

```
Figma variables ──export──▶ references/variables-export.json
                                     │  scripts/generate-tokens.py
                                     ▼
        references/DESIGN.md  +  assets/{globals.css, components.json, lib/utils.ts}
                                     │  copy into the app
                                     ▼
                              app/globals.css  ──▶  Tailwind v4 @theme inline
```

**To change the theme:** update the Figma file → re-export to `references/variables-export.json` → run the generator → copy `assets/globals.css` to `app/globals.css`.

```bash
python3 .claude/skills/shadcn-ui-design/scripts/generate-tokens.py
```

The generator **asserts the variable count is exactly 1,804** and fails loudly if the export is incomplete — so the design system can't silently drift.

### Token map (`references/DESIGN.md`)

| Section | Contents |
| --- | --- |
| §A | shadcn/ui theme — 35 tokens (light + dark) + ready-to-use `globals.css` |
| §B–§C | Color primitives (`tw/colors`, `rdx/colors`) |
| §D | Border radius · §E Typography |
| §F–§L | Spacing & sizing (space, padding, margin, gap, height, max-h, max-w) |
| §M–§N | Border / stroke width · §O Opacity · §P Raw tokens |

## 🤖 Working with Claude Code

This repo ships with a project guide ([`CLAUDE.md`](CLAUDE.md)) and a UI skill
([`.claude/skills/shadcn-ui-design`](.claude/skills/shadcn-ui-design)). When you ask Claude Code to build or
edit UI, it follows the skill's rules:

- **Semantic tokens only** — `bg-primary`, `text-muted-foreground`, `border-border`; never `bg-blue-600` / `bg-[#...]`.
- **Add components via the CLI**, don't fork `components/ui/*`.
- **Pair surface/foreground**, keep `focus-visible` rings and `aria-*` intact.
- **Keep code tokens identical to Figma** — regenerate rather than hand-edit.

## 🗺️ Roadmap

- [ ] Wire `next-themes` `ThemeProvider` + a mode toggle (dependency is already installed)
- [ ] Add the first shadcn component set
- [ ] Fill in the Figma file URL in `CLAUDE.md` and set up Code Connect

---

<div align="center">
<sub>Design tokens are the source of truth · keep code and Figma in lockstep.</sub>
</div>
