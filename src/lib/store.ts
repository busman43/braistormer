import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ClarifyingAnswers, IdeaCategory } from './types';

interface BrainstormState {
  answers: Partial<ClarifyingAnswers>;
  results: IdeaCategory[];
  setAnswers: (answers: ClarifyingAnswers) => void;
  setResults: (results: IdeaCategory[]) => void;
  reset: () => void;
}

export const useBrainstormStore = create<BrainstormState>()(
  persist(
    (set) => ({
      answers: {},
      results: [],
      setAnswers: (answers) => set({ answers }),
      setResults: (results) => set({ results }),
      reset: () => set({ answers: {}, results: [] })
    }),
    { name: 'brainstorm-store-v1', partialize: (state) => ({ answers: state.answers, results: state.results }) }
  )
);
