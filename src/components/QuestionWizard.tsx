import { useState } from 'react';
import { clarifyingQuestions, type ClarifyingAnswers } from '../lib/ideaEngine';

type Props = { onComplete: (answers: ClarifyingAnswers) => void };

export function QuestionWizard({ onComplete }: Props) {
  const [form, setForm] = useState<ClarifyingAnswers>({ context: '', constraints: '', style: '' });

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
      <h2 className="mb-3 text-lg font-semibold">Step 1: Exactly three clarifying questions</h2>
      <div className="space-y-4">
        <label className="block text-sm">
          <span>{clarifyingQuestions[0]}</span>
          <input
            className="mt-1 w-full rounded border border-slate-700 bg-slate-950 p-2"
            value={form.context}
            onChange={(e) => setForm((f) => ({ ...f, context: e.target.value }))}
          />
        </label>
        <label className="block text-sm">
          <span>{clarifyingQuestions[1]}</span>
          <input
            className="mt-1 w-full rounded border border-slate-700 bg-slate-950 p-2"
            value={form.constraints}
            onChange={(e) => setForm((f) => ({ ...f, constraints: e.target.value }))}
          />
        </label>
        <label className="block text-sm">
          <span>{clarifyingQuestions[2]}</span>
          <input
            className="mt-1 w-full rounded border border-slate-700 bg-slate-950 p-2"
            value={form.style}
            onChange={(e) => setForm((f) => ({ ...f, style: e.target.value }))}
          />
        </label>
        <button
          onClick={() => onComplete(form)}
          disabled={!form.context || !form.constraints || !form.style}
          className="rounded bg-cyan-500 px-3 py-2 text-sm font-medium text-slate-950 disabled:opacity-40"
        >
          Generate categorized ideas
        </button>
      </div>
    </section>
  );
}
