import Link from "next/link"

export function Footer() {
  return (
    <footer className="mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <p>&copy; 2026 Bound. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
