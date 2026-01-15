
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectConfig, SecurityRecommendation } from "../types.ts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSecurityProposal = async (config: ProjectConfig): Promise<SecurityRecommendation> => {
  const prompt = `Actúa como un experto consultor en seguridad electrónica para PYMES en Chile. 
  Genera una propuesta técnica personalizada para "Mi Pyme Segura" basada en los siguientes datos del cliente:
  - Tipo de negocio: ${config.businessType}
  - Tamaño del recinto: ${config.size}
  - Prioridades: ${config.priorities.join(", ")}
  - Presupuesto estimado: ${config.budget}
  - Ubicación: ${config.location}

  La propuesta debe ser profesional, realista y enfocada en la prevención de delitos comunes en negocios locales.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: "Resumen ejecutivo de la solución de seguridad." },
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
            items: { type: Type.STRING },
            description: "Pasos cronológicos para la instalación."
          },
          estimatedTime: { type: Type.STRING, description: "Tiempo estimado de ejecución." }
        },
        required: ["summary", "recommendedHardware", "implementationPlan", "estimatedTime"]
      }
    }
  });

  const resultText = response.text || "{}";
  return JSON.parse(resultText) as SecurityRecommendation;
};
