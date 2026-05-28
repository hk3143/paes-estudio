import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const data = await req.json()

  try {
    if (data.id) {
      const { id, text, options, correct, explanation } = data
      await prisma.question.update({
        where: { id },
        data: { text, options: JSON.stringify(options), correct, explanation },
      })
    } else {
      await prisma.question.create({
        data: {
          topicId: data.topicId,
          text: data.text,
          options: JSON.stringify(data.options),
          correct: data.correct,
          explanation: data.explanation || "",
        },
      })
    }
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
