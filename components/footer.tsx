import Link from "next/link"

export function Footer() {
  return (
    <footer className="mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="text-xl font-semibold text-primary tracking-tight">
              bound
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">Your intelligence.</p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground mb-1">Product</h3>
            <Link
              href="/products"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Overview
            </Link>
            <Link
              href="/resources"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Changelog
            </Link>
            <Link
              href="/waitlist"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Join Waitlist
            </Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-foreground mb-1">Legal</h3>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8">
          <p className="text-xs text-muted-foreground text-center">
            &copy; 2026 Bound. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
