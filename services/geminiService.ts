import { GoogleGenAI } from "@google/genai";
import { CyclePhase, InsightSchema, DailyInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDailyInsight = async (
  phase: CyclePhase,
  dayOfCycle: number,
  mood?: string,
  energy?: number
): Promise<DailyInsight> => {
  
  const prompt = `
    You are a wise, feminist, holistic health guide for a woman's menstrual cycle app.
    The user is currently in the ${phase} phase (Day ${dayOfCycle} of cycle).
    ${mood ? `She is feeling: ${mood}.` : ''}
    ${energy ? `Her energy level is ${energy}/10.` : ''}

    Provide guidance that views menstruation and the cycle as a source of power and rhythm.
    - Menstrual (Winter): Inner reflection, rest, intuition.
    - Follicular (Spring): Planning, creativity, fresh beginnings.
    - Ovulatory (Summer): Communication, outward energy, magnetism.
    - Luteal (Autumn): Detail-oriented, nesting, boundaries, critical thinking.

    Return the response as a JSON object.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: InsightSchema,
        systemInstruction: "You are a supportive, knowledgeable sister-figure. Tone: Gentle, empowering, scientific but spiritual.",
      }
    });

    const jsonText = response.text || "{}";
    return JSON.parse(jsonText) as DailyInsight;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback data if API fails
    return {
      powerPhrase: "Trust the rhythm of your body.",
      foodSuggestion: "Warm, nourishing foods.",
      exerciseSuggestion: "Gentle stretching or walking.",
      workFocus: "Reflect on your goals.",
      ritual: "Take deep breaths and ground yourself."
    };
  }
};

export const getKnowledgeAnswer = async (question: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Answer the following question about women's health/menstrual cycles from a scientific yet feminist and body-positive perspective: "${question}" Keep it concise (under 150 words).`,
        });
        return response.text || "Unable to retrieve answer.";
    } catch (e) {
        return "Sorry, I am having trouble connecting to the wisdom source right now.";
    }
}
