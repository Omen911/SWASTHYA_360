import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { createChatSession } from '../lib/gemini';
import ReactMarkdown from 'react-markdown';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Namaste! I am your Swasthya 360 AI Assistant. How can I help you with Ayurveda today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChatSession(createChatSession());
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const result = await chatSession.sendMessage(userText);
      setMessages(prev => [...prev, { role: 'model', text: result.response.text() }]);
    } catch (error: any) {
      console.error("Chat error:", error);
      let errorMessage = 'Sorry, I encountered an error. Please try again.';
      if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('quota') || error?.message?.includes('RESOURCE_EXHAUSTED')) {
        errorMessage = 'Sorry, the AI quota has been exceeded. Please try again later.';
      }
      setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-20 right-6 p-4 bg-emerald-600 text-white rounded-full shadow-xl hover:bg-emerald-700 transition-all z-40",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <MessageCircle size={24} />
      </button>

      <div className={cn(
        "fixed bottom-20 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all origin-bottom-right z-40 border border-emerald-100",
        isOpen ? "scale-100 opacity-100 h-[500px]" : "scale-0 opacity-0 h-0"
      )}>
        <div className="bg-emerald-600 p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot size={20} />
            <span className="font-semibold">Swasthya Assistant</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-emerald-700 p-1 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={cn("flex gap-2", msg.role === 'user' ? "flex-row-reverse" : "")}>
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                msg.role === 'user' ? "bg-emerald-100 text-emerald-700" : "bg-emerald-600 text-white"
              )}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={cn(
                "max-w-[75%] rounded-2xl px-4 py-2 text-sm",
                msg.role === 'user' ? "bg-emerald-600 text-white rounded-tr-none" : "bg-white border border-emerald-100 text-slate-700 rounded-tl-none shadow-sm"
              )}>
                <div className="prose prose-sm prose-emerald max-w-none">
                  <ReactMarkdown>
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                <Bot size={16} />
              </div>
              <div className="bg-white border border-emerald-100 text-slate-700 rounded-2xl rounded-tl-none px-4 py-2 text-sm shadow-sm flex items-center gap-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 bg-white border-t border-emerald-100">
          <div className="flex items-center gap-2 bg-slate-100 rounded-full px-4 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about Ayurveda..."
              className="flex-1 bg-transparent outline-none text-sm text-slate-700"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="text-emerald-600 hover:text-emerald-700 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
