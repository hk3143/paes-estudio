"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState, useCallback, useRef } from "react"
import { Timer, CheckCircle2, XCircle, Zap } from "lucide-react"

interface Question {
  id: string; text: string; options: string; correct: number; explanation: string
  topic?: { name: string; module?: { name: string; subject?: { name: string } } }
}

export default function QuizPlayPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<{ qIndex: number; selected: number; correct: number; time: number }[]>([])
  const [showResult, setShowResult] = useState(false)
  const [streak, setStreak] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [config, setConfig] = useState<any>({ timer: false })
  const [startTime, setStartTime] = useState(Date.now())
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const data = sessionStorage.getItem(`quiz_${id}`)
    const cfg = sessionStorage.getItem(`quiz_${id}_config`)
    if (data) setQuestions(JSON.parse(data))
    if (cfg) setConfig(JSON.parse(cfg))
    setStartTime(Date.now())
  }, [id])

  const nextQuestion = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (current < questions.length - 1) {
      setCurrent(c => c + 1)
      setSelected(null)
      setShowResult(false)
      setTimeLeft(30)
      setStartTime(Date.now())
    } else {
      // Quiz finished
      const totalScore = answers.reduce((s, a) => s + (a.selected === a.correct ? 1 : 0), 0)
      const totalStreak = answers.reduce((max, a, i, arr) => {
        if (a.selected === a.correct) {
          let streak = 1
          for (let j = i - 1; j >= 0 && arr[j].selected === arr[j].correct; j--) streak++
          return Math.max(max, streak)
        }
        return max
      }, 0)

      sessionStorage.setItem(`quiz_${id}_results`, JSON.stringify({
        answers, score: totalScore, total: questions.length, streak: totalStreak
      }))

      // Submit result
      fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizId: id,
          sessionId: "anonymous",
          score: totalScore,
          total: questions.length,
          answers,
          streak: totalStreak,
          avgTime: answers.reduce((s, a) => s + a.time, 0) / answers.length,
        }),
      })

      router.push(`/quiz/${id}/resultados`)
    }
  }, [current, questions.length, answers, router, id])

  const handleAnswer = (index: number) => {
    if (showResult) return
    const elapsed = (Date.now() - startTime) / 1000
    setSelected(index)
    setShowResult(true)
    const isCorrect = index === questions[current].correct
    if (isCorrect) { setStreak(s => s + 1); setScore(s => s + 1) }
    else setStreak(0)
    setAnswers(prev => [...prev, { qIndex: current, selected: index, correct: questions[current].correct, time: elapsed }])
    if (timerRef.current) clearInterval(timerRef.current)
  }

  useEffect(() => {
    if (!config.timer || showResult) return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { nextQuestion(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [config.timer, current, showResult, nextQuestion])

  if (questions.length === 0) return (
    <div className="flex justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
  )

  const q = questions[current]
  const options: string[] = JSON.parse(q.options || "[]")

  return (
    <div className="animate-fade-in mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between text-sm text-slate-500">
        <span className="font-medium">Pregunta {current + 1} de {questions.length}</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-emerald-600">
            <Zap className="h-4 w-4" /> Racha: {streak}
          </span>
          {config.timer && (
            <span className="flex items-center gap-1 text-slate-600">
              <Timer className="h-4 w-4" /> {timeLeft}s
            </span>
          )}
        </div>
      </div>

      <div className="mb-4 h-2 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="animate-scale-in rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-800">{q.text}</h2>

        <div className="mt-5 space-y-3">
          {options.map((opt, i) => {
            let style = "border-slate-200 hover:border-blue-300 hover:bg-blue-50"
            if (showResult) {
              if (i === q.correct) style = "border-emerald-500 bg-emerald-50"
              else if (i === selected && i !== q.correct) style = "border-red-500 bg-red-50"
              else style = "border-slate-200 opacity-60"
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={showResult}
                className={`flex w-full items-center gap-3 rounded-xl border-2 p-4 text-left transition ${style}`}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-300 text-sm font-medium text-slate-600">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-slate-700">{opt}</span>
                {showResult && i === q.correct && <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-500" />}
                {showResult && i === selected && i !== q.correct && <XCircle className="ml-auto h-5 w-5 text-red-500" />}
              </button>
            )
          })}
        </div>

        {showResult && (
          <div className="mt-5 animate-slide-up rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-blue-800">
              {selected === q.correct ? "✅ ¡Correcto!" : "❌ Incorrecto"}
            </div>
            <p className="mt-2 text-sm text-slate-600">{q.explanation}</p>
          </div>
        )}
      </div>

      {showResult && (
        <button
          onClick={nextQuestion}
          className="mt-4 flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          {current < questions.length - 1 ? "Siguiente pregunta →" : "Ver resultados"}
        </button>
      )}
    </div>
  )
}
