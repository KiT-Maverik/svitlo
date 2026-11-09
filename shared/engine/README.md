# Svitlo Engine

`@svitlo/engine` contains framework-independent entity configurators, localization and publication utilities, validation, and Assessment Method data. Shared content contracts live in `@svitlo/contracts`.

## Source layout

- `lessons/` contains the existing Lesson, Section, and ContentBlock creators and publication helpers.
- `configurators/` contains the schema-backed `define*` factories (including the simplified Skill and Assessment Method configurators).
- `configurators_old/` contains legacy Course/Module/Chapter/Episode builders, kept during migration.
- `utils/` contains language and publishing utilities; `data/` contains Assessment Method data; `types/` contains internal projection helpers such as `DeepPartial`.
- Shared language types and the locale catalog live in `@svitlo/contracts`.

`index.ts` is the sole public import entrypoint: `@svitlo/engine`. Browser and React Server conditions use `runtime.ts` to exclude Node-only publication utilities, while Node authoring scripts use `index.ts`.

Lesson creators publish invariant base resources and language-specific locale patches; consumers combine them to assemble responses. See [Lesson](../../studio/docs/entities/lesson.md).

Internal aliases are configured in `tsconfig.json` and `package.json`.
