import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { FieldDemo } from "@/components/docs/extras"
import { Input } from "@/components/ui/input"

const meta = {
  title: "UI/Field",
  // Reused docs demo for breadth/coverage; a11y is enforced (axe fails the run
  // on any violation), same as the core set.
  parameters: { a11y: { test: "error" } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { render: () => <FieldDemo /> }

// Exercises every Field sub-component and orientation so the whole module is
// covered (FieldSet/Legend/Group/Content/Title/Separator, all orientations).
export const KitchenSink: Story = {
  render: () => (
    <FieldSet className="max-w-md">
      <FieldLegend>Profile</FieldLegend>
      <FieldLegend variant="label">Account details</FieldLegend>
      <FieldGroup>
        <Field orientation="vertical">
          <FieldLabel htmlFor="ks-name">Name</FieldLabel>
          <Input id="ks-name" placeholder="Ada Lovelace" />
          <FieldDescription>Your full name.</FieldDescription>
        </Field>

        <Field orientation="horizontal">
          <FieldContent>
            <FieldTitle>Notifications</FieldTitle>
            <FieldDescription>Receive product updates.</FieldDescription>
          </FieldContent>
          <Input id="ks-email" placeholder="you@example.com" />
        </Field>

        <Field orientation="responsive">
          <FieldLabel htmlFor="ks-team">Team</FieldLabel>
          <Input id="ks-team" placeholder="Engineering" />
        </Field>

        <FieldSeparator>Or</FieldSeparator>

        <Field>
          <FieldLabel htmlFor="ks-handle">Handle</FieldLabel>
          <Input id="ks-handle" aria-invalid />
          {/* single error → renders the message directly */}
          <FieldError errors={[{ message: "Handle is required." }]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="ks-pw">Password</FieldLabel>
          <Input id="ks-pw" type="password" aria-invalid />
          {/* multiple errors → renders the bulleted list branch */}
          <FieldError
            errors={[
              { message: "At least 8 characters." },
              { message: "At least one number." },
            ]}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="ks-bio">Bio</FieldLabel>
          <Input id="ks-bio" aria-invalid />
          {/* children take precedence over errors */}
          <FieldError>Custom error node.</FieldError>
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
}
