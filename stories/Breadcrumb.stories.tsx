import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { BreadcrumbDemo, BreadcrumbDropdownDemo } from "@/components/docs/showcase"
import { BreadcrumbSeparatorDemo, BreadcrumbCollapsedDemo } from "@/components/docs/extras"

const meta = {
  title: "UI/Breadcrumb",
  // Reused docs demo for breadth/coverage; a11y is enforced (axe fails the run
  // on any violation), same as the core set.
  parameters: { a11y: { test: "error" } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <BreadcrumbDemo /> }

export const Separator: Story = { render: () => <BreadcrumbSeparatorDemo /> }

export const Collapsed: Story = { render: () => <BreadcrumbCollapsedDemo /> }

export const Dropdown: Story = { render: () => <BreadcrumbDropdownDemo /> }
