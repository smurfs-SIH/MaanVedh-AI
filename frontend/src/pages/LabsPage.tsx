import { MapPin } from 'lucide-react'
import { LabCard } from '../components/LabCard'
import { PageHeader } from '../components/PageHeader'
import { laboratories } from '../services/laboratories'

export function LabsPage() {
  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        badge="Labs"
        title="BIS Laboratory Finder"
        subtitle="Find a laboratory for your testing requirements."
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 lg:grid-cols-3">
          <input placeholder="Product / Test" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100" />
          <input placeholder="Location" className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100" />
          <button type="button" className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white">Filter Labs</button>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {laboratories.map((lab) => (
          <LabCard key={lab.id} lab={lab} />
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
          <MapPin size={16} />
          Future map integration
        </div>
        <p className="mt-2 text-sm text-slate-600">The structure is ready for map-based discovery, directional search, and capability overlays as the product evolves.</p>
      </div>
    </div>
  )
}
