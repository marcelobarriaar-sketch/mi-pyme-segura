import { GoogleGenAI, Type } from "@google/genai";
import { ProjectConfig, SecurityRecommendation } from "../types";

// Inicialización segura del cliente AI
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSecurityProposal = async (config: ProjectConfig): Promise<SecurityRecommendation> => {
  const userPrompt = `Como Ingeniero Jefe de Mi Pyme Segura, diseña una arquitectura de seguridad electrónica profesional para:
  - Sector: ${config.businessType}
  - Superficie: ${config.size}
  - Prioridades: ${config.priorities.join(", ")}
  - Presupuesto: ${config.budget}
  - Ubicación: ${config.location}
  
  Recomienda hardware específico (CCTV IP, Alarmas Grado 3) y un plan de despliegue lógico.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: userPrompt,
      config: {
        systemInstruction: "Eres el experto senior en seguridad de Mi Pyme Segura. Generas diseños técnicos en JSON. Sé detallista y usa terminología profesional de seguridad electrónica.",
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
    console.error("Error en motor IA:", error);
    throw new Error("No se pudo establecer conexión con el núcleo táctico.");
  }
};