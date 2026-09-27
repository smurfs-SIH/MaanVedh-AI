import { useMemo, useState } from 'react'
import { LoaderCircle, MessageSquareText, SendHorizonal, Sparkles, Trash2 } from 'lucide-react'
import { buildAiResponse, initialMessages, suggestedQuestions, type ChatMessage } from '../services/chat'

export function AIChatBox() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = (customPrompt?: string) => {
    const trimmed = (customPrompt ?? query).trim()
    if (!trimmed || isLoading) return

    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, sender: 'user', text: trimmed },
    ])
    setQuery('')
    setIsLoading(true)

    window.setTimeout(() => {
      setMessages((current) => [...current, buildAiResponse(trimmed)])
      setIsLoading(false)
    }, 900)
  }

  const recentMessageCount = useMemo(() => messages.length, [messages])

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">PraMaan AI Assistant</h3>
            <p className="text-xs text-slate-500">{recentMessageCount} messages</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMessages(initialMessages)}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          <Trash2 size={15} />
          Clear chat
        </button>
      </div>

      <div className="space-y-4 p-4 sm:p-6">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-200 bg-slate-50 text-slate-700'
              }`}
            >
              <p className="text-sm leading-6">{message.text}</p>
              {message.standard && (
                <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3 text-left text-slate-700">
                  <p className="text-xs uppercase tracking-[0.1em] text-slate-500">Relevant Standard</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{message.standard.code}</p>
                  <p className="text-sm">{message.standard.title}</p>
                </div>
              )}
              {message.citations && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {message.citations.map((citation) => (
                    <span key={citation} className="rounded-full border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-600">
                      {citation}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <LoaderCircle className="animate-spin" size={16} />
              PraMaan AI is thinking...
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-slate-200 p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap gap-2">
          {suggestedQuestions.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => sendMessage(question)}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              {question}
            </button>
          ))}
        </div>

        <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2">
          <MessageSquareText className="ml-2 h-5 w-5 text-slate-400" />
          <textarea
            aria-label="Ask PraMaan AI"
            rows={1}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ask a follow-up question..."
            className="max-h-32 min-h-[48px] w-full resize-none border-0 bg-transparent px-1 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
          <button
            type="button"
            onClick={() => sendMessage()}
            disabled={isLoading}
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300"
            aria-label="Send message"
          >
            <SendHorizonal size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
