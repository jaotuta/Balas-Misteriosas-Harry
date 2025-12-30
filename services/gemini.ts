
import { GoogleGenAI } from "@google/genai";

export async function getMysteriousMessage(colorName: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Você é um mestre de poções ranzinza e misterioso. O usuário acabou de sortear uma bala da cor "${colorName}". 
      Dê uma previsão curta, mística e levemente sombria (máximo 12 palavras) sobre o que essa cor reserva para o paladar dele. 
      NÃO REVELE O SABOR REAL (como banana, vômito, etc), fale apenas do mistério da cor e das sensações mágicas. 
      Exemplo: "O brilho pálido desta esfera oculta verdades que poucos ousam mastigar."
      Em português do Brasil.`,
      config: {
        temperature: 0.9,
        topP: 0.95,
      }
    });
    return response.text?.trim().replace(/^"(.*)"$/, '$1') || "O destino se cala perante esta cor vibrante...";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Sinta o peso do mistério que esta cor carrega...";
  }
}
