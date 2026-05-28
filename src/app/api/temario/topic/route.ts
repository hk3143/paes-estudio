import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug")
  if (!slug) return NextResponse.json(null)
  const topic = await prisma.topic.findUnique({
    where: { slug },
    include: { module: { include: { subject: true } } },
  })
  return NextResponse.json(topic)
}
