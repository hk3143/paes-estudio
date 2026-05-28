import { prisma } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  const subjects = await prisma.subject.findMany({
    orderBy: { order: "asc" },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          topics: {
            orderBy: { order: "asc" },
            select: { id: true, name: true, slug: true },
          },
        },
      },
    },
  })
  return NextResponse.json(subjects)
}
