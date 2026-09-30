import { FileText, MessageSquareText, ShieldCheck } from 'lucide-react'
import { AIChatBox } from '../components/AIChatBox'
import { PageHeader } from '../components/PageHeader'

export function ChatPage() {
  return (
    <div className="space-y-8 pb-16">
      <PageHeader
        badge="AI Assistant"
        title="Ask MaanVedh-AI"
        subtitle="Get clear answers about Indian Standards, BIS processes, testing labs, and certification steps."
      />

      <div className="grid gap-8 xl:grid-cols-[1.7fr_0.8fr]">
        <AIChatBox />

        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">Verified sources</h3>
                <p className="text-sm text-slate-500">Always traceable</p>
              </div>
            </div>
            <ul className="mt-5 space-y-3 text-sm text-slate-600">
              <li>• BIS guidance and official reference materials</li>
              <li>• Standard-specific clauses and source pages</li>
              <li>• Certification and testing recommendations</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">Common use cases</h3>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="rounded-xl bg-slate-50 p-3">Packaged drinking water certification</div>
              <div className="rounded-xl bg-slate-50 p-3">Product compliance and testing</div>
              <div className="rounded-xl bg-slate-50 p-3">Hallmarking guidance for consumers</div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <MessageSquareText size={20} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900">Suggested prompts</h3>
              </div>
            </div>
            <div className="mt-5 space-y-2 text-sm text-slate-600">
              <div>Who is responsible for BIS hallmarking compliance?</div>
              <div>Which Indian Standard covers my packaging material?</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
