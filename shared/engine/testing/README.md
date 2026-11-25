# Engine-owned integration test fixtures

`content/engine-fixture/` is a **test-only synthetic textbook**, not a workspace,
production curriculum, or source for published content. Its single Lesson, Quiz,
Question Bank and Flashcard Bank exercise the real Engine Build API and generators
without reading `content/*` textbooks.

The fixture intentionally supports **only `en` and `uk`**. Adding a language to
the global Engine registry must not alter the fixture's published locales.
`shared/engine/schemas/languages.schemas.ts` here is a minimal _test-only_
registry for the read-only Lesson → Markdown generator (which accepts an
explicit repository root), not a replacement for the production registry.

Keep assertions in the adjacent generator `*.spec.mjs` files. Put shared
authored fixtures here, rather than importing another workspace's educational
content. Tests are run by the existing Engine workspace `npm test` command.
The Engine production and test TypeScript builds do not include this directory.
