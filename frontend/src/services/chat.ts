export type ChatMessage = {
  id: string
  sender: 'user' | 'ai'
  text: string
  standard?: Standard
  citations?: string[]
  sources?: Source[]
}

export type Standard = {
  id: string
  code: string
  title: string
  category?: string
  industry?: string
  status?: string
  year?: number
  scope?: string
  overview?: string
  requirements?: string[]
}

export type Source = {
  title: string
  source_name: string
  source_url: string | null
  page_number: number | null
  similarity: number
}

export type ChatResponse = {
  answer: string
  sources: Source[]
}

export const suggestedQuestions = [
  'Which BIS standard applies to packaged drinking water?',
  'What documents are needed for BIS certification?',
  'How do I find a recognized testing laboratory near me?',
  'What is the hallmarking process for jewellery?',
]

export const initialMessages: ChatMessage[] = [
  {
    id: 'welcome',
    sender: 'ai',
    text:
      'Hello! I can help you understand Indian Standards, BIS certification, testing labs, and hallmarking requirements. Ask me anything about your product or process.',
  },
]

export async function askPraMaanAI(
  question: string
): Promise<ChatResponse> {
  const response = await fetch('http://127.0.0.1:8000/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      question,
    }),
  })

  if (!response.ok) {
    throw new Error(`Backend error: ${response.status}`)
  }

  return response.json()
}