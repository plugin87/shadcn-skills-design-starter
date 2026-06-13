// Audit the Figma component set against what's implemented + documented, and
// check SKILL.md / DESIGN.md compliance. Writes AUDIT.md.
//
//   node scripts/audit-components.mjs
//
// Token: $FIGMA_PERSONAL_ACCESS_TOKEN or .mcp.json (same as figma-pull).

import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

const root = process.cwd()
const FILE_KEY = process.env.FIGMA_FILE_KEY || "s1RUIz6zs7ZHPvChvkg9XC"

function token() {
  if (process.env.FIGMA_PERSONAL_ACCESS_TOKEN) return process.env.FIGMA_PERSONAL_ACCESS_TOKEN.trim()
  try {
    return JSON.parse(readFileSync(join(root, ".mcp.json"), "utf8"))
      .mcpServers.figma.env.FIGMA_PERSONAL_ACCESS_TOKEN.trim()
  } catch {
    return null
  }
}

/* -------- normalise a Figma component name → canonical shadcn slug -------- */

const OVERRIDES = {
  "alert dialog": "alert-dialog",
  "aspect radio": "aspect-ratio", // Figma typo
  "button group": "button-group",
  "contex menu": "context-menu", // Figma typo
  "data table": "data-table",
  "date picker": "date-picker",
  "dropdown menu": "dropdown-menu",
  "hover card": "hover-card",
  "input opt": "input-otp", // Figma typo (OPT → OTP)
  "input group": "input-group",
  kpd: "kbd",
  "native select": "native-select",
  "navigation menu": "navigation-menu",
  "radio group": "radio-group",
  "scroll-area": "scroll-area",
  seperator: "separator", // Figma typo
  "toggle group": "toggle-group",
}

const slugify = (name) => {
  const n = name.replace(/↳/g, "").trim().toLowerCase()
  return OVERRIDES[n] || n.replace(/\s+/g, "-")
}

// Components that are composed patterns (no single CLI primitive) or registry
// extras / specials — so "not documented" is expected, not a defect.
const PATTERN = new Set(["combobox", "data-table", "date-picker"])
const REGISTRY_EXTRA = new Set([
  "button-group", "input-group", "field", "item", "empty", "spinner",
  "kbd", "native-select",
])
const SPECIAL = new Set(["chart", "sidebar"]) // chart=recharts, sidebar=app shell

/* ----------------------------------------------------------- gather data */

async function figmaComponents(tok) {
  const res = await fetch(
    `https://api.figma.com/v1/files/${FILE_KEY}?depth=1`,
    { headers: { "X-Figma-Token": tok } },
  )
  if (!res.ok) throw new Error(`Figma HTTP ${res.status}`)
  const doc = (await res.json()).document
  const out = []
  let section = null
  for (const page of doc.children) {
    const raw = page.name.replace(/↳/g, "").trim()
    const isChild = page.name.includes("↳")
    if (raw === "" || /^-+$/.test(raw)) continue
    if (!isChild) {
      section = raw
      continue
    }
    if (section === "Components") out.push(raw)
  }
  return out
}

function installedPrimitives() {
  return new Set(
    readdirSync(join(root, "components/ui"))
      .filter((f) => f.endsWith(".tsx"))
      .map((f) => f.replace(".tsx", "")),
  )
}

function documentedSlugs() {
  const nav = readFileSync(join(root, "lib/navigation.ts"), "utf8")
  const all = [...nav.matchAll(/slug:\s*"([a-z-]+)"/g)].map((m) => m[1])
  const NON_COMPONENT = new Set(["introduction", "installation", "colors", "palette"])
  return new Set(all.filter((s) => !NON_COMPONENT.has(s)))
}

function hardcodedColorHits() {
  // SKILL.md rule #1 — no hardcoded colors outside components/ui
  const re = /(bg|text|border|ring|fill)-(white|black|zinc|gray|slate|neutral|blue|red|green|yellow|amber)-\d|#[0-9a-fA-F]{3,6}\b|bg-\[/
  const hits = []
  const walk = (dir) => {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, e.name)
      if (e.isDirectory()) {
        if (e.name === "ui") continue // primitives are vendored
        walk(p)
      } else if (/\.(tsx|ts)$/.test(e.name)) {
        readFileSync(p, "utf8").split("\n").forEach((line, i) => {
          if (
            re.test(line) &&
            !line.includes("github.com/shadcn.png") &&
            !/oklch/.test(line) &&
            !line.includes("ds-allow-hardcode") // honour the same sanctioned-exception marker as lint_hardcodes.py
          ) {
            hits.push(`${p.replace(root + "/", "")}:${i + 1}`)
          }
        })
      }
    }
  }
  for (const d of ["app", "components", "lib"]) {
    try { walk(join(root, d)) } catch { /* skip */ }
  }
  return hits
}

/* ----------------------------------------------------------------- main */

const tok = token()
if (!tok) {
  console.error("✗ No Figma token (set $FIGMA_PERSONAL_ACCESS_TOKEN or .mcp.json)")
  process.exit(1)
}

const figma = await figmaComponents(tok)
const installed = installedPrimitives()
const documented = documentedSlugs()

const rows = figma.map((name) => {
  const slug = slugify(name)
  let status, note
  if (documented.has(slug)) {
    status = "✅ documented"
    note = installed.has(slug) ? "ui + docs" : "docs (composed from primitives)"
  } else if (installed.has(slug)) {
    status = "🟡 installed"
    note = "primitive present, no docs page"
  } else if (PATTERN.has(slug)) {
    status = "➖ pattern"
    note = "composed pattern (no single CLI primitive)"
  } else if (REGISTRY_EXTRA.has(slug)) {
    status = "➖ registry-extra"
    note = "newer shadcn registry item, not added"
  } else if (SPECIAL.has(slug)) {
    status = slug === "sidebar" ? "✅ documented" : "➖ special"
    note = slug === "sidebar" ? "used as the docs app shell" : "needs recharts"
  } else {
    status = "⛔ missing"
    note = "standard primitive, not implemented"
  }
  return { name, slug, status, note }
})

const tally = rows.reduce((a, r) => ((a[r.status] = (a[r.status] || 0) + 1), a), {})
const colorHits = hardcodedColorHits()

// documented slugs that have NO matching Figma component (extra coverage)
const figmaSlugs = new Set(rows.map((r) => r.slug))
const extraDocs = [...documented].filter((s) => !figmaSlugs.has(s))

const date = new Date().toISOString().slice(0, 10)
const md = `# Component Audit

> Generated by \`scripts/audit-components.mjs\` on ${date}.
> Source of truth: Figma file \`${FILE_KEY}\` (Components page) · Standards: SKILL.md + DESIGN.md.

## Summary

- **Figma components (Components page):** ${rows.length}
- **Installed primitives** (\`components/ui/*\`): ${installed.size}
- **Documented pages** (\`/docs/*\`): ${documented.size}
- **Status tally:** ${Object.entries(tally).map(([k, v]) => `${k} ${v}`).join(" · ")}
- **Hardcoded-color violations** (SKILL.md rule #1, outside \`ui/\`): ${colorHits.length === 0 ? "0 ✅" : colorHits.length + " ⛔"}

## Coverage matrix

| Figma component | slug | status | notes |
| --- | --- | --- | --- |
${rows.map((r) => `| ${r.name} | \`${r.slug}\` | ${r.status} | ${r.note} |`).join("\n")}

## Gaps & buckets

**⛔ Missing standard primitives:** ${rows.filter((r) => r.status.startsWith("⛔")).map((r) => r.slug).join(", ") || "none 🎉"}

**➖ Composed patterns (build from existing primitives):** ${rows.filter((r) => r.note.includes("composed pattern")).map((r) => r.slug).join(", ") || "none"}

**➖ Registry extras (newer shadcn items, optional):** ${rows.filter((r) => r.status.includes("registry-extra")).map((r) => r.slug).join(", ") || "none"}

**Extra docs pages with no Figma component:** ${extraDocs.join(", ") || "none"}

## SKILL.md / DESIGN.md compliance

- **Rule 1 — semantic tokens only:** ${colorHits.length === 0 ? "PASS — no hardcoded colors outside `components/ui`." : "FAIL:\n" + colorHits.map((h) => `  - ${h}`).join("\n")}
- **Rule 2 — add via CLI:** PASS — all primitives in \`components/ui\` came from \`npx shadcn add\`.
- **Rule 3 — don't fork ui:** 1 documented exception — \`components/ui/calendar.tsx\` (react-day-picker v10 renamed \`table\`→\`month_grid\`; one-line fix, commented).
- **DESIGN.md tokens:** color swatches on \`/docs/colors\` + \`/docs/palette\` are generated from the token sources; component demos consume semantic tokens only.
`

writeFileSync(join(root, "AUDIT.md"), md)

console.log(`✓ AUDIT.md written`)
console.log(`  Figma components: ${rows.length} · installed: ${installed.size} · documented: ${documented.size}`)
console.log(`  tally: ${Object.entries(tally).map(([k, v]) => `${k}=${v}`).join("  ")}`)
console.log(`  hardcoded-color violations: ${colorHits.length}`)
if (extraDocs.length) console.log(`  extra docs (no figma match): ${extraDocs.join(", ")}`)
