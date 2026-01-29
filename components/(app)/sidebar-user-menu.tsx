"use client"

import * as React from "react"
import { ChevronsUpDown, LogOut, CreditCard, User } from "lucide-react"
import Link from "next/link"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/use-auth"

export function SidebarUserMenu() {
  const { user, logout } = useAuth()
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (containerRef.current && !containerRef.current.contains(target)) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  if (!user) return null

  const displayName = [user.first_name, user.last_name].filter(Boolean).join(" ") || user.email
  const initialsSource = displayName || user.email
  const initial = initialsSource.trim().charAt(0).toUpperCase()

  const handleLogout = async () => {
    setOpen(false)
    await logout()
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div ref={containerRef} className="relative">
          <SidebarMenuButton
            size="lg"
            className="text-sidebar-foreground/80 dark:text-muted-foreground"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="sidebar-user-panel"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-semibold">{initial}</span>
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-medium">{displayName}</span>
              <span className="truncate text-xs text-sidebar-foreground/70 dark:text-muted-foreground">
                {user.email}
              </span>
            </div>
            <ChevronsUpDown
              className="ml-auto size-4 transition-transform group-data-[collapsible=icon]:hidden data-[state=open]:rotate-180"
              data-state={open ? "open" : "closed"}
            />
          </SidebarMenuButton>
          <div
            id="sidebar-user-panel"
            role="menu"
            data-state={open ? "open" : "closed"}
            className="bg-sidebar text-sidebar-foreground border-sidebar-border absolute inset-x-0 bottom-full z-10 mb-2 overflow-hidden rounded-lg border transition-[transform,opacity] duration-200 ease-out data-[state=closed]:pointer-events-none data-[state=closed]:translate-y-2 data-[state=closed]:opacity-0"
          >
            <div className="px-3 pt-3 pb-2 text-xs font-medium tracking-wide text-sidebar-foreground/70 dark:text-muted-foreground">
              Account
            </div>
            <div className="flex flex-col gap-1 px-2 pb-2">
              <Link
                href="/profile"
                className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center gap-2 rounded-md px-2 py-2 text-sm"
                onClick={() => setOpen(false)}
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <Link
                href="/settings"
                className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center gap-2 rounded-md px-2 py-2 text-sm"
                onClick={() => setOpen(false)}
              >
                <CreditCard className="h-4 w-4" />
                Billing
              </Link>
            </div>
            <div className="bg-sidebar-border h-px" />
            <button
              type="button"
              className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex w-full items-center gap-2 px-4 py-2 text-left text-sm"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
