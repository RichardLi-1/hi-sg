import { AnimatedPage } from "@/components/animated-page"
import { AnimatedHeader } from "@/components/animated-header"
import { StaggeredContent } from "@/components/staggered-content"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact-form"

export default function ContactPage() {
  return (
    <AnimatedPage>
      <AnimatedHeader backHref="/" backText="Home" currentPage="/contact" />

      <main className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-6 py-20">
          <StaggeredContent delay={0}>
            <div className="max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
                Get in <span className="text-green-400">Touch</span>
              </h1>
              <p className="text-gray-400 text-lg mb-12 text-center">
                Have a project in mind? Let's discuss how we can work together.
              </p>
            </div>
          </StaggeredContent>

          <StaggeredContent delay={200}>
            <div className="max-w-xl mx-auto">
              <ContactForm />
            </div>
          </StaggeredContent>
        </div>
      </main>

      <Footer />
    </AnimatedPage>
  )
}
