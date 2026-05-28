"use client"

import { useParams } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { motion } from "framer-motion"
import { BookOpen, ExternalLink, ChevronLeft, ChevronRight, Film, Globe, Brain, List, Hash } from "lucide-react"
import { extractResources, type VideoResource, type LinkResource, type HeadingItem } from "@/lib/resources"

function VideoCard({ video }: { video: VideoResource }) {
  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03, y: -4 }}
      className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
    >
      <div className="relative aspect-video bg-slate-100">
        <img
          src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
          alt={video.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 shadow-lg transition group-hover:scale-110">
            <svg viewBox="0 0 24 24" fill="white" className="ml-0.5 h-6 w-6">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h4 className="line-clamp-2 text-sm font-medium text-slate-800 group-hover:text-blue-600">
          {video.title}
        </h4>
      </div>
    </motion.a>
  )
}

function LinkCard({ link }: { link: LinkResource }) {
  const domain = link.url.replace(/^https?:\/\//, "").split("/")[0]
  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03, y: -3 }}
      className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
        <Globe className="h-5 w-5 text-blue-600" />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-medium text-slate-800 group-hover:text-blue-600">{link.title}</h4>
        <p className="mt-0.5 truncate text-xs text-slate-400">{domain}</p>
      </div>
      <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-slate-300 group-hover:text-blue-500" />
    </motion.a>
  )
}

function TOC({ headings, contentRef }: { headings: HeadingItem[]; contentRef: React.RefObject<HTMLDivElement | null> }) {
  const [active, setActive] = useState("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    )

    const els = contentRef.current?.querySelectorAll("h2, h3")
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [headings, contentRef])

  if (headings.length < 2) return null

  return (
    <div className="sticky top-24 w-64 shrink-0">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <List className="h-3.5 w-3.5" /> Contenido
        </div>
        <nav className="space-y-0.5">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" })
              }}
              className={`block rounded-md px-3 py-1.5 text-sm transition ${
                active === h.id
                  ? "bg-blue-50 font-medium text-blue-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              } ${h.level === 3 ? "ml-3 text-xs" : ""}`}
            >
              {h.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default function TopicPage() {
  const params = useParams()
  const slug = params?.topicSlug as string
  const subjectSlug = params?.slug as string
  const contentRef = useRef<HTMLDivElement>(null)
  const [data, setData] = useState<any>(null)
  const [allTopics, setAllTopics] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    fetch(`/api/temario/topic?slug=${slug}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))

    fetch("/api/temario")
      .then((r) => r.json())
      .then((subjects: any[]) => {
        const all: any[] = []
        for (const s of subjects) {
          for (const m of s.modules) {
            for (const t of m.topics) {
              all.push({ ...t, subjectSlug: s.slug, moduleName: m.name, subjectName: s.name })
            }
          }
        }
        setAllTopics(all)
      })
  }, [slug])

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    )

  if (!data) return <div className="py-20 text-center text-slate-500">Tema no encontrado</div>

  const { videos, links, headings, content } = extractResources(data.content || "")

  const currentIndex = allTopics.findIndex((t) => t.slug === slug)
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null

  const relatedTopics = allTopics
    .filter((t) => t.subjectSlug === subjectSlug && t.slug !== slug)
    .slice(0, 6)

  const topicQuestions = ["Historia tiene 25 preg", "Lectora 7", "M1 12", "M2 7", "Ciencias 6"]
  const subjectQuestionMap: Record<string, string> = {
    historia: "25 preguntas en total",
    "competencia-lectora": "7 preguntas en total",
    "matematica-m1": "12 preguntas en total",
    "matematica-m2": "7 preguntas en total",
    ciencias: "6 preguntas en total",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-6xl"
    >
      {/* Breadcrumbs */}
      <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-400">
        <Link href="/temario" className="transition-colors hover:text-blue-600">
          Temario
        </Link>
        <span className="text-slate-300">/</span>
        {data.module?.subject && (
          <>
            <Link href={`/temario/${subjectSlug}`} className="transition-colors hover:text-blue-600">
              {data.module.subject.name}
            </Link>
            <span className="text-slate-300">/</span>
          </>
        )}
        <Link href={`/temario/${subjectSlug}`} className="transition-colors hover:text-blue-600">
          {data.module?.name}
        </Link>
        <span className="text-slate-300">/</span>
        <span className="font-medium text-slate-700">{data.name}</span>
      </nav>

      {/* Title */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="mb-6 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 text-white shadow-xl sm:p-8"
      >
        <div className="animate-gradient absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:200%_200%]" />
        <div className="relative">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/20 backdrop-blur"
            >
              <BookOpen className="h-7 w-7" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">{data.name}</h1>
              {data.module && (
                <p className="mt-1 text-sm text-white/70">
                  {data.module.name}
                  {data.module.subject && <span> &middot; {data.module.subject.name}</span>}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Infobox-style metadata */}
        <div className="mt-4 flex flex-wrap gap-3 sm:mt-6">
          <div className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white/80 backdrop-blur">
            <span className="font-medium text-white">Temas relacionados:</span> {relatedTopics.length}
          </div>
          <div className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white/80 backdrop-blur">
            <span className="font-medium text-white">Módulo:</span> {data.module?.name}
          </div>
          <div className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white/80 backdrop-blur">
            <span className="font-medium text-white">Preguntas:</span> {subjectQuestionMap[subjectSlug] || "En la base"}
          </div>
        </div>
      </motion.div>

      {/* Layout: TOC sidebar + Content */}
      <div className="flex gap-8">
        {/* TOC - desktop only */}
        <div className="hidden lg:block">
          <TOC headings={headings} contentRef={contentRef} />
        </div>

        {/* Main content */}
        <div className="min-w-0 flex-1 space-y-6" ref={contentRef}>
          {/* TOC - mobile */}
          {headings.length >= 2 && (
            <details className="rounded-xl border border-slate-200 bg-white lg:hidden">
              <summary className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-medium text-slate-600">
                <List className="h-4 w-4" /> Tabla de contenidos
              </summary>
              <div className="border-t border-slate-100 px-4 py-2">
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className={`block rounded px-3 py-1.5 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 ${h.level === 3 ? "ml-4 text-xs" : ""}`}
                  >
                    {h.text}
                  </a>
                ))}
              </div>
            </details>
          )}

          {/* Article content */}
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:font-bold prose-headings:text-slate-800 prose-h2:mt-10 prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-2 prose-h2:text-xl prose-h3:mt-6 prose-h3:text-lg prose-p:leading-relaxed prose-p:text-slate-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-800 prose-code:rounded-md prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-slate-800 prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:text-sm prose-ul:list-disc prose-li:marker:text-slate-300 prose-table:w-full prose-table:border-collapse prose-th:bg-slate-50 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:text-sm prose-th:font-semibold prose-td:border prose-td:border-slate-200 prose-td:px-4 prose-td:py-2 prose-td:text-sm">
              <ReactMarkdown
                components={{
                  h2: ({ children, ...props }) => {
                    const text = String(children)
                    const id = text.toLowerCase().replace(/[^\w\s\u00C0-\u024F]/g, "").replace(/\s+/g, "-")
                    return (
                      <h2 id={id} {...props}>
                        {children}
                      </h2>
                    )
                  },
                  h3: ({ children, ...props }) => {
                    const text = String(children)
                    const id = text.toLowerCase().replace(/[^\w\s\u00C0-\u024F]/g, "").replace(/\s+/g, "-")
                    return (
                      <h3 id={id} {...props}>
                        {children}
                      </h3>
                    )
                  },
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1"
                    >
                      {children} <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  ),
                  img: ({ src, alt }) => (
                    <img src={src} alt={alt || ""} className="rounded-xl" loading="lazy" />
                  ),
                }}
              >
                {content || "*Contenido en preparación*"}
              </ReactMarkdown>
            </div>
          </article>

          {/* Videos */}
          {videos.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50">
                  <Film className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Videos recomendados</h2>
                  <p className="text-sm text-slate-400">Contenido educativo en YouTube</p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((v, i) => (
                  <VideoCard key={i} video={v} />
                ))}
              </div>
            </motion.section>
          )}

          {/* Links */}
          {links.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <Globe className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Recursos y enlaces</h2>
                  <p className="text-sm text-slate-400">Para profundizar en el tema</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {links.map((l, i) => (
                  <LinkCard key={i} link={l} />
                ))}
              </div>
            </motion.section>
          )}

          {/* Related topics */}
          {relatedTopics.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50">
                  <Hash className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Temas relacionados</h2>
                  <p className="text-sm text-slate-400">De la misma materia</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {relatedTopics.map((t) => (
                  <Link
                    key={t.id}
                    href={`/temario/${t.subjectSlug}/${t.slug}`}
                    className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-indigo-200 hover:shadow-md"
                  >
                    <BookOpen className="h-5 w-5 shrink-0 text-slate-300 group-hover:text-indigo-500" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-700 group-hover:text-indigo-600">
                        {t.name}
                      </p>
                      <p className="text-xs text-slate-400">{t.moduleName}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between gap-4">
            {prevTopic ? (
              <Link
                href={`/temario/${prevTopic.subjectSlug}/${prevTopic.slug}`}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">{prevTopic.name}</span>
                <span className="sm:hidden">Anterior</span>
              </Link>
            ) : (
              <div />
            )}
            {nextTopic ? (
              <Link
                href={`/temario/${nextTopic.subjectSlug}/${nextTopic.slug}`}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                <span className="hidden sm:inline">{nextTopic.name}</span>
                <span className="sm:hidden">Siguiente</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>

          {/* Practice CTA */}
          <Link
            href={`/quiz?subject=${subjectSlug}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-medium text-white shadow-md transition hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
          >
            <Brain className="h-5 w-5" />
            Practicar quiz de esta materia
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
