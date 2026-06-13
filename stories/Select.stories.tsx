import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, screen, userEvent, waitFor, within } from "storybook/test"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const meta = {
  title: "UI/Select",
  component: Select,
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger aria-label="Select an option" className="w-48">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger aria-label="Select an option" className="w-48">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="est">Eastern</SelectItem>
          <SelectItem value="pst">Pacific</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="gmt">GMT</SelectItem>
          <SelectItem value="cet">CET</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const Small: Story = {
  render: () => (
    <Select>
      <SelectTrigger aria-label="Select an option" size="sm" className="w-40">
        <SelectValue placeholder="Small" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
        <SelectItem value="b">Option B</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger aria-label="Select an option" className="w-48">
        <SelectValue placeholder="Disabled" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Option A</SelectItem>
      </SelectContent>
    </Select>
  ),
}

// Opens the menu so the portaled content (incl. SelectSeparator) renders.
export const Scrollable: Story = {
  render: () => (
    <Select>
      <SelectTrigger aria-label="Select a timezone" className="w-48">
        <SelectValue placeholder="Scrollable" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          {Array.from({ length: 6 }, (_, i) => (
            <SelectItem key={i} value={`na-${i}`}>
              GMT-{i + 4}:00
            </SelectItem>
          ))}
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          {Array.from({ length: 6 }, (_, i) => (
            <SelectItem key={i} value={`eu-${i}`}>
              GMT+{i}:00
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("combobox"))
    await expect(await screen.findByText("North America")).toBeInTheDocument()
    // close before axe runs — an open Radix menu aria-hides the focusable trigger
    await userEvent.keyboard("{Escape}")
    await waitFor(() =>
      expect(screen.queryByText("North America")).not.toBeInTheDocument(),
    )
  },
}
