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

export interface IdeaCategory {
  name: string;
  ideas: IdeaItem[];
  topPicks: string[];
  variations: string[];
  followUp: string;
}

export interface IdeaArchiveEntry {
  id: string;
  category: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface ArchiveAgentResult {
  scopedKeywords: string[];
  uniqueSuggestions: IdeaArchiveEntry[];
}
