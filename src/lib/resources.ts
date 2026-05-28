export interface VideoResource {
  title: string
  videoId: string
  url: string
}

export interface LinkResource {
  title: string
  url: string
}

export interface ExtractedResources {
  videos: VideoResource[]
  links: LinkResource[]
  content: string
}

const VIDEO_SECTION = /###\s*[📺]?\s*Videos recomendados?\s*\n([\s\S]*?)(?=\n###\s|$)/i
const LINK_SECTION = /###\s*[🔗]?\s*Enlaces útiles?\s*\n([\s\S]*?)(?=\n###\s|$)/i

function parseVideoLine(line: string): VideoResource | null {
  const trimmed = line.trim().replace(/^[-*]\s*/, "")
  if (!trimmed.startsWith("[")) return null
  const match = trimmed.match(/\[([^\]]+)\]\(((?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[^\s)]+)\)/)
  if (!match) return null
  const videoId = match[2].match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/)?.[1]
  if (!videoId) return null
  return { title: match[1], videoId, url: match[2] }
}

function parseLinkLine(line: string): LinkResource | null {
  const trimmed = line.trim().replace(/^[-*]\s*/, "")
  if (!trimmed.startsWith("[")) return null
  const match = trimmed.match(/\[([^\]]+)\]\(((?:https?:\/\/)?[^\s)]+)\)/)
  if (!match) return null
  return { title: match[1], url: match[2] }
}

export function extractResources(content: string): ExtractedResources {
  let remaining = content

  const videos: VideoResource[] = []
  const videoMatch = content.match(VIDEO_SECTION)
  if (videoMatch) {
    const lines = videoMatch[1].split("\n")
    for (const line of lines) {
      const v = parseVideoLine(line)
      if (v) videos.push(v)
    }
    remaining = remaining.replace(videoMatch[0], "")
  }

  const links: LinkResource[] = []
  const linkMatch = remaining.match(LINK_SECTION)
  if (linkMatch) {
    const lines = linkMatch[1].split("\n")
    for (const line of lines) {
      const l = parseLinkLine(line)
      if (l) links.push(l)
    }
    remaining = remaining.replace(linkMatch[0], "")
  }

  return { videos, links, content: remaining.trim() }
}
