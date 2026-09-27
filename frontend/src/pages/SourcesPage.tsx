import { PageHeader } from '../components/PageHeader'
import { EvidenceCard } from '../components/EvidenceCard'

type EvidenceItem = {
  title: string
  clause: string
  page: string
  summary: string
  source: string
  strength: 'HIGH' | 'MEDIUM' | 'NEEDS VERIFICATION'
}

export function SourcesPage() {
  const evidenceItems: EvidenceItem[] = [
    {
      title: 'IS 14543:2024',
      clause: 'Clause 4.2',
      page: 'Page 12',
      summary: 'Packaged drinking water compliance requires source protection, treatment validation, and labeling accuracy.',
      source: 'BIS',
      strength: 'HIGH',
    },
    {
      title: 'BIS Certification Scheme',
      clause: 'Application Steps',
      page: 'Document 2',
      summary: 'The certification flow includes technical review, testing, and official review before approval.',
      source: 'BIS',
      strength: 'MEDIUM',
    },
    {
      title: 'Testing Directory',
      clause: 'Recognized Labs',
      page: 'Directory 7',
      summary: 'Recognized laboratories provide capability information for water, chemical, and microbiological assessments.',
      source: 'BIS',
      strength: 'NEEDS VERIFICATION',
    },
  ]

  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        badge="Sources"
        title="Evidence & Sources"
        subtitle="Answer backed by: official reference material and traceable standards context."
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-lg text-slate-700">Answer backed by:</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {evidenceItems.map((item) => (
            <EvidenceCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}
