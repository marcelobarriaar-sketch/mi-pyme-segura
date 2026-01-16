import { GoogleGenAI, Type } from "@google/genai";
import { ProjectConfig, SecurityRecommendation } from "../types.ts";

export const generateSecurityProposal = async (config: ProjectConfig): Promise<SecurityRecommendation> => {
  // Inicialización del cliente con la clave del entorno
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const userPrompt = `Genera un diseño técnico de seguridad para una Pyme con los siguientes parámetros:
  - Sector: ${config.businessType}
  - Tamaño: ${config.size}
  - Prioridades: ${config.priorities.join(", ")}
  - Nivel de Protección: ${config.budget}
  - Ubicación: ${config.location}
  
  Considera equipos disponibles en el mercado chileno y normativas de seguridad actuales.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: "Eres el Ingeniero Jefe de Diseño de 'Mi Pyme Segura'. Tu objetivo es crear propuestas técnicas de seguridad electrónica (CCTV, Alarma, Control de Acceso) altamente profesionales. Responde exclusivamente en formato JSON.",
        responseMimeType: "application/json",
        maxOutputTokens: 2048,
        thinkingConfig: { thinkingBudget: 512 },
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { 
              type: Type.STRING, 
              description: "Análisis estratégico de seguridad para el escenario propuesto." 
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
              items: { type: Type.STRING },
              description: "Pasos tácticos para la ejecución del proyecto."
            },
            estimatedTime: { 
              type: Type.STRING,
              description: "Tiempo estimado de entrega e instalación."
            }
          },
          required: ["summary", "recommendedHardware", "implementationPlan", "estimatedTime"]
        }
      }
    });

    const output = response.text;
    if (!output) throw new Error("Respuesta de IA nula.");

    // Limpieza de posibles delimitadores de código
    const cleanJson = output.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanJson) as SecurityRecommendation;
  } catch (error) {
    console.error("Error crítico en el motor de Mi Pyme Segura:", error);
    throw error;
  }
};