import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AccordionDemo, AccordionStatesDemo } from "@/components/docs/demos"

const meta = {
  title: "UI/Accordion",
  // Reused docs demo for breadth/coverage; a11y is enforced (axe fails the run
  // on any violation), same as the core set.
  parameters: { a11y: { test: "error" } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <AccordionDemo /> }

export const States: Story = { render: () => <AccordionStatesDemo /> }
