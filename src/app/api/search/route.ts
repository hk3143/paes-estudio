import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get("q") || ""

  if (!q || q.length < 2) return NextResponse.json([])

  const questions = await prisma.question.findMany({
    where: {
      OR: [
        { text: { contains: q } },
        { explanation: { contains: q } },
      ],
    },
    include: { topic: { include: { module: { include: { subject: true } } } } },
    take: 10,
  })

  const topics = await prisma.topic.findMany({
    where: {
      OR: [
        { name: { contains: q } },
        { content: { contains: q } },
      ],
    },
    include: { module: { include: { subject: true } } },
    take: 5,
  })

  return NextResponse.json({ questions, topics })
}
