type PageHeaderProps = {
  title: string
  subtitle: string
  badge?: string
}

export function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <header className="mb-8 space-y-3">
      {badge && (
        <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
          {badge}
        </span>
      )}
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
      <p className="max-w-3xl text-base text-slate-600 sm:text-lg">{subtitle}</p>
    </header>
  )
}
