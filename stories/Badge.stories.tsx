import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BadgeCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"

const meta = {
  title: "UI/Badge",
  component: Badge,
  args: { children: "Badge", variant: "default" },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge {...args} variant="default">Default</Badge>
      <Badge {...args} variant="secondary">Secondary</Badge>
      <Badge {...args} variant="destructive">Destructive</Badge>
      <Badge {...args} variant="outline">Outline</Badge>
    </div>
  ),
}

export const WithIcon: Story = {
  render: (args) => (
    <Badge {...args} variant="secondary">
      <BadgeCheck />
      Verified
    </Badge>
  ),
}

// Renders as a child element (asChild) — covers the Slot branch.
export const AsChild: Story = {
  name: "As link (asChild)",
  render: (args) => (
    <Badge {...args} asChild>
      <a href="#docs">Link badge</a>
    </Badge>
  ),
}
