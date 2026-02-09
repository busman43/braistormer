# Brainstorming Engine

A production-ready Vite + React + TypeScript app that asks exactly 3 clarifying questions and then generates categorized idea sets with top picks, variations, and follow-up prompts.

## Run locally (web)

```bash
npm install
npm run dev
```

## Production web build

```bash
npm run build
npm run preview
```

## Run as desktop app (development)

```bash
npm run dev:desktop
```

## Create executable installers

### Windows `.exe` installer (NSIS)

```bash
npm run dist:win
```

### Linux AppImage

```bash
npm run dist:linux
```

The packaged files are generated in `dist/` and `release/`.
