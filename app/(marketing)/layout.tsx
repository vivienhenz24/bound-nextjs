import { PublicNavbar } from "@/components/public-navbar"
import { Footer } from "@/components/footer"
import { ForceLightTheme } from "@/components/marketing/force-light-theme"

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="marketing-layout">
      <ForceLightTheme />
      <PublicNavbar />
      {children}
      <Footer />
    </div>
  )
}
