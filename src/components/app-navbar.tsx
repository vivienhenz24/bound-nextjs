"use client"

import { useEffect, useState, startTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import { User, Settings, LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function AppNavbar() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Set mounted after hydration to prevent SSR/client mismatch
    startTransition(() => {
      setMounted(true)
    })
  }, [])

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
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
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          {mounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 shrink-0">
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
            <Button variant="ghost" size="sm" className="gap-2" disabled>
              <User className="h-4 w-4" />
              <span>username</span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

