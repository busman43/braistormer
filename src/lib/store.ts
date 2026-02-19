import { create } from 'zustand';
import type { ArchiveAgentResult, ClarifyingAnswers, IdeaArchiveEntry, IdeaCategory } from './types';

interface BrainstormState {
  answers: Partial<ClarifyingAnswers>;
  results: IdeaCategory[];
  ideaArchive: IdeaArchiveEntry[];
  latestAgentResult: ArchiveAgentResult | null;
  setAnswer: <K extends keyof ClarifyingAnswers>(key: K, value: ClarifyingAnswers[K]) => void;
  setResults: (results: IdeaCategory[]) => void;
  appendToArchive: (entries: IdeaArchiveEntry[]) => void;
  setLatestAgentResult: (result: ArchiveAgentResult) => void;
  reset: () => void;
}

export const useBrainstormStore = create<BrainstormState>((set) => ({
  answers: {},
  results: [],
  ideaArchive: [],
  latestAgentResult: null,
  setAnswer: (key, value) => set((state) => ({ answers: { ...state.answers, [key]: value } })),
  setResults: (results) => set({ results }),
  appendToArchive: (entries) =>
    set((state) => {
      const knownIds = new Set(state.ideaArchive.map((entry) => entry.id));
      const uniqueEntries = entries.filter((entry) => !knownIds.has(entry.id));
      return { ideaArchive: [...state.ideaArchive, ...uniqueEntries] };
    }),
  setLatestAgentResult: (latestAgentResult) => set({ latestAgentResult }),
  reset: () => set({ answers: {}, results: [], latestAgentResult: null })
}));
