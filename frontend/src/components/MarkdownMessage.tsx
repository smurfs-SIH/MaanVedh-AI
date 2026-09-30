import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type MarkdownMessageProps = {
  content: string
}

export function MarkdownMessage({ content }: MarkdownMessageProps) {
  return (
    <div className="break-words text-sm leading-6 [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="my-2">{children}</p>,
          h1: ({ children }) => <h1 className="mb-2 mt-4 text-lg font-bold text-slate-900">{children}</h1>,
          h2: ({ children }) => <h2 className="mb-2 mt-4 text-base font-bold text-slate-900">{children}</h2>,
          h3: ({ children }) => <h3 className="mb-1 mt-3 font-semibold text-slate-900">{children}</h3>,
          ul: ({ children }) => <ul className="my-2 list-disc space-y-1 pl-5 marker:text-slate-500">{children}</ul>,
          ol: ({ children }) => <ol className="my-2 list-decimal space-y-1 pl-5 marker:text-slate-500">{children}</ol>,
          li: ({ children }) => <li className="pl-1">{children}</li>,
          blockquote: ({ children }) => <blockquote className="my-3 border-l-2 border-blue-300 pl-3 text-slate-600">{children}</blockquote>,
          a: ({ children, ...props }) => <a {...props} target="_blank" rel="noreferrer" className="font-medium text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-800">{children}</a>,
          code: ({ children, className }) => <code className={`${className ? 'font-mono text-inherit' : 'rounded bg-slate-200 px-1 py-0.5 font-mono text-[0.9em]'}`}>{children}</code>,
          pre: ({ children }) => <pre className="my-3 overflow-x-auto rounded-lg bg-slate-900 p-3 text-slate-100">{children}</pre>,
          table: ({ children }) => <table className="my-3 block w-full overflow-x-auto border-collapse text-left text-sm">{children}</table>,
          th: ({ children }) => <th className="border border-slate-200 bg-slate-100 px-3 py-2 font-semibold">{children}</th>,
          td: ({ children }) => <td className="border border-slate-200 px-3 py-2">{children}</td>,
          hr: () => <hr className="my-3 border-slate-200" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}