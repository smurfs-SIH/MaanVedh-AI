import { Check } from 'lucide-react'
import type { CertificationStep } from '../services/certification'

type CertificationStepperProps = {
  steps: CertificationStep[]
}

export function CertificationStepper({ steps }: CertificationStepperProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-7">
      {steps.map((step, index) => (
        <div key={step.title} className="relative">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                {index + 1}
              </div>
              <Check size={16} className="text-slate-400" />
            </div>
            <h4 className="text-sm font-semibold text-slate-900">{step.title}</h4>
            <p className="mt-2 text-sm leading-6 text-slate-600">{step.detail}</p>
          </div>
          {index < steps.length - 1 && (
            <div className="hidden h-px w-full bg-slate-200 xl:block" />
          )}
        </div>
      ))}
    </div>
  )
}
