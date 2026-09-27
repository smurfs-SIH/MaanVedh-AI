import { useMemo, useState } from 'react'
import { ArrowRight, ExternalLink, MessageSquareText } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { SourceCitation } from '../components/SourceCitation'
import { StatusBadge } from '../components/StatusBadge'
import { getStandardById, standards } from '../services/standards'

const tabs = ['Overview', 'Scope', 'Requirements', 'Related Standards'] as const

export function StandardDetailPage() {
  const { id } = useParams()
  const standard = useMemo(() => getStandardById(id ?? ''), [id])
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Overview')

  if (!standard) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Standard not found</h2>
        <p className="mt-2 text-slate-600">Try searching the standards explorer for a matching Indian Standard.</p>
      </div>
    )
  }

  const relatedStandards = standards.filter((item) => standard.relatedIds.includes(item.id))

  return (
    <div className="pb-16">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Standards', to: '/standards' }, { label: standard.code }]} />

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={standard.status} />
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">{standard.year}</span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">{standard.category}</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold text-slate-900 sm:text-4xl">{standard.code}</h1>
            <p className="mt-2 text-xl font-medium text-slate-700">{standard.title}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button type="button" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700">
              <ExternalLink size={16} />
              View Evidence
            </button>
            <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white">
              <MessageSquareText size={16} />
              Ask PraMaan AI
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <div className="flex min-w-max gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-8">
          {activeTab === 'Overview' && (
            <section>
              <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{standard.overview}</p>
            </section>
          )}

          {activeTab === 'Scope' && (
            <section>
              <h2 className="text-xl font-semibold text-slate-900">Scope</h2>
              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">{standard.scope}</p>
            </section>
          )}

          {activeTab === 'Requirements' && (
            <section>
              <h2 className="text-xl font-semibold text-slate-900">Key requirements</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {standard.requirements.map((requirement, index) => (
                  <div key={requirement} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-slate-700">{requirement}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'Related Standards' && (
            <section>
              <h2 className="text-xl font-semibold text-slate-900">Related Standards</h2>
              <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {relatedStandards.map((item) => (
                  <Link key={item.id} to={`/standards/${item.id}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50">
                    <p className="text-sm font-semibold text-slate-900">{item.code}</p>
                    <p className="mt-2 text-sm text-slate-700">{item.title}</p>
                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-700">
                      View standard <ArrowRight size={14} />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="text-lg font-semibold text-slate-900">Source</h3>
          <p className="mt-3 text-sm text-slate-600">{standard.source.name}</p>
          <p className="mt-1 text-base font-medium text-slate-900">{standard.code}</p>
          <p className="mt-2 text-sm text-slate-600">{standard.source.clause} • {standard.source.page}</p>
          <SourceCitation citations={['[1] BIS', '[2] IS 14543', '[3] Official Source']} />
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white">View Official Source</button>
            <button type="button" className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">
              Ask PraMaan AI about this standard
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
