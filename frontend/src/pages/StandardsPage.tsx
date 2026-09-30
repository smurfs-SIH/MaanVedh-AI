import { useMemo, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { FilterPanel } from '../components/FilterPanel'
import { LoadingSkeleton } from '../components/LoadingSkeleton'
import { PageHeader } from '../components/PageHeader'
import { SearchBar } from '../components/SearchBar'
import { StandardCard } from '../components/StandardCard'
import { EmptyState } from '../components/EmptyState'
import { industryFilters, searchStandards, standardCategories, statusFilters } from '../services/standards'

export function StandardsPage() {
  const [query, setQuery] = useState('')
  const [industry, setIndustry] = useState('All')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const [isLoading, setIsLoading] = useState(false)

  const filteredStandards = useMemo(
    () => searchStandards(query, industry, category, status),
    [query, industry, category, status],
  )

  const handleSearch = () => {
    setIsLoading(true)
    window.setTimeout(() => setIsLoading(false), 700)
  }

  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        badge="Standards"
        title="Indian Standards Explorer"
        subtitle="Search and explore Indian Standards relevant to your product or industry."
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={handleSearch}
          placeholder="Search by product, standard number or keyword"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[260px_1fr]">
        <div className="xl:block">
          <div className="hidden xl:block">
            <FilterPanel
              industry={industry}
              category={category}
              status={status}
              industryOptions={industryFilters}
              categoryOptions={standardCategories}
              statusOptions={statusFilters}
              onIndustryChange={setIndustry}
              onCategoryChange={setCategory}
              onStatusChange={setStatus}
            />
          </div>

          <div className="xl:hidden">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <SlidersHorizontal size={16} />
                Filters
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                <select value={industry} onChange={(event) => setIndustry(event.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
                  {industryFilters.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
                <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
                  {standardCategories.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
                <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm">
                  {statusFilters.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          {isLoading ? (
            <LoadingSkeleton />
          ) : filteredStandards.length === 0 ? (
            <EmptyState title="No standards found" message="Try a different keyword, category, or industry filter to widen the search." />
          ) : (
            <div className="space-y-4">
              {filteredStandards.map((standard) => (
                <StandardCard key={standard.id} standard={standard} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
