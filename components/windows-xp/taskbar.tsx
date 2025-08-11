"use client"
import { useWindowsXP } from "@/contexts/windows-xp-context"

export function Taskbar() {
  const { windows, focusWindow, toggleStartMenu, isStartMenuOpen, openWindow } = useWindowsXP()

  const visibleWindows = windows.filter((w) => !w.isMinimized)
  const maxWindowButtons = Math.floor((window.innerWidth - 200) / 120) // Approximate calculation
  const shouldShrink = visibleWindows.length > maxWindowButtons

  return (
    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-blue-400 to-blue-600 border-t-2 border-blue-300 flex items-center px-1">
      <button
        onClick={toggleStartMenu}
        className="h-8 w-20 relative overflow-hidden rounded-sm transition-none"
        style={{
          backgroundImage: `url(/images/start-button-states.png)`,
          backgroundSize: "100% 300%", // Three states stacked vertically
          backgroundPosition: isStartMenuOpen ? "0 -200%" : "0 0%", // Default: top, Open: bottom
          backgroundRepeat: "no-repeat",
        }}
        onMouseDown={(e) => {
          // Pressed state (middle image)
          e.currentTarget.style.backgroundPosition = "0 -100%"
        }}
        onMouseUp={(e) => {
          // Return to appropriate state
          e.currentTarget.style.backgroundPosition = isStartMenuOpen ? "0 -200%" : "0 0%"
        }}
        onMouseLeave={(e) => {
          // Return to appropriate state when mouse leaves
          e.currentTarget.style.backgroundPosition = isStartMenuOpen ? "0 -200%" : "0 0%"
        }}
      >
        {/* Invisible text for accessibility */}
        <span className="sr-only">start</span>
      </button>

      <button
        onClick={() =>
          openWindow({
            title: "Projects - Internet Explorer",
            content: <InternetExplorerContent />,
            isMinimized: false,
            isMaximized: false,
            position: { x: 200, y: 100 },
            size: { width: 800, height: 600 },
          })
        }
        className="h-8 w-8 ml-2 bg-gradient-to-b from-gray-200 to-gray-400 hover:from-gray-100 hover:to-gray-300 border border-gray-500 rounded-sm flex items-center justify-center"
      >
        <img src="/images/internet-explorer-icon.png" alt="Internet Explorer" className="w-5 h-5" />
      </button>

      {/* Window Buttons */}
      <div className="flex-1 flex items-center ml-2 space-x-1 overflow-hidden">
        {visibleWindows.map((window) => (
          <button
            key={window.id}
            onClick={() => focusWindow(window.id)}
            className={`h-8 px-3 bg-gradient-to-b from-gray-200 to-gray-400 hover:from-gray-100 hover:to-gray-300 border border-gray-500 rounded-sm text-black text-xs truncate ${
              shouldShrink ? "max-w-24 min-w-16" : "max-w-40"
            }`}
          >
            {window.title}
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center space-x-2 mr-2">
        <div className="text-white text-xs">
          {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  )
}

function InternetExplorerContent() {
  const { openWindow } = useWindowsXP()

  const handleProjectClick = (projectSlug: string, title: string) => {
    openWindow({
      title: `${title} - Internet Explorer`,
      content: <ProjectDetailContent projectSlug={projectSlug} title={title} />,
      isMinimized: false,
      isMaximized: false,
      position: { x: 300, y: 150 },
      size: { width: 700, height: 500 },
    })
  }

  return (
    <div className="h-full bg-white">
      {/* IE Toolbar */}
      <div className="bg-gray-100 border-b border-gray-300 p-2">
        <div className="flex items-center space-x-2 text-sm">
          <img src="/images/internet-explorer-icon.png" alt="IE" className="w-4 h-4" />
          <button className="px-2 py-1 bg-gray-200 border border-gray-400 text-black">Back</button>
          <button className="px-2 py-1 bg-gray-200 border border-gray-400 text-black">Forward</button>
          <button className="px-2 py-1 bg-gray-200 border border-gray-400 text-black">Stop</button>
          <button className="px-2 py-1 bg-gray-200 border border-gray-400 text-black">Refresh</button>
          <div className="flex-1 mx-2">
            <input
              type="text"
              value="http://richardli.dev/projects"
              readOnly
              className="w-full px-2 py-1 border border-gray-400 text-black"
            />
          </div>
          <button className="px-2 py-1 bg-gray-200 border border-gray-400 text-black">Go</button>
        </div>
      </div>

      {/* Projects Content */}
      <div className="p-4 h-full overflow-auto bg-white">
        <h1 className="text-2xl font-bold mb-6 text-black">My Projects</h1>

        <div className="grid gap-6">
          <ProjectCard
            title="Bo!nk"
            description="A Windows Vista-inspired inkball game published on the App Store"
            tags={["Swift", "iOS", "Game Development"]}
            onClick={() => handleProjectClick("boink", "Bo!nk")}
          />
          <ProjectCard
            title="YRHacks"
            description="Canada's largest high school hackathon"
            tags={["Event Organization", "Community"]}
            onClick={() => handleProjectClick("yrhacks", "YRHacks")}
          />
          <ProjectCard
            title="Future Forward"
            description="Non-profit focusing on helping students discover their vocations"
            tags={["Non-profit", "Education"]}
            onClick={() => handleProjectClick("futureforward", "Future Forward")}
          />
          <ProjectCard
            title="Career Education Council"
            description="Educational initiative for career development"
            tags={["Education", "Career Development"]}
            onClick={() => handleProjectClick("cec", "Career Education Council")}
          />
          <ProjectCard
            title="RFP: Rebranding the Markville Secondary Plan"
            description="Urban planning project that won a City Design Challenge hackathon"
            tags={["Urban Planning", "Design", "Hackathon Winner"]}
            onClick={() => handleProjectClick("markville-rfp", "RFP: Rebranding the Markville Secondary Plan")}
          />
        </div>
      </div>
    </div>
  )
}

function ProjectCard({
  title,
  description,
  tags,
  onClick,
}: {
  title: string
  description: string
  tags: string[]
  onClick: () => void
}) {
  return (
    <div
      className="border border-gray-300 p-4 bg-gray-50 cursor-pointer hover:bg-blue-50 transition-colors"
      onClick={onClick}
    >
      <h3 className="font-bold text-lg text-black mb-2">{title}</h3>
      <p className="text-gray-700 mb-3">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

function ProjectDetailContent({ projectSlug, title }: { projectSlug: string; title: string }) {
  return (
    <div className="p-4 h-full overflow-auto bg-white">
      <h2 className="text-xl font-bold mb-4 text-black">{title}</h2>
      <div className="text-black">
        <p className="mb-4">Loading project details for {title}...</p>
        <p className="text-sm text-gray-600">
          This would normally load the full project page content from /{projectSlug}
        </p>
      </div>
    </div>
  )
}
