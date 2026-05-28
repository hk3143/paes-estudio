"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { ArrowLeft, BookOpen } from "lucide-react"

export default function TopicPage() {
  const params = useParams()
  const slug = params?.topicSlug as string
  const subjectSlug = params?.slug as string
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    fetch(`/api/temario/topic?slug=${slug}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
  )

  if (!data) return <div className="py-20 text-center text-slate-500">Tema no encontrado</div>

  return (
    <div className="animate-fade-in space-y-6">
      <Link href="/temario" className="flex w-fit items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600">
        <ArrowLeft className="h-4 w-4" /> Volver al temario
      </Link>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <BookOpen className="h-6 w-6 text-blue-600" />
          {data.name}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          {data.module?.name} · {data.module?.subject?.name}
        </p>
      </div>

      <div className="prose max-w-none rounded-xl border border-slate-200 bg-white p-6 prose-headings:text-slate-800 prose-p:text-slate-600 prose-strong:text-slate-800">
        <ReactMarkdown>{data.content || "*Contenido en preparación*"}</ReactMarkdown>
      </div>

      <Link
        href={`/quiz?subject=${subjectSlug}`}
        className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        Practicar quiz de esta materia →
      </Link>
    </div>
  )
}
