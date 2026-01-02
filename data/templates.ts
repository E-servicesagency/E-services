
import { AppMode, PromptTemplate } from '../types';

export const BUSINESS_TEMPLATES: PromptTemplate[] = [
  {
    id: 'biz-1',
    title: 'Market Entry Strategy',
    description: 'Framework for entering a new geographic market.',
    mode: AppMode.BUSINESS_AGENT,
    category: 'Strategy',
    prompt: 'Conduct a comprehensive market entry analysis for [Product/Service] in [Region]. Include SWOT analysis, competitor landscape, and regulatory considerations.'
  },
  {
    id: 'biz-2',
    title: 'Business Model Canvas',
    description: 'Detailed breakdown of a business idea using the canvas framework.',
    mode: AppMode.BUSINESS_AGENT,
    category: 'Entrepreneurship',
    prompt: 'Develop a Business Model Canvas for a [Type of Business]. Clearly define value propositions, customer segments, and revenue streams.'
  },
  {
    id: 'short-1',
    title: 'Executive Summary',
    description: 'Condense complex text into a brief executive summary.',
    mode: AppMode.SHORT_PROMPT,
    category: 'Productivity',
    prompt: 'Summarize the following business text into a 3-sentence executive summary highlighting the primary value proposition and key metrics: [Insert Text]'
  },
  {
    id: 'short-2',
    title: 'Meeting Action Items',
    description: 'Extract clear tasks from raw meeting notes.',
    mode: AppMode.SHORT_PROMPT,
    category: 'Operations',
    prompt: 'Extract all actionable tasks, owners, and deadlines from these meeting notes: [Insert Notes]'
  },
  {
    id: 'adv-1',
    title: 'B2B Sales Outreach',
    description: 'Professional sales sequence with complex constraints.',
    mode: AppMode.ADVANCED_PROMPT,
    category: 'Sales',
    prompt: 'Design a 3-part B2B email sequence for [Company] targeting [Job Title]. Focus on solving [Specific Pain Point] and include clear CTAs.'
  },
  {
    id: 'adv-2',
    title: 'Content Strategy Roadmap',
    description: 'Comprehensive content plan for business growth.',
    mode: AppMode.ADVANCED_PROMPT,
    category: 'Marketing',
    prompt: 'Act as a Senior Content Strategist. Develop a 30-day content roadmap for [Company] to increase LinkedIn engagement by 20%.'
  }
];
