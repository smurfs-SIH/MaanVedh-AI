import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

type BreadcrumbsProps = {
  items: Array<{ label: string; to?: string }>
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
      {items.map((item, index) => (
        <div key={item.label} className="flex items-center gap-2">
          {item.to ? (
            <Link to={item.to} className="transition hover:text-blue-700">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
          {index < items.length - 1 && <ChevronRight size={14} />}
        </div>
      ))}
    </nav>
  )
}
