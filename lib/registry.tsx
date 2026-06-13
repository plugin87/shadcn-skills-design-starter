import * as React from "react"

import {
  AccordionDemo,
  AccordionStatesDemo,
  ButtonDemo,
  ButtonVariantsDemo,
  ButtonSizesDemo,
  ButtonStatesDemo,
  BadgeDemo,
  BadgeVariantsDemo,
  BadgeIconCountDemo,
  CardDemo,
  InputDemo,
  InputVariantsDemo,
  TabsDemo,
} from "@/components/docs/demos"
import { ColorTokens } from "@/components/docs/color-tokens"
import { ColorPalette } from "@/components/docs/color-palette"
import * as S from "@/components/docs/showcase"
import * as X from "@/components/docs/extras"
import { DataTableDemo } from "@/components/docs/data-table-demo"

export { navigation } from "@/lib/navigation"
export type { NavGroup } from "@/lib/navigation"

export interface DocExample {
  title: string
  description?: string
  preview: React.ReactNode
  /** optional widening for tall/wide demos */
  className?: string
}

export interface DocEntry {
  slug: string
  title: string
  description: string
  /** the import line shown in the docs header */
  install?: string
  /** prose rendered before the examples */
  content?: React.ReactNode
  examples?: DocExample[]
}

/* helper: a component entry with a Default example + optional extra examples */
function comp(
  slug: string,
  title: string,
  description: string,
  preview: React.ReactNode,
  className?: string,
  more: DocExample[] = [],
): DocEntry {
  return {
    slug,
    title,
    description,
    install: `npx shadcn@latest add ${slug}`,
    examples: [{ title: "Default", preview, className }, ...more],
  }
}

/* -------------------------------------------------------------------- pages */

const entries: DocEntry[] = [
  {
    slug: "introduction",
    title: "Introduction",
    description:
      "A token-driven component library built with shadcn/ui and Tailwind CSS v4, with its source of truth in Figma.",
    content: (
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          This documentation showcases the project&apos;s UI primitives. Every
          component is built from <strong className="text-foreground">shadcn/ui</strong>{" "}
          and styled exclusively with semantic design tokens — the same tokens
          exported from the Figma file — so light and dark themes stay in
          lockstep with design.
        </p>
        <p>
          Use the sidebar to browse. The{" "}
          <strong className="text-foreground">Design Tokens</strong> section
          documents the live color values — semantic theme tokens and the full
          primitive palette — while <strong className="text-foreground">Components</strong>{" "}
          shows each primitive in its default state plus the variants and states you
          can compose.
        </p>
      </div>
    ),
  },
  {
    slug: "installation",
    title: "Installation",
    description: "Add components to your app with the shadcn CLI.",
    content: (
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Components are added through the CLI — never hand-written or forked.
          Run the following to add a primitive:
        </p>
        <pre className="overflow-x-auto rounded-lg border border-border bg-muted px-4 py-3 font-mono text-xs text-foreground">
          npx shadcn@latest add button card input tabs
        </pre>
        <p>
          Styling uses semantic tokens only —{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
            bg-primary
          </code>
          ,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
            text-muted-foreground
          </code>
          ,{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
            border-border
          </code>{" "}
          — so the theme switches automatically.
        </p>
      </div>
    ),
  },
  {
    slug: "colors",
    title: "Colors",
    description:
      "Semantic theme tokens — the design variables every component is built on, with light and dark values.",
    content: (
      <div className="space-y-8">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Each token maps a Figma variable to a CSS custom property and a Tailwind
          utility — e.g.{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
            --primary
          </code>{" "}
          →{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
            bg-primary
          </code>
          . Swatches reflect the active theme; the values column lists both the light
          and dark definitions pulled from{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
            globals.css
          </code>
          .
        </p>
        <ColorTokens />
      </div>
    ),
  },
  {
    slug: "palette",
    title: "Color Palette",
    description:
      "The primitive color scales behind the theme — extracted from the Figma variables export.",
    content: (
      <div className="space-y-8">
        <p className="text-sm leading-relaxed text-muted-foreground">
          22 scales × 11 steps of Tailwind color primitives. The theme tokens are
          composed from these — the{" "}
          <strong className="text-foreground">blue</strong> ramp is the brand /
          primary scale (
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
            --primary
          </code>{" "}
          = blue-600). Hover a swatch to see its exact OKLCH value.
        </p>
        <ColorPalette />
      </div>
    ),
  },
  {
    slug: "accordion",
    title: "Accordion",
    description:
      "A vertically stacked set of interactive headings that each reveal a section of content.",
    install: "npx shadcn@latest add accordion",
    examples: [
      {
        title: "Default",
        description: "A single-collapsible accordion.",
        preview: <AccordionDemo />,
        className: "max-w-md",
      },
      {
        title: "Trigger states",
        description:
          "Default and hover states of a trigger — hover reveals a plain underline.",
        preview: <AccordionStatesDemo />,
      },
    ],
  },
  {
    slug: "badge",
    title: "Badge",
    description: "A small status descriptor for UI elements.",
    install: "npx shadcn@latest add badge",
    examples: [
      { title: "Default", preview: <BadgeDemo /> },
      {
        title: "Variants",
        description: "default, secondary, destructive and outline.",
        preview: <BadgeVariantsDemo />,
      },
      {
        title: "With icon & counts",
        description: "Icon badges and pill-shaped number/count badges.",
        preview: <BadgeIconCountDemo />,
      },
    ],
  },
  {
    slug: "button",
    title: "Button",
    description: "Displays a button or a component that looks like a button.",
    install: "npx shadcn@latest add button",
    examples: [
      { title: "Default", preview: <ButtonDemo /> },
      {
        title: "Variants",
        description: "Six variants for different emphasis levels.",
        preview: <ButtonVariantsDemo />,
      },
      {
        title: "Sizes",
        description: "Small, default, large and icon-only.",
        preview: <ButtonSizesDemo />,
      },
      {
        title: "With icon & states",
        description: "Buttons can hold icons and reflect loading / disabled states.",
        preview: <ButtonStatesDemo />,
      },
    ],
  },
  {
    slug: "card",
    title: "Card",
    description: "A container that groups related content and actions.",
    install: "npx shadcn@latest add card",
    examples: [
      {
        title: "Default",
        preview: <CardDemo />,
        className: "max-w-md",
      },
    ],
  },
  {
    slug: "input",
    title: "Input",
    description:
      "A form control for accepting single-line text, paired with a Label.",
    install: "npx shadcn@latest add input",
    examples: [
      { title: "Default", preview: <InputDemo /> },
      {
        title: "States & composition",
        description: "Disabled, invalid, and inline with a button.",
        preview: <InputVariantsDemo />,
      },
    ],
  },
  {
    slug: "tabs",
    title: "Tabs",
    description:
      "A set of layered sections of content displayed one panel at a time.",
    install: "npx shadcn@latest add tabs",
    examples: [
      {
        title: "Default",
        preview: <TabsDemo />,
        className: "max-w-md",
      },
    ],
  },

  /* ---- the rest of the shadcn/ui kit (one example each) ---- */
  comp("alert", "Alert", "Displays a callout for user attention.", <S.AlertDemo />, undefined, [
    { title: "Destructive", description: "For errors and warnings.", preview: <S.AlertVariantsDemo /> },
  ]),
  comp("alert-dialog", "Alert Dialog", "A modal dialog that interrupts the user with important content and expects a response.", <S.AlertDialogDemo />),
  comp("aspect-ratio", "Aspect Ratio", "Displays content within a desired ratio.", <S.AspectRatioDemo />),
  comp("avatar", "Avatar", "An image element with a fallback for representing the user.", <S.AvatarDemo />, undefined, [
    { title: "Sizes", description: "Scale with size utilities.", preview: <S.AvatarSizesDemo /> },
  ]),
  comp("breadcrumb", "Breadcrumb", "Displays the path to the current resource using a hierarchy of links.", <S.BreadcrumbDemo />, undefined, [
    { title: "Custom separator", description: "Swap the chevron for any node — here a slash.", preview: <X.BreadcrumbSeparatorDemo /> },
    { title: "Collapsed", description: "Collapse middle items behind an ellipsis.", preview: <X.BreadcrumbCollapsedDemo /> },
    { title: "Dropdown", description: "Collapse middle items into a dropdown menu.", preview: <S.BreadcrumbDropdownDemo /> },
  ]),
  comp("calendar", "Calendar", "A date field component that allows users to enter and edit dates.", <S.CalendarDemo />),
  comp("carousel", "Carousel", "A carousel with motion and swipe, built with Embla.", <S.CarouselDemo />, "max-w-xs", [
    { title: "Multiple items", description: "Show several slides at once with basis utilities.", preview: <S.CarouselMultiDemo />, className: "max-w-sm" },
  ]),
  comp("checkbox", "Checkbox", "A control that allows the user to toggle between checked and not checked.", <S.CheckboxDemo />, undefined, [
    { title: "Card", description: "A selectable card built around a checkbox.", preview: <S.CheckboxCardDemo /> },
  ]),
  comp("collapsible", "Collapsible", "An interactive component that expands and collapses content.", <S.CollapsibleDemo />, "max-w-sm"),
  comp("command", "Command", "Fast, composable, unstyled command menu for React.", <S.CommandDemo />, "max-w-sm"),
  comp("context-menu", "Context Menu", "Displays a menu triggered by a right click.", <S.ContextMenuDemo />),
  comp("dialog", "Dialog", "A window overlaid on the primary window, rendering the content underneath inert.", <S.DialogDemo />),
  comp("drawer", "Drawer", "A drawer component for mobile-friendly panels, built on Vaul.", <S.DrawerDemo />),
  comp("dropdown-menu", "Dropdown Menu", "Displays a menu to the user triggered by a button.", <S.DropdownMenuDemo />, undefined, [
    { title: "With groups", preview: <S.DropdownCheckboxesDemo /> },
  ]),
  comp("hover-card", "Hover Card", "For sighted users to preview content available behind a link.", <S.HoverCardDemo />),
  comp("input-otp", "Input OTP", "Accessible one-time-password input with copy-paste support.", <S.InputOTPDemo />, undefined, [
    { title: "4 digits", preview: <S.InputOTPPatternDemo /> },
  ]),
  comp("label", "Label", "Renders an accessible label associated with controls.", <S.LabelDemo />),
  comp("menubar", "Menubar", "A persistent menu common in desktop applications.", <S.MenubarDemo />),
  comp("navigation-menu", "Navigation Menu", "A collection of links for navigating websites.", <S.NavigationMenuDemo />),
  comp("pagination", "Pagination", "Pagination with page navigation, next and previous links.", <S.PaginationDemo />, undefined, [
    { title: "Previous / Next only", preview: <S.PaginationMiniDemo /> },
  ]),
  comp("popover", "Popover", "Displays rich content in a portal, triggered by a button.", <S.PopoverDemo />),
  comp("progress", "Progress", "Displays an indicator showing the completion progress of a task.", <S.ProgressDemo />, undefined, [
    { title: "Steps", preview: <S.ProgressStatesDemo /> },
  ]),
  comp("radio-group", "Radio Group", "A set of checkable buttons where no more than one can be checked at a time.", <S.RadioGroupDemo />),
  comp("scroll-area", "Scroll Area", "Augments native scroll functionality for custom, cross-browser styling.", <S.ScrollAreaDemo />),
  comp("select", "Select", "Displays a list of options for the user to pick from, triggered by a button.", <S.SelectDemo />, undefined, [
    { title: "Grouped", description: "Options split into labelled groups.", preview: <S.SelectScrollableDemo /> },
  ]),
  comp("separator", "Separator", "Visually or semantically separates content.", <S.SeparatorDemo />),
  comp("sheet", "Sheet", "Extends the Dialog component to display content that complements the main content.", <S.SheetDemo />),
  comp(
    "sidebar",
    "Sidebar",
    "A composable, themeable sidebar — the same primitive that powers this documentation's navigation. Compose a header, grouped menus, collapsible sub-menus, badges, and a footer, paired with an inset content area.",
    <X.SidebarDemo />,
    "max-w-3xl",
  ),
  comp("skeleton", "Skeleton", "Use to show a placeholder while content is loading.", <S.SkeletonDemo />, undefined, [
    { title: "Card", preview: <S.SkeletonCardDemo /> },
  ]),
  comp("slider", "Slider", "An input where the user selects a value from within a given range.", <S.SliderDemo />, undefined, [
    { title: "Range & steps", description: "Two thumbs, and a stepped track.", preview: <S.SliderRangeDemo /> },
  ]),
  comp("sonner", "Sonner", "An opinionated toast component for React.", <S.SonnerDemo />),
  comp("switch", "Switch", "A control that toggles between on and off.", <S.SwitchDemo />),
  comp("table", "Table", "A responsive table component.", <S.TableDemo />, "max-w-2xl"),
  comp("textarea", "Textarea", "Displays a form textarea or a component that looks like one.", <S.TextareaDemo />, undefined, [
    { title: "Disabled & with label", preview: <S.TextareaStatesDemo /> },
  ]),
  comp("toggle", "Toggle", "A two-state button that can be either on or off.", <S.ToggleDemo />),
  comp("toggle-group", "Toggle Group", "A set of two-state buttons that can be toggled on or off.", <S.ToggleGroupDemo />, undefined, [
    { title: "Outline & sizes", preview: <S.ToggleGroupOutlineDemo /> },
  ]),
  comp("tooltip", "Tooltip", "A popup that displays information related to an element on hover or focus.", <S.TooltipDemo />, undefined, [
    { title: "Sides", description: "Position with the side prop.", preview: <S.TooltipSidesDemo /> },
  ]),

  /* ---- the remaining shadcn registry items ---- */
  comp("button-group", "Button Group", "Groups related buttons into a single connected unit.", <X.ButtonGroupDemo />, undefined, [
    { title: "Sizes", description: "Small, default and large, driven by the buttons' size.", preview: <X.ButtonGroupSizesDemo /> },
  ]),
  comp("chart", "Chart", "Beautiful charts built with Recharts and your design tokens.", <X.ChartDemo />, "max-w-md"),
  comp("empty", "Empty", "An empty state placeholder for when there's no content.", <X.EmptyDemo />),
  comp("field", "Field", "A form field wrapper with label, control and description.", <X.FieldDemo />),
  comp("input-group", "Input Group", "An input with attached addons such as icons or buttons.", <X.InputGroupDemo />, undefined, [
    { title: "Affixes", description: "Inline icons, result counts and URL/currency affixes.", preview: <X.InputGroupAffixesDemo /> },
    { title: "Actions", description: "Inline buttons — send, copy, search and split menus.", preview: <X.InputGroupActionsDemo /> },
    { title: "Textarea", description: "Block-end addons on a textarea — counters and a send button.", preview: <X.InputGroupTextareaDemo /> },
    { title: "Status", description: "Loading spinner, validation check and an info trigger.", preview: <X.InputGroupStatusDemo /> },
  ]),
  comp("item", "Item", "A flexible row for lists — media, content and actions.", <X.ItemDemo />, undefined, [
    { title: "Variants", description: "Default, outline and muted surfaces.", preview: <X.ItemVariantsDemo /> },
  ]),
  comp("kbd", "Kbd", "Displays keyboard keys and shortcuts.", <X.KbdDemo />),
  comp("native-select", "Native Select", "A styled native HTML select element.", <X.NativeSelectDemo />),
  comp("spinner", "Spinner", "An animated loading indicator.", <X.SpinnerDemo />, undefined, [
    { title: "Sizes", description: "12 / 16 / 24 / 32px, sized with token utilities.", preview: <X.SpinnerSizesDemo /> },
    { title: "Colors", description: "Tinted with the data-viz chart tokens (token-driven).", preview: <X.SpinnerColorsDemo /> },
  ]),

  /* ---- composed patterns (built from the primitives above) ---- */
  {
    slug: "combobox",
    title: "Combobox",
    description:
      "An autocomplete input and command palette — composed from Popover + Command.",
    install: "npx shadcn@latest add popover command",
    examples: [{ title: "Default", preview: <S.ComboboxDemo /> }],
  },
  {
    slug: "date-picker",
    title: "Date Picker",
    description: "A date picker composed from Popover + Calendar.",
    install: "npx shadcn@latest add popover calendar",
    examples: [{ title: "Default", preview: <S.DatePickerDemo /> }],
  },
  {
    slug: "data-table",
    title: "Data Table",
    description:
      "A sortable table powered by TanStack Table, composed with the Table primitive.",
    install: "npm i @tanstack/react-table",
    examples: [
      { title: "Default", preview: <DataTableDemo />, className: "max-w-2xl" },
    ],
  },
]

export const registry = new Map(entries.map((e) => [e.slug, e]))

export function getDoc(slug: string): DocEntry | undefined {
  return registry.get(slug)
}

export function getAllSlugs(): string[] {
  return entries.map((e) => e.slug)
}
