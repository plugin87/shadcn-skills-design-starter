import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { CalendarDemo } from "@/components/docs/showcase"

const meta = {
  title: "UI/Calendar",
  // Reused docs demo for breadth/coverage; a11y is enforced (axe fails the run
  // on any violation), same as the core set.
  parameters: { a11y: { test: "error" } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <CalendarDemo /> }
