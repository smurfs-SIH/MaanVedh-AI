type SourceCitationProps = {
  citations: string[]
}

export function SourceCitation({ citations }: SourceCitationProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {citations.map((source) => (
        <span
          key={source}
          className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
        >
          {source}
        </span>
      ))}
    </div>
  )
}
