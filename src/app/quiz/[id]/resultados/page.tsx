"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Trophy, RefreshCw, CheckCircle2, XCircle, ChevronDown, ChevronUp } from "lucide-react"

interface Answer {
  qIndex: number; selected: number; correct: number; time: number
}
interface Question {
  id: string; text: string; options: string; correct: number; explanation: string
}

export default function ResultadosPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()
  const [data, setData] = useState<{ answers: Answer[]; score: number; total: number; streak: number } | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [expanded, setExpanded] = useState<Set<number>>(new Set())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const results = sessionStorage.getItem(`quiz_${id}_results`)
    const qs = sessionStorage.getItem(`quiz_${id}`)
    if (results) setData(JSON.parse(results))
    if (qs) setQuestions(JSON.parse(qs))
  }, [id])

  if (!data || !mounted) return (
    <div className="flex justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
  )

  const pct = Math.round((data.score / data.total) * 100)
  const toggle = (i: number) => {
    setExpanded(p => { const n = new Set(p); n.has(i) ? n.delete(i) : n.add(i); return n })
  }

  return (
    <div className="animate-fade-in mx-auto max-w-2xl space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 p-8 text-center text-white">
        <Trophy className="mx-auto h-12 w-12" />
        <h1 className="mt-3 text-3xl font-bold">¡Quiz completado!</h1>
        <div className="mt-4 text-5xl font-bold">{pct}%</div>
        <p className="mt-2 text-lg">{data.score}/{data.total} respuestas correctas</p>
        <div className="mt-4 flex justify-center gap-8 text-sm">
          <div>
            <div className="text-2xl font-bold">{data.streak}</div>
            <div>Racha máxima</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{data.score}</div>
            <div>Puntaje</div>
          </div>
        </div>
        <p className="mt-4 text-xl">
          {pct >= 90 ? "¡Excelente! 🎉" : pct >= 70 ? "¡Bien! 👍" : pct >= 50 ? "Puedes mejorar 💪" : "Sigue estudiando 📚"}
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <h2 className="font-semibold text-slate-800">Revisión detallada</h2>
        <div className="mt-4 space-y-3">
          {data.answers.map((a, i) => {
            const q = questions[i]
            if (!q) return null
            const opts: string[] = JSON.parse(q.options || "[]")
            const isCorrect = a.selected === a.correct
            const isExpanded = expanded.has(i)
            return (
              <div key={i} className="overflow-hidden rounded-xl border border-slate-200">
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-slate-50"
                >
                  {isCorrect
                    ? <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
                    : <XCircle className="h-5 w-5 shrink-0 text-red-500" />
                  }
                  <span className="flex-1 text-sm font-medium text-slate-700">{q.text}</span>
                  {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                </button>
                {isExpanded && (
                  <div className="border-t border-slate-100 px-4 py-3 text-sm">
                    <p className={isCorrect ? "text-emerald-600" : "text-red-600"}>
                      <strong>Tu respuesta:</strong> {opts[a.selected] || "No respondida"}
                    </p>
                    {!isCorrect && (
                      <p className="mt-1 text-emerald-600">
                        <strong>Respuesta correcta:</strong> {opts[a.correct]}
                      </p>
                    )}
                    <p className="mt-2 text-slate-600">{q.explanation}</p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <button
        onClick={() => router.push("/quiz")}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        <RefreshCw className="h-5 w-5" /> Nuevo Quiz
      </button>
    </div>
  )
}
