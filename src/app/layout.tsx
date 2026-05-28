import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/components/Navbar"

export const metadata: Metadata = {
  title: "PAES Estudio - Prepárate para la PAES",
  description: "Plataforma de estudio interactiva para la PAES chilena",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-900">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  )
}
