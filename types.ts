import { Type } from "@google/genai";

export enum CyclePhase {
  Menstrual = 'Menstrual', // Winter: Rest, Release
  Follicular = 'Follicular', // Spring: Dream, Plan
  Ovulatory = 'Ovulatory', // Summer: Connect, Shine
  Luteal = 'Luteal' // Autumn: Organize, Reflect
}

export interface DailyLog {
  date: string;
  mood?: string;
  energyLevel?: number; // 1-10
  symptoms?: string[];
  flow?: 'Light' | 'Medium' | 'Heavy' | 'Spotting' | 'None';
  notes?: string;
}

export interface UserSettings {
  lastPeriodStart: string; // ISO Date
  cycleLength: number; // e.g., 28
  periodLength: number; // e.g., 5
  name: string;
}

export interface DailyInsight {
  powerPhrase: string;
  foodSuggestion: string;
  exerciseSuggestion: string;
  workFocus: string;
  ritual: string;
}

// AI Schema for structured output
export const InsightSchema = {
  type: Type.OBJECT,
  properties: {
    powerPhrase: { type: Type.STRING, description: "A short, poetic, empowering feminist phrase about the current cycle phase." },
    foodSuggestion: { type: Type.STRING, description: "Nutritional advice tailored to the phase (including TCM concepts if applicable)." },
    exerciseSuggestion: { type: Type.STRING, description: "Exercise type and intensity recommendation." },
    workFocus: { type: Type.STRING, description: "What kind of work is best today (creative, analytical, rest, social)." },
    ritual: { type: Type.STRING, description: "A simple self-care or spiritual ritual." }
  },
  required: ["powerPhrase", "foodSuggestion", "exerciseSuggestion", "workFocus", "ritual"]
};
