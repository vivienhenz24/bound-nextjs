import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { Geist_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "@/components/query-provider"
import { AuthProvider } from "@/lib/auth-context"

const hikasamiSans = localFont({
  src: "../fonts/variable/Hikasami-VF.woff2",
  variable: "--font-hikasami-sans",
  display: "swap",
  weight: "100 900",
  fallback: ["system-ui", "arial"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "bound",
  description: "Formally verify your auth SDKs",
  icons: {
    icon: "/logo-icon.svg",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/logo-light.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/logo-dark.svg" as="image" type="image/svg+xml" />
      </head>
      <body
        className={`${hikasamiSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
