# SkillDomain

**Entity category:** subject-wide catalog domain.

A **SkillDomain** denotes a recognizable field within a subject and contains coherent Skills either through meaningful SkillGroups or directly when no grouping is justified. It organizes the competencies catalog; it is not a course, grade, learning sequence, assessment or mastery record.

## SEMANTIC ROLE

- Give each Domain a distinct name and a **substantive description** of its concepts, scope and boundaries. The description must explain more than the heading and must not say only that this is an area with related Skills.
- Before promotion, write descriptions and hierarchy **in-place in the staging taxonomy**, not in a separate Markdown Definition file.
- Distinguish neighboring Domains pedagogically, without forcing balanced counts or fixed sizes. Prefer two or more truly distinct Groups when appropriate; a **single-Group Domain is strongly discouraged**, requiring an explicit editorial exception. With no meaningful internal grouping, attach Skills directly. Direct Skills and Groups may coexist within one Domain when pedagogically appropriate.
- The Domain's Group/Skill membership is a catalog classification, not teaching order, prerequisites or assessment metadata.

## EDITORIAL SLUG

Each new-format SkillDomain has one English `Slug: lowerCamelCase` beneath its heading, unique among all Domain, Group and Skill slugs in this textbook. Keep approved slugs stable independently of translated display names; the slug is a required `defineSkillDomain` slug property, distinct from the UUID, and must match the filename. Reconcile existing Code paths without silent renames.

## RUNTIME CONTRACT AND ARTIFACTS

The Domain config lives in `<PackageRoot>/data/skills/<domain>/<domain>.data.ts` and directly imports immediate Group Data from `./<group>/<group>.data`, or direct Skill Data from `./skills` for an ungrouped Domain. It embeds full imported child entities into `groups` and optional direct `skills`, not just their `.id` fields. **No Domain-directory `index.ts` is required or allowed**; `<PackageRoot>/data/skills/index.ts` exports the Domain to consumers.

The Engine `defineSkillDomain` config includes `slug`, `id`, localized `title`, optional `groups` and optional direct `skills`. Both are arrays of imported child configurators and may be populated simultaneously; the taxonomy checker requires at least one child. Zod validates the config while the source graph checker validates canonical slug-to-path and import relationships. Required `description.methodological` provides canonical English meaning; `description.frontend` is optional and complete when supplied. Source locations are resolved separately; learner progress does not belong here.

- **Editorial authority until migration:** `<PackageRoot>/docs/skills/taxonomy.md`; after reviewed migration, Code localized name, English methodological explanation, optional complete frontend copy and both Group and direct Skill membership.
- **Implementation link:** a verified application `*.data.ts` file linked with its complete filename as the label, or exactly `[Not implemented](#)` as a standalone link without `Code:`.

New-format records use single-line `Methodological description:` (English) and `User-friendly description:` (default `[Not authored]`) fields after the standalone implementation link. Legacy unlabeled prose needs migration; there is no generic `Description:` field, per-Domain Definition file or additional editorial approval state. The new `Action: skip|create|update|delete` and `Status: pending|implemented` taxonomy fields instead describe future generator intent and verified Code implementation.

Related entities: [SkillGroup](./skill-group.md), [Skill](./skill.md).
