import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ProgressDemo, ProgressStatesDemo } from "@/components/docs/showcase"

const meta = {
  title: "UI/Progress",
  // Reused docs demo for breadth/coverage. a11y is surfaced as "todo" (visible in
  // the panel) rather than enforced — these demos aren't hardened like the core set.
  parameters: { a11y: { test: "todo" } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <ProgressDemo /> }

export const States: Story = { render: () => <ProgressStatesDemo /> }
