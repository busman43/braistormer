import type { IdeaCategory, IdeaItem } from '../lib/ideaEngine';

export function IdeaResults({ categories, topPicks, variations }: { categories: IdeaCategory[]; topPicks: IdeaItem[]; variations: string[] }) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">⭐ Top Picks</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
          {topPicks.map((item) => (
            <li key={item.title}><strong>{item.title}:</strong> {item.description}</li>
          ))}
        </ul>
      </div>

      {categories.map((category) => (
        <div key={category.name}>
          <h3 className="text-base font-semibold text-cyan-300">{category.name}</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {category.ideas.map((idea) => (
              <li key={idea.title} className="rounded border border-slate-800 bg-slate-900 p-2">
                <strong>{idea.title}</strong> — {idea.description}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div>
        <h2 className="text-lg font-semibold">💡 Variations</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-200">
          {variations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <p className="rounded border border-cyan-700/30 bg-cyan-900/20 p-3 text-sm">🔁 Want this turned into a plan/checklist? Generate again with "detailed execution plan" in answer #3.</p>
    </section>
  );
}
