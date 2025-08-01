"use client"
import { useEffect } from "react"

export default function Redirect() {
  useEffect(() => {
    window.location.href = "https://www.futureforward.info/"
  }, [])

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg mb-4">Redirecting to Future Forward...</p>
        <a href="https://www.futureforward.info/" className="text-green-400 underline hover:text-green-300">
          Click here if you're not redirected automatically
        </a>
      </div>
    </div>
  )
}
