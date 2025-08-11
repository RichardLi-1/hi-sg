"use client"
import type React from "react"
import { WindowsXPProvider } from "@/contexts/windows-xp-context"
import { WindowsXPDesktop } from "@/components/windows-xp/desktop"
import { useWindowsXP } from "@/contexts/windows-xp-context"

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isXPMode } = useWindowsXP()

  return (
    <>
      {isXPMode && <WindowsXPDesktop />}
      {!isXPMode && children}
    </>
  )
}

export function LayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WindowsXPProvider>
      <LayoutContent>{children}</LayoutContent>
    </WindowsXPProvider>
  )
}
