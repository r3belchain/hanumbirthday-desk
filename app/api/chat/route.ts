import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";


const API_KEYS = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean) as string[]; 

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1]?.content;

    if (API_KEYS.length === 0) {
      console.error(
        "Setup Error: Tidak ada GEMINI_API_KEY yang terkonfigurasi di env.",
      );
      return NextResponse.json(
        { error: "Configuration Error" },
        { status: 500 },
      );
    }

    
    for (let i = 0; i < API_KEYS.length; i++) {
      const currentKey = API_KEYS[i];

      try {
      
        const ai = new GoogleGenAI({ apiKey: currentKey });

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: lastMessage,
          config: {
            systemInstruction: process.env.GEMINI_SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });

        
        return NextResponse.json({ reply: response.text });
      } catch (error: any) {
        console.error(`API Key ke-${i + 1} gagal memproses request:`, error);

       
        const isQuotaError =
          error.status === 429 ||
          error.message?.toLowerCase().includes("quota") ||
          error.message?.toLowerCase().includes("limit") ||
          error.message?.toLowerCase().includes("exhausted");

        
        if (isQuotaError && i < API_KEYS.length - 1) {
          console.warn(
            `[FAILOVER] Key ke-${i + 1} habis kuota. Otomatis beralih ke Key ke-${i + 2}...`,
          );
          continue;
        }

        throw error;
      }
    }
  } catch (error) {
    console.error("Gemini API Ultimate Failure (Semua Key Gagal):", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
