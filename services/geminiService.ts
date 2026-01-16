import { GoogleGenAI, Type } from "@google/genai";
import { ProjectConfig, SecurityRecommendation } from "../types.ts";

export const generateSecurityProposal = async (config: ProjectConfig): Promise<SecurityRecommendation> => {
  // Inicialización con la API KEY inyectada
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const userPrompt = `Como Ingeniero Jefe de Mi Pyme Segura, diseña una solución técnica para:
  - Tipo de Pyme: ${config.businessType}
  - Superficie: ${config.size}
  - Prioridades: ${config.priorities.join(", ")}
  - Nivel de Seguridad: ${config.budget}
  - Ciudad/Zona: ${config.location}
  
  Debes proponer hardware real (CCTV IP, Alarmas grado 2 o 3, etc.) y un cronograma de ejecución.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // Usamos Pro para mayor capacidad de diseño técnico
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: "Eres un experto senior en seguridad electrónica chileno. Generas diseños de proyectos de seguridad profesional. Responde EXCLUSIVAMENTE en formato JSON.",
        responseMimeType: "application/json",
        maxOutputTokens: 4096,
        thinkingConfig: { thinkingBudget: 1024 }, // Presupuesto para razonamiento técnico
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { 
              type: Type.STRING, 
              description: "Análisis estratégico y justificación técnica del diseño." 
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

    const text = response.text;
    if (!text) throw new Error("No se recibió respuesta del cerebro IA.");

    // Limpieza profunda de la respuesta para evitar errores de parseo
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    try {
      return JSON.parse(cleanJson) as SecurityRecommendation;
    } catch (parseError) {
      console.error("Error al procesar JSON de IA:", text);
      throw new Error("La respuesta de la IA no pudo ser procesada como un proyecto válido.");
    }
  } catch (error) {
    console.error("Error en Gemini Service:", error);
    throw error;
  }
};