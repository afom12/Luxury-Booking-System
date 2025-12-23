'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you with your booking today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { t, language } = useLanguage()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Simple keyword-based responses (in production, this would use AI/ML)
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('ሰላም')) {
      return language === 'am' 
        ? 'ሰላም! ስለመዘዝዎ እንዴት ልረዳዎ?' 
        : 'Hello! How can I help you with your booking?'
    }
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('ዋጋ')) {
      return language === 'am'
        ? 'የክፍሎቻችን ዋጋ ከ 149 እስከ 799 ኢትዮጵያ ብር በሌሊት ይለያያል። ዝርዝሮችን ለማየት ክፍሎች ገጽ ይጎብኙ።'
        : 'Our room prices range from 149 to 799 ETB per night. Please visit our rooms page for details.'
    }
    if (lowerMessage.includes('available') || lowerMessage.includes('vacancy') || lowerMessage.includes('ይገኛል')) {
      return language === 'am'
        ? 'አዎ፣ አሁን ብዙ ክፍሎች ይገኛሉ። ለማየት ክፍሎች ገጽ ይጎብኙ።'
        : 'Yes, we have many rooms available. Please check our rooms page.'
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('እውቂያ')) {
      return language === 'am'
        ? 'እኛን በ +251 11 123 4567 ወይም info@seasidehotel.et ማግኘት ይችላሉ።'
        : 'You can reach us at +251 11 123 4567 or info@seasidehotel.et'
    }
    if (lowerMessage.includes('cancel') || lowerMessage.includes('refund') || lowerMessage.includes('ሰርዝ')) {
      return language === 'am'
        ? 'ለመዘዝ ማስረዳት እባክዎ ዳሽቦርድዎን ይጎብኙ ወይም እኛን ያግኙን።'
        : 'To cancel a booking, please visit your dashboard or contact us.'
    }
    
    // Default response
    return language === 'am'
      ? 'እባክዎ ይበልጥ ዝርዝር መረጃ ይስጡ። እንዲሁም በ +251 11 123 4567 ማግኘት ይችላሉ።'
      : 'Could you please provide more details? You can also contact us at +251 11 123 4567.'
  }

  const handleSend = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-brown-700 text-cream-50 p-4 rounded-full shadow-2xl hover:bg-brown-800 transition-colors z-50"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-brown-700 text-cream-50 p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <div>
                <h3 className="font-semibold">Seaside Hotel Support</h3>
                <p className="text-xs text-cream-200">We're online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-cream-50 hover:text-cream-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-brown-700 text-cream-50'
                      : 'bg-cream-100 text-brown-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-cream-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-brown-600 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-brown-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-brown-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-brown-200 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={language === 'am' ? 'መልእክትዎን ይጻፉ...' : 'Type your message...'}
                className="flex-1 px-4 py-2 border border-brown-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
              />
              <button
                onClick={handleSend}
                disabled={!inputMessage.trim()}
                className="bg-brown-700 text-cream-50 p-2 rounded-lg hover:bg-brown-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

