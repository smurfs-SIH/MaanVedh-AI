import { ExternalLink, FileText } from 'lucide-react'

type EvidenceCardProps = {
  title: string
  clause: string
  page: string
  summary: string
  source: string
  strength: 'HIGH' | 'MEDIUM' | 'NEEDS VERIFICATION'
}

const strengthStyles = {
  HIGH: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  MEDIUM: 'border-amber-200 bg-amber-50 text-amber-700',
  'NEEDS VERIFICATION': 'border-rose-200 bg-rose-50 text-rose-700',
}

export function EvidenceCard({ title, clause, page, summary, source, strength }: EvidenceCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{clause} • {page}</p>
        </div>
        <span className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${strengthStyles[strength]}`}>
          {strength}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{summary}</p>

      <div className="mt-4 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
        <span className="font-semibold text-slate-900">Source:</span> {source}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
          <ExternalLink size={16} />
          Open Source
        </button>
        <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white">
          <FileText size={16} />
          View Standard
        </button>
      </div>
    </article>
  )
}
