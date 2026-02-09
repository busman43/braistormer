import type { ClarifyingAnswers, IdeaCategory, IdeaItem } from './types';

const templates: Record<string, IdeaItem[]> = {
  'In-Person Activities': [
    { title: 'Micro Adventure Walk', description: 'Pick a nearby neighborhood and complete a fun photo scavenger list together.' },
    { title: 'Theme Night Potluck', description: 'Each person brings one dish and outfit around a random theme.' },
    { title: 'DIY Tournament', description: 'Create mini challenges like paper-plane contests and speed puzzles.' },
    { title: 'Local Class Drop-In', description: 'Try a one-off workshop like ceramics, dance, or improv.' },
    { title: 'Sunset Picnic Sprint', description: 'Plan a quick evening picnic with timed team setup challenge.' },
    { title: 'Neighborhood Treasure Hunt', description: 'Use clues tied to local landmarks for a playful race.' }
  ],
  'Online / Digital Activities': [
    { title: 'Virtual Escape Night', description: 'Run a browser-based escape room and rotate team leaders by round.' },
    { title: 'Creative Co-Working Sprint', description: '90-minute focus sprint with shared goals and rapid demos at the end.' },
    { title: 'AI Prompt Battle', description: 'Compete to create funniest or most useful prompts for a shared challenge.' },
    { title: 'Digital Game Lounge', description: 'Host quick party games that need only phones and a voice chat.' },
    { title: 'Watch-Then-Rank Club', description: 'Watch short videos and rank them with a custom scorecard.' },
    { title: 'Remote Skill Swap', description: 'Each person teaches a 10-minute skill session live.' }
  ],
  'Business Start-Up Ideas': [
    { title: 'Niche Newsletter Studio', description: 'Create paid micro-newsletters for specific professions with curated tools.' },
    { title: 'Local Experience Bundles', description: 'Bundle city experiences for weekend visitors with simple fixed pricing.' },
    { title: 'Creator Ops Service', description: 'Offer automation, scheduling, and analytics setup for creators.' },
    { title: 'Micro SaaS for Teams', description: 'Build one workflow helper solving a painful recurring team process.' },
    { title: 'Event Replay Kits', description: 'Convert event recordings into clip packs and recap summaries.' },
    { title: 'B2B Idea Facilitation', description: 'Facilitate brainstorming workshops and deliver actionable execution plans.' }
  ],
  'Fun & Games': [
    { title: 'Mystery Envelope Challenge', description: 'Open timed challenge cards and complete tasks for points.' },
    { title: 'No-Buy Game Night', description: 'Use household items only for team-based creative games.' },
    { title: 'Story Chain Showdown', description: 'Build stories sentence by sentence and vote on wildest twists.' },
    { title: 'Rapid Trivia Remix', description: 'Create custom trivia from friend group memories and recent pop culture.' },
    { title: 'Two-Truths Strategy', description: 'Blend bluffing with team strategy goals across multiple rounds.' },
    { title: 'Cardless Casino', description: 'Run low-stakes game stations with tokens and rotating hosts.' }
  ],
  'Productivity & Lifestyle Ideas': [
    { title: 'Weekly Intent Mapping', description: 'Define top outcomes, blockers, and one accountability check-in.' },
    { title: 'Phone-Free Power Hour', description: 'One hour daily for deep work or reading with no notifications.' },
    { title: 'Meal + Calendar Sync', description: 'Plan meals around your week schedule to reduce decision fatigue.' },
    { title: 'Energy Audit', description: 'Track which tasks energize or drain you, then redesign your routine.' },
    { title: 'Mini Reset Ritual', description: 'Use a 15-minute evening reset for workspace and tomorrow prep.' },
    { title: 'Habit Pairing Matrix', description: 'Attach new habits to existing routines for better consistency.' }
  ]
};

function selectCategories(context: string): string[] {
  const lower = context.toLowerCase();
  if (lower.includes('business') || lower.includes('startup')) return ['Business Start-Up Ideas', 'Online / Digital Activities', 'Productivity & Lifestyle Ideas'];
  if (lower.includes('weekend') || lower.includes('friends') || lower.includes('fun')) return ['Fun & Games', 'In-Person Activities', 'Online / Digital Activities'];
  return ['In-Person Activities', 'Online / Digital Activities', 'Productivity & Lifestyle Ideas'];
}

function tuneDescription(description: string, constraints: string, style: string): string {
  const c = constraints.toLowerCase();
  const budgetHint = c.includes('budget') || c.includes('cheap') ? ' Keep costs minimal.' : c.includes('premium') ? ' Add a premium touch.' : '';
  const styleHint = style === 'Creative' ? ' Push originality and surprise.' : style === 'Practical' ? ' Keep execution simple and realistic.' : '';
  return `${description}${budgetHint}${styleHint}`;
}

export function buildIdeas(answers: ClarifyingAnswers): IdeaCategory[] {
  const categories = selectCategories(answers.context);

  return categories.map((name) => {
    const ideas = (templates[name] ?? []).slice(0, 6).map((idea) => ({
      ...idea,
      description: tuneDescription(idea.description, answers.constraints, answers.style)
    }));

    return {
      name,
      ideas,
      topPicks: ideas.slice(0, 3).map((idea) => idea.title),
      variations: ['Online-friendly variant: run this in short 30-minute rounds.', 'Budget variant: use free tools or existing materials.', 'Premium variant: add expert facilitation or upgraded venue.'],
      followUp: 'Want this transformed into a step-by-step plan or checklist?'
    };
  });
}
