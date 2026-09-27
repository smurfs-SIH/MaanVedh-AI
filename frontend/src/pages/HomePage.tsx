import {
  ArrowRight,
  BadgeCheck,
  BookOpenText,
  Building2,
  FileBadge2,
  Globe,
  Microscope,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { QuickActionCard } from '../components/QuickActionCard'

const quickActions = [
  { title: 'Find Standards', description: 'Search relevant Indian Standards by product or need.', icon: BookOpenText, to: '/standards' },
  { title: 'BIS Certification', description: 'Understand process steps, documents, and compliance.', icon: BadgeCheck, to: '/certification' },
  { title: 'Testing Labs', description: 'Locate recognized labs for testing and certification.', icon: Microscope, to: '/labs' },
  { title: 'Hallmarking', description: 'Learn hallmarking requirements and processes.', icon: ShieldCheck, to: '/hallmarking' },
  { title: 'Consumer Guide', description: 'Understand safe, compliant products and standards.', icon: FileBadge2, to: '/sources' },
  { title: 'Multilingual Help', description: 'Get support in simple, accessible language.', icon: Globe, to: '/chat' },
]

const helpSteps = [
  { title: 'Ask', description: 'Ask a product, certification, or compliance question.', icon: Sparkles },
  { title: 'Verify', description: 'Cross-check the answer against BIS and official sources.', icon: Building2 },
  { title: 'Understand', description: 'See the exact standard, scope, and key requirements.', icon: BookOpenText },
  { title: 'Act', description: 'Take the next step with labs, certification, or sourcing.', icon: ArrowRight },
]

export function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      <section className="pt-8 lg:pt-12">
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
              <Sparkles size={14} />
              Trusted BIS guidance
            </div>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Your Intelligent Assistant for Indian Standards &amp; BIS
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-600">
              Ask questions. Find standards. Understand BIS requirements.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 items-center rounded-2xl border border-slate-200 bg-white p-2 shadow-sm ring-0 transition focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-100">
                <input
                  aria-label="Ask anything about Indian Standards"
                  placeholder="Ask anything about Indian Standards..."
                  className="w-full border-0 bg-transparent px-3 py-3 text-base text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
              <Link to="/chat" className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-500">
                Ask PraMaan AI
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {quickActions.map((action) => (
                <QuickActionCard key={action.title} {...action} />
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 p-6 text-white shadow-xl">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-200">Live query</span>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-300">
                  Verified
                </span>
              </div>
              <p className="mt-5 text-2xl font-semibold">“I manufacture packaged drinking water...”</p>
              <p className="mt-4 text-sm text-slate-300">
                PraMaan AI can identify the relevant standard, highlight the applicable certification process, and guide you to the right lab or evidence source.
              </p>

              <div className="mt-6 rounded-2xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-blue-200">Relevant standard</p>
                <p className="mt-2 text-xl font-semibold">IS 14543:2024</p>
                <p className="text-sm text-slate-200">Packaged Drinking Water</p>
              </div>

              <div className="mt-6 flex gap-3">
                <Link to="/standards/is-14543" className="flex-1 rounded-xl bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-900">
                  View Standard
                </Link>
                <Link to="/chat" className="flex-1 rounded-xl border border-white/20 bg-slate-900/60 px-4 py-2.5 text-center text-sm font-semibold text-white">
                  Ask AI
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">How PraMaan AI Helps</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">From question to confident action</h2>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {helpSteps.map((step) => (
            <div key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <step.icon size={20} />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-700">Trust &amp; evidence</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">Answers backed by authoritative BIS sources</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
            <ShieldCheck size={16} />
            High confidence output
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { title: 'IS 14543:2024', detail: 'Clause 4.2 • Page 12', status: 'Official source' },
            { title: 'BIS certification guide', detail: 'Document checklist and scheme mapping', status: 'Verified ' },
            { title: 'Recognized testing labs', detail: 'Lab capabilities and geographic coverage', status: 'Evidence-based' },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-blue-100 bg-white p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">{item.status}</p>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white/70 p-4 text-sm text-slate-600">
          PraMaan AI simplifies standards information. Always refer to official BIS documents for regulatory decisions.
        </div>
      </section>
    </div>
  )
}
