"use client"

import Link from "next/link"
import { useState } from "react"
import { GraduationCap, Menu, X, BookOpen, Brain, MessageCircle, LayoutDashboard } from "lucide-react"

const links = [
  { href: "/", label: "Inicio", icon: LayoutDashboard },
  { href: "/temario", label: "Temario", icon: BookOpen },
  { href: "/quiz", label: "Quiz", icon: Brain },
  { href: "/preguntas", label: "Preguntas", icon: MessageCircle },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-slate-800">
          <GraduationCap className="h-7 w-7 text-blue-600" />
          <span>PAES<span className="text-blue-600">Estudio</span></span>
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </Link>
          ))}
        </div>

        <button className="sm:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 sm:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
