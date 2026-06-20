import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PopoverDemo } from "@/components/docs/showcase"

const meta = {
  title: "UI/Popover",
  // Reused docs demo for breadth/coverage. a11y is surfaced as "todo" (visible in
  // the panel) rather than enforced — these demos aren't hardened like the core set.
  parameters: { a11y: { test: "todo" } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <PopoverDemo /> }

// Open the popover so its content mounts.
export const Opened: Story = {
  render: () => <PopoverDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /open popover/i }))
    const pop = within(document.body)
    await expect(
      await pop.findByRole("heading", { name: /dimensions/i })
    ).toBeInTheDocument()
  },
}

// Anchored variant covers PopoverAnchor + the Header/Title/Description parts.
// Opened via the trigger (a defaultOpen popover with no trigger throws in test).
export const Anchored: Story = {
  render: () => (
    <Popover>
      <PopoverAnchor asChild>
        <div className="rounded-md border px-3 py-2 text-sm">Anchored here</div>
      </PopoverAnchor>
      <PopoverTrigger asChild>
        <Button variant="outline" className="mt-2">
          Open
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" aria-labelledby="anchored-popover-title">
        <PopoverHeader>
          <PopoverTitle id="anchored-popover-title">Quick settings</PopoverTitle>
          <PopoverDescription>Adjust the layer below.</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /^open$/i }))
    const pop = within(document.body)
    // PopoverTitle renders a div (not a heading), so match by text.
    await expect(await pop.findByText(/quick settings/i)).toBeInTheDocument()
  },
}
