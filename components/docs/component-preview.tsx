import * as React from "react"

import { cn } from "@/lib/utils"

interface ComponentPreviewProps {
  title?: string
  description?: string
  className?: string
  children: React.ReactNode
}

export function ComponentPreview({
  title,
  description,
  className,
  children,
}: ComponentPreviewProps) {
  return (
    <div className="space-y-3">
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div className="flex min-h-60 w-full items-center justify-center rounded-xl border border-border bg-card p-8 text-card-foreground shadow-sm sm:p-10">
        <div className={cn("flex w-full items-center justify-center", className)}>
          {children}
        </div>
      </div>
    </div>
  )
}
