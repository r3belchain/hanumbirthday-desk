import { createGoogleGenerativeAI } from "@ai-sdk/google";
import {
  streamText,
  tool,
  convertToModelMessages, 
  stepCountIs,
  type UIMessage,
} from "ai";
import { z } from "zod";

const API_KEYS = [
  process.env.GEMINI_API_KEY_1,
  process.env.GEMINI_API_KEY_2,
  process.env.GEMINI_API_KEY_3,
].filter(Boolean) as string[];

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    if (API_KEYS.length === 0) {
      return new Response(
        JSON.stringify({ error: "Setup Error: API Key tidak ditemukan." }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    for (let i = 0; i < API_KEYS.length; i++) {
      const currentKey = API_KEYS[i];
      try {
        const googleProvider = createGoogleGenerativeAI({ apiKey: currentKey });

        const modelMessages = await convertToModelMessages(messages);

        const result = streamText({
          model: googleProvider("gemini-2.5-flash"),
          messages: modelMessages,
          system: process.env.GEMINI_SYSTEM_INSTRUCTION,
          temperature: 0.7,
          stopWhen: stepCountIs(5),
          tools: {
            getWebsiteContext: tool({
              description:
                "Mendapatkan data kontekstual web seperti status tema aktif atau info pemilik.",
              inputSchema: z.object({}),
              execute: async (_input) => ({
                owner: "Azhar & Hanum",
                vibes: "Estetik dengan Custom Cursor dan Smooth Scroll",
                fiturUtama: "Kirim Doa Baik di CTA Section",
              }),
            }),
          },
        });

        return result.toUIMessageStreamResponse();
      } catch (error: unknown) {
        console.error(`API Key ke-${i + 1} gagal:`, error);
        const isQuotaError =
          error instanceof Error &&
          ((error as { status?: number }).status === 429 ||
            error.message?.toLowerCase().includes("quota"));
        if (isQuotaError && i < API_KEYS.length - 1) continue;
        throw error;
      }
    }

    return new Response(
      JSON.stringify({ error: "Semua API Key telah habis kuotanya." }),
      { status: 503, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Unhandled error di /api/chat:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
