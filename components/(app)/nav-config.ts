import { LayoutDashboard, LayersPlus, BookAudio, type LucideIcon } from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  items?: { title: string; href: string }[]
}

export const mainNavItems: NavItem[] = [
  { title: "Home", href: "/", icon: LayoutDashboard },
  {
    title: "Libary",
    href: "/libary",
    icon: BookAudio,
    items: [
      { title: "Explore", href: "/libary/explore" },
      { title: "My Collection", href: "/libary/my-collection" },
    ],
  },
  {
    title: "My Models",
    href: "/my-models",
    icon: LayersPlus,
    items: [
      { title: "New Model", href: "/my-models/new" },
      { title: "Metrics", href: "/my-models/metrics" },
    ],
  },
]

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/"
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}
