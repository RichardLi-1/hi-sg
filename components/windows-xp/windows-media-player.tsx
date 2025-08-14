"use client"
import { useState } from "react"
import { Play, Pause, Volume2, Maximize2 } from "lucide-react"

export function WindowsMediaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="h-full bg-gray-100 flex flex-col">
      {/* Media Player Toolbar */}
      <div className="bg-gradient-to-b from-gray-200 to-gray-300 border-b border-gray-400 p-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? "Pause" : "Play"}</span>
          </button>
          <div className="w-px h-6 bg-gray-400" />
          <button className="p-1 hover:bg-gray-200 rounded" title="Volume">
            <Volume2 className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded" title="Full Screen">
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 space-y-4">
        {/* Title and Description */}
        <div className="bg-white p-4 rounded border border-gray-300">
          <h2 className="text-lg font-bold text-blue-600 mb-2">Now Playing: title.wma</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            This is "title.wma" - the iconic Windows XP startup sound that defined an entire generation's relationship
            with technology. For me, this sound represents countless hours spent exploring virtual machines, discovering
            old Windows versions, and falling in love with the digital world.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            Growing up, I was fascinated by different operating systems and would spend hours setting up VMs just to
            experience Windows Vista, XP, and even older versions. The startup sounds, especially this one, became the
            soundtrack to my childhood curiosity about computers and technology.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            Every time I hear this sound, it takes me back to those formative moments when I first realized that
            technology wasn't just a tool - it was a playground for creativity and exploration.
          </p>
        </div>

        {/* Video Player */}
        <div className="bg-black rounded border border-gray-400 overflow-hidden">
          <div className="aspect-video">
            <iframe
              src="https://www.youtube.com/embed/KU1vH4ZeSMM?autoplay=0&controls=1&rel=0"
              title="Windows XP Startup Sound - title.wma"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Media Info */}
        <div className="bg-white p-3 rounded border border-gray-300">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-bold text-gray-600">File:</span>
              <span className="ml-2 text-gray-800">title.wma</span>
            </div>
            <div>
              <span className="font-bold text-gray-600">Duration:</span>
              <span className="ml-2 text-gray-800">0:06</span>
            </div>
            <div>
              <span className="font-bold text-gray-600">Format:</span>
              <span className="ml-2 text-gray-800">Windows Media Audio</span>
            </div>
            <div>
              <span className="font-bold text-gray-600">Source:</span>
              <span className="ml-2 text-gray-800">Windows XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-200 border-t border-gray-400 px-4 py-1 text-xs text-gray-600">
        Ready - Windows Media Player for Windows XP
      </div>
    </div>
  )
}
