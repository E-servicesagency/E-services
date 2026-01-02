
import React from 'react';
import { AppMode } from '../types';
import { LayoutDashboard, MessageSquareText, FileCode2, History, PlusCircle, Library } from 'lucide-react';

interface SidebarProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
  onNewChat: () => void;
  onOpenTemplates: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentMode, onModeChange, onNewChat, onOpenTemplates }) => {
  return (
    <div className="w-64 h-full bg-[#0a192f] text-slate-300 flex flex-col border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white">E</div>
          <span className="font-bold text-white tracking-tight text-sm">E-SERVICES <span className="text-blue-500 text-[10px] block">AGENCY</span></span>
        </div>

        <button 
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium text-sm mb-4 shadow-lg shadow-blue-900/20"
        >
          <PlusCircle size={18} />
          New Consultation
        </button>
      </div>

      <div className="flex-1 py-4 px-3 overflow-y-auto">
        <div className="mb-6">
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Service Modes</p>
          <nav className="space-y-1">
            <button
              onClick={() => onModeChange(AppMode.BUSINESS_AGENT)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${currentMode === AppMode.BUSINESS_AGENT ? 'bg-blue-900/40 text-blue-400 font-medium' : 'hover:bg-slate-800'}`}
            >
              <LayoutDashboard size={18} />
              AI Business Agent
            </button>
            <button
              onClick={() => onModeChange(AppMode.SHORT_PROMPT)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${currentMode === AppMode.SHORT_PROMPT ? 'bg-blue-900/40 text-blue-400 font-medium' : 'hover:bg-slate-800'}`}
            >
              <MessageSquareText size={18} />
              Short Prompt System
            </button>
            <button
              onClick={() => onModeChange(AppMode.ADVANCED_PROMPT)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${currentMode === AppMode.ADVANCED_PROMPT ? 'bg-blue-900/40 text-blue-400 font-medium' : 'hover:bg-slate-800'}`}
            >
              <FileCode2 size={18} />
              Advanced Prompting
            </button>
          </nav>
        </div>

        <div>
          <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">Intelligence Tools</p>
          <nav className="space-y-1">
            <button 
              onClick={onOpenTemplates}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-all text-sm text-left"
            >
              <Library size={18} />
              Prompt Library
            </button>
            <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-all text-sm">
              <History size={18} />
              Session History
            </a>
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-300">AC</div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-200">Consultant Access</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Enterprise Tier</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
