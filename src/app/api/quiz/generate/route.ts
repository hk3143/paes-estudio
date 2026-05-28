import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const subjectSlug = searchParams.get("subject")
  const count = parseInt(searchParams.get("count") || "10")

  const where: any = {}

  if (subjectSlug) {
    const subject = await prisma.subject.findUnique({ where: { slug: subjectSlug } })
    if (subject) {
      where.topic = {
        module: { subjectId: subject.id }
      }
    }
  }

  let questions = await prisma.question.findMany({
    where,
    include: { topic: { include: { module: { include: { subject: true } } } } },
  })

  // Shuffle and limit
  questions = questions.sort(() => Math.random() - 0.5).slice(0, count)

  return NextResponse.json(questions)
}
