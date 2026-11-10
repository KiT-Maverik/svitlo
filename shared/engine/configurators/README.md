# Engine entity configurators

`configurators/` houses the `define*` authoring factories and Zod-backed schemas. The former `definitions/` directory has been folded into this directory. Legacy Course creators live separately in `configurators_old/`.

The new Skill, SkillGroup, SkillDomain and AssessmentMethod factories intentionally use a minimal shape:

- `config.base` — non-localized fields such as `id`, `slug` and methodological description.
- `config.locales()` — localized fields such as names, titles and frontend descriptions.
- SkillGroup and SkillDomain configurators expose child configurators as slug-keyed `skill` and `group` maps.
- `*_Config_Schema` and `*_Props_Schema` validate the two representations.

All ten ContentBlock configurators now follow `defineText`: top-level identity (`id`, `slug`, `type`), nested `params` and `locale`, Zod-backed `*_Config_Schema` and `*_Props_Schema`, and `config.base` / `config.locales()` / `config.overrides` with per-block `override` and `disable` methods. A disabled ContentBlock deliberately replaces its parameter overrides with `{ disabled: true }`.

Checkpoint is a composite ContentBlock: each authored `content` entry owns its localized `question`, nonempty array of nested `answer` configurators, and optional `check` setting. Checkpoint-wide behavior belongs in `params`; the localized block title belongs in `locale`. The configurator returns `content` outside serializable `config.base`, so the publisher must resolve each entry's child definitions and question localization. This avoids parallel indexed `params.items` / `locale.items` arrays and the corresponding length-checking refinement. Published JSON generators and older UI response contracts still require alignment.

Section, Question, Lesson and Course factories still have outstanding migrations. Their current contract and the published JSON generators must not be assumed to share the ContentBlock runtime structure until those migrations are complete.
