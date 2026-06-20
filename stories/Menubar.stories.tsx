import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { MenubarDemo } from "@/components/docs/showcase"

const meta = {
  title: "UI/Menubar",
  // Reused docs demo for breadth/coverage; a11y is enforced (axe fails the run
  // on any violation), same as the core set.
  parameters: { a11y: { test: "error" } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <MenubarDemo /> }

// Open the File menu so its content / items / separator / shortcut mount.
export const Opened: Story = {
  render: () => <MenubarDemo />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("menuitem", { name: /file/i }))
    const menu = within(document.body)
    await expect(await menu.findByRole("menuitem", { name: /new tab/i })).toBeInTheDocument()
  },
}

// Every sub-component (label, group, checkbox, radio group, submenu) so the
// whole module is exercised. Open the menu, then hover the submenu trigger.
export const KitchenSink: Story = {
  render: () => (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarLabel>Document</MenubarLabel>
          <MenubarGroup>
            <MenubarItem>
              New
              <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
          </MenubarGroup>
          <MenubarCheckboxItem checked>Autosave</MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup value="1">
            <MenubarRadioItem value="1">One</MenubarRadioItem>
            <MenubarRadioItem value="2">Two</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("menuitem", { name: /file/i }))
    const menu = within(document.body)
    await userEvent.hover(await menu.findByText(/share/i))
    await expect(await menu.findByText(/email link/i)).toBeInTheDocument()
  },
}
