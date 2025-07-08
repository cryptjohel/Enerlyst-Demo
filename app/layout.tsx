import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Chatbot } from "@/components/chatbot"
import { ThemeProvider } from "@/contexts/theme-context"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Enerlyst - Your Intelligent Energy Calculator",
  description: "Calculate diesel costs, energy usage & get solar recommendations in minutes.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            {children}
            <Chatbot />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
