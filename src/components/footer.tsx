import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export function Footer() {
    return (
        <footer className="bg-background border-t border-border/40">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                        <p className="text-[12px] font-medium text-muted-foreground/60 tracking-wider">
                            &copy; 2026 BOUND.
                        </p>
                        <div className="flex items-center gap-8">
                            <Link href="/privacy" className="text-[12px] font-medium text-muted-foreground/60 hover:text-foreground transition-colors tracking-tight">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-[12px] font-medium text-muted-foreground/60 hover:text-foreground transition-colors tracking-tight">
                                Terms of Service
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="scale-90 opacity-70 hover:opacity-100 transition-opacity">
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
