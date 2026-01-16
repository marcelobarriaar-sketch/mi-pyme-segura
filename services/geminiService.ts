
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectConfig, SecurityRecommendation } from "../types.ts";

export const generateSecurityProposal = async (config: ProjectConfig): Promise<SecurityRecommendation> => {
  // Inicialización con la API KEY inyectada
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const userPrompt = `Analiza y genera una propuesta técnica de seguridad para:
  - Sector: ${config.businessType}
  - Tamaño: ${config.size}
  - Prioridades: ${config.priorities.join(", ")}
  - Nivel: ${config.budget}
  - Ubicación: ${config.location}
  
  Instrucción técnica: Debes proponer hardware específico disponible en Chile y un plan de acción lógico.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: "Eres el Ingeniero Jefe de Mi Pyme Segura. Tu misión es diseñar arquitecturas de seguridad electrónica profesionales. Responde EXCLUSIVAMENTE en formato JSON siguiendo el esquema proporcionado. No añadas texto introductorio ni conclusiones fuera del JSON.",
        responseMimeType: "application/json",
        // CRÍTICO: Configuración de tokens sincronizada para evitar errores de conexión/vacío
        maxOutputTokens: 8192,
        thinkingConfig: { thinkingBudget: 2048 },
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { 
              type: Type.STRING, 
              description: "Análisis estratégico de la seguridad para esta Pyme." 
            },
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
            estimatedTime: { 
              type: Type.STRING 
            }
          },
          required: ["summary", "recommendedHardware", "implementationPlan", "estimatedTime"]
        }
      }
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("Respuesta vacía del motor Gemini.");
    }

    // Limpieza de posibles bloques markdown para asegurar JSON puro
    const cleanJson = textOutput.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(cleanJson) as SecurityRecommendation;
  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw new Error("Error en la conexión con el servidor de IA. Inténtelo de nuevo.");
  }
};
