"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { mainNavItems, isNavItemActive } from "@/components/(app)/nav-config"
import { SidebarUserMenu } from "@/components/(app)/sidebar-user-menu"

export function AppSidebar() {
  const pathname = usePathname()
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    mainNavItems.forEach((item) => {
      if (item.items?.length && isNavItemActive(pathname, item.href)) {
        setOpenSections((prev) => ({ ...prev, [item.href]: true }))
      }
    })
  }, [pathname])

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center px-2 py-2 group-data-[collapsible=icon]:hidden">
          <Link href="/" className="text-xl font-semibold text-primary tracking-tight">
            bound
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => {
                const hasSubItems = item.items && item.items.length > 0
                const isActive = hasSubItems
                  ? pathname === item.href
                  : isNavItemActive(pathname, item.href)
                const isSectionOpen = hasSubItems && isNavItemActive(pathname, item.href)
                const isOpen = Boolean(isSectionOpen || openSections[item.href])

                if (!hasSubItems) {
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                        <Link
                          href={item.href}
                          className={cn(
                            !isActive && "text-sidebar-foreground/80 dark:text-muted-foreground"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                }

                return (
                  <Collapsible
                    key={item.href}
                    open={isOpen}
                    onOpenChange={(nextOpen) =>
                      setOpenSections((prev) => ({ ...prev, [item.href]: nextOpen }))
                    }
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                        <Link
                          href={item.href}
                          className={cn(
                            !isActive && "text-sidebar-foreground/80 dark:text-muted-foreground"
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction>
                          <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => {
                            const isSubActive = isNavItemActive(pathname, subItem.href)
                            return (
                              <SidebarMenuSubItem key={subItem.href}>
                                <SidebarMenuSubButton asChild isActive={isSubActive}>
                                  <Link
                                    href={subItem.href}
                                    className={cn(
                                      !isSubActive &&
                                        "text-sidebar-foreground/80 dark:text-muted-foreground"
                                    )}
                                  >
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            )
                          })}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarUserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
