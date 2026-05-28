"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, Brain, MessageCircle, ArrowRight, BookCheck, Sparkles, Star, Zap, Trophy } from "lucide-react"

const subjects = [
  { name: "Historia y Cs. Sociales", slug: "historia", gradient: "from-amber-600 to-orange-600", icon: "📜", questions: 25, color: "#8B4513" },
  { name: "Competencia Lectora", slug: "competencia-lectora", gradient: "from-blue-500 to-indigo-600", icon: "📖", questions: 7, color: "#2563EB" },
  { name: "Matemática M1", slug: "matematica-m1", gradient: "from-emerald-500 to-teal-600", icon: "📐", questions: 12, color: "#059669" },
  { name: "Matemática M2", slug: "matematica-m2", gradient: "from-violet-500 to-purple-600", icon: "∑", questions: 7, color: "#7C3AED" },
  { name: "Ciencias", slug: "ciencias", gradient: "from-red-500 to-rose-600", icon: "🔬", questions: 6, color: "#DC2626" },
]

const floatingEmojis = ["📚", "✏️", "🎯", "🏆", "⭐", "📝"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}

const quickLinks = [
  { href: "/temario", title: "Estudiar Temario", desc: "Repasa todos los contenidos PAES", icon: BookOpen, gradient: "from-blue-500 to-cyan-500", emoji: "📖" },
  { href: "/quiz", title: "Practicar Quiz", desc: "Preguntas aleatorias tipo PAES", icon: Brain, gradient: "from-emerald-500 to-green-500", emoji: "🧠" },
  { href: "/preguntas", title: "Preguntar a IA", desc: "Respuestas con búsqueda en internet", icon: MessageCircle, gradient: "from-violet-500 to-purple-500", emoji: "🤖" },
]

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      {/* Floating decorative emojis */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {floatingEmojis.map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl opacity-10"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 5 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Hero */}
      <motion.section variants={itemVariants} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 sm:p-12 text-white shadow-2xl">
        <div className="animate-gradient absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:200%_200%]" />
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
            className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur"
          >
            <Sparkles className="h-8 w-8" />
          </motion.div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Prepárate para la <span className="text-yellow-300">PAES</span>
          </h1>
          <p className="mt-3 max-w-xl text-lg text-white/80">
            Estudia con contenido interactivo, practica con quizzes y resuelve tus dudas con IA
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 flex flex-wrap gap-3"
          >
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-600 shadow-lg transition hover:scale-105 hover:shadow-xl"
            >
              <Zap className="h-5 w-5" /> Empezar a practicar
            </Link>
            <Link
              href="/temario"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3 font-medium text-white backdrop-blur transition hover:bg-white/20"
            >
              <BookOpen className="h-5 w-5" /> Explorar temario
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: BookCheck, label: "Materias", value: "5", color: "text-blue-600", bg: "bg-blue-50" },
          { icon: Brain, label: "Preguntas", value: "57", color: "text-emerald-600", bg: "bg-emerald-50" },
          { icon: Trophy, label: "Temas", value: "26", color: "text-amber-600", bg: "bg-amber-50" },
          { icon: Star, label: "Gratis", value: "100%", color: "text-violet-600", bg: "bg-violet-50" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -3 }}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-800">{stat.value}</p>
              <p className="text-xs text-slate-400">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Links */}
      <motion.div variants={itemVariants}>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
          <Zap className="h-5 w-5 text-yellow-500" /> Comienza aquí
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {quickLinks.map((link, i) => (
            <motion.div key={i} variants={cardVariants} whileHover={{ scale: 1.03, y: -4 }}>
              <Link
                href={link.href}
                className="group relative block overflow-hidden rounded-2xl p-5 text-white transition"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient}`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_70%)]" />
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{link.emoji}</span>
                    <link.icon className="h-6 w-6 text-white/70" />
                  </div>
                  <h3 className="mt-3 text-lg font-bold">{link.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{link.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-white/80 transition group-hover:gap-2">
                    Ir <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Subjects */}
      <motion.section variants={itemVariants}>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-800">
          <BookCheck className="h-5 w-5 text-blue-600" /> Materias disponibles
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((s, i) => (
            <motion.div
              key={s.slug}
              variants={cardVariants}
              whileHover={{ scale: 1.03, y: -4 }}
              custom={i}
            >
              <Link
                href={`/temario/${s.slug}`}
                className="group relative block overflow-hidden rounded-2xl p-4 transition"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-90`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.1),transparent_50%)]" />
                <div className="relative flex items-center gap-4">
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20 text-2xl backdrop-blur"
                  >
                    {s.icon}
                  </motion.div>
                  <div className="flex-1 text-white">
                    <h3 className="font-bold">{s.name}</h3>
                    <p className="text-sm text-white/70">{s.questions} preguntas</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-white/50 transition group-hover:translate-x-1 group-hover:text-white" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  )
}
