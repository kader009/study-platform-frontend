'use client';
import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot } from 'lucide-react';
import { Message } from '@/types/chatMessage';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! I am EduNest AI Assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    // Handle time query on client side for accurate local time
    const lowerMessage = currentMessage.toLowerCase();
    if (
      lowerMessage.includes('time') ||
      lowerMessage.includes('সময়') ||
      lowerMessage.includes('what time')
    ) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZoneName: 'short',
      });
      const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const botResponse: Message = {
        id: messages.length + 2,
        text: `Your Local Time: ${timeString}\nDate: ${dateString}\n\nPerfect time to explore our learning sessions!`,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentMessage }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      const botResponse: Message = {
        id: messages.length + 2,
        text: data.response || 'Sorry, I could not process your request.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error fetching AI response:', error);

      // Simple error message
      const botResponse: Message = {
        id: messages.length + 2,
        text: 'Sorry, I am having trouble connecting right now. Please try again in a moment or visit our Sessions page directly.',
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-linear-to-r from-blue-600 to-black text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
          aria-label="Open AI chat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 md:w-7 md:h-7 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-0 right-0 left-0 md:bottom-6 md:right-6 md:left-auto w-full md:w-96 h-screen md:h-150 bg-white md:rounded-2xl shadow-2xl flex flex-col z-50 border-t md:border border-gray-200">
          <div className="bg-linear-to-r from-black via-gray-900 to-blue-900 text-white p-3 md:p-4 md:rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-2 md:gap-3">
              <Bot className="w-5 h-5 md:w-6 md:h-6" />
              <div>
                <h3 className="font-bold text-base md:text-lg">EduNest AI</h3>
                <p className="text-xs opacity-90">
                  Online • Always ready to help
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-1.5 md:p-2 rounded-full transition-all"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[75%] p-2.5 md:p-3 rounded-2xl shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  {message.sender === 'bot' && (
                    <div className="flex items-center gap-1.5 md:gap-2 mb-1">
                      <Bot className="w-4 h-4 md:w-4 md:h-4 text-blue-600" />
                      <span className="text-xs font-semibold text-blue-600">
                        AI Assistant
                      </span>
                    </div>
                  )}
                  <p className="text-xs md:text-sm leading-relaxed whitespace-pre-line">
                    {message.text}
                  </p>
                  <p
                    className={`text-[10px] md:text-xs mt-1 ${
                      message.sender === 'user' ? 'opacity-80' : 'text-gray-400'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 md:p-4 border-t bg-white md:rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-3 md:px-4 py-2 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || inputMessage.trim() === ''}
                className="bg-linear-to-r from-black via-gray-900 to-blue-900 text-white p-2 md:p-2.5 rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5 md:w-5 md:h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              EduNest AI • Always available
            </p>
          </div>
        </div>
      )}
    </>
  );
}
