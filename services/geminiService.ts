import { GoogleGenAI, Type } from "@google/genai";
import { ProjectConfig, SecurityRecommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSecurityProposal = async (config: ProjectConfig): Promise<SecurityRecommendation> => {
  const prompt = `Actúa como el Ingeniero Jefe de Mi Pyme Segura. Diseña un sistema de seguridad para:
  Negocio: ${config.businessType}
  Tamaño: ${config.size}
  Prioridades: ${config.priorities.join(", ")}
  Presupuesto: ${config.budget}
  Ubicación: ${config.location}
  
  Proporciona hardware específico, un resumen estratégico y un plan de instalación.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        systemInstruction: "Genera diseños técnicos de seguridad profesional en formato JSON. Usa terminología de CCTV IP, Alarmas Grado 3 y Biometría.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            recommendedHardware: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  item: { type: Type.STRING },
                  quantity: { type: Type.NUMBER },
                  description: { type: Type.STRING }
                },
                required: ["item", "quantity", "description"]
              }
            },
            implementationPlan: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            estimatedTime: { type: Type.STRING }
          },
          required: ["summary", "recommendedHardware", "implementationPlan", "estimatedTime"]
        }
      }
    });

    return JSON.parse(response.text || "{}") as SecurityRecommendation;
  } catch (error) {
    console.error("AI Error:", error);
    throw new Error("Falla en la conexión con el núcleo estratégico.");
  }
};