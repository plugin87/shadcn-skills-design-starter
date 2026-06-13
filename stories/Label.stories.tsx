import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const meta = {
  title: "UI/Label",
  component: Label,
  args: { children: "Your name" },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithInput: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label {...args} htmlFor="name">
        Name
      </Label>
      <Input id="name" placeholder="Ada Lovelace" />
    </div>
  ),
}
