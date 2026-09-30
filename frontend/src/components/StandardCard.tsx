import { ArrowUpRight, FileText, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Standard } from '../services/standards'
import { StatusBadge } from './StatusBadge'

type StandardCardProps = {
  standard: Standard
}

export function StandardCard({ standard }: StandardCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <StatusBadge status={standard.status} />
            <span className="text-xs font-medium uppercase tracking-[0.1em] text-slate-500">{standard.year}</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900">{standard.code}</h3>
          <p className="mt-1 text-lg font-medium text-slate-700">{standard.title}</p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{standard.scope}</p>

      <div className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-slate-500">
        <span>{standard.category}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        <span>{standard.industry}</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Link
          to={`/standards/${standard.id}`}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        >
          <FileText size={16} />
          View Standard
        </Link>
        <Link
          to="/chat"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          <MessageSquare size={16} />
          Ask MaanVedh-AI
        </Link>
      </div>

      <div className="mt-4 flex items-center justify-end text-sm font-medium text-blue-700">
        <Link to={`/standards/${standard.id}`} className="inline-flex items-center gap-1">
          View details <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  )
}
