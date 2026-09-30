type StatusBadgeProps = {
  status: string
}

const styles: Record<string, string> = {
  Active: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  Revised: 'border-amber-200 bg-amber-50 text-amber-700',
  Draft: 'border-slate-200 bg-slate-100 text-slate-600',
  'BIS Recognized': 'border-blue-200 bg-blue-50 text-blue-700',
  'Testing Available': 'border-violet-200 bg-violet-50 text-violet-700',
  Priority: 'border-rose-200 bg-rose-50 text-rose-700',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${styles[status] ?? 'border-slate-200 bg-slate-100 text-slate-700'}`}
    >
      {status}
    </span>
  )
}
