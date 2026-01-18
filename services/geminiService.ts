import { GoogleGenAI, Type } from "@google/genai";
import { ProjectConfig, SecurityRecommendation } from "../types.ts";

export const generateSecurityProposal = async (config: ProjectConfig): Promise<SecurityRecommendation> => {
  // Inicialización con la API KEY del entorno
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const userPrompt = `Como Ingeniero Jefe de Mi Pyme Segura, diseña una arquitectura de seguridad electrónica profesional para:
  - Sector: ${config.businessType}
  - Superficie: ${config.size}
  - Prioridades: ${config.priorities.join(", ")}
  - Nivel de Blindaje: ${config.budget}
  - Ubicación: ${config.location}
  
  Debes recomendar hardware específico (CCTV IP, Alarmas Grado 3, etc.) y un plan de despliegue lógico.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // Modelo superior para diseño técnico
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
      config: {
        systemInstruction: "Eres un experto senior en seguridad electrónica. Generas diseños de proyectos de seguridad profesional en formato JSON. El hardware debe ser coherente con el mercado chileno.",
        responseMimeType: "application/json",
        maxOutputTokens: 4096,
        thinkingConfig: { thinkingBudget: 1024 }, // Permite a la IA "razonar" el diseño
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

    const text = response.text;
    if (!text) throw new Error("La IA no devolvió datos.");

    // Limpieza de posibles bloques de código Markdown
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanJson) as SecurityRecommendation;
  } catch (error) {
    console.error("Error en motor IA:", error);
    throw new Error("No pudimos procesar tu diseño. Reintenta en unos momentos.");
  }
};