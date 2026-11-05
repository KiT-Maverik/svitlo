# Biology — Svitlo standalone textbook

Minimal Next.js App Router scaffold for `@svitlo/biology` in the `content/*` npm workspaces.

## Commands

Run `npm ci` at the monorepo root first, then use:

- `npm run dev --workspace @svitlo/biology`
- `npm run typecheck --workspace @svitlo/biology`
- `npm run lint --workspace @svitlo/biology`
- `npm run build --workspace @svitlo/biology`

## Editorial status

The [Biology Skills Taxonomy](docs/skills/taxonomy.md) is **approved as of October 29, 2026** and maintained in English (11 Domains, 26 Groups, 147 Skills). Approval is editorial only: **the taxonomy is not implemented**. The taxonomy remains the canonical pedagogical definition; no separate per-entity Definition files are needed. No taxonomy `*.ids.ts` or `*.data.ts`, curricula, lesson content, or question data have been authored. The dated [Skill Taxonomy Review](docs/history/skill-taxonomy-review.md) records agreed decisions, later revisions, and final approval without replacing the canonical taxonomy. Runtime Code generation is a separate stage.

Follow `studio/Subject Proposition.md`, `studio/personas/methodist.persona.md` and `studio/skills/create-skills-taxonomy.skill.md` for the editorial work; the Coding Agent Persona and `AGENTS.md` govern implementation. Keep the package independently deployable, and consume shared Engine/UI Kit only through published package exports when there is an approved integration task.
