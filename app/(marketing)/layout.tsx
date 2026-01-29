import { PublicNavbar } from "@/components/public-navbar"
import { Footer } from "@/components/footer"

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="marketing-layout min-h-screen flex flex-col">
      <PublicNavbar />
      <div className="mx-auto w-full max-w-6xl border-x-[0.5px] border-foreground/90 flex-1 flex flex-col">
        <main className="flex-1">{children}</main>
        <div
          className="relative left-1/2 right-1/2 -mx-[50vw] w-screen border-t-[0.5px] border-foreground/90"
          aria-hidden="true"
        />
        <Footer />
      </div>
    </div>
  )
}
