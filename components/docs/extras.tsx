"use client"

import * as React from "react"
import {
  Search,
  FolderOpen,
  LayoutDashboard,
  Inbox,
  Calendar,
  Frame,
  ChartPie,
  ChevronsUpDown,
  Slash,
  Mail,
  CreditCard,
  Info,
  Copy,
  Check,
  ChevronDown,
  DollarSign,
  ArrowUp,
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { ButtonGroup } from "@/components/ui/button-group"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Fixed pixel dimensions for self-contained showcase demos (viewport heights /
// control widths) — layout sizing, not theme color/space tokens; centralised so
// the literals carry their justification.
const DEMO_SIDEBAR_H = "h-[520px]" // ds-allow-hardcode: fixed sidebar demo viewport
const DEMO_SELECT_W = "w-[200px]" // ds-allow-hardcode: fixed control width for the demo

/* ------------------------------------------------------------------ Spinner */

export function SpinnerDemo() {
  return (
    <div className="flex items-center gap-6">
      <Spinner />
      <Spinner className="size-6 text-primary" />
      <Button disabled size="sm">
        <Spinner />
        Loading
      </Button>
    </div>
  )
}

export function SpinnerSizesDemo() {
  return (
    <div className="flex flex-wrap items-end gap-8">
      {[
        { size: "size-3", label: "12" },
        { size: "size-4", label: "16" },
        { size: "size-6", label: "24" },
        { size: "size-8", label: "32" },
      ].map((s) => (
        <div key={s.size} className="flex flex-col items-center gap-2">
          <Spinner className={cn(s.size, "text-primary")} />
          <span className="text-xs text-muted-foreground tabular-nums">{s.label}px</span>
        </div>
      ))}
    </div>
  )
}

// ds-allow-hardcode: the Figma "Spinner" set defines a Color axis of literal
// brand hues (Red/Green/Blue/Yellow) that have NO equivalent in the
// blue-primary token theme (no green/yellow semantic tokens). Matched 1:1 to
// the Figma component set's fills per design sign-off — the one sanctioned
// exception to the semantic-token rule, scoped to this showcase demo.
const SPINNER_COLORS = [
  { label: "Red", hex: "#ef4444" }, // ds-allow-hardcode: exact Figma fill
  { label: "Green", hex: "#22c55e" }, // ds-allow-hardcode: exact Figma fill
  { label: "Blue", hex: "#3b82f6" }, // ds-allow-hardcode: exact Figma fill
  { label: "Yellow", hex: "#eab308" }, // ds-allow-hardcode: exact Figma fill
] as const

export function SpinnerColorsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      {SPINNER_COLORS.map((c) => (
        <div key={c.label} className="flex flex-col items-center gap-2">
          <Spinner className="size-6" style={{ color: c.hex }} />
          <span className="text-xs text-muted-foreground">{c.label}</span>
        </div>
      ))}
    </div>
  )
}

// Figma's spinner "Type" axis (Default/Secondary/Outline) = the loading state
// inside a button of that variant.
export function SpinnerVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
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
  )
}

/* ------------------------------------------------------------------ Sidebar */

const sidebarNav = [
  { title: "Dashboard", icon: LayoutDashboard, active: true },
  { title: "Inbox", icon: Inbox, badge: "12" },
  { title: "Calendar", icon: Calendar },
  { title: "Search", icon: Search },
]

const sidebarProjects: {
  title: string
  icon: typeof Frame
  children?: string[]
}[] = [
  { title: "Design System", icon: Frame, children: ["Tokens", "Components"] },
  { title: "Marketing Site", icon: ChartPie },
]

export function SidebarDemo() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-border bg-sidebar shadow-sm">
      <SidebarProvider
        className="min-h-0 items-stretch"
        style={{ "--sidebar-width": "15rem" } as React.CSSProperties}
      >
        <Sidebar
          collapsible="none"
          className={cn(DEMO_SIDEBAR_H, "bg-transparent")}
        >
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Frame className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">Acme Inc</span>
                    <span className="text-xs text-muted-foreground">Pro plan</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarNav.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton isActive={item.active}>
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                      {item.badge ? (
                        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                      ) : null}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>Projects</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarProjects.map((project) => (
                    <SidebarMenuItem key={project.title}>
                      <SidebarMenuButton>
                        <project.icon />
                        <span>{project.title}</span>
                      </SidebarMenuButton>
                      {project.children ? (
                        <SidebarMenuSub>
                          {project.children.map((child) => (
                            <SidebarMenuSubItem key={child}>
                              <SidebarMenuSubButton isActive={child === "Tokens"}>
                                <span>{child}</span>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      ) : null}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg">
                  <Avatar className="size-8 rounded-lg">
                    <AvatarFallback className="rounded-lg">SC</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-medium">shadcn</span>
                    <span className="text-xs text-muted-foreground">
                      m@example.com
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className={cn("flex flex-1 flex-col p-2 pl-0", DEMO_SIDEBAR_H)}>
          <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-border bg-background shadow-sm">
            <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border px-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold leading-none">Overview</span>
                <span className="text-xs text-muted-foreground">
                  Welcome back, shadcn
                </span>
              </div>
              <Button size="sm" variant="outline">
                Invite
              </Button>
            </header>
            <main className="flex-1 space-y-4 overflow-auto p-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { label: "Revenue", value: "$12.4k" },
                  { label: "Active users", value: "1,204" },
                  { label: "Churn", value: "0.8%" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-border bg-card p-4 text-card-foreground"
                  >
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 text-2xl font-semibold tabular-nums">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex min-h-32 items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 p-6 text-center text-sm text-muted-foreground">
                Inset content area
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}

/* ---------------------------------------------------------------------- Kbd */

export function KbdDemo() {
  return (
    <div className="flex items-center gap-3">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>B</Kbd>
      </KbdGroup>
      <Kbd>Esc</Kbd>
    </div>
  )
}

/* ------------------------------------------------------------- NativeSelect */

export function NativeSelectDemo() {
  return (
    <NativeSelect className={DEMO_SELECT_W} defaultValue="apple" aria-label="Fruit">
      <NativeSelectOption value="apple">Apple</NativeSelectOption>
      <NativeSelectOption value="banana">Banana</NativeSelectOption>
      <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
      <NativeSelectOption value="grapes">Grapes</NativeSelectOption>
    </NativeSelect>
  )
}

/* -------------------------------------------------------------- ButtonGroup */

export function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline">Years</Button>
      <Button variant="outline">Months</Button>
      <Button variant="outline">Days</Button>
    </ButtonGroup>
  )
}

/* --------------------------------------------------------------- InputGroup */

export function InputGroupDemo() {
  return (
    <InputGroup className="max-w-sm">
      <InputGroupAddon align="inline-start">
        <Search />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search…" />
    </InputGroup>
  )
}

/* -------------------------------------------------------------------- Field */

export function FieldDemo() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="field-username">Username</FieldLabel>
      <Input id="field-username" placeholder="@shadcn" />
      <FieldDescription>This is your public display name.</FieldDescription>
    </Field>
  )
}

/* -------------------------------------------------------------------- Empty */

export function EmptyDemo() {
  return (
    <Empty className="max-w-sm rounded-lg border border-border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpen />
        </EmptyMedia>
        <EmptyTitle>No projects yet</EmptyTitle>
        <EmptyDescription>
          Create your first project to get started.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Create project</Button>
      </EmptyContent>
    </Empty>
  )
}

/* --------------------------------------------------------------------- Item */

export function ItemDemo() {
  return (
    <div className="w-full max-w-sm">
      <Item variant="outline">
        <ItemMedia>
          <Avatar>
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Evil Rabbit</ItemTitle>
          <ItemDescription>Last seen 5 months ago</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Follow
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}

/* -------------------------------------------------------------------- Chart */

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 273 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 264 },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
} satisfies ChartConfig

export function ChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="h-[240px] w-full max-w-md">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(v) => v.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

/* -------------------------------------------- variant additions (Figma parity) */

// button-group — Size axis (Small / Default / Large) from the Figma "Button Group" set
export function ButtonGroupSizesDemo() {
  return (
    <div className="flex flex-col items-start gap-3">
      {(
        [
          { size: "sm", label: "Small" },
          { size: "default", label: "Default" },
          { size: "lg", label: "Large" },
        ] as const
      ).map(({ size, label }) => (
        <ButtonGroup key={size}>
          <Button variant="outline" size={size}>
            {label}
          </Button>
          <Button variant="outline" size={size}>
            Button
          </Button>
          <Button variant="outline" size={size}>
            Group
          </Button>
        </ButtonGroup>
      ))}
    </div>
  )
}

// item — Type axis (Default / Outline / Muted) from the Figma "Item" set
export function ItemVariantsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      {(["default", "outline", "muted"] as const).map((variant) => (
        <Item key={variant} variant={variant}>
          <ItemMedia>
            <Avatar>
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle className="capitalize">{variant}</ItemTitle>
            <ItemDescription>The {variant} item surface.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" variant="outline">
              Open
            </Button>
          </ItemActions>
        </Item>
      ))}
    </div>
  )
}

// breadcrumb — Custom separator (Figma "Custom_seperator")
export function BreadcrumbSeparatorDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

// breadcrumb — Collapsed with ellipsis (Figma "Collapsed")
export function BreadcrumbCollapsedDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

// input-group — full parity with the Figma "Input Group" showcase, grouped by
// intent: affixes, actions, textarea, status (≈12 addon configurations).
export function InputGroupAffixesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Search />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search…" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>12 results</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <Mail />
        </InputGroupAddon>
        <InputGroupInput type="email" placeholder="Enter your email" />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <DollarSign />
        </InputGroupAddon>
        <InputGroupInput placeholder="0.00" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export function InputGroupActionsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <InputGroup>
        <InputGroupInput placeholder="Enter your message…" aria-label="Message" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="default" size="sm">
            Send
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput
          defaultValue="https://x.com/shadcn"
          readOnly
          aria-label="Share link"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="Copy" size="icon-xs">
            <Copy />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Search the docs…" aria-label="Search docs" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton variant="outline" size="sm">
            <Search />
            Search
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Filter…" aria-label="Filter" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="sm">
            All
            <ChevronDown />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export function InputGroupTextareaDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <InputGroup>
        <InputGroupTextarea placeholder="Enter your message" />
        <InputGroupAddon align="block-end">
          <InputGroupText className="text-muted-foreground">
            120 characters left
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Ask, search or chat…" />
        <InputGroupAddon align="block-end">
          <InputGroupText>Auto</InputGroupText>
          <InputGroupButton
            aria-label="Send"
            variant="default"
            size="icon-xs"
            className="ml-auto"
          >
            <ArrowUp />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

export function InputGroupStatusDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <InputGroup>
        <InputGroupInput placeholder="Saving changes…" />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <CreditCard />
        </InputGroupAddon>
        <InputGroupInput placeholder="Card number" />
        <InputGroupAddon align="inline-end">
          <Check className="text-primary" />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="API key" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton aria-label="More info" size="icon-xs">
            <Info />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
