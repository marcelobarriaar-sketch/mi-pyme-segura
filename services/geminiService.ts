import { GoogleGenAI, Type } from "@google/genai";
import { ProjectConfig, SecurityRecommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSecurityProposal = async (config: ProjectConfig): Promise<SecurityRecommendation> => {
  const userPrompt = `Como Ingeniero Jefe de Mi Pyme Segura, diseña una arquitectura de seguridad electrónica profesional para:
  - Sector: ${config.businessType}
  - Superficie: ${config.size}
  - Prioridades: ${config.priorities.join(", ")}
  - Nivel de Blindaje: ${config.budget}
  - Ubicación: ${config.location}
  
  Debes recomendar hardware específico (CCTV IP, Alarmas Grado 3, etc.) y un plan de despliegue lógico.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: userPrompt,
      config: {
        systemInstruction: "Eres un experto senior en seguridad electrónica de Mi Pyme Segura. Generas diseños de proyectos de seguridad profesional en formato JSON. Sé extremadamente detallista y profesional.",
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

    const responseText = response.text || "{}";
    return JSON.parse(responseText) as SecurityRecommendation;
  } catch (error) {
    console.error("Error en motor IA:", error);
    throw new Error("Error de conexión con el núcleo táctico.");
  }
};

export const quickAiConsult = async (message: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: "Eres ALFA-1, el asistente táctico de 'Mi Pyme Segura'. Responde de forma breve, profesional y técnica. Ayuda a emprendedores a entender conceptos de CCTV, alarmas y sensores. Estás en Chile.",
        maxOutputTokens: 200,
        thinkingConfig: { thinkingBudget: 100 },
      }
    });
    return response.text || "Lo siento, la señal está débil. Reintenta.";
  } catch (error) {
    return "Error de enlace. Sistema ALFA-1 fuera de línea temporalmente.";
  }
};