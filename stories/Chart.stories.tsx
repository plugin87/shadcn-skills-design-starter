import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ChartDemo } from "@/components/docs/extras"

const meta = {
  title: "UI/Chart",
  // Reused docs demo for breadth/coverage. a11y is surfaced as "todo" (visible in
  // the panel) rather than enforced — these demos aren't hardened like the core set.
  parameters: { a11y: { test: "todo" } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <ChartDemo /> }
