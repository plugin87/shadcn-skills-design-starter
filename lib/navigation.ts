// Sidebar navigation — plain data only (no JSX), so client components can import
// it without pulling the whole demo registry into their bundle.

export interface NavGroup {
  title: string
  items: { title: string; slug: string }[]
}

export const navigation: NavGroup[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", slug: "introduction" },
      { title: "Installation", slug: "installation" },
    ],
  },
  {
    title: "Design Tokens",
    items: [
      { title: "Colors", slug: "colors" },
      { title: "Palette", slug: "palette" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Accordion", slug: "accordion" },
      { title: "Alert", slug: "alert" },
      { title: "Alert Dialog", slug: "alert-dialog" },
      { title: "Aspect Ratio", slug: "aspect-ratio" },
      { title: "Avatar", slug: "avatar" },
      { title: "Badge", slug: "badge" },
      { title: "Breadcrumb", slug: "breadcrumb" },
      { title: "Button", slug: "button" },
      { title: "Button Group", slug: "button-group" },
      { title: "Calendar", slug: "calendar" },
      { title: "Card", slug: "card" },
      { title: "Carousel", slug: "carousel" },
      { title: "Chart", slug: "chart" },
      { title: "Checkbox", slug: "checkbox" },
      { title: "Collapsible", slug: "collapsible" },
      { title: "Combobox", slug: "combobox" },
      { title: "Command", slug: "command" },
      { title: "Context Menu", slug: "context-menu" },
      { title: "Data Table", slug: "data-table" },
      { title: "Date Picker", slug: "date-picker" },
      { title: "Dialog", slug: "dialog" },
      { title: "Drawer", slug: "drawer" },
      { title: "Dropdown Menu", slug: "dropdown-menu" },
      { title: "Empty", slug: "empty" },
      { title: "Field", slug: "field" },
      { title: "Hover Card", slug: "hover-card" },
      { title: "Input", slug: "input" },
      { title: "Input Group", slug: "input-group" },
      { title: "Input OTP", slug: "input-otp" },
      { title: "Item", slug: "item" },
      { title: "Kbd", slug: "kbd" },
      { title: "Label", slug: "label" },
      { title: "Menubar", slug: "menubar" },
      { title: "Native Select", slug: "native-select" },
      { title: "Navigation Menu", slug: "navigation-menu" },
      { title: "Pagination", slug: "pagination" },
      { title: "Popover", slug: "popover" },
      { title: "Progress", slug: "progress" },
      { title: "Radio Group", slug: "radio-group" },
      { title: "Scroll Area", slug: "scroll-area" },
      { title: "Select", slug: "select" },
      { title: "Separator", slug: "separator" },
      { title: "Sheet", slug: "sheet" },
      { title: "Skeleton", slug: "skeleton" },
      { title: "Slider", slug: "slider" },
      { title: "Sonner", slug: "sonner" },
      { title: "Spinner", slug: "spinner" },
      { title: "Switch", slug: "switch" },
      { title: "Table", slug: "table" },
      { title: "Tabs", slug: "tabs" },
      { title: "Textarea", slug: "textarea" },
      { title: "Toggle", slug: "toggle" },
      { title: "Toggle Group", slug: "toggle-group" },
      { title: "Tooltip", slug: "tooltip" },
    ],
  },
]
