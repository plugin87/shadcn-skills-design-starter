import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { CollapsibleDemo } from "@/components/docs/showcase"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const meta = {
  title: "UI/Collapsible",
  parameters: { a11y: { test: "error" } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <CollapsibleDemo /> }

// Interaction test: toggling the trigger opens then closes the content. The
// wrappers carry no branches (already 100% on mount) — this verifies behavior.
export const Interactive: Story = {
  render: () => (
    <Collapsible className="w-72 space-y-2">
      <CollapsibleTrigger asChild>
        <Button variant="outline">Toggle details</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="rounded-md border p-3 text-sm">
        Hidden details revealed on open.
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: /toggle details/i })
    await expect(trigger).toHaveAttribute("data-state", "closed")

    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("data-state", "open")
    await expect(canvas.getByText(/hidden details revealed/i)).toBeVisible()

    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("data-state", "closed")
  },
}
