import { Search } from 'lucide-react'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder: string
  onSubmit?: () => void
}

export function SearchBar({ value, onChange, placeholder, onSubmit }: SearchBarProps) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm ring-0 transition focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100">
      <Search className="ml-2 h-5 w-5 text-slate-400" />
      <input
        aria-label="Search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && onSubmit) onSubmit()
        }}
        placeholder={placeholder}
        className="w-full border-0 bg-transparent px-1 py-3 text-base text-slate-900 outline-none placeholder:text-slate-400"
      />
      {onSubmit && (
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Search
        </button>
      )}
    </div>
  )
}
