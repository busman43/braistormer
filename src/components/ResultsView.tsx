import { ArrowLeft, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBrainstormStore } from '@/lib/store';

export function ResultsView() {
  const { results, reset } = useBrainstormStore();

  if (!results.length) {
    return (
      <section className="mx-auto max-w-2xl rounded-xl border border-slate-800 bg-slate-900 p-6 text-slate-200">
        <p>No ideas yet. Please answer all three questions first.</p>
        <Link className="mt-4 inline-flex items-center text-sky-400" to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to questions
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-4">
        <Link className="inline-flex items-center text-sky-400" to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Re-run questions
        </Link>
        <button className="text-sm text-rose-300 hover:text-rose-200" onClick={reset}>
          Reset all
        </button>
      </div>

      {results.map((category) => (
        <article key={category.name} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-bold text-sky-300">{category.name}</h2>
          <ul className="mt-4 space-y-2 text-slate-200">
            {category.ideas.map((idea) => (
              <li key={idea.title}>
                <span className="font-semibold">• {idea.title}:</span> {idea.description}
              </li>
            ))}
          </ul>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-slate-950/70 p-3">
              <p className="mb-2 font-semibold text-amber-300">⭐ Top Picks</p>
              <ul className="space-y-1 text-sm text-slate-300">
                {category.topPicks.map((pick) => (
                  <li key={pick} className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5" /> {pick}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-slate-950/70 p-3 md:col-span-2">
              <p className="mb-2 font-semibold text-emerald-300">💡 Variations</p>
              <ul className="space-y-1 text-sm text-slate-300">
                {category.variations.map((variation) => (
                  <li key={variation}>• {variation}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-sky-300">🔁 {category.followUp}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
