import { askGemini } from "@/lib/ai"
import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { question } = await req.json()
  if (!question || question.length < 3) {
    return NextResponse.json({ error: "Pregunta muy corta" }, { status: 400 })
  }

  try {
    const topics = await prisma.topic.findMany({ take: 5, select: { name: true, content: true } })
    const context = topics.map((t) => `### ${t.name}\n${t.content?.slice(0, 1000) || ""}`).join("\n\n")

    const answer = await askGemini(question, context)
    return NextResponse.json({ answer })
  } catch (e: any) {
    const msg = e.message || ""
    if (msg.includes("429") || msg.includes("quota") || msg.includes("Quota exceeded")) {
      return NextResponse.json({
        answer: "La cuota gratuita de la IA se agotó por hoy. Puedes crear una nueva API key gratis en https://aistudio.google.com/apikey y actualizar `GEMINI_API_KEY` en las variables de entorno de Vercel.",
      })
    }
    return NextResponse.json({ error: "Error al procesar la pregunta. Intenta de nuevo." }, { status: 500 })
  }
}
