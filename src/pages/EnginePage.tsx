import { useState } from 'react';
import toast from 'react-hot-toast';
import { IdeaResults } from '../components/IdeaResults';
import { QuestionWizard } from '../components/QuestionWizard';
import { generateIdeas, type ClarifyingAnswers } from '../lib/ideaEngine';
import { useAppStore } from '../store/useAppStore';

export function EnginePage() {
  const [result, setResult] = useState<ReturnType<typeof generateIdeas> | null>(null);
  const incrementProjects = useAppStore((s) => s.incrementProjects);
  const tier = useAppStore((s) => s.tier);
  const projectsCreated = useAppStore((s) => s.projectsCreated);

  const handleComplete = (answers: ClarifyingAnswers) => {
    const allowed = incrementProjects();
    if (!allowed) {
      toast.error('Free tier limit reached. Upgrade to Pro or Team for unlimited generations.');
      return;
    }
    setResult(generateIdeas(answers));
    toast.success('Ideas generated successfully.');
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">
        Current tier: <strong>{tier.toUpperCase()}</strong> • Projects generated: {projectsCreated}
      </div>
      <QuestionWizard onComplete={handleComplete} />
      {result && <IdeaResults categories={result.output} topPicks={result.topPicks} variations={result.variations} />}
    </div>
  );
}
