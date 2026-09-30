import { useState } from 'react'
import { Search } from 'lucide-react'
import { CertificationStepper } from '../components/CertificationStepper'
import { PageHeader } from '../components/PageHeader'
import { certificationRequirements, certificationSteps } from '../services/certification'

export function CertificationPage() {
  const [productName, setProductName] = useState('Packaged Drinking Water')
  const selectedRequirement = certificationRequirements.find((item) => item.product.toLowerCase().includes(productName.toLowerCase())) ?? certificationRequirements[0]

  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        badge="Certification"
        title="BIS Certification Guide"
        subtitle="Find the certification requirements for your product."
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center rounded-2xl border border-slate-200 bg-slate-50 p-2">
            <Search className="ml-2 h-5 w-5 text-slate-400" />
            <input
              aria-label="Enter product name"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
              placeholder="Enter product name..."
              className="w-full border-0 bg-transparent px-3 py-3 text-base text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
          <button type="button" className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500">
            Find Requirements
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <CertificationStepper steps={certificationSteps} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="text-xl font-semibold text-slate-900">Requirements</h3>

          <div className="mt-6 space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Applicable Standard</h4>
              <p className="mt-2 text-lg font-semibold text-slate-900">{selectedRequirement.applicableStandard}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Required Tests</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {selectedRequirement.requiredTests.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Documents Required</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                {selectedRequirement.documents.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="text-xl font-semibold text-slate-900">Application Process</h3>
          <ul className="mt-6 space-y-3 text-sm text-slate-700">
            {selectedRequirement.process.map((item, index) => (
              <li key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <button type="button" className="mt-6 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white">
            Ask MaanVedh-AI about this process
          </button>
        </div>
      </div>
    </div>
  )
}
