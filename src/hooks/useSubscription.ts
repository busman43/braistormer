import { useAppStore, type Tier } from '../store/useAppStore';

export function useSubscription() {
  const tier = useAppStore((s) => s.tier);
  const projectsCreated = useAppStore((s) => s.projectsCreated);
  const setTier = useAppStore((s) => s.setTier);

  const canCreateProject = tier !== 'free' || projectsCreated < 3;

  const upgrade = (nextTier: Tier) => {
    setTier(nextTier);
  };

  return { tier, projectsCreated, canCreateProject, upgrade };
}
