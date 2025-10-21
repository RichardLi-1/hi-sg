"use client"

import { useEffect, useRef } from "react"

export function usePageViewTracker() {
  const hasTracked = useRef(false)
  const slashKeyHeld = useRef(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        slashKeyHeld.current = true
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "/") {
        slashKeyHeld.current = false
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    const sendVisit = async () => {
      if (slashKeyHeld.current) {
        return
      }

      // Skip bots
      if (/bot|crawler|spider/i.test(navigator.userAgent)) return

      // Skip vusercontent.net URLs
      if (window.location.href.includes("vusercontent.net")) return

      // Only track once per page load
      if (hasTracked.current) return
      hasTracked.current = true

      let ip = "unknown"
      try {
        const res = await fetch("https://api.ipify.org?format=json")
        const data = await res.json()
        ip = data.ip || "unknown"
      } catch (err) {
        console.warn("Failed to get IP, sending notification without it.")
      }

      // Check if URL is LinkedIn referral
      const isLinkedIn = window.location.href === "https://www.richardli.dev/?l"

      const message = isLinkedIn
        ? `👀 New visitor on ${window.location.href} from **LinkedIn**\n🕒 ${new Date().toLocaleString()}\n🌐 IP: ${ip}`
        : `👀 New visitor on ${window.location.href}\n🕒 ${new Date().toLocaleString()}\n🌐 IP: ${ip}`

      try {
        await fetch(
          "https://discord.com/api/webhooks/1429248057027067925/Bmd9BlC5bE5QsPlskHhxiLjNjii9lVZ-C23wOmKF5tXLwugP_KRGyniYnIMTbZKtOLdX",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: message }),
          },
        )
      } catch (err) {
        console.error("Failed to send Discord notification:", err)
      }
    }

    sendVisit()

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])
}
