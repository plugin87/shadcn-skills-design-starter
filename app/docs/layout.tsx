import * as React from "react"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { AppSidebar } from "@/components/docs/app-sidebar"
import { SiteHeader } from "@/components/docs/site-header"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <main className="flex-1">{children}</main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  )
}
