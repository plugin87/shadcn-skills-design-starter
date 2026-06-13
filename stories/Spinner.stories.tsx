import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { cn } from "@/lib/utils"

import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"

const meta = {
  title: "UI/Spinner",
  component: Spinner,
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <Spinner /> }

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      {["size-3", "size-4", "size-6", "size-8"].map((s) => (
        <Spinner key={s} className={cn(s, "text-primary")} />
      ))}
    </div>
  ),
}

export const InButtons: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button disabled>
        <Spinner />
        Loading
      </Button>
      <Button variant="secondary" disabled>
        <Spinner />
        Loading
      </Button>
      <Button variant="outline" disabled>
        <Spinner />
        Loading
      </Button>
    </div>
  ),
}
