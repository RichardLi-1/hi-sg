"use client"
import { useState, useRef } from "react"
import type React from "react"

export function Notepad() {
  const [content, setContent] = useState("")
  const [fileName, setFileName] = useState("Untitled")
  const [isModified, setIsModified] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    setIsModified(true)
  }

  const handleSave = () => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName.endsWith(".txt") ? fileName : `${fileName}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setIsModified(false)
  }

  const handleNew = () => {
    if (isModified) {
      const shouldSave = confirm("Do you want to save changes to " + fileName + "?")
      if (shouldSave) {
        handleSave()
      }
    }
    setContent("")
    setFileName("Untitled")
    setIsModified(false)
  }

  const handleOpen = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".txt"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const text = e.target?.result as string
          setContent(text)
          setFileName(file.name)
          setIsModified(false)
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const handleCut = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = content.substring(start, end)

      navigator.clipboard.writeText(selectedText)
      const newContent = content.substring(0, start) + content.substring(end)
      setContent(newContent)
      setIsModified(true)
    }
  }

  const handleCopy = () => {
    if (textareaRef.current) {
      const textarea = textareaRef.current
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = content.substring(start, end)
      navigator.clipboard.writeText(selectedText)
    }
  }

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText()
      if (textareaRef.current) {
        const textarea = textareaRef.current
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const newContent = content.substring(0, start) + clipboardText + content.substring(end)
        setContent(newContent)
        setIsModified(true)
      }
    } catch (err) {
      console.error("Failed to read clipboard:", err)
    }
  }

  const handleSelectAll = () => {
    if (textareaRef.current) {
      textareaRef.current.select()
    }
  }

  return (
    <div className="h-full bg-gray-100 flex flex-col">
      {/* Menu Bar */}
      <div className="bg-gray-100 border-b border-gray-300 px-2 py-1">
        <div className="flex space-x-4 text-sm">
          <div className="relative group">
            <button className="px-2 py-1 hover:bg-blue-100 rounded">File</button>
            <div className="absolute top-full left-0 bg-white border border-gray-400 shadow-lg hidden group-hover:block z-10 min-w-32">
              <button onClick={handleNew} className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">
                New
              </button>
              <button onClick={handleOpen} className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">
                Open...
              </button>
              <button onClick={handleSave} className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">
                Save
              </button>
              <hr className="border-gray-300" />
              <button className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">Page Setup...</button>
              <button className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">Print...</button>
              <hr className="border-gray-300" />
              <button className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">Exit</button>
            </div>
          </div>
          <div className="relative group">
            <button className="px-2 py-1 hover:bg-blue-100 rounded">Edit</button>
            <div className="absolute top-full left-0 bg-white border border-gray-400 shadow-lg hidden group-hover:block z-10 min-w-32">
              <button className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">Undo</button>
              <hr className="border-gray-300" />
              <button onClick={handleCut} className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">
                Cut
              </button>
              <button onClick={handleCopy} className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">
                Copy
              </button>
              <button onClick={handlePaste} className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">
                Paste
              </button>
              <button className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">Delete</button>
              <hr className="border-gray-300" />
              <button className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">Find...</button>
              <button className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">Find Next</button>
              <button className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">Replace...</button>
              <button className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">Go To...</button>
              <hr className="border-gray-300" />
              <button onClick={handleSelectAll} className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">
                Select All
              </button>
              <button className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">Time/Date</button>
            </div>
          </div>
          <div className="relative group">
            <button className="px-2 py-1 hover:bg-blue-100 rounded">Format</button>
            <div className="absolute top-full left-0 bg-white border border-gray-400 shadow-lg hidden group-hover:block z-10 min-w-32">
              <button className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">Word Wrap</button>
              <button className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">Font...</button>
            </div>
          </div>
          <div className="relative group">
            <button className="px-2 py-1 hover:bg-blue-100 rounded">View</button>
            <div className="absolute top-full left-0 bg-white border border-gray-400 shadow-lg hidden group-hover:block z-10 min-w-32">
              <button className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">Status Bar</button>
            </div>
          </div>
          <div className="relative group">
            <button className="px-2 py-1 hover:bg-blue-100 rounded">Help</button>
            <div className="absolute top-full left-0 bg-white border border-gray-400 shadow-lg hidden group-hover:block z-10 min-w-32">
              <button className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">Help Topics</button>
              <hr className="border-gray-300" />
              <button className="block w-full text-left px-3 py-1 hover:bg-blue-100 text-sm">About Notepad</button>
            </div>
          </div>
        </div>
      </div>

      {/* Text Area */}
      <div className="flex-1 p-0">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleContentChange}
          className="w-full h-full resize-none border-none outline-none p-2 font-mono text-sm bg-white text-black"
          style={{
            fontFamily: "Courier New, monospace",
            fontSize: "12px",
            lineHeight: "1.2",
          }}
          placeholder=""
          spellCheck={false}
        />
      </div>

      {/* Status Bar */}
      <div className="bg-gray-100 border-t border-gray-300 px-2 py-1 text-xs text-gray-600">
        {isModified && "Modified"} | Ln {content.split("\n").length}, Col {content.length}
      </div>
    </div>
  )
}
