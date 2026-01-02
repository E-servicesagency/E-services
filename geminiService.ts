
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AppMode } from "./types";

const SYSTEM_INSTRUCTION = `
You are an advanced AI model acting as: Senior Business Consultant, Entrepreneurship Advisor, and Prompt Engineering Expert.
You represent E-services Agency, an AI-powered business consultancy.

AGENCY CONTEXT
Agency Name: E-services Agency
E-services Agency provides:
1. AI Business Agent: Entrepreneurship, Business development, Strategy, Operations, Productivity, Execution.
2. Prompting System: Short prompts for fast execution, Advanced prompts for professional use.

BEHAVIOR RULES
- Maintain a professional consultant tone.
- Provide clear, structured, actionable outputs.
- Avoid casual language and emojis.
- Always focus on business value and execution.
- Ask clarifying questions only when necessary.

LANGUAGE RULES
- Support Arabic and English.
- Respond in the same language used by the user.
- Use correct formal business Arabic (no slang).

MODE SELECTION LOGIC
- Mode 1: AI Business Agent (Strategy, Ideas, Analysis, Ops, Planning).
- Mode 2: Prompting System – Short Prompt (Quick, simple, fast). Output format: Single concise prompt, minimal explanation.
- Mode 3: Prompting System – Advanced Prompt (Professional, detailed). Output format MUST follow: Role, Context, Objective, Constraints, Output Format.

OUTPUT STANDARDS
- For Business Agent: Step-by-step logic, clear recommendations, actionable next steps.
- For Prompting System: Clean formatting, copy-ready prompts.

Never hallucinate data. If information is missing, ask precise questions.
Position E-services Agency as a trusted AI business partner.
`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Fix: Use process.env.API_KEY directly as per SDK guidelines
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateResponse(prompt: string, mode: AppMode, history: { role: string; text: string }[] = []) {
    // Fix: Select model based on task complexity as per guidelines
    const model = mode === AppMode.ADVANCED_PROMPT ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
    
    // Construct dynamic instruction based on mode to reinforce the specific requested output format
    let modeGuidance = "";
    if (mode === AppMode.SHORT_PROMPT) {
      modeGuidance = "\n[SYSTEM NOTE: The user has selected SHORT PROMPT mode. Provide a single concise prompt for quick execution.]";
    } else if (mode === AppMode.ADVANCED_PROMPT) {
      modeGuidance = "\n[SYSTEM NOTE: The user has selected ADVANCED PROMPT mode. Structure the output as: Role, Context, Objective, Constraints, Output Format.]";
    } else {
      modeGuidance = "\n[SYSTEM NOTE: The user has selected BUSINESS AGENT mode. Provide actionable strategic advice.]";
    }

    const contents = [
      ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
      { role: 'user', parts: [{ text: prompt + modeGuidance }] }
    ];

    try {
      const response = await this.ai.models.generateContent({
        model,
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      // Fix: Access response.text directly (it's a getter, not a method)
      return response.text || "I apologize, but I could not generate a response at this time.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      if (error instanceof Error && error.message.includes("API key")) {
        return "Error: Invalid or missing API Key.";
      }
      return "An unexpected error occurred. Please try again later.";
    }
  }
}

export const geminiService = new GeminiService();
