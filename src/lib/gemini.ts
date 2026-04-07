import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Gemini API client
// The API key is automatically injected by AI Studio into process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const getAyurvedicRemedy = async (symptoms: string[], severity: string, dosha?: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `I have the following symptoms: ${symptoms.join(', ')}. The severity is ${severity}. ${dosha ? `My Dosha is ${dosha}.` : ''} Provide an Ayurvedic remedy. Include herb names, benefits, how to use, and precautions. Format as JSON.`,
      config: {
        systemInstruction: "You are an expert Ayurvedic practitioner. Provide safe, traditional remedies based on Indian Knowledge Systems. If severity is severe, always include a strong recommendation to consult a doctor. If Dosha is provided, personalize the remedy for that Dosha.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            remedies: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  herbName: { type: Type.STRING },
                  benefits: { type: Type.STRING },
                  howToUse: { type: Type.STRING },
                  precautions: { type: Type.STRING }
                },
                required: ["herbName", "benefits", "howToUse", "precautions"]
              }
            },
            generalAdvice: { type: Type.STRING },
            consultDoctor: { type: Type.BOOLEAN }
          },
          required: ["remedies", "generalAdvice", "consultDoctor"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error: any) {
    console.error("Error fetching remedy:", error);
    if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('quota') || error?.message?.includes('RESOURCE_EXHAUSTED')) {
      throw new Error("API quota exceeded. Please try again later.");
    }
    throw new Error("Failed to find remedies. Please try again.");
  }
};

export const analyzeHerbImage = async (base64Image: string, mimeType: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-preview",
      contents: [
        {
          inlineData: {
            data: base64Image.split(',')[1] || base64Image,
            mimeType: mimeType
          }
        },
        "Analyze this image and identify if it's a medicinal plant or herb used in Ayurveda. Provide top matches with confidence levels."
      ],
      config: {
        systemInstruction: "You are an expert botanist and Ayurvedic practitioner. Identify the plant in the image. It might not always be clear, so provide a confidence score. If it's not a plant or you are very unsure, reflect that in the confidence score.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            matches: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  scientificName: { type: Type.STRING },
                  confidence: { type: Type.NUMBER, description: "Confidence percentage from 0 to 100" },
                  history: { type: Type.STRING },
                  benefits: { type: Type.STRING },
                  precautions: { type: Type.STRING },
                  wikipediaUrl: { type: Type.STRING }
                },
                required: ["name", "scientificName", "confidence", "history", "benefits", "precautions", "wikipediaUrl"]
              }
            },
            isPlant: { type: Type.BOOLEAN }
          },
          required: ["matches", "isPlant"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error: any) {
    console.error("Error analyzing image:", error);
    if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('quota') || error?.message?.includes('RESOURCE_EXHAUSTED')) {
      throw new Error("API quota exceeded. Please try again later.");
    }
    throw new Error("Failed to analyze image. Please try again.");
  }
};

export const getDIYRemedy = async (ingredients: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `I have these ingredients: ${ingredients.join(', ')}. What Ayurvedic remedy can I make with them?`,
      config: {
        systemInstruction: "You are an expert Ayurvedic practitioner. Provide a DIY remedy using the provided ingredients.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            remedyName: { type: Type.STRING },
            healthBenefits: { type: Type.STRING },
            preparationMethod: { type: Type.STRING },
            usageInstructions: { type: Type.STRING }
          },
          required: ["remedyName", "healthBenefits", "preparationMethod", "usageInstructions"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error: any) {
    console.error("Error fetching DIY remedy:", error);
    if (error?.status === 429 || error?.message?.includes('429') || error?.message?.includes('quota') || error?.message?.includes('RESOURCE_EXHAUSTED')) {
      throw new Error("API quota exceeded. Please try again later.");
    }
    throw new Error("Failed to fetch DIY remedy. Please try again.");
  }
};

export const createChatSession = () => {
  return ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are an expert Ayurvedic practitioner and assistant for the Swasthya 360 app. Answer questions related to Ayurveda, herbs, doshas, diet, and general wellness. Keep answers concise, structured, and helpful. Always include a disclaimer that you are an AI and for serious medical issues, a doctor should be consulted."
    }
  });
};
