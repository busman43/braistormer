import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { APP_CONFIG } from '../lib/config';

export type Tier = 'free' | 'pro' | 'team';

type AppState = {
  tier: Tier;
  projectsCreated: number;
  answersComplete: boolean;
  setTier: (tier: Tier) => void;
  incrementProjects: () => boolean;
  setAnswersComplete: (value: boolean) => void;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      tier: 'free',
      projectsCreated: 0,
      answersComplete: false,
      setTier: (tier) => set({ tier }),
      incrementProjects: () => {
        const state = get();
        if (state.tier === 'free' && state.projectsCreated >= APP_CONFIG.freeLimit) {
          return false;
        }
        set({ projectsCreated: state.projectsCreated + 1 });
        return true;
      },
      setAnswersComplete: (value) => set({ answersComplete: value }),
    }),
    { name: 'brainstormer-store' }
  )
);
