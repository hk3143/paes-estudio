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
    return NextResponse.json({ error: e.message || "Error al procesar la pregunta" }, { status: 500 })
  }
}
