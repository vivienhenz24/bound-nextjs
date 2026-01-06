# CLAUDE.md

## Project overview

- Next.js (App Router) + React + TypeScript in `app/`.
- Shared UI lives in `components/` and feature-level UI in `components/(app)/`.
- Tailwind CSS v4 setup with theme tokens in `app/globals.css`.
- Utilities and hooks live in `lib/` and `hooks/`.

## Commands

- Dev server: `pnpm dev`
- Build: `pnpm build`
- Start: `pnpm start`
- Lint: `pnpm lint`
- Format: `pnpm format`

## Code style and conventions

- TypeScript `strict` is enabled; keep types explicit for public APIs and component props.
- Prefer App Router server components by default; add `"use client"` only when needed.
- Use the `@/*` path alias for imports (maps to project root).
- Follow existing component organization:
  - `components/` for shared, reusable UI.
  - `components/(app)/` for app-specific UI.
- Tailwind-first styling; keep custom CSS in `app/globals.css` where possible.
- Use `class-variance-authority` or `tailwind-merge` patterns already in use for class composition.

## Linting and formatting

- ESLint config is Next.js core-web-vitals + TypeScript (`eslint.config.mjs`).
- Prettier is configured in `.prettierrc.json` (no semicolons, 100 char width).
- Husky + lint-staged run ESLint/Prettier on staged files (`.lintstagedrc.json`).

## Best practices

- Keep `app/` routes focused on data loading and page layout; move heavy UI logic into components.
- When adding new UI variants, prefer composable primitives over one-off styles.
- Avoid duplicating theme tokens; use the CSS variables defined in `app/globals.css`.
- Keep public and authenticated layouts distinct; check `app/` and `.app-layout` styles.
- Minimize client-side state; use server actions or server components when possible.

## Notes

- Use pnpm as the single package manager; `pnpm-lock.yaml` is the source of truth.
- No test setup detected; if adding tests, align with Next.js App Router (e.g., Playwright/RTL) and add scripts.
