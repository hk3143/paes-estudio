"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { ArrowLeft, BookOpen, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"

function YouTubeEmbed({ url }: { url: string }) {
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/)?.[1]
  if (!videoId) return null

  return (
    <div className="my-6 overflow-hidden rounded-xl">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="aspect-video w-full"
      />
    </div>
  )
}

export default function TopicPage() {
  const params = useParams()
  const slug = params?.topicSlug as string
  const subjectSlug = params?.slug as string
  const [data, setData] = useState<any>(null)
  const [allTopics, setAllTopics] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    fetch(`/api/temario/topic?slug=${slug}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))

    fetch("/api/temario")
      .then(r => r.json())
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

  if (loading) return (
    <div className="flex justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
  )

  if (!data) return <div className="py-20 text-center text-slate-500">Tema no encontrado</div>

  const currentIndex = allTopics.findIndex(t => t.slug === slug)
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null

  return (
    <div className="animate-fade-in">
      <nav className="mb-4 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <Link href="/temario" className="hover:text-blue-600">Temario</Link>
        <span>/</span>
        <Link href={`/temario/${subjectSlug}`} className="hover:text-blue-600">{data.module?.subject?.name}</Link>
        <span>/</span>
        <span className="text-slate-800">{data.name}</span>
      </nav>

      <div className="mb-6 rounded-xl border border-slate-200 bg-gradient-to-br from-blue-50 to-white p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-100">
            <BookOpen className="h-7 w-7 text-blue-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900">{data.name}</h1>
            <p className="mt-1 text-slate-500">
              {data.module?.name} &middot; {data.module?.subject?.name}
            </p>
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none rounded-xl border border-slate-200 bg-white p-6 prose-headings:font-bold prose-headings:text-slate-800 prose-p:text-slate-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-800 prose-ul:list-disc prose-li:marker:text-slate-300">
        <ReactMarkdown
          components={{
            a: ({ href, children }) => {
              if (href?.includes("youtube") || href?.includes("youtu.be")) {
                return (
                  <div className="my-2">
                    <YouTubeEmbed url={href} />
                  </div>
                )
              }
              return (
                <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
                  {children} <ExternalLink className="h-3 w-3 shrink-0" />
                </a>
              )
            },
            img: ({ src, alt }) => (
              <img src={src} alt={alt || ""} className="rounded-xl" loading="lazy" />
            ),
          }}
        >
          {data.content || "*Contenido en preparación*"}
        </ReactMarkdown>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        {prevTopic ? (
          <Link
            href={`/temario/${prevTopic.subjectSlug}/${prevTopic.slug}`}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
          >
            <ChevronLeft className="h-4 w-4" />
            {prevTopic.name}
          </Link>
        ) : <div />}
        {nextTopic ? (
          <Link
            href={`/temario/${nextTopic.subjectSlug}/${nextTopic.slug}`}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
          >
            {nextTopic.name}
            <ChevronRight className="h-4 w-4" />
          </Link>
        ) : <div />}
      </div>

      <Link
        href={`/quiz?subject=${subjectSlug}`}
        className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        Practicar quiz de esta materia &rarr;
      </Link>
    </div>
  )
}
