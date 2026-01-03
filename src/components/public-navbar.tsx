"use client"

import { useState } from "react"
import Link from "next/link"
import { Github, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-background">
      <div className="flex h-16 items-center justify-between relative px-4 md:px-0">
        <Link href="/" className="text-xl md:text-2xl font-semibold text-primary tracking-tight">
          bound
        </Link>
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="gap-8 list-none">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/pricing"
                    className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/resources"
                    className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
                  >
                    Resources
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-foreground hover:text-muted-foreground transition-colors p-2"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <ThemeToggle />
          <Link href="/login" className="hidden md:block">
            <Button size="sm">Log In</Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground hover:text-muted-foreground transition-colors p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-background">
          <NavigationMenu viewport={false}>
            <NavigationMenuList className="flex flex-col items-start px-4 py-4 gap-4 list-none">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/pricing"
                    className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/resources"
                    className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Resources
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="pt-2 w-full">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                  <Button size="sm" className="w-full">
                    Log In
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </nav>
  )
}
