
import React, { useState } from 'react';
import { AppMode, PromptTemplate } from '../types';
import { BUSINESS_TEMPLATES } from '../data/templates';
import { X, Search, Sparkles, Zap, ShieldCheck } from 'lucide-react';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (template: PromptTemplate) => void;
}

const TemplateModal: React.FC<TemplateModalProps> = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<AppMode | 'ALL'>('ALL');

  if (!isOpen) return null;

  const filteredTemplates = BUSINESS_TEMPLATES.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'ALL' || t.mode === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getModeIcon = (mode: AppMode) => {
    switch (mode) {
      case AppMode.BUSINESS_AGENT: return <ShieldCheck size={16} className="text-blue-500" />;
      case AppMode.SHORT_PROMPT: return <Zap size={16} className="text-amber-500" />;
      case AppMode.ADVANCED_PROMPT: return <Sparkles size={16} className="text-purple-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Business Strategy Templates</h2>
            <p className="text-sm text-slate-500">Accelerate your workflow with expert-curated prompts.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search business tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>
            <div className="flex gap-2 p-1 bg-slate-100 rounded-xl overflow-x-auto whitespace-nowrap">
              {(['ALL', AppMode.BUSINESS_AGENT, AppMode.SHORT_PROMPT, AppMode.ADVANCED_PROMPT] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-tight transition-all ${
                    activeFilter === filter ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {filter.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2 pb-2">
            {filteredTemplates.length > 0 ? filteredTemplates.map(template => (
              <button
                key={template.id}
                onClick={() => onSelect(template)}
                className="flex flex-col text-left p-4 border border-slate-100 rounded-xl hover:border-blue-200 hover:bg-blue-50 transition-all group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getModeIcon(template.mode)}
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{template.category}</span>
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">{template.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{template.description}</p>
                <div className="mt-auto flex items-center gap-1 text-blue-600 font-bold text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                  Use Template <span>→</span>
                </div>
              </button>
            )) : (
              <div className="col-span-2 py-12 text-center">
                <p className="text-slate-400 text-sm">No templates found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;
