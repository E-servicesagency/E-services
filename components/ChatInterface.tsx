
import React, { useState, useRef, useEffect } from 'react';
import { AppMode, Message } from '../types';
import { Send, User, Bot, Loader2, Clipboard, CheckCircle2, Library } from 'lucide-react';

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (content: string) => void;
  currentMode: AppMode;
  onOpenTemplates: () => void;
  externalInput?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  messages, 
  isLoading, 
  onSendMessage, 
  currentMode, 
  onOpenTemplates,
  externalInput 
}) => {
  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (externalInput) {
      setInput(externalInput);
    }
  }, [externalInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getModeBadge = (mode: AppMode) => {
    switch (mode) {
      case AppMode.BUSINESS_AGENT:
        return <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold uppercase">Strategy</span>;
      case AppMode.SHORT_PROMPT:
        return <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-bold uppercase">Quick Prompt</span>;
      case AppMode.ADVANCED_PROMPT:
        return <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold uppercase">Advanced Prompt</span>;
    }
  };

  return (
    <div className="flex flex-col h-full relative overflow-hidden bg-white">
      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-2">
              <Bot size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">How can E-services Agency assist you today?</h2>
            <p className="text-slate-500 leading-relaxed text-lg">
              Our AI Business Agent and Prompting System are ready to help you with strategy, operations, and professional instruction engineering.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8">
              <div className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-left cursor-pointer" onClick={() => setInput("Outline a market entry strategy for a SaaS startup in the MENA region.")}>
                <p className="text-sm font-semibold text-slate-800 mb-1">Business Strategy</p>
                <p className="text-xs text-slate-500">SaaS entry strategy for MENA startups</p>
              </div>
              <div className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-left cursor-pointer" onClick={() => setInput("Write a prompt for generating professional B2B email sequences.")}>
                <p className="text-sm font-semibold text-slate-800 mb-1">Advanced Prompt</p>
                <p className="text-xs text-slate-500">Professional B2B email generation</p>
              </div>
              <div className="p-4 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all text-left cursor-pointer" onClick={onOpenTemplates}>
                <p className="text-sm font-semibold text-blue-600 mb-1 flex items-center gap-2">
                  <Library size={16} />
                  More Templates
                </p>
                <p className="text-xs text-slate-500">Browse our library of business prompts</p>
              </div>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-4 md:gap-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex-shrink-0 flex items-center justify-center text-white shadow-md">
                <Bot size={20} />
              </div>
            )}
            <div className={`max-w-[85%] md:max-w-[75%] space-y-2`}>
              <div className={`flex items-center gap-2 mb-1 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">
                  {msg.role === 'user' ? 'Client Request' : 'E-Services Agency Response'}
                </span>
                {msg.role === 'assistant' && getModeBadge(msg.mode)}
              </div>
              <div 
                className={`p-5 rounded-2xl shadow-sm border ${
                  msg.role === 'user' 
                    ? 'bg-blue-50 border-blue-100 text-slate-800 rounded-tr-none' 
                    : 'bg-white border-slate-100 text-slate-800 rounded-tl-none markdown-content shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </div>
                {msg.role === 'assistant' && (
                  <button 
                    onClick={() => copyToClipboard(msg.content, msg.id)}
                    className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <CheckCircle2 size={12} className="text-green-500" />
                        <span className="text-green-600">Copied to clipboard</span>
                      </>
                    ) : (
                      <>
                        <Clipboard size={12} />
                        <span>Copy Output</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              <div className={`text-[10px] text-slate-400 ${msg.role === 'user' ? 'text-right' : ''}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            {msg.role === 'user' && (
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex-shrink-0 flex items-center justify-center text-white shadow-md">
                <User size={20} />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4 md:gap-6 justify-start">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex-shrink-0 flex items-center justify-center text-white shadow-md">
              <Bot size={20} />
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-100 text-slate-800 rounded-tl-none shadow-sm flex items-center gap-3">
              <Loader2 size={18} className="animate-spin text-blue-600" />
              <span className="text-sm font-medium text-slate-500 italic">Agency consultant is processing your request...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-8 bg-gradient-to-t from-white via-white to-transparent">
        <form 
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto relative group"
        >
          <div className="absolute inset-0 bg-blue-600/5 blur-xl group-focus-within:bg-blue-600/10 transition-all rounded-2xl -z-10"></div>
          <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 group-focus-within:border-blue-400 transition-all">
            <button
              type="button"
              onClick={onOpenTemplates}
              className="ml-4 p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              title="Open Templates"
            >
              <Library size={20} />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder={currentMode === AppMode.BUSINESS_AGENT ? "Ask for business advice, strategy, or operations..." : "Enter your prompt requirements..."}
              className="flex-1 bg-transparent px-4 py-4 md:py-5 outline-none text-slate-800 placeholder:text-slate-400 resize-none min-h-[60px] max-h-[200px]"
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="mx-4 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex-shrink-0"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="mt-3 flex justify-between items-center px-2">
            <span className="text-[10px] text-slate-400 font-medium hidden md:block">
              E-services Agency AI provides strategic insights. Verify actions before implementation.
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-auto">
              {currentMode.replace('_', ' ')} MODE
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
