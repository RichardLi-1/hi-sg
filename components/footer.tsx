export function Footer() {
  return (
    <footer className="flex w-full justify-center border-t" style={{ borderColor: "var(--border-2)", color: "var(--text-3)", background: "var(--bg)" }}>
      <div className="flex w-full max-w-6xl items-center justify-between p-4">
        <span className="font-serif italic">Richard Li</span>
        <span style={{ fontFamily: "'SFCamera', sans-serif", color: "var(--text-3)" }}>Built with Next.js and TypeScript. Set in SFCamera and Toronto Subway.</span>
        <div className="flex items-center gap-2">
          <div className="relative flex size-2 items-center justify-center">
            <div className="size-2 rounded-full bg-green-400 animate-pulse-custom"></div>
          </div>
          <span className="text-sm">Version 2.0.0 - Updated 02/25/2025</span>
        </div>
      </div>
    </footer>
  )
}
