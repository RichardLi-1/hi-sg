"use client"
import { useWindowsXP } from "@/contexts/windows-xp-context"
import type React from "react"

import { ProjectsIEContent } from "./projects-ie-content"

export function StartMenu() {
  const { openWindow, toggleStartMenu, toggleXPMode } = useWindowsXP()

  const handleMenuClick = (action: () => void) => {
    action()
    toggleStartMenu()
  }

  const handleLogOff = () => {
    // Play logoff sound
    const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/windows%20xp%20logoff-qVypi1jbvZTHC27uDDxoJSOaMQWGA4.mp3")
    audio.play().catch(console.error)

    toggleXPMode() // Turn off XP mode
    toggleStartMenu() // Close start menu
  }

  const handleTurnOffComputer = () => {
    // Play logoff sound
    const audio = new Audio("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/windows%20xp%20logoff-qVypi1jbvZTHC27uDDxoJSOaMQWGA4.mp3")
    audio.play().catch(console.error)

    toggleXPMode() // Turn off XP mode
    toggleStartMenu() // Close start menu
  }

  return (
    <div className="absolute bottom-10 left-0 w-96 h-96 bg-gradient-to-b from-blue-100 to-blue-200 border-2 border-blue-400 rounded-tr-lg shadow-2xl">
      {/* User Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 rounded-tr-lg">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-300 rounded border-2 border-white flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <span className="font-bold">Richard Li</span>
        </div>
      </div>

      <div className="flex h-80">
        {/* Left Column */}
        <div className="w-1/2 p-2 space-y-1">
          <StartMenuItem
            icon={<img src="/images/internet-explorer-icon.png" alt="IE" className="w-5 h-5" />}
            text="Internet Explorer"
            onClick={() =>
              handleMenuClick(() =>
                openWindow({
                  title: "Projects - Internet Explorer",
                  content: <ProjectsIEContent />,
                  isMinimized: false,
                  isMaximized: false,
                  position: { x: 200, y: 200 },
                  size: { width: 800, height: 600 },
                }),
              )
            }
          />
          <StartMenuItem icon="📧" text="E-mail" />
          <StartMenuItem icon="💬" text="MSN Messenger" />
          <StartMenuItem icon="🎵" text="Windows Media Player" />
          <StartMenuItem icon="📝" text="Notepad" />
          <StartMenuItem icon="🎮" text="Games" />
        </div>

        {/* Right Column */}
        <div className="w-1/2 p-2 space-y-1 bg-blue-50">
          <StartMenuItem icon="📁" text="My Documents" />
          <StartMenuItem icon="🖼️" text="My Pictures" />
          <StartMenuItem icon="🎵" text="My Music" />
          <StartMenuItem icon="💻" text="My Computer" />
          <StartMenuItem icon="⚙️" text="Control Panel" />
          <StartMenuItem icon="🔍" text="Search" />
          <StartMenuItem icon="❓" text="Help and Support" />
        </div>
      </div>

      {/* Bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-orange-400 to-orange-600 p-2 flex justify-between rounded-br-lg">
        <button onClick={handleLogOff} className="text-white text-sm font-bold hover:bg-orange-500 px-2 py-1 rounded">
          Log Off
        </button>
        <button
          onClick={handleTurnOffComputer}
          className="text-white text-sm font-bold hover:bg-orange-500 px-2 py-1 rounded"
        >
          Turn Off Computer
        </button>
      </div>
    </div>
  )
}

function StartMenuItem({
  icon,
  text,
  onClick,
}: {
  icon: string | React.ReactNode
  text: string
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center space-x-2 p-2 hover:bg-blue-200 rounded text-left text-sm"
    >
      <span className="text-lg flex items-center justify-center w-5 h-5">{icon}</span>
      <span className="text-black">{text}</span>
    </button>
  )
}
