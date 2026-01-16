
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectConfig, SecurityRecommendation } from "../types.ts";

export const generateSecurityProposal = async (config: ProjectConfig): Promise<SecurityRecommendation> => {
  // Inicialización de instancia con la API KEY del entorno
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const userPrompt = `Genera una propuesta técnica detallada basada en:
  - Industria: ${config.businessType}
  - Tamaño: ${config.size}
  - Prioridades: ${config.priorities.join(", ")}
  - Nivel de Protección: ${config.budget}
  - Ciudad/Zona: ${config.location}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: "Actúa como un experto consultor senior en seguridad electrónica de Mi Pyme Segura. Tu objetivo es diseñar soluciones realistas, profesionales y de estándar internacional para PYMES en Chile. Responde estrictamente en formato JSON.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { 
              type: Type.STRING, 
              description: "Análisis ejecutivo del riesgo y cómo la solución lo mitiga." 
            },
            recommendedHardware: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  item: { type: Type.STRING, description: "Nombre del equipo (ej. Cámara PTZ 4K)." },
                  quantity: { type: Type.NUMBER, description: "Cantidad sugerida." },
                  description: { type: Type.STRING, description: "Por qué se elige este equipo." }
                },
                required: ["item", "quantity", "description"]
              }
            },
            implementationPlan: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Pasos tácticos para la instalación (mínimo 3)."
            },
            estimatedTime: { 
              type: Type.STRING, 
              description: "Tiempo estimado (ej. 48-72 horas hábiles)." 
            }
          },
          required: ["summary", "recommendedHardware", "implementationPlan", "estimatedTime"]
        }
      }
    });

    // Limpieza de posibles delimitadores de markdown si existieran
    let resultText = response.text || "{}";
    resultText = resultText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(resultText) as SecurityRecommendation;
  } catch (error) {
    console.error("Critical AI Engine Error:", error);
    throw new Error("Fallo en la comunicación con el cerebro de IA.");
  }
};
