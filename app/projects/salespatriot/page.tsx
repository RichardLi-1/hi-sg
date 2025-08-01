"use client"
import { Footer } from "@/components/footer"
import { AnimatedPage } from "@/components/animated-page"
import { StaggeredContent } from "@/components/staggered-content"
import { AnimatedHeader } from "@/components/animated-header"

export default function SalesPatriotProjectPage() {
  return (
    <AnimatedPage>
      <div className="min-h-screen bg-black text-green-400 font-mono">
        <AnimatedHeader
          backHref="/projects"
          backText="Back"
          currentPage="/projects/salespatriot"
          rightLinks={[{ href: "https://salespatriot.com/", text: "Website", external: true }]}
        />

        <main className="max-w-4xl mx-auto p-6" style={{ paddingTop: "120px" }}>
          <StaggeredContent delay={200}>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold italic text-green-400 mb-2">SalesPatriot (YC W25)</h1>
              <p className="text-lg text-gray-300">Work, 2025</p>
            </div>
          </StaggeredContent>

          <StaggeredContent delay={400}>
            {/* Hero Image */}
            <div className="relative mb-8 aspect-video w-full bg-gray-800 overflow-hidden rounded-lg">
              <img
                src="https://richardli-1.github.io/Personal-Website/salespatriott.png"
                alt="SalesPatriot screenshots"
                className="w-full h-full object-cover"
              />
            </div>
          </StaggeredContent>

          {/* Project Details Grid */}
          <StaggeredContent delay={600}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div>
                  <h3 className="text-green-400 font-bold mb-2">Timeline</h3>
                  <p className="text-gray-300">2 months, 2025</p>
                </div>

                <div>
                  <h3 className="text-green-400 font-bold mb-2">Team</h3>
                  <div className="space-y-1 text-gray-300">
                    <a href="https://www.linkedin.com/in/matthewkkimm/" className="underline">
                      <p>Matthew Kim</p>
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-green-400 font-bold mb-2">Overview</h3>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Page is WIP. SalesPatriot is a San Francisco-based B2B SaaS platform that simplifies the
                    complexities of bidding on and managing contracts for NSNs for distributors and contractors. I did a
                    project for them summer of 2025.
                  </p>
                </div>
              </div>
            </div>
          </StaggeredContent>
        </main>

        <StaggeredContent delay={1400}>
          <Footer />
        </StaggeredContent>
      </div>
    </AnimatedPage>
  )
}
