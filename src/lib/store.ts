import { create } from 'zustand';
import type { ArchiveAgentReport, ClarifyingAnswers, IdeaCategory } from './types';

interface BrainstormState {
  answers: Partial<ClarifyingAnswers>;
  results: IdeaCategory[];
  archiveReport: ArchiveAgentReport | null;
  setAnswer: <K extends keyof ClarifyingAnswers>(key: K, value: ClarifyingAnswers[K]) => void;
  setResults: (results: IdeaCategory[]) => void;
  setArchiveReport: (report: ArchiveAgentReport) => void;
  reset: () => void;
}

export const useBrainstormStore = create<BrainstormState>((set) => ({
  answers: {},
  results: [],
  archiveReport: null,
  setAnswer: (key, value) => set((state) => ({ answers: { ...state.answers, [key]: value } })),
  setResults: (results) => set({ results }),
  setArchiveReport: (archiveReport) => set({ archiveReport }),
  reset: () => set({ answers: {}, results: [], archiveReport: null })
}));
