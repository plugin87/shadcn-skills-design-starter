import * as React from "react"
import {
  ChevronDown,
  Plus,
  Loader2,
  Mail,
  ArrowRight,
  BadgeCheck,
  Star,
  CircleAlert,
} from "lucide-react"

import { FAQAccordion } from "@/components/faq-accordion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

/* ----------------------------------------------------------------- Accordion */

export function AccordionDemo() {
  return <FAQAccordion defaultValue="product-info" />
}

export function AccordionStatesDemo() {
  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-card px-5 text-card-foreground shadow-sm">
      {/* Default */}
      <div className="flex w-full items-center justify-between gap-4 border-b border-border py-4 text-sm font-medium text-foreground">
        <span>Product Information</span>
        <ChevronDown className="size-4 shrink-0 translate-y-0.5 text-muted-foreground" />
      </div>
      {/* Hover */}
      <div className="flex w-full items-center justify-between gap-4 py-4 text-sm font-medium text-foreground">
        <span className="underline underline-offset-4">Product Information</span>
        <ChevronDown className="size-4 shrink-0 translate-y-0.5 text-muted-foreground" />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------- Button */

export function ButtonDemo() {
  return <Button>Button</Button>
}

export function ButtonVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Add">
        <Plus />
      </Button>
    </div>
  )
}

export function ButtonStatesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <Mail /> Login with Email
      </Button>
      <Button disabled>
        <Loader2 className="animate-spin" /> Please wait
      </Button>
      <Button variant="outline" disabled>
        Disabled
      </Button>
    </div>
  )
}

/* --------------------------------------------------------------------- Badge */

export function BadgeDemo() {
  return <Badge>Badge</Badge>
}

export function BadgeVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
}

export function BadgeIconCountDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>
        <BadgeCheck />
        Verified
      </Badge>
      <Badge variant="secondary">
        <Star />
        Pro
      </Badge>
      <Badge variant="destructive">
        <CircleAlert />
        Alert
      </Badge>
      <Badge className="h-5 min-w-5 justify-center rounded-full px-1 tabular-nums">
        8
      </Badge>
      <Badge
        variant="secondary"
        className="h-5 min-w-5 justify-center rounded-full px-1 tabular-nums"
      >
        24
      </Badge>
      <Badge
        variant="destructive"
        className="h-5 min-w-5 justify-center rounded-full px-1 tabular-nums"
      >
        99+
      </Badge>
    </div>
  )
}

/* ---------------------------------------------------------------------- Card */

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account.
        </CardDescription>
        <CardAction>
          <Button variant="link" className="px-0">
            Sign up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="card-email">Email</Label>
          <Input id="card-email" type="email" placeholder="m@example.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="card-password">Password</Label>
          <Input id="card-password" type="password" />
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button className="w-full">Create account</Button>
        <Button variant="outline" className="w-full">
          Continue with Google
        </Button>
      </CardFooter>
    </Card>
  )
}

/* --------------------------------------------------------------------- Input */

export function InputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="demo-email">Email</Label>
      <Input id="demo-email" type="email" placeholder="m@example.com" />
    </div>
  )
}

export function InputVariantsDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <Input placeholder="Default" />
      <Input placeholder="Disabled" disabled />
      <Input placeholder="Invalid" aria-invalid />
      <div className="flex gap-2">
        <Input placeholder="Email" type="email" />
        <Button type="submit">
          Subscribe <ArrowRight />
        </Button>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------------- Tabs */

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="pt-2">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Label htmlFor="tab-name">Name</Label>
              <Input id="tab-name" defaultValue="Pedro Duarte" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password" className="pt-2">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <Label htmlFor="tab-current">Current password</Label>
              <Input id="tab-current" type="password" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
