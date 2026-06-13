import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { ArrowRight, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

const meta = {
  title: "UI/Button",
  component: Button,
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} variant="default">Default</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="destructive">Destructive</Button>
      <Button {...args} variant="outline">Outline</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="link">Link</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="default">Default</Button>
      <Button {...args} size="lg">Large</Button>
      <Button {...args} size="icon" aria-label="Next">
        <ArrowRight />
      </Button>
    </div>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Mail />
      Login with email
    </Button>
  ),
}

export const Loading: Story = {
  args: { disabled: true },
  render: (args) => (
    <Button {...args}>
      <Spinner />
      Loading
    </Button>
  ),
}

export const Disabled: Story = {
  args: { disabled: true },
}

// Interaction test: clicking the button fires onClick.
export const Clickable: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /button/i }))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}
