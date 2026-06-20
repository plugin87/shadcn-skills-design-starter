import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { SheetDemo } from "@/components/docs/showcase"

const meta = {
  title: "UI/Sheet",
  // Reused docs demo for breadth/coverage. a11y is surfaced as "todo" (visible in
  // the panel) rather than enforced — these demos aren't hardened like the core set.
  parameters: { a11y: { test: "todo" } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <SheetDemo /> }

// Open the sheet so its content / header / title / description mount.
export const Opened: Story = {
  render: () => <SheetDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /^open$/i }))
    const sheet = within(document.body)
    await expect(await sheet.findByText(/edit profile/i)).toBeInTheDocument()
  },
}
