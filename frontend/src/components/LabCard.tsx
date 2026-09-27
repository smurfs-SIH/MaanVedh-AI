import { ArrowUpRight, MapPin } from 'lucide-react'
import type { Laboratory } from '../services/laboratories'
import { StatusBadge } from './StatusBadge'

type LabCardProps = {
  lab: Laboratory
}

export function LabCard({ lab }: LabCardProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{lab.name}</h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <MapPin size={16} />
            {lab.location}
          </div>
        </div>
        <StatusBadge status={lab.status} />
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{lab.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {lab.capabilities.map((capability) => (
          <span key={capability} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
            {capability}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="text-sm font-medium text-slate-500">{lab.distance ?? 'Location available'}</div>
        <div className="flex gap-2">
          <button type="button" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
            View Details
          </button>
          <button type="button" className="inline-flex items-center gap-1 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white">
            Get Directions <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </article>
  )
}
