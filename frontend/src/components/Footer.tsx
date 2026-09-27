import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="text-lg font-bold text-white">PraMaan AI</div>
          <p className="mt-3 text-sm text-slate-300">
            Intelligent support for Indian Standards, BIS certification, testing labs, and reliable product compliance guidance.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li><Link to="/chat" className="hover:text-white">AI Assistant</Link></li>
            <li><Link to="/standards" className="hover:text-white">Standards</Link></li>
            <li><Link to="/certification" className="hover:text-white">Certification</Link></li>
            <li><Link to="/labs" className="hover:text-white">Labs</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">Sources</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li><Link to="/sources" className="hover:text-white">Evidence & Sources</Link></li>
            <li><Link to="/hallmarking" className="hover:text-white">Hallmarking</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-400">Disclaimer</h3>
          <p className="mt-4 text-sm text-slate-300">
            PraMaan AI simplifies standards information. Always refer to official BIS documents for regulatory decisions.
          </p>
        </div>
      </div>
    </footer>
  )
}
