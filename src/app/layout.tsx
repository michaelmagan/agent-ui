import type { Metadata } from "next"
import { CopilotKit } from "@copilotkit/react-core"
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { Header } from "@/components/Header"
import { ThemeProvider } from "@/components/theme-provider"
import "@/styles/globals.css"

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Co-Finder - A Demo App Built on Agent UI",
  description:
    "Find your ideal co-founder with our AI-driven interface, a demo app showcasing the capabilities of Agent UI.",
  openGraph: {
    title: "Co-Founder Finder - A Demo App Built on Agent UI",
    description:
      "Discover your perfect co-founder match using our generative UI. Experience the power of Agent UI in this interactive demo application.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`h-full ${poppins.variable}`} suppressHydrationWarning>
      <body className={cn("h-full bg-background antialiased", poppins.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* TODO: Might need to add agent="name of agent" */}
          <CopilotKit runtimeUrl="/api/copilotkit" agent="cofinder_agent">
            <Header />
            <main className="flex-1 overflow-hidden">{children}</main>
          </CopilotKit>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
