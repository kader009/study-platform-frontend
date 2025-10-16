'use client';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

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

  // Simple AI responses (can be replaced with actual API)
  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // FAQ responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! Welcome to EduNest. How can I assist you today?';
    }

    if (lowerMessage.includes('course') || lowerMessage.includes('class')) {
      return 'We offer various courses including React, TypeScript, Next.js, and more. You can browse all sessions on our Sessions page. Would you like to know about any specific course?';
    }

    if (
      lowerMessage.includes('price') ||
      lowerMessage.includes('cost') ||
      lowerMessage.includes('fee')
    ) {
      return 'Our course prices vary depending on the subject and duration. Please check the individual session details for pricing information, or contact our admin for custom packages.';
    }

    if (lowerMessage.includes('tutor') || lowerMessage.includes('teacher')) {
      return 'We have experienced tutors for various subjects. You can view all available tutors and their specializations on our platform. Would you like me to help you find a tutor for a specific subject?';
    }

    if (lowerMessage.includes('register') || lowerMessage.includes('sign up')) {
      return 'To register, click on the "Login" button in the navigation bar, then select "Create an account". You can sign up as a Student or Tutor.';
    }

    if (lowerMessage.includes('book') || lowerMessage.includes('schedule')) {
      return 'To book a session, first log in to your account, browse available sessions, and click the "Book" button on your preferred session. You will receive a confirmation once booked.';
    }

    if (lowerMessage.includes('contact') || lowerMessage.includes('support')) {
      return 'You can contact us through our Contact page, or reach out to our support team via email. We typically respond within 24 hours.';
    }

    if (lowerMessage.includes('time') || lowerMessage.includes('schedule')) {
      return 'Our tutors are available at various times. You can check the session schedule on the Sessions page to find a time that works for you.';
    }

    if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      return 'We accept various payment methods including bKash, Nagad, and bank transfers. Payment details will be provided after booking confirmation.';
    }

    if (lowerMessage.includes('thank')) {
      return "You're welcome! Feel free to ask if you have any other questions. Happy learning! 😊";
    }

    // Default response
    return 'Thank you for your question! For detailed information, please visit our website or contact our support team. Is there anything specific about our courses, tutors, or registration process that I can help you with?';
  };

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
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getAIResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50 animate-bounce"
          aria-label="Open AI chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Bot size={24} />
              <div>
                <h3 className="font-bold text-lg">EduNest AI</h3>
                <p className="text-xs opacity-90">
                  Online • Always ready to help
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-full transition-all"
            >
              <X size={22} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-2xl shadow-sm ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  {message.sender === 'bot' && (
                    <div className="flex items-center gap-2 mb-1">
                      <Bot size={16} className="text-blue-600" />
                      <span className="text-xs font-semibold text-blue-600">
                        AI Assistant
                      </span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
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
          <div className="p-4 border-t bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || inputMessage.trim() === ''}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-full hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Powered by EduNest AI • Always available
            </p>
          </div>
        </div>
      )}
    </>
  );
}
