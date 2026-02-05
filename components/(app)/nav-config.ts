import { LayoutDashboard, LayersPlus, BookAudio, Database, type LucideIcon } from "lucide-react"

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
    title: "Datasets",
    href: "/datasets",
    icon: Database,
    items: [
      { title: "All datasets", href: "/datasets" },
      { title: "Upload dataset", href: "/datasets/new" },
    ],
  },
  {
    title: "My Models",
    href: "/my-models",
    icon: LayersPlus,
    items: [
      { title: "New Model", href: "/my-models/new" },
      { title: "Datasets", href: "/my-models/datasets" },
      { title: "Jobs", href: "/my-models/jobs" },
    ],
  },
]

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/"
  }
  return pathname === href || pathname.startsWith(`${href}/`)
}
