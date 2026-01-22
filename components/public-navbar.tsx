"use client"

import { useState } from "react"
import Link from "next/link"
import { Github, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchBar } from "@/components/landing/search-bar"

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-0">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl md:text-2xl font-semibold text-primary tracking-tight">
            bound
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/models"
              className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Models
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/resources"
              className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Resources
            </Link>
          </div>
        </div>
        <div className="hidden md:flex flex-1 justify-center max-w-md mx-8">
          <SearchBar />
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/bound-systems"
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
          <div className="flex flex-col items-start px-4 py-4 gap-4">
            <Link
              href="/models"
              className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Models
            </Link>
            <Link
              href="/pricing"
              className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/resources"
              className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <div className="pt-2 w-full">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button size="sm" className="w-full">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
