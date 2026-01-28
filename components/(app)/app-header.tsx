"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchBar } from "@/components/landing/search-bar"
import { Button } from "@/components/ui/button"
import { mainNavItems, isNavItemActive } from "@/components/(app)/nav-config"

export function AppHeader() {
  const pathname = usePathname()

  const currentPageTitle =
    mainNavItems.find((item) => isNavItemActive(pathname, item.href))?.title || "Dashboard"

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-4 bg-background px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4" />
        <span className="text-sm font-medium text-muted-foreground">{currentPageTitle}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:block w-64">
          <SearchBar />
        </div>
        <Button variant="outline" size="sm">
          Support
        </Button>
        <ThemeToggle />
      </div>
    </header>
  )
}
