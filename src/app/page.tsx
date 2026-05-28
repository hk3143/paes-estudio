"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { BookOpen, Brain, MessageCircle, TrendingUp, Sparkles, ArrowRight, BookCheck } from "lucide-react"

const subjects = [
  { name: "Historia y Cs. Sociales", slug: "historia", color: "bg-amber-700", icon: "📜", questions: 25 },
  { name: "Competencia Lectora", slug: "competencia-lectora", color: "bg-blue-600", icon: "📖", questions: 7 },
  { name: "Matemática M1", slug: "matematica-m1", color: "bg-emerald-600", icon: "📐", questions: 12 },
  { name: "Matemática M2", slug: "matematica-m2", color: "bg-violet-600", icon: "∑", questions: 7 },
  { name: "Ciencias", slug: "ciencias", color: "bg-red-600", icon: "🔬", questions: 6 },
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  return (
    <div className="animate-fade-in space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Prepárate para la <span className="text-blue-600">PAES</span>
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Estudia, practica con quizzes y resuelve tus dudas con IA
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/temario" className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-blue-200 hover:shadow-md">
          <BookOpen className="h-8 w-8 text-blue-600" />
          <h3 className="mt-3 font-semibold">Estudiar Temario</h3>
          <p className="mt-1 text-sm text-slate-500">Repasa todos los contenidos PAES</p>
        </Link>
        <Link href="/quiz" className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-emerald-200 hover:shadow-md">
          <Brain className="h-8 w-8 text-emerald-600" />
          <h3 className="mt-3 font-semibold">Practicar Quiz</h3>
          <p className="mt-1 text-sm text-slate-500">Preguntas aleatorias tipo PAES</p>
        </Link>
        <Link href="/preguntas" className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:border-violet-200 hover:shadow-md">
          <MessageCircle className="h-8 w-8 text-violet-600" />
          <h3 className="mt-3 font-semibold">Preguntar a IA</h3>
          <p className="mt-1 text-sm text-slate-500">Respuestas con búsqueda en internet</p>
        </Link>
      </div>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold">
          <BookCheck className="h-5 w-5 text-blue-600" />
          Materias disponibles
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s) => (
            <Link
              key={s.slug}
              href={`/temario/${s.slug}`}
              className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:shadow-md"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-lg text-2xl ${s.color} text-white`}>
                {s.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">{s.name}</h3>
                <p className="text-sm text-slate-500">{s.questions} preguntas</p>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:text-blue-600" />
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 p-6 text-white sm:p-8">
        <div className="flex items-center gap-3">
          <Sparkles className="h-6 w-6" />
          <h2 className="text-xl font-bold">¿Cómo funciona?</h2>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white/10 p-4">
            <div className="text-2xl font-bold">1</div>
            <p className="mt-1 text-sm text-blue-100">Explora el temario y estudia cada tema</p>
          </div>
          <div className="rounded-xl bg-white/10 p-4">
            <div className="text-2xl font-bold">2</div>
            <p className="mt-1 text-sm text-blue-100">Genera quizzes personalizados y practica</p>
          </div>
          <div className="rounded-xl bg-white/10 p-4">
            <div className="text-2xl font-bold">3</div>
            <p className="mt-1 text-sm text-blue-100">Pregunta a la IA lo que no entiendas</p>
          </div>
        </div>
      </section>
    </div>
  )
}
