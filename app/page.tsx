"use client"
import { useChat } from "@ai-sdk/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Send, ExternalLink } from "lucide-react"

export default function PersonalWebsite() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Profile" />
            <AvatarFallback>NC</AvatarFallback>
          </Avatar>
        </div>
        <nav className="flex space-x-8">
          <a href="#contact" className="hover:text-green-300 transition-colors">
            CONTACT
          </a>
          <a href="https://linkedin.com" className="hover:text-green-300 transition-colors flex items-center gap-1">
            LINKEDIN <ExternalLink className="w-3 h-3" />
          </a>
          <a href="https://github.com" className="hover:text-green-300 transition-colors flex items-center gap-1">
            GITHUB <ExternalLink className="w-3 h-3" />
          </a>
          <a href="https://twitter.com" className="hover:text-green-300 transition-colors flex items-center gap-1">
            TWITTER/X <ExternalLink className="w-3 h-3" />
          </a>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Introduction */}
        <section className="space-y-4">
          <h1 className="text-4xl font-bold">Hey, I'm Richard!</h1>
          <div className="space-y-2 text-gray-300">
            <p>
              I'm 18, based in <span className="underline">toronto</span>.
            </p>
          </div>
        </section>

        {/* Current Activities */}
        <section className="space-y-4">
          <h2 className="text-xl">
            I'm <span className="underline">currently</span>...
          </h2>
          <ul className="space-y-2 text-gray-300 ml-4">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>interning at a YC-backed SaaS startup, analyzing ai trends and working on product design</span>
            </li>
          </ul>
        </section>

        {/* Previous Experience */}
        <section className="space-y-4">
          <h2 className="text-xl">Previously I...</h2>
          <ul className="space-y-2 text-gray-300 ml-4">
            <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              helped organize <a href="https://yrhacks.ca/" className="underline" target="_blank" rel="noopener noreferrer">YRHacks</a>, Canada's largest high school hackathon
            </span>
          </li>
          </ul>
        </section>

        {/* Projects */}
        <section className="space-y-4">
          <h2 className="text-xl">Currently working on...</h2>
          <div className="text-gray-300 ml-4">
            <span className="mr-2">•</span>
            <a
              href="https://www.futureforward.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-green-300 transition-colors"
            >
              future forward
            </a>
            {" - non-profit focusing on helping students discover their vocations"}
          </div>
        </section>

        {/* Chatbot Section */}
        <section className="space-y-4">
          <h2 className="text-xl">What else do you want to know about me?</h2>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              {/* Chat Messages */}
              <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                {messages.length === 0 && (
                  <div className="text-gray-500 text-sm">
                    Ask me anything about Richard! Try questions like "What are your interests?" or "Tell me about your
                    projects"
                  </div>
                )}
                {messages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div className="text-sm font-semibold">{message.role === "user" ? "You:" : "Bot:"}</div>
                    <div className="text-gray-300 whitespace-pre-wrap">{message.content}</div>
                  </div>
                ))}
                {isLoading && <div className="text-gray-500 text-sm">Thinking...</div>}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me anything about Richard..."
                  className="flex-1 bg-gray-800 border-gray-600 text-green-400 placeholder-gray-500"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}
