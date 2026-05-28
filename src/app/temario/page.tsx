"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronRight, FileText, BookOpen, Sparkles, Search } from "lucide-react"

interface Subject {
  id: string; name: string; slug: string; icon: string; color: string; modules: Module[]
}
interface Module {
  id: string; name: string; slug: string; topics: { id: string; name: string; slug: string }[]
}

const iconMap: Record<string, string> = {
  landmark: "📜", "book-open": "📖", calculator: "📐", sigma: "∑", flask: "🔬",
}

const gradientMap: Record<string, string> = {
  "#8B4513": "from-amber-600 to-orange-600",
  "#2563EB": "from-blue-500 to-indigo-600",
  "#059669": "from-emerald-500 to-teal-600",
  "#7C3AED": "from-violet-500 to-purple-600",
  "#DC2626": "from-red-500 to-rose-600",
}

export default function TemarioPage() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/temario").then(r => r.json()).then(d => { setSubjects(d); setLoading(false) })
  }, [])

  const toggle = (id: string) => {
    setExpanded(p => {
      const n = new Set(p)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
  }

  const filteredSubjects = subjects.map(s => ({
    ...s,
    modules: s.modules.map(m => ({
      ...m,
      topics: m.topics.filter(t =>
        !search || t.name.toLowerCase().includes(search.toLowerCase())
      ),
    })).filter(m => !search || m.topics.length > 0),
  })).filter(s => !search || s.modules.length > 0)

  const totalTopics = subjects.reduce((a, s) => a + s.modules.reduce((b, m) => b + m.topics.length, 0), 0)

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-3xl space-y-6"
    >
      {/* Header */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6 text-white shadow-lg sm:p-8"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
            <BookOpen className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Temario PAES</h1>
            <p className="mt-1 text-sm text-white/70">{totalTopics} temas en {subjects.length} materias</p>
          </div>
        </div>
      </motion.div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar tema..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm shadow-sm transition focus:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-100"
        />
      </div>

      {/* Subjects */}
      <AnimatePresence mode="wait">
        {filteredSubjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl border border-slate-200 bg-white p-10 text-center"
          >
            <p className="text-lg text-slate-400">No se encontraron temas para &ldquo;{search}&rdquo;</p>
          </motion.div>
        ) : (
          <motion.div layout className="space-y-4">
            {filteredSubjects.map((s, si) => {
              const grad = gradientMap[s.color] || "from-blue-500 to-indigo-600"
              const topicCount = s.modules.reduce((a, m) => a + m.topics.length, 0)
              return (
                <motion.div
                  key={s.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: si * 0.05 }}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <button
                    onClick={() => toggle(s.id)}
                    className="flex w-full items-center gap-4 p-4 text-left transition hover:bg-slate-50 sm:p-5"
                  >
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${grad} text-xl text-white shadow-sm`}>
                      {iconMap[s.icon] || "📚"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-slate-800 sm:text-lg">{s.name}</h3>
                      <p className="text-sm text-slate-400">{topicCount} temas</p>
                    </div>
                    <motion.div
                      animate={{ rotate: expanded.has(s.id) ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <ChevronDown className="h-5 w-5 text-slate-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {expanded.has(s.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="overflow-hidden border-t border-slate-100"
                      >
                        <div className="p-4 sm:p-5 space-y-4">
                          {s.modules.map((m) => (
                            <div key={m.id}>
                              <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-600">
                                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                                {m.name}
                              </h4>
                              <div className="ml-3 space-y-1 border-l-2 border-slate-100 pl-4">
                                {m.topics.map((t, ti) => (
                                  <motion.div
                                    key={t.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: ti * 0.03 }}
                                  >
                                    <Link
                                      href={`/temario/${s.slug}/${t.slug}`}
                                      className="group flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700"
                                    >
                                      <FileText className="h-3.5 w-3.5 shrink-0 text-slate-300 group-hover:text-purple-400" />
                                      <span>{t.name}</span>
                                      <motion.span
                                        initial={{ opacity: 0, x: -5 }}
                                        whileHover={{ opacity: 1, x: 0 }}
                                        className="ml-auto text-xs text-purple-400 opacity-0 group-hover:opacity-100"
                                      >
                                        estudiar &rarr;
                                      </motion.span>
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
