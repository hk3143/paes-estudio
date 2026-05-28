"use client"

import { useEffect, useState, useRef } from "react"
import { Search, MessageCircle, Send, Sparkles, Loader2, BookOpen } from "lucide-react"
import Link from "next/link"

interface SearchResult {
  questions: { id: string; text: string; topic: { name: string; module: { subject: { name: string } } } }[]
  topics: { id: string; name: string; slug: string; module: { subject: { name: string; slug: string } } }[]
}

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export default function PreguntasPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null)
  const [searching, setSearching] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "¡Hola! Soy tu tutor PAES con acceso a internet. Pregúntame cualquier cosa sobre el temario." }
  ])
  const [chatInput, setChatInput] = useState("")
  const [chatLoading, setChatLoading] = useState(false)
  const chatEnd = useRef<HTMLDivElement>(null)

  useEffect(() => { chatEnd.current?.scrollIntoView({ behavior: "smooth" }) }, [chatMessages])

  useEffect(() => {
    if (searchQuery.length < 2) { setSearchResult(null); return }
    const debounce = setTimeout(async () => {
      setSearching(true)
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await res.json()
      setSearchResult(data)
      setSearching(false)
    }, 300)
    return () => clearTimeout(debounce)
  }, [searchQuery])

  const sendMessage = async () => {
    if (!chatInput.trim() || chatLoading) return
    const msg = chatInput.trim()
    setChatInput("")
    setChatMessages(prev => [...prev, { role: "user", content: msg }])
    setChatLoading(true)
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: msg }),
      })
      const data = await res.json()
      setChatMessages(prev => [...prev, { role: "assistant", content: data.answer || data.error || "Error al procesar" }])
    } catch {
      setChatMessages(prev => [...prev, { role: "assistant", content: "Error de conexión. Intenta de nuevo." }])
    }
    setChatLoading(false)
  }

  return (
    <div className="animate-fade-in mx-auto max-w-4xl space-y-6">
      <div className="flex items-center gap-3">
        <MessageCircle className="h-6 w-6 text-violet-600" />
        <h1 className="text-2xl font-bold">Preguntas y Respuestas</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Search */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar en el temario..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {searching && <div className="flex items-center gap-2 text-sm text-slate-500"><Loader2 className="h-4 w-4 animate-spin" /> Buscando...</div>}

          {searchResult && (
            <div className="space-y-4">
              {searchResult.topics.length > 0 && (
                <div>
                  <h3 className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <BookOpen className="h-4 w-4" /> Temas encontrados
                  </h3>
                  {searchResult.topics.map(t => (
                    <Link
                      key={t.id}
                      href={`/temario/${t.module.subject.slug}/${t.slug}`}
                      className="mb-1 block rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
                    >
                      {t.name} <span className="text-xs text-slate-400">— {t.module.subject.name}</span>
                    </Link>
                  ))}
                </div>
              )}

              {searchResult.questions.length > 0 && (
                <div>
                  <h3 className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <Sparkles className="h-4 w-4" /> Preguntas relacionadas
                  </h3>
                  {searchResult.questions.map(q => (
                    <div key={q.id} className="mb-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
                      {q.text}
                    </div>
                  ))}
                </div>
              )}

              {searchResult.topics.length === 0 && searchResult.questions.length === 0 && (
                <p className="text-sm text-slate-400">Sin resultados para &quot;{searchQuery}&quot;</p>
              )}
            </div>
          )}
        </div>

        {/* Chat */}
        <div className="flex flex-col rounded-xl border border-slate-200 bg-white">
          <div className="flex-1 space-y-3 overflow-y-auto p-4" style={{ maxHeight: "500px" }}>
            {chatMessages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                    m.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2.5">
                  <Loader2 className="h-4 w-4 animate-spin" /> Pensando...
                </div>
              </div>
            )}
            <div ref={chatEnd} />
          </div>

          <div className="border-t border-slate-200 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Pregunta algo sobre la PAES..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-violet-400 focus:outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={chatLoading}
                className="rounded-lg bg-violet-600 p-2 text-white transition hover:bg-violet-700 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1.5 text-xs text-slate-400">
              La IA busca en internet para responder. Verifica la información importante.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
