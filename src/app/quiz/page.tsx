"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Brain, Play } from "lucide-react"

interface Subject {
  id: string; name: string; slug: string
}

function QuizGenerator() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const subjectFilter = searchParams.get("subject")

  const [subjects, setSubjects] = useState<Subject[]>([])
  const [selectedSubject, setSelectedSubject] = useState(subjectFilter || "")
  const [questionCount, setQuestionCount] = useState(10)
  const [timer, setTimer] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/temario").then(r => r.json()).then(d => { setSubjects(d); setLoading(false) })
  }, [])

  const startQuiz = async () => {
    const params = new URLSearchParams()
    if (selectedSubject) params.set("subject", selectedSubject)
    params.set("count", String(questionCount))
    params.set("timer", String(timer))

    const res = await fetch(`/api/quiz/generate?${params}`)
    const questions = await res.json()
    if (questions.length === 0) return alert("No hay suficientes preguntas disponibles.")

    const quizId = Math.random().toString(36).substring(2, 15)
    sessionStorage.setItem(`quiz_${quizId}`, JSON.stringify(questions))
    sessionStorage.setItem(`quiz_${quizId}_config`, JSON.stringify({ timer, count: questionCount }))
    router.push(`/quiz/${quizId}`)
  }

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
  )

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-3">
        <Brain className="h-6 w-6 text-emerald-600" />
        <h1 className="text-2xl font-bold">Generar Quiz</h1>
      </div>

      <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Materia</label>
          <select
            value={selectedSubject}
            onChange={e => setSelectedSubject(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="">Todas las materias</option>
            {subjects.map(s => (
              <option key={s.id} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Cantidad de preguntas</label>
          <div className="flex gap-2">
            {[5, 10, 20, 30, 50].map(n => (
              <button
                key={n}
                onClick={() => setQuestionCount(n)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  questionCount === n ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTimer(!timer)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${timer ? "bg-emerald-500" : "bg-slate-300"}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${timer ? "translate-x-6" : "translate-x-1"}`} />
          </button>
          <span className="text-sm text-slate-600">Temporizador por pregunta (30s)</span>
        </div>

        <button
          onClick={startQuiz}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-medium text-white transition hover:bg-emerald-700"
        >
          <Play className="h-5 w-5" /> Empezar Quiz
        </button>
      </div>
    </div>
  )
}

export default function QuizPage() {
  return (
    <div className="animate-fade-in">
      <Suspense fallback={<div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" /></div>}>
        <QuizGenerator />
      </Suspense>
    </div>
  )
}
