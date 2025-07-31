"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

interface AnimatedHeaderProps {
  backHref?: string
  backText?: string
  rightLinks?: Array<{
    href: string
    text: string
    external?: boolean
  }>
  isHomepage?: boolean
}

export function AnimatedHeader({ backHref, backText, rightLinks = [], isHomepage = false }: AnimatedHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${isScrolled ? "p-4" : "p-0"}`}
    >
      <div
        className={`mx-auto transition-all duration-700 ease-out ${
          isScrolled
            ? "max-w-sm rounded-full backdrop-blur-xl bg-black/40 border border-gray-600/30 shadow-2xl transform scale-95"
            : "max-w-full rounded-none backdrop-blur-none bg-black border-b border-gray-800 shadow-none transform scale-100"
        }`}
      >
        <div className={`flex items-center justify-between transition-all duration-700 ${isScrolled ? "p-3" : "p-6"}`}>
          {/* Left side */}
          {!isHomepage && backHref && (
            <Link href={backHref} className="flex items-center text-gray-400 transition-all hover:text-green-300">
              <ArrowLeft className={`h-4 w-4 transition-all ${isScrolled ? "mr-0" : "mr-2"}`} />
              {!isScrolled && backText}
            </Link>
          )}

          {isHomepage && (
            <div className="flex items-center space-x-4">
              {!isScrolled && (
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                  <span className="text-green-400 font-bold">RL</span>
                </div>
              )}
            </div>
          )}

          {/* Right side navigation */}
          <nav className={`flex items-center transition-all duration-700 ${isScrolled ? "space-x-2" : "space-x-8"}`}>
            {isScrolled ? (
              // Compact orb navigation
              <>
                {isHomepage && (
                  <Link href="/projects" className="text-gray-400 hover:text-green-300 transition-colors text-sm">
                    Projects
                  </Link>
                )}
                <a
                  href="mailto:richardli0@outlook.com"
                  className="text-gray-400 hover:text-green-300 transition-colors text-sm"
                >
                  Contact
                </a>
                <a
                  href="https://www.linkedin.com/in/richardli0/"
                  className="text-gray-400 hover:text-green-300 transition-colors"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink className="w-3 h-3" />
                </a>
              </>
            ) : (
              // Full navigation
              <>
                {isHomepage ? (
                  <>
                    <Link href="/projects" className="hover:text-green-300 transition-colors">
                      PROJECTS
                    </Link>
                    <a href="mailto:richardli0@outlook.com" className="hover:text-green-300 transition-colors">
                      CONTACT
                    </a>
                    <a
                      href="https://www.linkedin.com/in/richardli0/"
                      className="hover:text-green-300 transition-colors flex items-center gap-1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      LINKEDIN <ExternalLink className="w-3 h-3" />
                    </a>
                    <a
                      href="https://github.com/RichardLi-1"
                      className="hover:text-green-300 transition-colors flex items-center gap-1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      GITHUB <ExternalLink className="w-3 h-3" />
                    </a>
                  </>
                ) : (
                  rightLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      className="flex items-center text-gray-400 transition-all hover:text-green-300"
                      rel={link.external ? "noreferrer" : undefined}
                    >
                      {link.text}
                      {link.external && <ExternalLink className="ml-2 h-4 w-4" />}
                    </a>
                  ))
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
