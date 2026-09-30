import type { ReactNode } from 'react'

type HallmarkInfoCardProps = {
  title: string
  description: string
  icon: ReactNode
}

export function HallmarkInfoCard({ title, description, icon }: HallmarkInfoCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  )
}
