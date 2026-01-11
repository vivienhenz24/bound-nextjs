"use client"

import { usePathname } from "next/navigation"
import { PublicNavbar } from "@/components/public-navbar"
import { Footer } from "@/components/footer"

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const isResourcesPage = pathname === "/resources"

  return (
    <>
      <PublicNavbar />
      {children}
      {!isResourcesPage && <Footer />}
    </>
  )
}
