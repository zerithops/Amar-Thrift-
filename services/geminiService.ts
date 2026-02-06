
import { GoogleGenAI } from "@google/genai";

export async function generateProductDescription(name: string, category: string, condition: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, elegant, and professional marketing description (max 40 words) for a thrift clothing item named "${name}" in the category "${category}". The condition is "${condition}". Focus on quality, sustainability, and style.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "A unique piece carefully selected for your sustainable wardrobe.";
  } catch (error) {
    console.error("Gemini generation failed", error);
    return "A high-quality pre-loved item perfectly suited for sustainable fashion enthusiasts.";
  }
}
