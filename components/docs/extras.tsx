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
  InputGroupInput,
} from "@/components/ui/input-group"
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
          className="h-[520px] bg-transparent"
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

        <div className="flex h-[520px] flex-1 flex-col p-2 pl-0">
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
    <NativeSelect className="w-[200px]" defaultValue="apple">
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
