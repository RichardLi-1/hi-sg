"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { useWindowsXP } from "@/contexts/windows-xp-context"

interface WindowXPWindowProps {
  window: {
    id: string
    title: string
    content: React.ReactNode
    isMinimized: boolean
    isMaximized: boolean
    position: { x: number; y: number }
    size: { width: number; height: number }
    zIndex: number
  }
}

export function WindowXPWindow({ window }: WindowXPWindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow, updateWindowPosition, updateWindowSize } =
    useWindowsXP()
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - window.position.x,
      y: e.clientY - window.position.y,
    })
    setIsDragging(true)
    focusWindow(window.id)
  }

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: window.size.width,
      height: window.size.height,
    })
    setIsResizing(true)
    focusWindow(window.id)
  }

  const windowStyle = window.isMaximized
    ? {
        position: "fixed" as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 40,
        zIndex: window.zIndex,
      }
    : {
        position: "absolute" as const,
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.zIndex,
      }

  useEffect(() => {
    let handleMouseMove: (e: MouseEvent) => void
    let handleMouseUp: () => void

    if (!window.isMaximized) {
      handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
          const newX = e.clientX - dragOffset.x
          const newY = e.clientY - dragOffset.y

          // Keep window within screen bounds
          const viewportWidth = globalThis.window?.innerWidth || 1024
          const viewportHeight = globalThis.window?.innerHeight || 768
          const maxX = viewportWidth - (window.size.width || 400)
          const maxY = viewportHeight - (window.size.height || 300) - 40 // Account for taskbar

          // Ensure values are valid numbers before updating position
          const validX = isNaN(newX) ? 0 : Math.max(0, Math.min(newX, maxX))
          const validY = isNaN(newY) ? 0 : Math.max(0, Math.min(newY, maxY))

          updateWindowPosition(window.id, {
            x: validX,
            y: validY,
          })
        }
        if (isResizing) {
          const deltaX = e.clientX - resizeStart.x
          const deltaY = e.clientY - resizeStart.y

          const newWidth = Math.max(300, resizeStart.width + deltaX)
          const newHeight = Math.max(200, resizeStart.height + deltaY)

          updateWindowSize(window.id, {
            width: newWidth,
            height: newHeight,
          })
        }
      }

      handleMouseUp = () => {
        setIsDragging(false)
        setIsResizing(false)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [
    isDragging,
    isResizing,
    dragOffset,
    resizeStart,
    window.id,
    window.size,
    window.isMaximized,
    updateWindowPosition,
    updateWindowSize,
  ])

  if (window.isMinimized) return null

  return (
    <div
      style={windowStyle}
      className="bg-gray-100 border-2 border-gray-400 shadow-lg rounded-lg overflow-hidden"
      onClick={() => focusWindow(window.id)}
    >
      <div
        className={`text-white p-1 flex items-center justify-between rounded-t-lg ${
          window.isMaximized ? "cursor-default" : "cursor-move"
        }`}
        style={{
          backgroundImage: "url('/images/xp-title-bar-gradient.png')",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          borderBottom: "1px solid #1E3F8A",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)",
        }}
        onMouseDown={window.isMaximized ? undefined : handleMouseDown}
      >
        <div className="flex items-center space-x-2">
          {window.title.includes("Internet Explorer") ? (
            <img src="/images/internet-explorer-icon.png" alt="IE" className="w-4 h-4" />
          ) : (
            <span className="text-sm">📄</span>
          )}
          <span className="text-sm font-bold text-white drop-shadow-sm">{window.title}</span>
        </div>
        <div className="flex space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation()
              minimizeWindow(window.id)
            }}
            className="w-6 h-5 bg-gradient-to-b from-gray-200 to-gray-400 hover:from-gray-100 hover:to-gray-300 border border-gray-500 text-black text-xs flex items-center justify-center rounded-sm"
          >
            _
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              maximizeWindow(window.id)
            }}
            className="w-6 h-5 bg-gradient-to-b from-gray-200 to-gray-400 hover:from-gray-100 hover:to-gray-300 border border-gray-500 text-black text-xs flex items-center justify-center rounded-sm"
          >
            □
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeWindow(window.id)
            }}
            className="w-6 h-5 bg-gradient-to-b from-red-400 to-red-600 hover:from-red-300 hover:to-red-500 border border-gray-500 text-white text-xs flex items-center justify-center rounded-sm"
          >
            ×
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative" style={{ height: "calc(100% - 32px)" }}>
        <div className="h-full overflow-auto">{window.content}</div>

        {!window.isMaximized && (
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-300 hover:bg-gray-400"
            onMouseDown={handleResizeMouseDown}
            style={{
              background:
                "linear-gradient(-45deg, transparent 0%, transparent 30%, #666 30%, #666 40%, transparent 40%, transparent 60%, #666 60%, #666 70%, transparent 70%)",
            }}
          />
        )}
      </div>
    </div>
  )
}
