import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { AlertDialogDemo } from "@/components/docs/showcase"

const meta = {
  title: "UI/AlertDialog",
  // Reused docs demo for breadth/coverage. a11y is surfaced as "todo" (visible in
  // the panel) rather than enforced — these demos aren't hardened like the core set.
  parameters: { a11y: { test: "todo" } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <AlertDialogDemo /> }

// Open the dialog so its header / footer / action / cancel content mount.
export const Opened: Story = {
  render: () => <AlertDialogDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /delete account/i }))
    const dialog = within(document.body)
    await expect(await dialog.findByRole("alertdialog")).toBeInTheDocument()
    await expect(dialog.getByRole("button", { name: /continue/i })).toBeInTheDocument()
  },
}
