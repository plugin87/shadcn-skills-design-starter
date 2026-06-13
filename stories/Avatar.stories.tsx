import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar"

const SRC = "https://github.com/shadcn.png"

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  args: { size: "default" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "default", "lg"] },
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Image: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={SRC} alt="shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Avatar key={size} size={size}>
          <AvatarImage src={SRC} alt="shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
}

export const WithBadge: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src={SRC} alt="shadcn" />
      <AvatarFallback>CN</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      {["AB", "CD", "EF"].map((f) => (
        <Avatar key={f}>
          <AvatarFallback>{f}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>+4</AvatarGroupCount>
    </AvatarGroup>
  ),
}
