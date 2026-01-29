import { PublicNavbar } from "@/components/public-navbar"
import { Footer } from "@/components/footer"
import { ForceLightTheme } from "@/components/marketing/force-light-theme"

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="marketing-layout min-h-screen flex flex-col">
      <ForceLightTheme />
      <PublicNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
