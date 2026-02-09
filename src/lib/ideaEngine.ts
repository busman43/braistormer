export type ClarifyingAnswers = {
  context: string;
  constraints: string;
  style: string;
};

export type IdeaItem = { title: string; description: string };
export type IdeaCategory = { name: string; ideas: IdeaItem[] };

const categories = [
  'Fun & Games',
  'In-Person Activities',
  'Online / Digital Activities',
  'Business Start-Up Ideas',
  'Menu & Meal Generator',
  'Weekend & Travel Planning',
  'Books to Read',
  'Gift Ideas',
  'Productivity & Lifestyle Ideas',
];

export const clarifyingQuestions = [
  'What are you brainstorming for, and who is it for?',
  'What constraints or preferences should I respect (budget, location, skill level, etc.)?',
  'How should I format the output: quick ideas, balanced, or detailed execution plans?',
] as const;

export function generateIdeas(input: ClarifyingAnswers): { output: IdeaCategory[]; topPicks: IdeaItem[]; variations: string[] } {
  const output = categories.slice(0, 5).map((name, catIdx) => ({
    name,
    ideas: Array.from({ length: 6 }).map((_, idx) => ({
      title: `${name.split(' ')[0]} Idea ${idx + 1}`,
      description: `Built for ${input.context.toLowerCase()} with ${input.constraints.toLowerCase()} in mind, tuned to a ${input.style.toLowerCase()} tone.`,
    })),
  }));

  const topPicks = [output[0].ideas[0], output[1].ideas[1], output[2].ideas[2]];
  const variations = [
    'Budget mode: swap paid tools for free community or open-source alternatives.',
    'Premium mode: add concierge planning, automation, or outsourcing support.',
    'Online/offline split: run idea discovery online and execution in person.',
  ];

  if (input.context.length > 8) {
    output.push({
      name: 'Custom: Context-Inferred Category',
      ideas: Array.from({ length: 5 }).map((_, idx) => ({
        title: `Custom Concept ${idx + 1}`,
        description: `A tailored concept inferred from "${input.context}" and refined for practical next steps.`,
      })),
    });
  }

  return { output, topPicks, variations };
}
