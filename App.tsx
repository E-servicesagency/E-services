
import React, { useState, useCallback } from 'react';
import { AppMode, Message, PromptTemplate } from './types';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import TemplateModal from './components/TemplateModal';
import { geminiService } from './geminiService';
// Fix: Import Library icon from lucide-react to resolve the "Cannot find name 'Library'" error
import { Library } from 'lucide-react';

const App: React.FC = () => {
  const [currentMode, setCurrentMode] = useState<AppMode>(AppMode.BUSINESS_AGENT);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [pendingInput, setPendingInput] = useState<string | undefined>(undefined);

  const handleSendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      mode: currentMode,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setPendingInput(undefined); // Clear any pending input once sent

    try {
      // Prepare history for context
      const history = messages.slice(-6).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        text: m.content
      }));

      const responseText = await geminiService.generateResponse(content, currentMode, history);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText,
        mode: currentMode,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Consultation Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [currentMode, messages]);

  const handleNewChat = () => {
    setMessages([]);
    setCurrentMode(AppMode.BUSINESS_AGENT);
  };

  const handleSelectTemplate = (template: PromptTemplate) => {
    setCurrentMode(template.mode);
    setPendingInput(template.prompt);
    setIsTemplateModalOpen(false);
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden text-slate-900">
      {/* Sidebar - Desktop Only */}
      <div className="hidden md:block">
        <Sidebar 
          currentMode={currentMode} 
          onModeChange={setCurrentMode} 
          onNewChat={handleNewChat}
          onOpenTemplates={() => setIsTemplateModalOpen(true)}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative">
        {/* Top bar */}
        <header className="h-16 md:h-20 border-b border-slate-100 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 z-10 shrink-0">
          <div className="flex items-center gap-4">
            <div className="md:hidden w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white text-xs">E</div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 tracking-tight leading-none mb-1">
                {currentMode === AppMode.BUSINESS_AGENT && "AI Business Consultation"}
                {currentMode === AppMode.SHORT_PROMPT && "Short Prompt System"}
                {currentMode === AppMode.ADVANCED_PROMPT && "Advanced Prompt Engineering"}
              </h1>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Agency Active</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsTemplateModalOpen(true)}
              className="flex md:hidden p-2 text-slate-400 hover:text-blue-600 transition-all"
            >
              <Library size={20} />
            </button>
            <button className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-all">
              EN/AR
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <span className="text-[10px] font-bold">VIP</span>
            </div>
          </div>
        </header>

        {/* Chat Component */}
        <div className="flex-1">
          <ChatInterface 
            messages={messages} 
            isLoading={isLoading} 
            onSendMessage={handleSendMessage}
            currentMode={currentMode}
            onOpenTemplates={() => setIsTemplateModalOpen(true)}
            externalInput={pendingInput}
          />
        </div>
      </main>

      {/* Modals */}
      <TemplateModal 
        isOpen={isTemplateModalOpen} 
        onClose={() => setIsTemplateModalOpen(false)} 
        onSelect={handleSelectTemplate} 
      />
    </div>
  );
};

export default App;
