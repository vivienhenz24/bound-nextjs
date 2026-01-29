"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

const CALENDLY_URL = "https://calendly.com/vikrambhamre/meeting"

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="relative sticky top-0 z-50 w-full bg-background">
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
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block"
          >
            <Button size="sm">Contact Us</Button>
          </a>
          <Link href="/login" className="hidden md:block">
            <Button size="sm" variant="outline">
              Log In
            </Button>
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
            <div className="pt-2 w-full flex flex-col gap-2">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                <Button size="sm" className="w-full">
                  Contact Us
                </Button>
              </a>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button size="sm" variant="outline" className="w-full">
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
