import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Bot, User, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { askStylist, StyleAdviceResult } from '../services/geminiService';

interface StylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProduct?: Product;
  onSelectProduct: (product: Product) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  recommendedProducts?: Product[];
}

export const StylistModal: React.FC<StylistModalProps> = ({
  isOpen,
  onClose,
  currentProduct,
  onSelectProduct
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Yo! Welcome to the 4 SHERROS Styling Studio. I'm your digital fashion director. Tell me what vibe you're hunting for, ask for outfit ideas, or tell me about an event you have coming up!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentProduct && isOpen) {
      // Prompt customer about this piece
      setMessages((prev) => [
        ...prev,
        {
          id: `prod-${Date.now()}`,
          sender: 'bot',
          text: `I see you're eyeing the ${currentProduct.name}! How would you like me to style this piece? We could go casual streetwear, elevated nightlife, or minimalist clean cut.`
        }
      ]);
    }
  }, [currentProduct, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Build chat history for Gemini
    const history = messages.map((m) => ({
      role: m.sender === 'user' ? ('user' as const) : ('model' as const),
      parts: [{ text: m.text }]
    }));

    const result: StyleAdviceResult = await askStylist(textToSend, currentProduct, history);

    const botMsg: Message = {
      id: `b-${Date.now()}`,
      sender: 'bot',
      text: result.text,
      recommendedProducts: result.recommendedProducts
    };

    setMessages((prev) => [...prev, botMsg]);
    setLoading(false);
  };

  const quickPrompts = [
    "Style an oversized streetwear look",
    "What shoes go best with wide parachute pants?",
    "Give me an edgy weekend nightlife outfit",
    "How should I layer for chilly fall weather?"
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col h-[650px] max-h-[90vh] overflow-hidden border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-black text-white flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#d4ff00] text-black flex items-center justify-center font-black">
              <Sparkles className="w-5 h-5 text-black animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-black text-sm tracking-wide uppercase">SHERRO STYLE BOT</h3>
                <span className="bg-[#d4ff00] text-black text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
                  Powered by Gemini
                </span>
              </div>
              <p className="text-[11px] text-gray-400">24/7 AI Personal Fashion Director</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-start gap-2 max-w-[85%]">
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-black text-[#d4ff00] flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-black">
                    4S
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-black text-white rounded-tr-none'
                      : 'bg-white text-gray-900 shadow-sm border border-gray-200 rounded-tl-none'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
              </div>

              {/* Bot Recommended Products Carousel */}
              {m.recommendedProducts && m.recommendedProducts.length > 0 && (
                <div className="mt-3 ml-9 w-full max-w-[85%] space-y-2">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-black" />
                    Recommended Matches:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {m.recommendedProducts.map((rec) => (
                      <div
                        key={rec.id}
                        onClick={() => {
                          onSelectProduct(rec);
                          onClose();
                        }}
                        className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200 hover:border-black cursor-pointer shadow-sm transition group"
                      >
                        <img
                          src={rec.images[0]}
                          alt={rec.name}
                          className="w-12 h-14 object-cover rounded bg-gray-100 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-gray-900 truncate group-hover:underline">
                            {rec.name}
                          </p>
                          <p className="text-xs font-black text-black">
                            ${rec.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 ml-9 text-xs text-gray-500 animate-pulse">
              <Sparkles className="w-4 h-4 text-[#d4ff00]" />
              <span>Sherro Style Bot is assembling your fit...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt suggestions */}
        <div className="px-4 py-2 bg-white border-t border-gray-100 overflow-x-auto flex gap-1.5 scrollbar-none">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] whitespace-nowrap bg-gray-100 hover:bg-black hover:text-white px-3 py-1 rounded-full text-gray-700 font-medium transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-gray-200 flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything (e.g., 'What goes with a leather jacket?')"
            className="flex-1 text-xs sm:text-sm px-4 py-2.5 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-black text-[#d4ff00] hover:bg-[#d4ff00] hover:text-black font-black px-4 py-2.5 rounded-xl transition flex items-center justify-center disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
