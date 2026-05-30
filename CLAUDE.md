# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project overview

A **Next.js (App Router) web app** whose UI is built with **shadcn/ui + Tailwind CSS v4**, driven
by a **design system whose source of truth is a Figma file**. The Figma variables are exported and
compiled into design tokens that the app consumes — so code and design stay in lockstep.

The theme is **blue-primary** (`--primary` = blue-600), with full light + dark support.

### Current status
- ✅ Design-system skill is in place: `.claude/skills/shadcn-ui-design/` (tokens, generator, assets).
- ⛔ The Next.js app is **not scaffolded yet** — `app/`, `package.json`, etc. do not exist. See **Setup** below.
- This is **not a git repo** yet; run `git init` before committing.

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
│  └─ ui/                           # shadcn primitives (added via CLI — don't fork)
├─ lib/
│  └─ utils.ts                      # cn() helper
├─ components.json                  # shadcn config
└─ .claude/
   └─ skills/shadcn-ui-design/      # the design-system skill (authority on tokens)
      ├─ SKILL.md                   # how to build UI in this project
      ├─ references/
      │  ├─ DESIGN.md               # full token reference — 1,804 vars (§A–§P)
      │  └─ variables-export.json   # Figma token export (source of truth)
      ├─ assets/                    # scaffold copied into the app
      │  ├─ globals.css · components.json · lib/utils.ts
      └─ scripts/generate-tokens.py # regenerates DESIGN.md + assets from the export
```

## Commands

```bash
# Dev loop (after Setup)
npm run dev                 # start dev server (http://localhost:3000)
npm run build && npm start  # production build
npm run lint                # eslint
npx tsc --noEmit            # typecheck

# shadcn components
npx shadcn@latest add button card dialog input form table   # add primitives

# Regenerate design tokens from the Figma export (see Token workflow)
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

## Token workflow (Figma → code)

The tokens are **generated, never hand-edited**. The loop:

```
Figma file (variables)
   │  export plugin (lazyyysync-variables-v1)
   ▼
references/variables-export.json   ← source of truth in-repo (1,804 variables)
   │  python3 scripts/generate-tokens.py
   ▼
references/DESIGN.md   +   assets/globals.css · components.json · lib/utils.ts
   │  copy assets into the app
   ▼
app/globals.css (consumed by Tailwind v4 @theme inline)
```

**To change a token:** update the Figma file → re-export to `references/variables-export.json` →
run `generate-tokens.py` → copy `assets/globals.css` to `app/globals.css`. The generator **asserts
the variable count is exactly 1,804** and fails loudly if the export is incomplete. Never edit color
values in `DESIGN.md` or `globals.css` by hand.

## Figma integration (MCP)

A Figma MCP server is available. Figma file: `<FIGMA_FILE_URL>` *(fill in when available)*.

- **Before any Figma write/read-via-JS**, load the required skill first (e.g. `/figma-use`, `/figma-generate-design`) — they are mandatory prerequisites for `use_figma` / design generation.
- **Design → code:** use `get_design_context` / `get_screenshot` / `get_metadata` to read a frame, then implement it as a Next.js page/component using **only this project's tokens** (never the raw colors Figma reports).
- **Code → design / mapping:** use Code Connect (`get_code_connect_map`, `add_code_connect_map`) to map `components/ui/*` to their Figma components, so design-to-code stays consistent.
- **Tokens:** the Figma variables are the upstream source — keep `references/variables-export.json` in sync with the file, then regenerate (see Token workflow). Do not diverge code tokens from Figma.

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
- Keep code tokens identical to the Figma export; regenerate rather than hand-edit.
- Verify before done: no hardcoded colors, light+dark both work, responsive, a11y, `npm run lint` + `tsc` pass.

**Don't**
- ❌ Hardcode colors/spacing/radius outside the token set.
- ❌ Fork `components/ui/*`; override with `className` + `cn()` instead.
- ❌ Edit generated files (`DESIGN.md`, `globals.css` values) by hand — change the Figma export and regenerate.
- ❌ Use raw Figma color values when implementing a design — map them to this project's semantic tokens.
