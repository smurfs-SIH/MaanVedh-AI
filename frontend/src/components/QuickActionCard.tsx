import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

type QuickActionCardProps = {
  title: string
  description: string
  icon: LucideIcon
  to: string
}

export function QuickActionCard({ title, description, icon: Icon, to }: QuickActionCardProps) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
        <Icon size={20} />
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </Link>
  )
}
