import { Brain, CreditCard, Sparkles } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { APP_CONFIG } from '../lib/config';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Brain className="h-5 w-5 text-cyan-400" /> {APP_CONFIG.name}
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/" className="hover:text-cyan-300">Engine</NavLink>
            <NavLink to="/pricing" className="hover:text-cyan-300">Pricing</NavLink>
            <NavLink to="/checkout" className="hover:text-cyan-300">Checkout</NavLink>
            <span className="inline-flex items-center gap-1 rounded bg-slate-800 px-2 py-1 text-xs">
              <Sparkles className="h-3 w-3" /> AI ready
            </span>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      <footer className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-6 text-xs text-slate-400">
        <CreditCard className="h-3 w-3" /> Free (3 projects) → Pro → Team subscription built-in
      </footer>
    </div>
  );
}
