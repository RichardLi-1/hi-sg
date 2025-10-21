"use client"
import { useState, useEffect } from "react"

interface ProjectImageCyclerProps {
  images: (string | undefined)[]
  alt: string
  className?: string
}

export function ProjectImageCycler({ images, alt, className = "" }: ProjectImageCyclerProps) {
  const validImages = images.filter((img): img is string => !!img)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    if (validImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % validImages.length)
    }, 2000) // Cycle every 2 seconds

    return () => clearInterval(interval)
  }, [validImages.length])

  if (validImages.length === 0) {
    return <img src="/placeholder.svg" alt={alt} className={className} />
  }

  return <img src={validImages[currentImageIndex] || "/placeholder.svg"} alt={alt} className={className} />
}
