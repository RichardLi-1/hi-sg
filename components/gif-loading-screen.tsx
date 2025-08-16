"use client"
import { useEffect, useState } from "react"

interface GifLoadingScreenProps {
  onComplete: () => void
}

export function GifLoadingScreen({ onComplete }: GifLoadingScreenProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setIsVisible(false)
      onComplete()
    }, 4000)

    return () => clearTimeout(fallbackTimer)
  }, [onComplete])

  const handleVideoEnd = () => {
    setIsVisible(false)
    onComplete()
  }

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-transform duration-500 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-[70vw] h-[70vh] flex items-center justify-center">
        <video
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vid%20with%20no%20end%20lag-ehPcR5jbpdrMdfqRx0fpktPPPqEoPq.mov"
          className="w-full h-full object-contain"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
        />
      </div>
    </div>
  )
}
