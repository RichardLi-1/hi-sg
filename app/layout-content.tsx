"use client"
import type React from "react"
import { useState } from "react"
import { WindowsXPProvider } from "@/contexts/windows-xp-context"
import { WindowsXPDesktop } from "@/components/windows-xp/desktop"
import { useWindowsXP } from "@/contexts/windows-xp-context"
import { GifLoadingScreen } from "@/components/gif-loading-screen"

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isXPMode } = useWindowsXP()
  const [showLoading, setShowLoading] = useState(true)

  const handleLoadingComplete = () => {
    setShowLoading(false)
  }

  return (
    <>
      {showLoading && <GifLoadingScreen onComplete={handleLoadingComplete} />}
      {!showLoading && (
        <>
          {isXPMode && <WindowsXPDesktop />}
          {!isXPMode && children}
        </>
      )}
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
