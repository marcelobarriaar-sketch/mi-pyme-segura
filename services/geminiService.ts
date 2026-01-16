
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectConfig, SecurityRecommendation } from "../types.ts";

export const generateSecurityProposal = async (config: ProjectConfig): Promise<SecurityRecommendation> => {
  // Inicialización inmediata para usar la versión más reciente de la API Key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const userPrompt = `Diseña una solución de seguridad electrónica profesional para el siguiente escenario:
  - Tipo de Pyme: ${config.businessType}
  - Superficie: ${config.size}
  - Prioridades Estratégicas: ${config.priorities.join(", ")}
  - Nivel de Inversión: ${config.budget}
  - Ubicación Táctica: ${config.location}
  
  La respuesta DEBE ser un objeto JSON válido que siga estrictamente la estructura definida.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: userPrompt,
      config: {
        systemInstruction: "Eres el Ingeniero Jefe de Diseño en 'Mi Pyme Segura'. Tu especialidad es crear arquitecturas de seguridad electrónica (CCTV, Alarma, Control de Acceso) para el contexto chileno. Eres preciso, técnico y siempre priorizas la relación costo-beneficio para emprendedores. Responde ÚNICAMENTE en formato JSON.",
        thinkingConfig: { thinkingBudget: 4096 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { 
              type: Type.STRING, 
              description: "Resumen ejecutivo del análisis de riesgo y la estrategia propuesta." 
            },
            recommendedHardware: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  item: { type: Type.STRING, description: "Nombre comercial del equipo." },
                  quantity: { type: Type.NUMBER, description: "Cantidad exacta sugerida." },
                  description: { type: Type.STRING, description: "Propósito técnico del equipo en este proyecto." }
                },
                required: ["item", "quantity", "description"]
              }
            },
            implementationPlan: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Pasos secuenciales para el despliegue técnico."
            },
            estimatedTime: { 
              type: Type.STRING, 
              description: "Tiempo estimado de instalación (ej: 3-5 días hábiles)." 
            }
          },
          required: ["summary", "recommendedHardware", "implementationPlan", "estimatedTime"]
        }
      }
    });

    if (!response.text) {
      throw new Error("El motor de IA devolvió una respuesta vacía.");
    }

    // Limpieza profunda del texto recibido para evitar errores de parseo
    let sanitizedText = response.text.trim();
    // Eliminar delimitadores de markdown si el modelo los incluyó a pesar del mimeType
    sanitizedText = sanitizedText.replace(/^```json\n?/, "").replace(/\n?```$/, "");
    
    try {
      return JSON.parse(sanitizedText) as SecurityRecommendation;
    } catch (parseError) {
      console.error("Error al parsear JSON de la IA:", sanitizedText);
      throw new Error("La respuesta de la IA no tiene un formato válido.");
    }
  } catch (error) {
    console.error("Error crítico en geminiService:", error);
    throw error;
  }
};
