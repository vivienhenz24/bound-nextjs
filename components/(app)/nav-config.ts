import { LayoutDashboard, LayersPlus, BookAudio, type LucideIcon } from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
}

export const mainNavItems: NavItem[] = [
  { title: "Home", href: "/dashboard", icon: LayoutDashboard },
  { title: "Libary", href: "/libary", icon: BookAudio },
  { title: "My Models", href: "/my-models", icon: LayersPlus },
]

export function isNavItemActive(pathname: string, href: string): boolean {
  return pathname === href || (href === "/dashboard" && pathname === "/")
}
