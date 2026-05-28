"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ChevronDown, ChevronRight, FileText, FolderOpen, BookOpen } from "lucide-react"

interface Subject {
  id: string; name: string; slug: string; icon: string; color: string; modules: Module[]
}
interface Module {
  id: string; name: string; slug: string; topics: { id: string; name: string; slug: string }[]
}

export default function TemarioPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/temario").then(r => r.json()).then(d => { setSubjects(d); setLoading(false) })
  }, [])

  const toggle = (id: string) => {
    setExpanded(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
  )

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-bold">Temario PAES</h1>
      </div>

      <div className="space-y-4">
        {subjects.map((s) => (
          <div key={s.id} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <button
              onClick={() => toggle(s.id)}
              className="flex w-full items-center gap-3 px-5 py-4 text-left font-semibold transition hover:bg-slate-50"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg text-sm text-white" style={{ backgroundColor: s.color }}>
                {s.icon === "landmark" ? "📜" : s.icon === "book-open" ? "📖" : s.icon === "calculator" ? "📐" : s.icon === "sigma" ? "∑" : "🔬"}
              </div>
              <span className="flex-1 text-lg">{s.name}</span>
              {expanded.has(s.id) ? <ChevronDown className="h-5 w-5 text-slate-400" /> : <ChevronRight className="h-5 w-5 text-slate-400" />}
            </button>
            {expanded.has(s.id) && (
              <div className="border-t border-slate-100 px-5 py-3">
                {s.modules.map((m) => (
                  <div key={m.id} className="mb-3 last:mb-0">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <FolderOpen className="h-4 w-4 text-slate-400" />
                      {m.name}
                    </div>
                    <div className="ml-6 mt-1 space-y-1">
                      {m.topics.map((t) => (
                        <Link
                          key={t.id}
                          href={`/temario/${s.slug}/${t.slug}`}
                          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
                        >
                          <FileText className="h-3.5 w-3.5" />
                          {t.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
