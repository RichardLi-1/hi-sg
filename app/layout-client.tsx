"use client"

import type React from "react"
import { WindowsXPProvider } from "@/contexts/windows-xp-context"
import { WindowsXPDesktop } from "@/components/windows-xp/desktop"

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { useWindowsXP } = require("@/contexts/windows-xp-context")
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
