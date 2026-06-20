import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fireEvent, userEvent, within } from "storybook/test"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { ContextMenuDemo } from "@/components/docs/showcase"

const meta = {
  title: "UI/ContextMenu",
  // Reused docs demo for breadth/coverage; a11y is enforced (axe fails the run
  // on any violation), same as the core set.
  parameters: { a11y: { test: "error" } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <ContextMenuDemo /> }

// Right-click opens the menu so its items / separator / checkbox-item mount
// (the closed trigger alone leaves the portal content uncovered).
export const Opened: Story = {
  render: () => <ContextMenuDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await fireEvent.contextMenu(canvas.getByText(/right-click here/i))
    const menu = within(document.body)
    await expect(await menu.findByRole("menuitem", { name: /reload/i })).toBeInTheDocument()
  },
}

// Every sub-component (label, group, checkbox, radio group, submenu) so the
// whole module is exercised. Open via right-click, then hover the submenu.
export const KitchenSink: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-32 w-full max-w-sm items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
        Right-click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuLabel>Actions</ContextMenuLabel>
        <ContextMenuGroup>
          <ContextMenuItem>
            Copy
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuCheckboxItem checked>Show grid</ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="a">
          <ContextMenuRadioItem value="a">Option A</ContextMenuRadioItem>
          <ContextMenuRadioItem value="b">Option B</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
        <ContextMenuSub>
          <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem>Deep item</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await fireEvent.contextMenu(canvas.getByText(/right-click here/i))
    const menu = within(document.body)
    await userEvent.hover(await menu.findByText(/^more$/i))
    await expect(await menu.findByText(/deep item/i)).toBeInTheDocument()
  },
}
