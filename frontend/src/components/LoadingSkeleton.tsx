export function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="h-4 w-24 rounded-full bg-slate-200" />
          <div className="mt-3 h-6 w-2/3 rounded-lg bg-slate-200" />
          <div className="mt-3 h-4 w-full rounded bg-slate-200" />
          <div className="mt-2 h-4 w-5/6 rounded bg-slate-200" />
          <div className="mt-4 flex gap-2">
            <div className="h-8 w-28 rounded-xl bg-slate-200" />
            <div className="h-8 w-28 rounded-xl bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  )
}
