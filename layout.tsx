import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"
import Navigation from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Murmur - Voice-First Recommendations",
  description: "Discover and share trusted recommendations through voice",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <main className="flex-1">{children}</main>
              <Navigation />
            </div>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'