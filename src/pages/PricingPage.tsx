import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_CONFIG } from '../lib/config';

export function PricingPage() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Object.entries(APP_CONFIG.plans).map(([key, plan]) => (
        <div key={key} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-lg font-semibold">{plan.label}</h2>
          <p className="text-2xl font-bold text-cyan-300">{plan.price}</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li className="flex items-center gap-2"><Check className="h-4 w-4" />Brainstorm categories</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4" />Top picks + variations</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4" />Freemium controls</li>
          </ul>
          {key !== 'free' && (
            <Link to="/checkout" className="mt-4 inline-block rounded bg-cyan-500 px-3 py-2 text-sm font-medium text-slate-950">
              Upgrade to {plan.label}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
