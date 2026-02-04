import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/(app)/app-sidebar"
import { AppHeader } from "@/components/(app)/app-header"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="flex-1 min-h-0 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
