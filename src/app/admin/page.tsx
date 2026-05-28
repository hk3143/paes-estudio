"use client"

import { useEffect, useState } from "react"
import { Shield, Plus, Save, Trash2, Eye } from "lucide-react"

export default function AdminPage() {
  const [auth, setAuth] = useState(false)
  const [password, setPassword] = useState("")
  const [subjects, setSubjects] = useState<any[]>([])
  const [selectedSubject, setSelectedSubject] = useState("")
  const [questions, setQuestions] = useState<any[]>([])
  const [editQuestion, setEditQuestion] = useState<any>(null)
  const [message, setMessage] = useState("")

  const ADMIN_PW = "admin123"

  const login = () => {
    if (password === ADMIN_PW) {
      setAuth(true)
      loadSubjects()
    }
  }

  const loadSubjects = async () => {
    const r = await fetch("/api/temario")
    const d = await r.json()
    setSubjects(d)
  }

  const loadQuestions = async (subjectSlug: string) => {
    if (!subjectSlug) return
    const r = await fetch(`/api/quiz/generate?subject=${subjectSlug}`)
    const d = await r.json()
    setQuestions(d)
  }

  useEffect(() => { if (selectedSubject) loadQuestions(selectedSubject) }, [selectedSubject])

  const saveQuestion = async () => {
    if (!editQuestion) return
    const r = await fetch("/api/admin/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editQuestion),
    })
    if (r.ok) {
      setMessage("Guardado ✓")
      loadQuestions(selectedSubject)
      setEditQuestion(null)
    }
  }

  if (!auth) {
    return (
      <div className="animate-fade-in mx-auto max-w-sm py-20 text-center">
        <Shield className="mx-auto h-12 w-12 text-slate-400" />
        <h1 className="mt-4 text-xl font-bold">Panel de Administración</h1>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()}
          className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-center text-sm focus:border-blue-500 focus:outline-none"
        />
        <button onClick={login} className="mt-3 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white">Ingresar</button>
      </div>
    )
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 text-amber-600" />
        <h1 className="text-2xl font-bold">Administrar Contenido</h1>
      </div>

      {message && <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">{message}</div>}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="mb-3 font-semibold">Seleccionar materia</h2>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
            >
              <option value="">— Selecciona —</option>
              {subjects.map(s => <option key={s.id} value={s.slug}>{s.name}</option>)}
            </select>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="mb-3 font-semibold">Preguntas existentes ({questions.length})</h2>
            <div className="max-h-96 space-y-2 overflow-y-auto">
              {questions.map(q => (
                <div key={q.id} className="rounded-lg border border-slate-100 p-3 text-sm">
                  <p className="text-slate-700">{q.text}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                    <span>{q.topic?.name}</span>
                    <button
                      onClick={() => setEditQuestion(q)}
                      className="text-blue-500 hover:text-blue-700"
                    >Editar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="mb-3 font-semibold">
            {editQuestion ? "Editar pregunta" : "Nueva pregunta"}
          </h2>
          {editQuestion ? (
            <div className="space-y-3">
              <div>
                <label className="mb-1 text-xs font-medium text-slate-600">Texto</label>
                <textarea
                  value={editQuestion.text}
                  onChange={e => setEditQuestion({ ...editQuestion, text: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  rows={2}
                />
              </div>
              {JSON.parse(editQuestion.options || "[]").map((opt: string, i: number) => (
                <div key={i}>
                  <label className="mb-1 text-xs font-medium text-slate-600">Opción {String.fromCharCode(65 + i)}</label>
                  <input
                    value={opt}
                    onChange={e => {
                      const opts = JSON.parse(editQuestion.options)
                      opts[i] = e.target.value
                      setEditQuestion({ ...editQuestion, options: JSON.stringify(opts) })
                    }}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
              ))}
              <div>
                <label className="mb-1 text-xs font-medium text-slate-600">Correcta (índice 0-3)</label>
                <input
                  type="number"
                  min={0}
                  max={3}
                  value={editQuestion.correct}
                  onChange={e => setEditQuestion({ ...editQuestion, correct: parseInt(e.target.value) })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="mb-1 text-xs font-medium text-slate-600">Explicación</label>
                <textarea
                  value={editQuestion.explanation}
                  onChange={e => setEditQuestion({ ...editQuestion, explanation: e.target.value })}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  rows={2}
                />
              </div>
              <div className="flex gap-2">
                <button onClick={saveQuestion} className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white">
                  <Save className="h-4 w-4" /> Guardar
                </button>
                <button onClick={() => setEditQuestion(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600">
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-400">Selecciona una pregunta para editar o crea una nueva desde la BD.</p>
          )}
        </div>
      </div>
    </div>
  )
}
