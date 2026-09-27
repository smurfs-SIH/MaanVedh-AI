import { Award, CheckCircle2, Landmark, ShieldCheck } from 'lucide-react'
import { HallmarkInfoCard } from '../components/HallmarkInfoCard'
import { PageHeader } from '../components/PageHeader'

const hallmarkCards = [
  {
    title: 'What is Hallmarking?',
    description: 'Hallmarking is a certification process that verifies the purity and authenticity of precious metal jewellery.',
    icon: <Award size={20} />,
  },
  {
    title: 'Hallmarking Process',
    description: 'Jewellery is assessed, stamped, and checked by recognized centres before it is allowed for sale.',
    icon: <CheckCircle2 size={20} />,
  },
  {
    title: 'Find Hallmarking Centre',
    description: 'Consumers and manufacturers can identify approved hallmarking centres for testing and approval.',
    icon: <Landmark size={20} />, 
  },
]

export function HallmarkingPage() {
  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        badge="Hallmarking"
        title="BIS Hallmarking"
        subtitle="Understand hallmarking requirements and processes."
      />

      <div className="grid gap-5 md:grid-cols-3">
        {hallmarkCards.map((card) => (
          <HallmarkInfoCard key={card.title} {...card} />
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h3 className="text-xl font-semibold text-slate-900">How hallmarking works</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            'Jewellery is submitted for testing',
            'Purity and composition are checked',
            'Approved hallmark is applied',
            'Consumer confidence is assured',
          ].map((item, index) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-sm font-semibold text-amber-700">
                {index + 1}
              </div>
              <p className="text-sm leading-6 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Hallmark components</h3>
            <p className="mt-2 text-sm text-slate-600">Pieces typically include a purity mark, logo, and identification details that signal trust and authenticity.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
            <ShieldCheck size={16} />
            Consumer-friendly process
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button type="button" className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white">Ask PraMaan AI</button>
      </div>
    </div>
  )
}
