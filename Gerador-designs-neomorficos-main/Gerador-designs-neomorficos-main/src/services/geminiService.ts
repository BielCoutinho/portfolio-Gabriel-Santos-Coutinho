import { GoogleGenAI, Type } from "@google/genai";
import type { NeumorphismSettings } from "../hooks/useNeumorphism";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function processDesignCommand(command: string, currentSettings: NeumorphismSettings): Promise<Partial<NeumorphismSettings>> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `O usuário quer modificar um design neomórfico. 
Comando: "${command}"
Configurações atuais: ${JSON.stringify(currentSettings)}

Extraia as novas configurações ou sugestões de design. Retorne APENAS um objeto JSON com as chaves que devem ser alteradas.
Chaves válidas: size, radius, distance, intensity, blur, color, shape, lightSource, isDarkMode.
Os valores devem ser tipos corretos (number, string, boolean).
Intensidade deve ser entre 0.01 e 0.3.
Cores devem ser Hexadecimais.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            size: { type: Type.NUMBER },
            radius: { type: Type.NUMBER },
            distance: { type: Type.NUMBER },
            intensity: { type: Type.NUMBER },
            blur: { type: Type.NUMBER },
            color: { type: Type.STRING },
            shape: { type: Type.STRING },
            lightSource: { type: Type.STRING },
            isDarkMode: { type: Type.BOOLEAN },
          }
        }
      }
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
  } catch (error) {
    console.error("Gemini Error:", error);
  }
  return {};
}
