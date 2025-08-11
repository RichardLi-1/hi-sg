"use client"
import type { ReactNode } from "react"

interface DesktopIconProps {
  icon: string | ReactNode
  label: string
  onDoubleClick: () => void
}

export function DesktopIcon({ icon, label, onDoubleClick }: DesktopIconProps) {
  return (
    <div
      className="flex flex-col items-center cursor-pointer hover:bg-blue-200 hover:bg-opacity-50 p-2 rounded"
      onDoubleClick={onDoubleClick}
    >
      <div className="text-3xl mb-1 flex items-center justify-center">{typeof icon === "string" ? icon : icon}</div>
      <div className="text-white text-xs text-center font-bold drop-shadow-lg">{label}</div>
    </div>
  )
}
