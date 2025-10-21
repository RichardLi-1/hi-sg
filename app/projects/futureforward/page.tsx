"use client"
import { useEffect } from "react"
import { Footer } from "@/components/footer"
import { AnimatedPage } from "@/components/animated-page"
import { StaggeredContent } from "@/components/staggered-content"
import { AnimatedHeader } from "@/components/animated-header"
import { ExternalLink, Youtube } from "lucide-react"
import { usePageViewTracker } from "@/hooks/use-page-view-tracker"

export default function FutureForwardProjectPage() {
  usePageViewTracker()

  useEffect(() => {
    // This redirect is still here, but the page content below will be rendered first
    // and then the redirect will happen. If you want to remove the redirect,
    // you can delete this useEffect block.
    // window.location.href = "https://www.futureforward.info/"
  }, [])

  return (
    <AnimatedPage>
      <div className="min-h-screen bg-black text-green-400">
        <AnimatedHeader
          backHref="/projects"
          backText="Back"
          currentPage="/projects/futureforward"
          rightLinks={[{ href: "https://www.futureforward.info/", text: "Website", external: true }]}
        />

        <main className="max-w-4xl mx-auto p-6" style={{ paddingTop: "120px" }}>
          <StaggeredContent delay={0}>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold italic text-green-400 mb-2 flex items-center justify-center gap-2">
                <img
                  src="/images/future-forward-logo.png"
                  alt="Future Forward Logo"
                  className="w-8 h-8 object-contain"
                />
                Future Forward
              </h1>
              <p className="text-lg text-gray-300">Non-profit, 2024</p>
            </div>
          </StaggeredContent>

          <StaggeredContent delay={100}>
            <div className="relative mb-8 aspect-video w-full bg-gray-800 overflow-hidden rounded-lg">
              <img
                src="/images/IMG_7745.jpeg"
                alt="Future Forward screenshots"
                className="w-full h-full object-cover"
              />
            </div>
          </StaggeredContent>

          <StaggeredContent delay={300}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <div>
                  <h3 className="text-green-400 font-bold mb-2">Timeline</h3>
                  <p className="text-gray-300">Ongoing, 2024-Present</p>
                </div>

                <div>
                  <h3 className="text-green-400 font-bold mb-2">Team</h3>
                  <div className="space-y-1 text-gray-300">
                    <a
                      href="https://www.linkedin.com/in/michelle-matthew-35b6931aa/"
                      target="_blank"
                      className="underline"
                      rel="noreferrer"
                    >
                      <p>Michelle Matthew</p>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/kirsten-hsiang-bb64b2324/"
                      target="_blank"
                      className="underline"
                      rel="noreferrer"
                    >
                      <p>Kirsten Hsiang</p>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-green-400 font-bold mb-2">Links</h3>
                  <div className="space-y-2">
                    <a
                      href="https://www.futureforward.info/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Official Website
                    </a>
                    <a
                      href="https://www.youtube.com/@FutureForward.Initiative"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors"
                    >
                      <Youtube className="w-4 h-4" />
                      YouTube Channel
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-green-400 font-bold mb-2">Overview</h3>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Future Forward is a non-profit initiative dedicated to helping students discover their vocations and
                    career paths. We aim to provide resources, mentorship, and opportunities to guide students in their
                    educational and professional journeys.
                  </p>
                  <p>
                    Our mission is to bridge the gap between academic learning and real-world career opportunities,
                    empowering students to make informed decisions about their future.
                  </p>
                </div>
              </div>
            </div>
          </StaggeredContent>

          <StaggeredContent delay={200}>
            <div className="mb-8">
              <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                <Youtube className="w-5 h-5" />
                Featured Video
              </h3>
              <div className="aspect-video w-full bg-gray-800 rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/FL8_oEPPx0c"
                  title="Future Forward Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </StaggeredContent>

          <StaggeredContent delay={400}>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-green-400 mb-6">Marketing Club</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 text-gray-300">
                  <p>
                    Our Marketing Club brings together students passionate about business, branding, and creative
                    communication. Through interactive workshops and hands-on projects, members learn essential
                    marketing concepts including digital marketing, social media strategy, and brand development.
                  </p>
                  <p>
                    Students collaborate on real-world marketing campaigns, develop their creative skills, and gain
                    practical experience that prepares them for careers in business and marketing. The club fosters an
                    environment of innovation and teamwork, where ideas come to life.
                  </p>
                </div>
                <div className="relative aspect-video w-full bg-gray-800 overflow-hidden rounded-lg">
                  <img
                    src="/images/IMG_7099.jpeg"
                    alt="Marketing Club workshop with students collaborating"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </StaggeredContent>

          <StaggeredContent delay={500}>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-green-400 mb-6">Financial Literacy Series</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-video w-full bg-gray-800 overflow-hidden rounded-lg">
                  <img
                    src="/images/IMG_8320.jpeg"
                    alt="Students learning financial literacy concepts"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    The Financial Literacy Series equips students with essential money management skills for their
                    future. Through structured workshops, students learn about budgeting, saving, investing, and
                    understanding credit - foundational concepts that are often overlooked in traditional education.
                  </p>
                  <p>
                    Our program emphasizes practical application, helping students develop healthy financial habits
                    early on. From understanding student loans to planning for long-term financial goals, we provide the
                    knowledge and tools students need to make informed financial decisions throughout their lives.
                  </p>
                </div>
              </div>
            </div>
          </StaggeredContent>
        </main>

        <StaggeredContent delay={1100}>
          <Footer />
        </StaggeredContent>
      </div>
    </AnimatedPage>
  )
}
