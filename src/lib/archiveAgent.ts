import type {
  ArchiveAgentReport,
  ArchivedIdeaItem,
  ClarifyingAnswers,
  IdeaArchiveSuggestion,
  IdeaCategory,
  IdeaItem
} from './types';

const STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'the',
  'for',
  'with',
  'in',
  'on',
  'to',
  'of',
  'or',
  'by',
  'from',
  'around',
  'into',
  'through',
  'at',
  'is',
  'this',
  'that',
  'your',
  'you'
]);

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function buildFingerprint(idea: IdeaItem): string {
  const tokens = new Set([...tokenize(idea.title), ...tokenize(idea.description)]);
  return [...tokens].sort().join('|');
}

function similarity(a: string, b: string): number {
  const aSet = new Set(a.split('|').filter(Boolean));
  const bSet = new Set(b.split('|').filter(Boolean));

  if (!aSet.size || !bSet.size) return 0;

  let intersection = 0;
  aSet.forEach((token) => {
    if (bSet.has(token)) intersection += 1;
  });

  const union = new Set([...aSet, ...bSet]).size;
  return union === 0 ? 0 : intersection / union;
}

function scopeCategories(answers: ClarifyingAnswers, categories: IdeaCategory[]): string[] {
  const context = `${answers.context} ${answers.constraints}`.toLowerCase();

  const scored = categories
    .map((category) => {
      const categoryTokens = tokenize(category.name);
      const tokenHits = categoryTokens.reduce((count, token) => count + Number(context.includes(token)), 0);
      const styleBoost = answers.style === 'Creative' && /fun|games|online/i.test(category.name) ? 1 : 0;
      return { name: category.name, score: tokenHits + styleBoost };
    })
    .sort((a, b) => b.score - a.score);

  const topScoped = scored.filter((entry) => entry.score > 0).slice(0, 2).map((entry) => entry.name);
  return topScoped.length ? topScoped : scored.slice(0, 2).map((entry) => entry.name);
}

export function collectArchivedIdeas(categories: IdeaCategory[]): ArchivedIdeaItem[] {
  return categories.flatMap((category) =>
    category.ideas.map((idea) => ({
      ...idea,
      category: category.name,
      fingerprint: buildFingerprint(idea)
    }))
  );
}

export function retrieveUniqueIdeaSuggestions(params: {
  answers: ClarifyingAnswers;
  existingArchive: ArchivedIdeaItem[];
  freshResults: IdeaCategory[];
}): ArchiveAgentReport {
  const { answers, existingArchive, freshResults } = params;
  const scopedBy = scopeCategories(answers, freshResults);
  const scopedIdeas = freshResults.filter((category) => scopedBy.includes(category.name)).flatMap((category) => category.ideas.map((idea) => ({ ...idea, category: category.name })));

  const suggestions: IdeaArchiveSuggestion[] = [];

  scopedIdeas.forEach((candidate) => {
    const candidateFingerprint = buildFingerprint(candidate);
    const duplicateScore = existingArchive.reduce((max, archived) => Math.max(max, similarity(candidateFingerprint, archived.fingerprint)), 0);
    const noveltyScore = Math.max(0, Number((1 - duplicateScore).toFixed(2)));

    if (noveltyScore >= 0.45) {
      suggestions.push({
        title: candidate.title,
        description: candidate.description,
        category: candidate.category,
        noveltyScore,
        whyItIsUnique:
          noveltyScore > 0.75
            ? 'Low overlap with archived concepts.'
            : 'Moderate overlap, but still distinct enough for suggestion rotation.'
      });
    }
  });

  const uniqueSuggestions = suggestions
    .sort((a, b) => b.noveltyScore - a.noveltyScore)
    .slice(0, 5);

  return {
    scopedBy,
    archivedCount: existingArchive.length,
    uniqueSuggestions
  };
}
