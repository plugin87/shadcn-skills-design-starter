import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, userEvent, waitFor, within } from "storybook/test"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const meta = {
  title: "UI/Dialog",
  component: Dialog,
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="Ada Lovelace" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// showCloseButton={false} — covers that branch (no built-in X; footer handles close).
export const NoCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Subscription</DialogTitle>
          <DialogDescription>Choose how you want to continue.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Maybe later</Button>
          </DialogClose>
          <Button>Subscribe</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  // open it so the showCloseButton={false} branch renders, then close.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /open/i }))
    const dialog = await screen.findByRole("dialog")
    await expect(within(dialog).getByText("Subscription")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", { name: /maybe later/i }))
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    )
  },
}

// Interaction test: open the dialog, assert content, then close it.
export const OpenAndClose: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /edit profile/i }))
    const dialog = await screen.findByRole("dialog")
    await expect(dialog).toBeInTheDocument()
    await expect(within(dialog).getByText("Edit profile")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }))
    // wait out the Radix exit animation before asserting removal
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    )
  },
}
