"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import { BookOpen, ExternalLink, ChevronLeft, ChevronRight, Film, Globe, Brain } from "lucide-react"
import { extractResources, type VideoResource, type LinkResource } from "@/lib/resources"

function VideoCard({ video }: { video: VideoResource }) {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:shadow-lg hover:-translate-y-0.5"
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
            <svg viewBox="0 0 24 24" fill="white" className="h-6 w-6 ml-0.5">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="p-3">
        <h4 className="line-clamp-2 text-sm font-medium text-slate-800 group-hover:text-blue-600">
          {video.title}
        </h4>
      </div>
    </a>
  )
}

function LinkCard({ link }: { link: LinkResource }) {
  const domain = link.url.replace(/^https?:\/\//, "").split("/")[0]

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:shadow-md hover:-translate-y-0.5"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
        <Globe className="h-5 w-5 text-blue-600" />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="text-sm font-medium text-slate-800 group-hover:text-blue-600">
          {link.title}
        </h4>
        <p className="mt-0.5 truncate text-xs text-slate-400">{domain}</p>
      </div>
      <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-slate-300 group-hover:text-blue-500" />
    </a>
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

  const { videos, links, content } = extractResources(data.content || "")

  const currentIndex = allTopics.findIndex(t => t.slug === slug)
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null

  return (
    <div className="animate-fade-in mx-auto max-w-4xl">
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-400">
        <Link href="/temario" className="hover:text-blue-600 transition-colors">Temario</Link>
        <span className="text-slate-300">/</span>
        {data.module?.subject && (
          <>
            <Link href={`/temario/${subjectSlug}`} className="hover:text-blue-600 transition-colors">
              {data.module.subject.name}
            </Link>
            <span className="text-slate-300">/</span>
          </>
        )}
        <span className="text-slate-700 font-medium">{data.name}</span>
      </nav>

      <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-8 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur">
            <BookOpen className="h-6 w-6 text-blue-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{data.name}</h1>
            {data.module && (
              <p className="mt-1 text-sm text-slate-300">
                {data.module.name}
                {data.module.subject && <span> &middot; {data.module.subject.name}</span>}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="prose prose-slate max-w-none prose-headings:mt-8 prose-headings:mb-4 prose-headings:font-bold prose-headings:text-slate-800 prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed prose-p:text-slate-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-800 prose-code:rounded-md prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-slate-800 prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:text-sm prose-ul:list-disc prose-li:marker:text-slate-300">
            <ReactMarkdown
              components={{
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
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
        </div>

        {videos.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
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
          </div>
        )}

        {links.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
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
          </div>
        )}

        <div className="flex items-center justify-between gap-4">
          {prevTopic ? (
            <Link
              href={`/temario/${prevTopic.subjectSlug}/${prevTopic.slug}`}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{prevTopic.name}</span>
              <span className="sm:hidden">Anterior</span>
            </Link>
          ) : <div />}
          {nextTopic ? (
            <Link
              href={`/temario/${nextTopic.subjectSlug}/${nextTopic.slug}`}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:text-blue-700"
            >
              <span className="hidden sm:inline">{nextTopic.name}</span>
              <span className="sm:hidden">Siguiente</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : <div />}
        </div>

        <Link
          href={`/quiz?subject=${subjectSlug}`}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-3.5 font-medium text-white shadow-md transition hover:from-blue-700 hover:to-blue-800 hover:shadow-lg"
        >
          <Brain className="h-5 w-5" />
          Practicar quiz de esta materia
        </Link>
      </div>
    </div>
  )
}
