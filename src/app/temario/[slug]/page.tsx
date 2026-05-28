"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight, FileText, FolderOpen, ArrowLeft, BookOpen } from "lucide-react"

interface Subject {
  id: string; name: string; slug: string; icon: string; color: string; modules: Module[]
}
interface Module {
  id: string; name: string; slug: string; topics: Topic[]
}
interface Topic {
  id: string; name: string; slug: string
}

export default function SubjectPage() {
  const params = useParams()
  const slug = params?.slug as string
  const [subject, setSubject] = useState<Subject | null>(null)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    fetch("/api/temario")
      .then(r => r.json())
      .then((data: Subject[]) => {
        const s = data.find((x: Subject) => x.slug === slug)
        setSubject(s || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [slug])

  const toggle = (id: string) => {
    setExpanded(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
  )

  if (!subject) return <div className="py-20 text-center text-slate-500">Materia no encontrada</div>

  return (
    <div className="animate-fade-in space-y-6">
      <Link href="/temario" className="flex w-fit items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600">
        <ArrowLeft className="h-4 w-4" /> Volver al temario
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg text-xl text-white" style={{ backgroundColor: subject.color }}>
          {subject.icon === "landmark" ? "📜" : subject.icon === "book-open" ? "📖" : subject.icon === "calculator" ? "📐" : subject.icon === "sigma" ? "∑" : "🔬"}
        </div>
        <h1 className="text-2xl font-bold">{subject.name}</h1>
      </div>

      <div className="space-y-4">
        {subject.modules.map((m) => (
          <div key={m.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <button
              onClick={() => toggle(m.id)}
              className="flex w-full items-center gap-3 px-5 py-4 text-left font-semibold transition hover:bg-slate-50"
            >
              <FolderOpen className="h-5 w-5 text-slate-400" />
              <span className="flex-1">{m.name}</span>
              {expanded.has(m.id) ? <ChevronDown className="h-5 w-5 text-slate-400" /> : <ChevronRight className="h-5 w-5 text-slate-400" />}
            </button>
            {expanded.has(m.id) && (
              <div className="border-t border-slate-100 px-5 py-3">
                <div className="ml-2 space-y-1">
                  {m.topics.map((t) => (
                    <Link
                      key={t.id}
                      href={`/temario/${subject.slug}/${t.slug}`}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      {t.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
