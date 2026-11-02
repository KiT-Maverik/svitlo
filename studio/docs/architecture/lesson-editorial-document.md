# Lesson Editorial Artifacts — Separate Brief and Content

**Status:** approved separate-file editorial arrangement for Methodologist Briefs and Lesson Content documents. The previous single-canonical-Lesson-document policy is superseded. This file retains its historical filename to avoid breaking links. This is editorial guidance and does not change TypeScript `Lesson_Config`.

## DECISION

A Lesson has **separate role-owned Markdown artifacts**, not a single document extended by all specialists.

- **Methodologist Brief:** `<PackageRoot>/data/lessons/<last-hex-digit>/<uuid>/methodologist-brief.md`. It specifies learner profile, prerequisites, approved Skills, educational outcomes, essential content and pedagogical boundaries. It stays beside the Lesson but **must not be embedded in runtime configuration or published to the client by default**.
- **Educational Screenwriter:** writes `<PackageRoot>/data/lessons/<last-hex-digit>/<uuid>/content.md` alongside the approved Brief, without editing the Methodologist's content. Custom Scenes have separate `scenes/*.scene-spec.md` documents when needed.
- **Other specialists:** Scene specifications, assessment designs, media and implementation each remain separate role-owned artifacts as defined by their own workflows.
- **Coding Agent:** creates typed runtime Lesson configuration independently of Methodologist prose; documentation is not application code.

The Lesson remains **Program-neutral**, can be reused across Curricula, and may target several approved Skills. Filesystem buckets do not imply pedagogical categories or sequence. Read canonical definitions: [Lesson](../entities/lesson.md), [Lesson Content](../entities/lesson-content.md), [Section](../entities/section.md), [Program](../entities/program.md).

## STORAGE AND REVIEW RULES

- Follow [Create Lesson Brief](../../skills/lesson-workflow/create-lesson-brief.skill.md): mint a stable UUID once; locate the Lesson by the Engine `resolveEntityPath(id)` result, under `data/lessons/<bucket>/<uuid>/`. Keep its English camelCase slug as human-readable metadata. There is no quota-based bucket balancing.
- Separate editorial approvals: `Methodologist status: Draft/Approved` applies only to the Brief. Content, assessment and implementation approvals are independent. Material changes to approved Methodologist outcomes, prerequisites, scope or Skills require renewed review.
- Cross-role edits require owner/editor authorization; never duplicate the Brief or auto-copy its full content into `content.md` or runtime config.
- Read generated English taxonomy view from `<PackageRoot>/docs/generated/skills/taxonomy.en.md`; if absent, generate with `node scripts/generate-skills-taxonomy.mjs --package learningApps/<textbook> --locale en` at monorepo root. Source of truth remains verified Code for promoted Skills, or approved staging Markdown for unpromoted ones. In the Brief, **Target Skills is a list of direct relative links to actual canonical Skill `*.data.ts` files**, with each link label equal to the **complete target filename (including `.data.ts`)**. Do not substitute Skill names or generated/staging Markdown links. **Use `<PackageRoot>/data/skills/` as the canonical destination in newly authored Target Skills links.** Mathematics and Playground already store Skills there. Validate every link against an existing source file. If another package has not migrated, flag that as a blocker rather than writing a non-existent link or falling back to `src/`.
- Use `Code: [Not implemented](#)` in a new Brief unless an actual Lesson implementation file can be verified. Never infer runtime IDs from slugs.
- Never silently migrate legacy files or change existing paths; migration requires explicit review and link reconciliation.

## WORKFLOW OWNERSHIP

[Create Lesson Brief](../../skills/lesson-workflow/create-lesson-brief.skill.md) creates `methodologist-brief.md`. After its explicit approval, [Create Lesson Content](../../skills/lesson-workflow/create-lesson-content.skill.md) creates an independent `content.md` in that **same Lesson folder** and optionally Scene specifications. Scene implementation, Question/Quiz authoring, runtime configuration, Program narratives and editorial approvals are separate, subsequently authorized stages.
