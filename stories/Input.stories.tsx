import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const meta = {
  title: "UI/Input",
  component: Input,
  args: { placeholder: "Email", type: "text", disabled: false },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = { args: { disabled: true } }

export const Invalid: Story = {
  render: (args) => <Input {...args} aria-invalid placeholder="Invalid input" />,
}

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label htmlFor="email">Email</Label>
      <Input {...args} id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
}

// Interaction test: typing updates the field value.
export const Typing: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByPlaceholderText("Email") as HTMLInputElement
    await userEvent.type(input, "hello@acme.com")
    await expect(input).toHaveValue("hello@acme.com")
  },
}
