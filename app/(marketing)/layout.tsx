import { PublicNavbar } from "@/components/public-navbar"
import { Footer } from "@/components/footer"

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="marketing-layout">
      <PublicNavbar />
      {children}
      <Footer />
    </div>
  )
}
