import Link from "next/link"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"


export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background">
      <div className="flex h-16 items-center justify-between relative">
        <Link href="/" className="text-2xl font-semibold text-primary">
          bound
        </Link>
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
          <Link href="/features" className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors">
            Features
          </Link>
          <Link href="/enterprise" className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors">
            Enterprise
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/resources" className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors">
            Resources
          </Link>
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
          <Button size="sm">
            Log In
          </Button>
        </div>

      </div>
    </nav>
  )
}

