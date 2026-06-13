import { notFound } from "next/navigation"
import type { Metadata } from "next"

import { ComponentPreview } from "@/components/docs/component-preview"
import { getAllSlugs, getDoc } from "@/lib/registry"

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = getDoc(slug)
  if (!doc) return {}
  return { title: `${doc.title} — Design System`, description: doc.description }
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const doc = getDoc(slug)
  if (!doc) notFound()

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-8 sm:py-12">
      {/* Heading */}
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {doc.title}
        </h1>
        <p className="text-base text-muted-foreground sm:text-lg">
          {doc.description}
        </p>
      </div>

      {/* Install command */}
      {doc.install && (
        <pre className="mt-6 overflow-x-auto rounded-lg border border-border bg-muted px-4 py-3 font-mono text-xs text-foreground">
          {doc.install}
        </pre>
      )}

      {/* Prose */}
      {doc.content && <div className="mt-6">{doc.content}</div>}

      {/* Examples */}
      {doc.examples && (
        <div className="mt-10 space-y-10">
          {doc.examples.map((example) => (
            <ComponentPreview
              key={example.title}
              title={example.title}
              description={example.description}
              className={example.className}
            >
              {example.preview}
            </ComponentPreview>
          ))}
        </div>
      )}
    </div>
  )
}
