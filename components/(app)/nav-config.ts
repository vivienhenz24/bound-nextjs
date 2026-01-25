import { LayoutDashboard, LayersPlus, BookAudio, type LucideIcon } from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  items?: { title: string; href: string }[]
}

export const mainNavItems: NavItem[] = [
  { title: "Home", href: "/dashboard", icon: LayoutDashboard },
  {
    title: "Libary",
    href: "/libary",
    icon: BookAudio,
    items: [
      { title: "Explore", href: "/libary/explore" },
      { title: "My Collection", href: "/libary/my-collection" },
    ],
  },
  { title: "My Models", href: "/my-models", icon: LayersPlus },
]

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") {
    return pathname === href || pathname === "/"
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}
