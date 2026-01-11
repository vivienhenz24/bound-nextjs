"use client"

import Link from "next/link"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

export function AppNavbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <NavigationMenu viewport={false}>
          <NavigationMenuList className="list-none">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/dashboard" className="flex items-center shrink-0">
                  <Image
                    src="/logo-dark.svg"
                    alt="bound logo"
                    width={120}
                    height={40}
                    priority
                    className="h-8 w-auto object-contain hidden dark:block"
                  />
                  <Image
                    src="/logo-light.svg"
                    alt="bound logo"
                    width={120}
                    height={40}
                    priority
                    className="h-8 w-auto object-contain block dark:hidden"
                  />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
