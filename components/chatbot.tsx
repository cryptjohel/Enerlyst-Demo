"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Enerlyst AI Energy Assistant. I help you understand energy consumption, optimize costs, and make data-driven decisions for Africa's clean energy future. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("solar") || lowerMessage.includes("panel")) {
      return "Solar systems are transformative for Africa's energy future! Our AI analyzes your consumption patterns to recommend optimal sizing. A typical 5kW system costs ₦750,000-₦1,000,000 but saves 70% on energy costs. Your usage data helps us improve recommendations for similar users across Africa."
    }

    if (lowerMessage.includes("diesel") || lowerMessage.includes("generator")) {
      return "Diesel generators are expensive and contribute to emissions. Our AI-powered Diesel Calculator shows exact costs and environmental impact. A 10kVA generator typically consumes 2.5L/hour. Your calculations help us map Africa's energy transition opportunities."
    }

    if (lowerMessage.includes("battery") || lowerMessage.includes("backup")) {
      return "Battery storage is crucial for energy independence. Based on African usage patterns, 4-6 deep cycle batteries (100Ah each) work well for most homes. Lithium batteries offer better ROI long-term. What's your daily energy consumption? I can provide personalized recommendations."
    }

    if (lowerMessage.includes("cost") || lowerMessage.includes("price") || lowerMessage.includes("save")) {
      return "Energy costs vary across Africa, but our data shows solar systems typically achieve 60-80% savings and pay for themselves in 3-5 years. Our AI analyzes thousands of usage patterns to provide accurate ROI calculations. Would you like personalized cost analysis?"
    }

    if (lowerMessage.includes("data") || lowerMessage.includes("intelligence")) {
      return "Great question! Enerlyst builds Africa's energy intelligence layer. Your anonymous usage data helps solar companies optimize offerings, governments understand demand, and investors fund better projects. All data is anonymized and used to accelerate clean energy adoption."
    }

    if (lowerMessage.includes("africa") || lowerMessage.includes("future")) {
      return "Africa's energy future is bright! We're building the data intelligence that powers smart energy decisions. Every calculation contributes to understanding regional demand, optimizing solar solutions, and accelerating clean energy adoption across the continent."
    }

    return "I'm here to help with intelligent energy analysis! Our AI-powered calculators provide personalized recommendations while contributing to Africa's energy intelligence. Try our Diesel Calculator or Energy Calculator for detailed analysis, or ask about solar sizing, cost optimization, or energy efficiency."
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 rounded-full bg-[#22C55E] hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </Button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]">
          <Card className="h-full flex flex-col shadow-2xl border-2 border-[#22C55E]">
            <CardHeader className="bg-[#1E2A38] text-white rounded-t-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Ask Enerlyst</CardTitle>
                    <p className="text-sm text-gray-300">Your Energy Assistant</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto max-h-80">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user" ? "bg-[#1E2A38] text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.sender === "bot" && <Bot className="w-4 h-4 text-[#22C55E] mt-0.5 flex-shrink-0" />}
                          {message.sender === "user" && <User className="w-4 h-4 text-gray-300 mt-0.5 flex-shrink-0" />}
                          <div className="flex-1">
                            <p className="text-sm">{message.text}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[80%]">
                        <div className="flex items-center space-x-2">
                          <Bot className="w-4 h-4 text-[#22C55E]" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about energy, solar, or diesel costs..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-[#22C55E] hover:bg-green-600 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
