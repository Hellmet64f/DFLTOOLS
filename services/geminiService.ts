import { GoogleGenAI, Type } from "@google/genai";
import { UserDeviceData, SensitivityData } from "../types";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API_KEY is missing");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateSensitivity = async (data: UserDeviceData): Promise<SensitivityData | null> => {
  const ai = getAIClient();
  if (!ai) return null;

  const prompt = `
    Você é um treinador profissional de Free Fire (Pro Player Coach) de alto nível.
    Gere a sensibilidade PERFEITA, EXATA e a DPI recomendada para um jogador com as seguintes especificações:
    
    - Modelo do Celular: ${data.phoneModel}
    - Estilo de HUD (Quantidade de Dedos): ${data.hudFingers} dedos
    - DPI Atual/Preferida: ${data.currentDpi ? data.currentDpi : 'Padrão de fábrica'}
    
    Analise o hardware do ${data.phoneModel} (tamanho da tela, densidade de pixels, taxa de resposta ao toque).
    Considere que um jogador de ${data.hudFingers} dedos precisa de uma sensibilidade específica para movimentação e gelo.
    
    Retorne APENAS um JSON com a estrutura exata definida no schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            general: { type: Type.NUMBER, description: "Sensibilidade Geral (0-100)" },
            redDot: { type: Type.NUMBER, description: "Sensibilidade Ponto Vermelho (0-100)" },
            scope2x: { type: Type.NUMBER, description: "Mira 2x (0-100)" },
            scope4x: { type: Type.NUMBER, description: "Mira 4x (0-100)" },
            sniper: { type: Type.NUMBER, description: "Mira AWM (0-100)" },
            freeLook: { type: Type.NUMBER, description: "Olhadinha (0-100)" },
            dpi: { type: Type.NUMBER, description: "DPI Recomendada exata (Geralmente entre 360 e 900)" },
            explanation: { type: Type.STRING, description: "Breve explicação técnica (max 2 frases) do porquê essa sensibilidade funciona para este modelo e quantidade de dedos." },
          },
          required: ["general", "redDot", "scope2x", "scope4x", "sniper", "freeLook", "dpi", "explanation"],
        },
      },
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as SensitivityData;
  } catch (error) {
    console.error("Error generating sensitivity:", error);
    return null;
  }
};