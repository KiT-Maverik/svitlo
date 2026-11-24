# Git-First Typed Content & AI Authoring

**Status:** Git as source of authored content and typed `*.data.ts` conventions are approved architectural requirements. Universal generators/registries, all cross-package distribution and automated publishing are **not assumed implemented**.

## Git is the editorial source of truth

The canonical **authored educational content** lives in a Git repository: lesson facts, curricular and instructional specifications, text/Markdown, typed resource configurations, translations, media assets, identity maps and their review history. It is created, changed, audited, approved and versioned using commits and **PR/code review**. Authored content must not silently diverge into an unreviewed production database or editable client state.

Git is **not** the store for learner answers, private progress, account data, runtime mastery, sync queues or personal Notes collections. These are operational/learner data, with appropriate local/remote stores and privacy controls.

**Exception for the Skills Taxonomy:** Domain/Group source uses `<domain>/index.ts` / `<domain>/<group>/index.ts` and Skill source uses `<parent>/<slug>.ts`, with short named exports. Slug-keyed collections are classification maps without authoring order or overrides. These paths supersede the general `*.data.ts` convention below **only for Skills**. **For the Skills Taxonomy specifically:** the [Skill Taxonomy Workflow](../../skills/skill-taxonomy-workflow/README.md) promotes reviewed English methodological descriptions from editorial Markdown into strictly typed Code (with optional complete all-locale frontend copy). Before promotion Markdown is authoritative for pending items; after promotion Code is authoritative for those items. Generated Markdown is a derived view, not a parallel definition.

**Derived runtime artifacts** (compiled bundles, indexes, generated views, manifests, delivery packages and, later, possibly a Notes-derived study sheet) should be **reproducible from their canonical source inputs**, rather than manually curated parallel truths. Do not claim an end-to-end content generator or renderer already exists just because a convention is specified.

## Authoring source conventions

- **Typed educational content** uses named TypeScript exports and the actual owning Engine Build contracts. Existing implemented Lessons may use `*.data.ts`; the **new staged production source** uses a UUID-addressed `draft.ts` (`satisfies CourseWorkflowLessonSeed` for an optional Course-authored seed; `satisfies LessonWorkflowStage1`, `QuestionBankWorkflowStage1` or `FlashcardBankWorkflowStage1`) and advances that same object through review before final `define*` source materialization. Such drafts are **not** Engine Configurators or runtime Props. Authorized Lesson Stage 1 replaces or completes any Course seed at the same path, without sharing workflow contracts. Skills retain their separate naming convention above. Do not impose `*.data.ts` on every staged entity or add a second YAML editorial source.
- Ensure **strict static typing** using the owning shared Engine TypeScript contract, `satisfies`, typed builder signatures and any required validation. Do not bypass schema correctness with `any`, unsafe type assertions, inferred unvalidated data or invented fields. The authoritative code contract controls the exact shape.
- **Database-ready describes the contracts, not the filename:** define educational entities as **lightweight, normalized, nonduplicative, reusable data records**, addressable by stable IDs and relational references, suitable for later database ingestion without redesigning their information model. Do **not** add runtime database indexes, ORM decorators, persistence state, synchronization flags or arbitrary metadata to authored Data solely because future database storage is planned. Avoid embedding duplicate copies of related entities; use ID references and explicit catalog/registry boundaries. **Database-ready does not mean every current render payload can be serialized**: e.g. a `SceneResource_Config.component` may hold a React node and will require a separately designed source reference or view registry to persist safely. No general database ingestion is claimed implemented.
- **Current Skill authoring ownership:** The obsolete Skill, Group and Domain builders and their former `DeepReadonly` contract tests were retired. `defineSkill`, `defineSkillGroup` and `defineSkillDomain` validate authored config with Zod, split `config.base` and `config.locales()`, and retain child configurators. Other builder readonly guarantees must be checked separately: do not assume that returned config is frozen or deep-readonly.
- **IDs are stable and explicit**, held separately in named `*.ids.ts` dictionaries where that entity's convention requires them. Never generate UUIDs at runtime for authored entities or derive them from mutable names/paths; editorial moves should not silently change identity.
- **Hierarchical exports remain level-specific** (`index.ts` exports the appropriate current collection level; `index.ids.ts` imports no Data). Do not add recursive cross-app imports or compatibility barrels simply to hide an architecture mismatch.
- **`*.md` documents are a separate layer** for long-form content, captions, historical briefs and derived methodological views. For staged Course/Lesson/Bank authoring, `methodology.md` is **generated from the one typed `production` source**, never independently editable methodology. Markdown assets may remain file-backed, and historical YAML/briefs retain their source and review evidence until genuinely migrated.
- Keep source assets with an owned app/content package or explicit shared distribution contract. Content can be extracted with its standalone textbook; never hide a runtime import from another textbook package.

**Use current examples:** consult [Create Course Flow](../../skills/course-workflow/create-course-flow.skill.md), [Create Lesson Flow](../../skills/lesson-workflow/create-lesson-flow.skill.md), and the Questions/Flashcards Skills alongside the actual Engine type exports. The old fictional `buildLessonConfig` helper is not a supported authoring API: `satisfies` checks editorial data structure, while real `define*` Configurators and separate publication run only at their authorized boundaries.

## AI is how we scale authorship, not an excuse to weaken validity

Svitlo's scale requires **AI-compatible, deterministic, machine-checkable structures**. Semantic names, consistent file paths, strict types, clear instructions and stable identities make generation safer, reviews easier and automated checks more valuable.

**Editorial pipeline (intended workflow; individual skills may have their own approval gates):**

1. Methodologist approves learning scope, outcomes, references and a Skills map.
2. Screenwriter designs Lesson Sections, typed resource intents and separate Scene specifications.
3. Assessment specialist validates Question/Quiz/Practice evidence semantics and expected answers.
4. Coding Agent writes/updates typed configs, localizations, graphics/Scenes and focused tests.
5. Type-checkers, lint, schema/reference validators, localization completeness, a11y and package CI verify what can be automated.
6. Human editorial and domain review approves scientific correctness, accessibility, translation quality and the resulting educational experience.
7. Build/distribution produces delivery artifacts from the approved Git sources; operational data/sync is a separate subsystem.

**Do not conflate planned gates with existing tooling.** In particular, compiler types alone do not verify global UUID referential integrity, published locale quality, scientific truth or successful renderer integration. Missing integrity tools should be listed as work to implement, not waved away.

## Change discipline

- Every educational change must remain **reviewable as a Git diff** with sources, affected locales and IDs visible.
- AI-authored translations, simulations, questions and examples are **subject to the same review** as human work; dynamic generators must validate constraints and avoid impossible question states.
- A canonical educational entity's name/translation may evolve without changing its stable ID. Splits, merges and changed meanings need explicit migration review.
- Do not duplicate factual truth across a Git catalog and a separately editable runtime entity store.
- Mark `approved`, `draft`, `implemented`, `blocked` and `planned` distinctly; file presence is not editorial approval, and source ID presence is not proof of runtime registration.

**References:** [Engine Lesson Config](../../../shared/engine/configurators/lessons/defineLesson/defineLesson.schemas.ts), [typed production workflow contracts](../../../shared/engine/types/workflow/), [System Boundaries](./system-boundaries.md), [Long Chat Overture](../../Long%20Chat%20Overture.md).
