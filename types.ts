
export enum AppMode {
  BUSINESS_AGENT = 'BUSINESS_AGENT',
  SHORT_PROMPT = 'SHORT_PROMPT',
  ADVANCED_PROMPT = 'ADVANCED_PROMPT'
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  mode: AppMode;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  prompt: string;
  mode: AppMode;
  category: string;
}
