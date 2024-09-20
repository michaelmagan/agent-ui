import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { Header } from "@/components/Header"
import { ThemeProvider } from "@/components/theme-provider"

import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "YC Archive Explorer - AI-Powered YC Startup Insights",
  description:
    "Explore Y Combinator's history with our AI-driven interface, accessing data on all past YC founders and startups.",
  openGraph: {
    title: "YC Archive Explorer - AI-Powered YC Startup Insights",
    description:
      "Dive into Y Combinator's rich history using our generative UI. Discover insights on all past YC founders and startups through an intelligent, interactive experience.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <head />
      <body className={cn("h-full bg-background font-sans antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1 overflow-hidden">{children}</main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
