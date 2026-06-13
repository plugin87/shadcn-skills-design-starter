import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  args: { disabled: false },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { "aria-label": "Accept terms" } }

export const Checked: Story = {
  args: { defaultChecked: true, "aria-label": "Accept terms" },
}

export const Disabled: Story = {
  args: { disabled: true, "aria-label": "Accept terms" },
}

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

// Interaction test: clicking toggles the checked state.
export const Toggle: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} id="toggle" />
      <Label htmlFor="toggle">Toggle me</Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const box = canvas.getByRole("checkbox")
    await expect(box).not.toBeChecked()
    await userEvent.click(box)
    await expect(box).toBeChecked()
  },
}
