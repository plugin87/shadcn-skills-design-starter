import * as React from "react"

import { themeTokens, type ThemeToken } from "@/lib/tokens"

function TokenRow({ token }: { token: ThemeToken }) {
  return (
    <div className="flex items-center gap-4 px-4 py-3">
      <div
        className="size-10 shrink-0 rounded-md border border-border shadow-sm"
        style={{ background: `var(--${token.name})` }}
      />
      <code className="min-w-0 flex-1 truncate font-mono text-sm text-foreground">
        --{token.name}
      </code>
      <div className="hidden shrink-0 flex-col items-end gap-0.5 text-right font-mono text-xs text-muted-foreground sm:flex">
        <span>
          <span className="text-muted-foreground/50">L</span> {token.light}
        </span>
        <span>
          <span className="text-muted-foreground/50">D</span> {token.dark}
        </span>
      </div>
    </div>
  )
}

function TokenGroup({
  title,
  tokens,
}: {
  title: string
  tokens: ThemeToken[]
}) {
  if (!tokens.length) return null
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {tokens.map((token) => (
          <TokenRow key={token.name} token={token} />
        ))}
      </div>
    </section>
  )
}

export function ColorTokens() {
  const charts = themeTokens.filter((t) => t.name.startsWith("chart-"))
  const sidebar = themeTokens.filter((t) => t.name.startsWith("sidebar"))
  const core = themeTokens.filter(
    (t) => !t.name.startsWith("chart-") && !t.name.startsWith("sidebar"),
  )

  return (
    <div className="space-y-8">
      <p className="text-right text-xs text-muted-foreground">
        <span className="text-muted-foreground/50">L</span> light&nbsp;&nbsp;
        <span className="text-muted-foreground/50">D</span> dark
      </p>
      <TokenGroup title="Theme" tokens={core} />
      <TokenGroup title="Charts" tokens={charts} />
      <TokenGroup title="Sidebar" tokens={sidebar} />
    </div>
  )
}
