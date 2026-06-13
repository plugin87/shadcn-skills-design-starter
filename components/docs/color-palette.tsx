import * as React from "react"

import { palette } from "@/lib/tokens"

export function ColorPalette() {
  return (
    <div className="space-y-6">
      {palette.map((scale) => (
        <section key={scale.name} className="space-y-2">
          <div className="flex items-baseline gap-2">
            <h3 className="text-sm font-medium capitalize text-foreground">
              {scale.name}
            </h3>
            {scale.name === "blue" && (
              <span className="font-mono text-xs text-primary">brand · primary</span>
            )}
            <span className="ml-auto font-mono text-xs text-muted-foreground">
              {scale.swatches.length} steps
            </span>
          </div>
          <div className="grid grid-cols-11 gap-1.5">
            {scale.swatches.map((swatch) => (
              <div key={swatch.step} className="space-y-1">
                <div
                  className="aspect-square w-full rounded-md border border-border/40 shadow-sm"
                  style={{ background: swatch.value }}
                  title={`${scale.name}/${swatch.step} — ${swatch.value}`}
                />
                <div className="text-center font-mono text-[10px] leading-none text-muted-foreground">
                  {swatch.step}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
