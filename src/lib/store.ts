import { create } from 'zustand';
import type { ClarifyingAnswers, IdeaCategory } from './types';

interface BrainstormState {
  answers: Partial<ClarifyingAnswers>;
  results: IdeaCategory[];
  setAnswer: <K extends keyof ClarifyingAnswers>(key: K, value: ClarifyingAnswers[K]) => void;
  setResults: (results: IdeaCategory[]) => void;
  reset: () => void;
}

export const useBrainstormStore = create<BrainstormState>((set) => ({
  answers: {},
  results: [],
  setAnswer: (key, value) => set((state) => ({ answers: { ...state.answers, [key]: value } })),
  setResults: (results) => set({ results }),
  reset: () => set({ answers: {}, results: [] })
}));
