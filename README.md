# Brainstorming Engine App

A production-style React + Vite app for generating categorized brainstorming ideas with a required 3-question intake flow, freemium usage limits, and mock Stripe-powered upgrades.

Now includes an **Idea Archive Agent** that scopes each run, retrieves unique ideas, and stores them in an archive for future suggestion cycles.

## Run locally

```bash
npm install
npm run dev
```

## Included stack
- React 18 + Vite + TypeScript
- TailwindCSS
- Zustand state + React Router
- React Hook Form + Zod
- React Hot Toast + Lucide icons
- Stripe JS loader (mock checkout flow)
