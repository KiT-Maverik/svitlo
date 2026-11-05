# Playground Skill Analytics publication

Authoring source: `content/playground/data/skills/**/*.data.ts`.
Runtime does not import authoring Data. [Generator Requirements](../../../studio/generator-requirements.md) are authoritative.

`scripts/generators/pages/skillAnalytics/generate-skill-analytics.mjs`
publishes `public/data/pages/skillAnalytics/<language>.json` (one per registry
language; no `index.json`). `public/data/` is Git-ignored and the generator runs
from `predev` and `prebuild`. The page reads **one localized JSON** for its
complete Domain → Group → Skill tree. Each node contains canonical
`id`, `slug`, `collection`, localized `name`, optional `description`,
and `children`. Descriptions come from `description.frontend[language]`.
The `collection` discriminator comes from the shared Collection union.
There is no fallback translation, multi-language blob, methodological text,
or learner analytics in the generated file.

The page is **skillAnalytics** (route `/skillAnalytics`). Mind Map and outline
are views of Skill Analytics, not the page's name. Its hierarchy can later be
filtered using verified Program → Skill UUID mappings. Learner mastery is
runtime and profile-specific; current demonstration percentages are not
genuine assessment results.

The older entity-oriented generator lives at
`scripts/generators/data/publish-skills-data.mjs` but is not executed for the
skillAnalytics page.

```sh
node scripts/generators/pages/skillAnalytics/generate-skill-analytics.mjs --package content/playground --write
node scripts/generators/pages/skillAnalytics/generate-skill-analytics.mjs --package content/playground --check
node scripts/generators/pages/skillAnalytics/generate-skill-analytics.mjs --package content/playground --measure
node --test scripts/generators/pages/skillAnalytics/generate-skill-analytics.spec.mjs
```

The generator measures per-language raw UTF-8, gzip and Brotli sizes plus totals.
All Playground translations marked `[TEST ...]` are synthetic.
