import { useState } from 'react'
import { Menu, X, Sparkles } from 'lucide-react'
import { NavLink, Link } from 'react-router-dom'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'AI Assistant', to: '/chat' },
  { label: 'Standards', to: '/standards' },
  { label: 'Certification', to: '/certification' },
  { label: 'Labs', to: '/labs' },
  { label: 'Hallmarking', to: '/hallmarking' },
  { label: 'Sources', to: '/sources' },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="MaanVedh-AI home">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-200">
            <Sparkles size={18} />
          </div>
          <div>
            <div className="text-lg font-bold text-slate-900">MaanVedh-AI</div>
          </div>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link to="/chat" className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100">
            Ask MaanVedh-AI
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-3 text-base font-medium transition ${
                    isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/chat"
              onClick={() => setMobileOpen(false)}
              className="mt-2 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-md shadow-blue-200"
            >
              Ask MaanVedh-AI
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
