# Engine entity configurators

`configurators/` houses the `define*` authoring factories and Zod-backed schemas. The former `definitions/` directory has been folded into this directory. Legacy Course creators live separately in `configurators_old/`.

The new Skill, SkillGroup, SkillDomain and AssessmentMethod factories intentionally use a minimal shape:

- `config.base` — non-localized fields such as `id`, `slug` and methodological description.
- `config.locales()` — localized fields such as names, titles and frontend descriptions.
- SkillGroup and SkillDomain configurators expose child configurators as slug-keyed `skill` and `group` maps.
- `*_Config_Schema` and `*_Props_Schema` validate the two representations.

All ten ContentBlock configurators now follow `defineText`: top-level identity (`id`, `slug`, `type`), nested `params` and `locale`, Zod-backed `*_Config_Schema` and `*_Props_Schema`, and `config.base` / `config.locales()` / `config.overrides` with per-block `override` and `disable` methods. A disabled ContentBlock deliberately replaces its parameter overrides with `{ disabled: true }`.

Every `define*` directory has an `index.ts` that exports its implementation and schemas; parent barrels export each directory once. Configurators expose `id` and `type` directly, plus `slug` where the authored entity has one. Their module-level `validate` functions are also exposed through `config.validate(config)`, while `config.base` continues to carry the publishing metadata.

`configuratorArrayToSlugMap([defineText(...), ...])` converts a list of configurators into a slug-keyed object, preserving literal slug types. It is useful for AI-authored content because authors need not duplicate slugs as object keys.

Checkpoint metadata has its own Zod schemas; nested content is typed but deliberately omitted from those schemas. The authored `content.items` object maps question slugs to `{ question: defineText(...), answer: { items, order }, check? }`. Answers may use any supported ContentBlock **except another Checkpoint**. The `config.validate` function performs parent Zod checks and verifies collection relationships (not child ContentBlock internals), then aggregates all failures in a `CheckpointValidationError` with `{ subject: { id, slug, type }, success: false, errors: [{ check, path, message }] }`. Orders are explicit and must contain each item exactly once. Authors edit `checkpoint.content.items` and `checkpoint.content.order` directly and use each nested ContentBlock configurator's own `override` API. Checkpoint has no `override.content`, `updateContent`, or `updateAnswers` methods, and direct mutations do not trigger validation. Call `checkpoint.config.validate({ ...originalConfig, content: checkpoint.content })` explicitly to validate the current collection after edits; the future shared `assemble()` lifecycle will perform that check automatically. Configurator children are not published by this refactor; generators and UI Kit are separate work.

Section, Question, Lesson and Course factories still have outstanding migrations. Their current contract and the published JSON generators must not be assumed to share the ContentBlock runtime structure until those migrations are complete.
