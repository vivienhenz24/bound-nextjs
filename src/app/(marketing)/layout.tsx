import { PublicNavbar } from "@/components/public-navbar"

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <PublicNavbar />
      {children}
    </>
  )
}

