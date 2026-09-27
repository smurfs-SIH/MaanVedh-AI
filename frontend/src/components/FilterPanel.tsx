type FilterPanelProps = {
  industry: string
  category: string
  status: string
  industryOptions: string[]
  categoryOptions: string[]
  statusOptions: string[]
  onIndustryChange: (value: string) => void
  onCategoryChange: (value: string) => void
  onStatusChange: (value: string) => void
}

export function FilterPanel({
  industry,
  category,
  status,
  industryOptions,
  categoryOptions,
  statusOptions,
  onIndustryChange,
  onCategoryChange,
  onStatusChange,
}: FilterPanelProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Filters</h3>

      <div className="mt-4 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Industry</span>
          <select value={industry} onChange={(event) => onIndustryChange(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100">
            {industryOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Category</span>
          <select value={category} onChange={(event) => onCategoryChange(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100">
            {categoryOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Status</span>
          <select value={status} onChange={(event) => onStatusChange(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100">
            {statusOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}
