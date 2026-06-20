import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"
import { CalendarDays, Settings, Smile, User } from "lucide-react"

import { CommandDemo } from "@/components/docs/showcase"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

const meta = {
  title: "UI/Command",
  // a11y is enforced: the decorative separator is now aria-hidden, so the
  // listbox no longer owns a disallowed role=separator child.
  parameters: { a11y: { test: "error" } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <CommandDemo /> }

// Shared palette body so the dialog stories mirror the inline demo.
function CommandPalette() {
  return (
    <>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <CalendarDays />
            Calendar
          </CommandItem>
          <CommandItem>
            <Smile />
            Search Emoji
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User />
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            Settings
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </>
  )
}

// Renders CommandDialog with its defaults (title / description / showCloseButton)
// — covers the CommandDialog function and the default side of its arg branches.
export const Dialog: Story = {
  name: "As dialog (defaults)",
  render: () => (
    <CommandDialog defaultOpen>
      <CommandPalette />
    </CommandDialog>
  ),
  play: async () => {
    // The dialog portals to document.body, outside the story canvas. Assert it
    // mounted (not toBeVisible — the entrance animation starts at opacity 0).
    const body = within(document.body)
    await expect(await body.findByRole("dialog")).toBeInTheDocument()
    await expect(body.getByPlaceholderText(/type a command/i)).toBeInTheDocument()
  },
}

// Explicit props exercise the "provided" side of each default-arg branch and
// the showCloseButton={false} path.
export const DialogCustomized: Story = {
  name: "As dialog (custom title, no close button)",
  render: () => (
    <CommandDialog
      defaultOpen
      title="Search palette"
      description="Find and run any command"
      showCloseButton={false}
    >
      <CommandPalette />
    </CommandDialog>
  ),
}
