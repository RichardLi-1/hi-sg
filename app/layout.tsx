import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { WindowsXPProvider } from "@/contexts/windows-xp-context"
import { WindowsXPDesktop } from "@/components/windows-xp/desktop"
import { useWindowsXP } from "@/contexts/windows-xp-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Richard Li",
  description: "Personal website and chatbot for Richard Li",
    generator: 'v0.dev'
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isXPMode } = useWindowsXP()

  return (
    <>
      {isXPMode && <WindowsXPDesktop />}
      {!isXPMode && children}
    </>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WindowsXPProvider>
          <LayoutContent>{children}</LayoutContent>
        </WindowsXPProvider>
      </body>
    </html>
  )
}
