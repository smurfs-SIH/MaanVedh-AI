import { ArrowRight, BadgeCheck, CircleHelp, FileCheck2, FlaskConical, Languages, Search, ShieldCheck, Sparkles } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { EvidenceCard, SearchBar, SectionHeading } from '../components/Common'

const actions = [
  { icon: Search, title: 'Find Standards', copy: 'Explore Indian Standards by product or industry.', to: '/standards', tone: 'bg-blue-50 text-blue-700' },
  { icon: FileCheck2, title: 'BIS Certification', copy: 'Understand your path to product certification.', to: '/certification', tone: 'bg-emerald-50 text-emerald-700' },
  { icon: FlaskConical, title: 'Testing Labs', copy: 'Find recognized testing capability near you.', to: '/labs', tone: 'bg-amber-50 text-amber-700' },
  { icon: BadgeCheck, title: 'Hallmarking', copy: 'Learn the hallmarking process with clarity.', to: '/hallmarking', tone: 'bg-orange-50 text-orange-700' },
  { icon: CircleHelp, title: 'Consumer Guide', copy: 'Make better, safer product choices.', to: '/chat', tone: 'bg-violet-50 text-violet-700' },
  { icon: Languages, title: 'Multilingual Help', copy: 'Simple guidance for every user.', to: '/chat', tone: 'bg-teal-50 text-teal-700' },
]
const steps = [['01', 'Ask', 'Describe your product, question, or compliance concern.'], ['02', 'Verify', 'PraMaan AI matches it with trusted source evidence.'], ['03', 'Understand', 'Get clear requirements without regulatory jargon.'], ['04', 'Act', 'Move directly to standards, certification, labs, or sources.']]

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const ask = () => navigate(`/chat${query ? `?q=${encodeURIComponent(query)}` : ''}`)
  return <>
    <section className="hero-wash paper-grid border-b border-slate-200/70"><div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="max-w-3xl"><div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/85 px-3 py-1.5 text-xs font-bold uppercase tracking-[.13em] text-blue-700 shadow-sm"><Sparkles size={14} /> SIH 2026 · Problem 26107</div>
      <p className="mt-8 text-lg font-bold text-blue-700">PraMaan AI</p><h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">Your Intelligent Assistant for Indian Standards &amp; BIS</h1><p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">Ask questions. Find standards. Understand BIS requirements. Navigate your compliance journey with source-aware AI guidance.</p>
      <div className="mt-8 max-w-2xl"><SearchBar value={query} onChange={setQuery} onAction={ask} actionLabel="Ask PraMaan AI" placeholder="Ask anything about Indian Standards..." /></div><p className="mt-3 text-xs text-slate-500">Try: "Which standard applies to packaged drinking water?"</p></div>
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{actions.map(({ icon: Icon, title, copy, to, tone }) => <Link key={title} to={to} className="lift group rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm"><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}><Icon size={19} /></div><div className="mt-4 flex items-center justify-between gap-3"><h2 className="font-bold text-slate-900">{title}</h2><ArrowRight className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" size={18} /></div><p className="mt-1.5 text-sm leading-5 text-slate-600">{copy}</p></Link>)}</div>
    </div></section>
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"><SectionHeading eyebrow="How it works" title="How PraMaan AI helps" copy="Designed to get users from a question to a confident next step, without blurring the line between official evidence and AI explanation." /><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{steps.map(([number, title, copy]) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5"><p className="text-sm font-bold text-orange-600">{number}</p><h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{copy}</p></article>)}</div></section>
    <section className="border-y border-slate-200 bg-slate-900"><div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_.9fr] lg:px-8"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-blue-300">Trust by design</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-white">Answers backed by authoritative BIS sources</h2><p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">PraMaan AI separates its helpful interpretation from the underlying official document references, so you can inspect the evidence behind every recommendation.</p><Link to="/sources" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-blue-200">Explore evidence &amp; sources <ArrowRight size={16} /></Link></div><EvidenceCard /></div></section>
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600"><ShieldCheck className="mt-0.5 shrink-0 text-emerald-600" size={19} /><p>PraMaan AI simplifies standards information. Always refer to official BIS documents for regulatory decisions.</p></div></section>
  </>
}
