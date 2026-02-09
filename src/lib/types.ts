export type OutputStyle = 'Quick' | 'Detailed' | 'Creative' | 'Practical' | 'Balanced';

export interface ClarifyingAnswers {
  context: string;
  constraints: string;
  style: OutputStyle;
}

export interface IdeaItem {
  title: string;
  description: string;
}

export interface ArchivedIdeaItem extends IdeaItem {
  category: string;
  fingerprint: string;
}

export interface IdeaCategory {
  name: string;
  ideas: IdeaItem[];
  topPicks: string[];
  variations: string[];
  followUp: string;
}

export interface IdeaArchiveSuggestion {
  title: string;
  description: string;
  category: string;
  noveltyScore: number;
  whyItIsUnique: string;
}

export interface ArchiveAgentReport {
  scopedBy: string[];
  archivedCount: number;
  uniqueSuggestions: IdeaArchiveSuggestion[];
}
