import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, userEvent, within } from "storybook/test"
import { toast } from "sonner"

import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"

const meta = {
  title: "UI/Sonner (Toast)",
  component: Toaster,
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event created", {
          description: "Sunday, December 03 at 9:00 AM",
          action: { label: "Undo", onClick: () => {} },
        })
      }
    >
      Show toast
    </Button>
  ),
}

// Interaction test: clicking the trigger shows the toast.
export const FiresToast: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /show toast/i }))
    await expect(await screen.findByText("Event created")).toBeInTheDocument()
  },
}
