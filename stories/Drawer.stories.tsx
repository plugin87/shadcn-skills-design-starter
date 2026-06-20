import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { DrawerDemo } from "@/components/docs/showcase"

const meta = {
  title: "UI/Drawer",
  // Reused docs demo for breadth/coverage. a11y is surfaced as "todo" (visible in
  // the panel) rather than enforced — these demos aren't hardened like the core set.
  parameters: { a11y: { test: "todo" } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <DrawerDemo /> }

// Open the drawer so its content / header / footer / close mount.
export const Opened: Story = {
  render: () => <DrawerDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /open drawer/i }))
    const drawer = within(document.body)
    await expect(await drawer.findByText(/move goal/i)).toBeInTheDocument()
  },
}
