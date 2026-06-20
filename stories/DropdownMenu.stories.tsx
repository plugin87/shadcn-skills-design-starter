import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuDemo, DropdownCheckboxesDemo } from "@/components/docs/showcase"

const meta = {
  title: "UI/DropdownMenu",
  // Reused docs demo for breadth/coverage. a11y is surfaced as "todo" (visible in
  // the panel) rather than enforced — these demos aren't hardened like the core set.
  parameters: { a11y: { test: "todo" } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <DropdownMenuDemo /> }

export const DropdownCheckboxes: Story = { render: () => <DropdownCheckboxesDemo /> }

// Open the menu so the label / separator / items / shortcut in the portal mount.
export const Opened: Story = {
  render: () => <DropdownMenuDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /^open$/i }))
    const menu = within(document.body)
    await expect(await menu.findByRole("menuitem", { name: /profile/i })).toBeInTheDocument()
  },
}

// Every sub-component at once (group, checkbox, radio group, submenu) so the
// whole module is exercised. Driven via play(): open the menu, then hover the
// sub-trigger to mount the SubContent portal.
export const KitchenSink: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuCheckboxItem checked>Notifications</DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="comfortable">
          <DropdownMenuRadioItem value="comfortable">Comfortable</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>More tools</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Import</DropdownMenuItem>
            <DropdownMenuItem>Export</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /^menu$/i }))
    const menu = within(document.body)
    await userEvent.hover(await menu.findByText(/more tools/i))
    await expect(await menu.findByText(/import/i)).toBeInTheDocument()
  },
}
