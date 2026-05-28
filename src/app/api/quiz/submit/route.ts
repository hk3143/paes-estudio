import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { quizId, sessionId, score, total, answers, streak, avgTime } = await req.json()

  const result = await prisma.quizResult.create({
    data: {
      quizId,
      sessionId: sessionId || "anonymous",
      score,
      total: total || 0,
      answers: JSON.stringify(answers || []),
      streak: streak || 0,
      avgTime: avgTime || 0,
    },
  })

  return NextResponse.json(result)
}
