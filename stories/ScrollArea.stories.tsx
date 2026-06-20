import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { ScrollAreaDemo } from "@/components/docs/showcase"

const meta = {
  title: "UI/ScrollArea",
  // a11y is enforced: the scroll viewport is now keyboard-focusable (tabIndex),
  // clearing the scrollable-region-focusable violation, so this passes axe.
  parameters: { a11y: { test: "error" } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <ScrollAreaDemo /> }
