<div align="center">

# React Quiz

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![ESLint](https://img.shields.io/badge/ESLint-9.36.0-4B32C3?logo=eslint&logoColor=white)](https://eslint.org)

Interactive quiz built with React, TypeScript and Vite. It persists progress in LocalStorage, provides a countdown timer, and follows Atomic Design.

🔗 Live demo: https://paching12.github.io/ReactQuiz/

</div>

## Features

- useReducer-driven state machine for the quiz flow (loading, ready, active, finished, error)
- Custom hooks for persistence and DX
  - `useLocalStorage` – typed helpers to store/get values
  - `usePersistedReducer` – reducer + selective persistence + initial state hydration
  - `useQuizState` – single source of truth for the app (actions, selectors, helpers)
- Regressive counters with proper interval management in `Timer`
- Progress computation and UI via `ProgressBar` (answered, points, max points, percentage)
- Persist/Restore progress UX with `RestoreProgress`
- Atomic Design structure: atoms, molecules, pages/templates
- TypeScript-first codebase with explicit types for components and actions

## Tech Stack

- React 19, Vite 7, TypeScript 5.9
- ESLint 9 with React Hooks rules
- json-server (optional, for local API prototyping)

## Project Structure

```
src/
  components/
    atoms/           # Footer, Header, Timer, ProgressBar, etc.
    molecules/       # Question, etc.
    Pages/           # StartScreen, FinishScreen
  hooks/             # useLocalStorage, usePersistedReducer, useQuizState
    useQuizState
      usePersistedReducer
        useLocalStorage
  localReducer/      # questionStateReducer
  data/              # questions.json (default data source)
```

## Getting Started

Prerequisites:

- Node.js >= 20.19 (recommended by Vite)
- npm >= 9

Install dependencies:

```powershell
npm install
```

Start the dev server:

```powershell
npm run dev
```

Open the app at the URL shown in the terminal (typically http://localhost:5173).

### Optional: mock API with json-server

By default the app imports `src/data/questions.json`. If you want to serve it via an HTTP endpoint:

```powershell
npm run server   # serves data/questions.json on http://localhost:8000
```

Then adjust your data-loading logic to request `http://localhost:8000/questions` (not required for the current setup).

## Scripts

- `npm run dev` – start Vite dev server
- `npm run build` – type-check and build production bundle
- `npm run preview` – preview the built app locally
- `npm run lint` – run ESLint
- `npm run server` – run json-server for the local API (optional)
- `npm run deploy` – publish `dist` to GitHub Pages (branch `gh-pages`)

## Deployment (GitHub Pages)

This project is configured to deploy as a project site under `/ReactQuiz/`.

- Vite base is set in `vite.config.ts`:
  ```ts
  base: "/ReactQuiz/";
  ```
- Make sure the path matches your repository name including case (GitHub Pages is case-sensitive). If you rename the repo, update this value and redeploy.

## What’s inside (React concepts used)

- useReducer
- Custom hooks (LocalStorage persistence)
- Regressive counters (proper Interval management)
- Processing progress for the questions layout
- Atomic Design
- TypeScript throughout

## Troubleshooting

- 404s on GitHub Pages: ensure the base path matches the repo name exactly (`/ReactQuiz/`). Hard refresh the browser to invalidate cached `index.html`.
- Build complains about Node version: upgrade to Node 20.19+ or 22.12+ as suggested by Vite.

---

Made with ❤️ and a focus on clean state management and DX.
