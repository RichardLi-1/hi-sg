"use client"
import { useState, useEffect } from "react"
import { AnimatedHeader } from "@/components/animated-header"
import { MobileHeader } from "@/components/mobileheader"

interface ResponsiveHeaderProps {
  isHomepage?: boolean
  currentPage?: string
  backHref?: string
  backText?: string
  rightLinks?: Array<{
    href: string
    text: string
    external?: boolean
  }>
}

export function ResponsiveHeader({
  isHomepage = false,
  currentPage = "",
  backHref,
  backText,
  rightLinks = [],
}: ResponsiveHeaderProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return  (
    <AnimatedHeader
      isHomepage={isHomepage}
      currentPage={currentPage}
      backHref={backHref}
      backText={backText}
      rightLinks={rightLinks}
    />
  )
}
