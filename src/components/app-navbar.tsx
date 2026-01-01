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
    <nav className="sticky top-0 z-50 w-full bg-background border-b border-border">
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
          {mounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 shrink-0 w-max h-9">
                  <User className="h-4 w-4 shrink-0" />
                  <span className="whitespace-nowrap">username</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-48 max-w-[calc(100vw-2rem)]"
                side="bottom"
                sideOffset={4}
                alignOffset={0}
              >
                <DropdownMenuLabel>username</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" className="gap-2 shrink-0 w-max h-9" disabled>
              <User className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">username</span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

