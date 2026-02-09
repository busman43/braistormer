import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { buildIdeas } from '@/lib/brainstorm';
import { useBrainstormStore } from '@/lib/store';

const outputStyles = ['Quick', 'Detailed', 'Creative', 'Practical', 'Balanced'] as const;

const schema = z.object({
  context: z.string().trim().min(8, 'Please share a bit more context.').max(500, 'Please keep context under 500 characters.'),
  constraints: z.string().trim().min(5, 'Please add at least one preference or constraint.').max(400, 'Please keep constraints under 400 characters.'),
  style: z.enum(outputStyles)
});

type FormValues = z.infer<typeof schema>;

const questions = [
  '1) What are you brainstorming for, and what outcome do you want?',
  '2) Any constraints or preferences (budget, location, online/offline, skill level, age group)?',
  '3) How should I shape the output: quick ideas, detailed plan, more creative, or more practical?'
];

export function Questionnaire() {
  const navigate = useNavigate();
  const { setAnswers, setResults } = useBrainstormStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { style: 'Balanced' }
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setAnswers(values);
      setResults(buildIdeas(values));
      toast.success('Ideas generated!');
      navigate('/results');
    } catch (error) {
      toast.error('Unable to generate ideas. Please try again.');
      console.error(error);
    }
  };

  return (
    <section className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
      <div className="mb-4 flex items-center gap-3 text-sky-300">
        <Sparkles className="h-5 w-5" />
        <h2 className="text-lg font-semibold">Answer exactly these 3 clarifying questions</h2>
      </div>

      <ul className="mb-6 list-disc space-y-2 pl-5 text-slate-300">
        {questions.map((question) => (
          <li key={question}>{question}</li>
        ))}
      </ul>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-200">Context & Purpose</label>
          <textarea {...register('context')} className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-slate-100" rows={3} />
          {errors.context && <p className="mt-1 text-sm text-rose-400">{errors.context.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-200">Constraints or Preferences</label>
          <textarea {...register('constraints')} className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-slate-100" rows={3} />
          {errors.constraints && <p className="mt-1 text-sm text-rose-400">{errors.constraints.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-200">Desired Output Style</label>
          <select {...register('style')} className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-slate-100">
            {outputStyles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-sky-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-sky-400 disabled:opacity-60"
        >
          Generate categorized ideas
        </button>
      </form>
    </section>
  );
}
