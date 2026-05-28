import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function askGemini(question: string, context: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: { temperature: 0.7 },
    tools: [{ googleSearch: {} }] as any,
  })

  const prompt = `Eres un tutor experto en la PAES chilena. Responde la pregunta del estudiante usando el contexto del temario y buscando en internet si es necesario.

Contexto del temario:
${context.slice(0, 3000)}

Pregunta del estudiante:
${question}

Responde de forma clara, didáctica y con ejemplos cuando sea posible. Si la pregunta no está relacionada con la PAES, indícalo amablemente.`

  const result = await model.generateContent(prompt)
  return result.response.text()
}
