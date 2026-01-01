import { AppNavbar } from "@/components/app-navbar"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="app-layout">
      <AppNavbar />
      {children}
    </div>
  )
}

