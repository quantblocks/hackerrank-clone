import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult } from "../../types";

export const analyzeFeedback = async (comment: string): Promise<AIAnalysisResult | null> => {
  if (!comment || comment.trim().length < 5) return null;
  
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    console.warn("No API_KEY found for Gemini analysis");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following user feedback from a coding assessment platform: "${comment}". 
      Provide the sentiment, a brief summary, and list of actionable suggestions.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: {
              type: Type.STRING,
              enum: ["Positive", "Negative", "Neutral", "Mixed"],
              description: "The overall sentiment of the feedback."
            },
            summary: {
              type: Type.STRING,
              description: "A concise summary of the user's feedback."
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Actionable suggestions based on the feedback."
            }
          },
          required: ["sentiment", "summary", "suggestions"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as AIAnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return null;
  }
};