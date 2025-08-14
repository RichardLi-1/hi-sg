"use client"
import { useState } from "react"
import type React from "react"

import { X, Minimize2 } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export function ClippyChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ""

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split("\n")

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6)
              if (data === "[DONE]") {
                setIsLoading(false)
                return
              }
              try {
                const parsed = JSON.parse(data)
                if (parsed.content) {
                  assistantContent += parsed.content
                  setMessages((prev) =>
                    prev.map((msg) => (msg.id === assistantMessage.id ? { ...msg, content: assistantContent } : msg)),
                  )
                }
              } catch (e) {
                // Ignore parsing errors
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error:", error)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "It looks like you're having trouble! Let me help you with that.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
    setTimeout(() => {
      const syntheticEvent = { preventDefault: () => {} } as React.FormEvent
      handleSubmit(syntheticEvent)
    }, 100)
  }

  const suggestedQuestions = [
    "Tell me about Richard's projects",
    "What did Richard do at YRHacks?",
    "What's Richard studying?",
    "Tell me about Bo!nk",
  ]

  if (!isOpen) {
    return (
      <div className="fixed bottom-20 right-8 z-50">
        {/* Clippy Character */}
        <div
          className="relative cursor-pointer"
          onClick={() => setIsOpen(true)}
          title="Hi! I'm Clippy. Click me for help!"
        >
          <img src="/images/clippy.png" alt="Clippy" className="w-16 h-16" />

          {/* Speech Bubble */}
          <div className="absolute -top-16 -left-20 bg-yellow-100 border-2 border-gray-800 rounded-lg p-2 shadow-lg">
            <div className="text-xs text-black font-bold whitespace-nowrap">Hi! Need help learning about Richard?</div>
            {/* Speech bubble tail */}
            <div className="absolute top-full left-8 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-gray-800"></div>
            <div className="absolute top-full left-8 ml-px w-0 h-0 border-l-3 border-r-3 border-t-6 border-l-transparent border-r-transparent border-t-yellow-100"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-20 right-8 z-50">
      {/* Chat Window */}
      <div className={`bg-gray-100 border-2 border-gray-400 shadow-lg ${isMinimized ? "h-8" : "w-80 h-96"}`}>
        {/* Title Bar */}
        <div
          className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-2 py-1 flex items-center justify-between cursor-move"
          style={{
            backgroundImage: "url(/images/xp-title-bar-gradient.png)",
            backgroundSize: "100% 100%",
          }}
        >
          <div className="flex items-center space-x-2">
            <img src="/images/clippy.png" alt="Clippy" className="w-4 h-4" />
            <span className="text-sm font-bold">Office Assistant</span>
          </div>
          <div className="flex space-x-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-4 h-4 bg-gray-300 border border-gray-600 flex items-center justify-center hover:bg-gray-400"
            >
              <Minimize2 className="w-2 h-2 text-black" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-4 h-4 bg-red-500 border border-gray-600 flex items-center justify-center hover:bg-red-600"
            >
              <X className="w-2 h-2 text-white" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="p-3 h-full flex flex-col">
            {/* Clippy Character */}
            <div className="flex items-start space-x-2 mb-3">
              <img src="/images/clippy.png" alt="Clippy" className="w-8 h-8 flex-shrink-0" />
              <div className="bg-yellow-100 border border-gray-400 rounded p-2 text-xs text-black">
                {messages.length === 0
                  ? "Hi! I'm Clippy, your office assistant. I can help you learn about Richard Li. What would you like to know?"
                  : "What else can I help you with?"}
              </div>
            </div>

            {/* Suggested Questions */}
            {messages.length === 0 && (
              <div className="mb-3">
                <div className="text-xs text-gray-600 mb-2">Try asking:</div>
                <div className="space-y-1">
                  {suggestedQuestions.map((question) => (
                    <button
                      key={question}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="block w-full text-left text-xs bg-white border border-gray-400 p-1 hover:bg-gray-50 text-black"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto space-y-2 mb-3 text-xs">
              {messages.map((message) => (
                <div key={message.id} className="space-y-1">
                  <div className="font-bold text-black">{message.role === "user" ? "You:" : "Clippy:"}</div>
                  <div
                    className={`p-2 rounded border ${
                      message.role === "user"
                        ? "bg-blue-100 border-blue-300 text-black ml-4"
                        : "bg-yellow-100 border-yellow-300 text-black"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="bg-yellow-100 border border-yellow-300 p-2 rounded text-black">
                  <div className="flex items-center space-x-1">
                    <div className="animate-bounce">●</div>
                    <div className="animate-bounce" style={{ animationDelay: "0.1s" }}>
                      ●
                    </div>
                    <div className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                      ●
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex space-x-1">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 text-xs border border-gray-400 px-2 py-1 text-black"
                disabled={isLoading}
              />
              <button
                type="submit"
                className="px-2 py-1 bg-gray-300 border border-gray-400 text-xs text-black hover:bg-gray-400"
                disabled={isLoading}
              >
                Ask
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
