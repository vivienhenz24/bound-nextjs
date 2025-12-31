import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between">
        <h1 className="text-2xl font-semibold text-primary">bound</h1>
        <ThemeToggle />
      </div>
    </nav>
  )
}

