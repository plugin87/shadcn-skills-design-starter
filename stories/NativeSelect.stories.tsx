import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { NativeSelectDemo } from "@/components/docs/extras"

const meta = {
  title: "UI/NativeSelect",
  // Reused docs demo for breadth/coverage; a11y is enforced (axe fails the run
  // on any violation), same as the core set.
  parameters: { a11y: { test: "error" } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <NativeSelectDemo /> }
