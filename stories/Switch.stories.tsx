import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const meta = {
  title: "UI/Switch",
  component: Switch,
  args: { size: "default", disabled: false },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "default"] },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Switch {...args} size="sm" />
      <Switch {...args} size="default" />
    </div>
  ),
}

export const Checked: Story = { args: { defaultChecked: true } }

export const Disabled: Story = { args: { disabled: true } }

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} id="airplane" />
      <Label htmlFor="airplane">Airplane mode</Label>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const sw = canvas.getByRole("switch")
    await userEvent.click(sw)
    await expect(sw).toBeChecked()
  },
}
