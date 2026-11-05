# System Boundaries & Architectural Roadmap

**Status:** consolidated cross-cutting decisions from [Long Chat Overture](../../Long%20Chat%20Overture.md) and [Roles Proposition](../../Roles%20Proposition.md), with explicit implementation status. Read the historic originals for discussion context; inspect live contracts for actual behavior.

## Separation of concerns

| Concern                            | Owns                                                                                  | Explicitly does not own                                   |
| ---------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Git authored content               | Approved facts, configurations, resources, localized media, IDs and version history   | Per-learner answers or account-specific runtime state     |
| Lesson                             | Reusable instructional content, ordered Sections and teaching interactions            | External Program story, learner's account/sync service    |
| Section                            | Ordered learning step and its typed content blocks or Quiz composition                | Entire Program or global prerequisites graph              |
| Resource                           | A typed presentation/content object (e.g. text, Markdown, image, audio, video, Scene) | Assessment evidence or user profile                       |
| Skill                              | Atomic independently assessable catalog competency                                    | Assessment method, score, grade, prereqs, learner mastery |
| Question / Quiz / Assessment       | Actual answers, checks, attempts, validity and scoring/evidence rules                 | Skill identity or Program narrative                       |
| Lesson Progress                    | Section visits/completion, Lesson-specific progress                                   | Proving a Skill is mastered                               |
| Program (planned)                  | Selection/order of Lessons, optional character/story, extra activities and triggers   | Rewriting an original Lesson's correct answers/content    |
| Notes (planned)                    | Git-authored concise recall cues and user-specific unlock status in separate stores   | Lesson transcript or automatically scored mastery         |
| Local repository and optional sync | Learner state and offline access, later cross-device replication                      | Authorial educational truth maintained outside Git        |

A Quiz question can cite multiple Skill IDs. That does not create an extra integrational Skill merely because an exercise uses several capabilities, and one combined correct answer does not automatically validate all of them independently.

## Important implementation boundaries

**Confirmed in currently inspected Contracts / Engine / apps (recheck current code):**

- [Lesson types](../../../shared/contracts/src/types/content/lesson.types.ts) include a `Lesson_Config` and array-based ordered `sections.content`, `LessonState`, and a Lesson/Section vs Quiz distinction.
- [Resource types](../../../shared/contracts/src/types/content/resource.types.ts) distinguish typed content resources; full renderer support **does not follow from TypeScript declarations**.
- The current [Lesson renderer](../../../learningApps/playground/src/components/pages/Lesson/LessonSectionContent/LessonSectionContent.tsx) directly handles `text`, `markdown`, `scene` for generic Sections; other declared resource configs need additional verification/integration.
- The [Question types](../../../shared/contracts/src/types/content/question.types.ts) include a `Disability[]` restriction and multiple Question kinds; their actual UI support differs by widget/adapter.
- [Engine languages](../../../shared/engine/src/types/languages.ts) include locale and `ltr`/`rtl` definitions; complete translation and semantic RTL still require implementation/testing per component.

**Not a completed universal runtime (do not invent these APIs):**

- **Program Runtime:** reusable Lesson sequencing/enrichment with characters, story, rewards and conditional contexts.
- **Static Program injections:** deterministic insertion before/after Lesson or Section, or into a named slot with stable anchors. Do not search the DOM or mutate the original Lesson to emulate this.
- **Event-driven Program reactions:** a public factual `question.*`, `section.*` and `lesson.*` event contract, handlers, retry/replay ordering, deduplication and asynchronous safety. Events must report facts, **not instruct components** or change scoring.
- **Keyed Section map:** a possible future `satisfies`-checked named object in place of the current ordered array; requires explicit ordering, migration and stable IDs. Do not silently rewrite the existing API.
- **Universal authored-entity registration:** complete build-time reference validation, UUID–module mapping, `fileLocation` indexing, published manifests and independent content versioning.
- **Cross-platform offline delivery/Sync pipeline:** host-specific cache/packaging, locale+Scene downloads, resilient local-first storage, optional Web/PWA service workers, and cross-device conflict policy need implementation/testing.
- **Full Notes lifecycle:** Note configs, unlocks, persistence and generated recall sheet need typed design, event integration and tests.

## Eventual component and data rules

- Stable IDs are **static authoring-time literals**, and ID dictionaries (`*.ids.ts`) must not import fully assembled Data. Keep object/data exports scoped to the appropriate hierarchy and package.
- Avoid app-to-app runtime dependencies. Engine remains free of React/Next/MUI; shared UI Kit, Lesson UI and textbook Scenes target portable React DOM without Next.js/Electron/Capacitor runtime imports; hosts supply platform adapters. Current standalone apps remain until separately migrated.
- Keep type schemas, localization, builders, rendering, and per-learner state as distinguishable layers. A content declaration does not implement a client widget or a Service Worker.
- Keep **separate authoring/review stages**: Methodologist → Screenwriter and Assessment Architect → Coding Agent; report handoffs instead of automatically creating unrelated artifacts.
- For UI testing, prefer role/accessible-name driven assertions, alongside integration tests where real IndexedDB or browsers are required; **mock-only tests do not establish browser or storage integration**.
- Rich animation and custom Scenes (possibly SVG, React, 3D or Remotion) must be pedagogically warranted, localized, accessible, mobile-conscious and reduced-motion aware. Video rendering is not automatically the only presentation of an animated model.

## Target cross-platform lesson boundary

The [Cross-Platform Lesson Runtime](./cross-platform-lesson-runtime.md) defines the **planned**, not yet implemented, split: complete server/build-prepared `LessonResponse`, shared client Lesson UI with per-lesson session state and operation/DI contexts, platform-provided navigation/storage/network adapters, and build-time scene registration. Server rendering may remain a thin Next.js Web-host concern; runtime Scene code and Lesson UI should not depend on it. Offline PWA installation is optional rather than a universal product requirement.

## Decision log and explicit open work

The priorities requiring further architecture are **Note schema/events**, **Program and injections/events**, **content manifest/UUID reference integrity**, **offline package caching and sync**, **automatic capability/accessibility flags**, **browser-performance support boundaries** and **generator validation**. Each requires its own scope, quality gates, tests and approvals; creating these docs does **not** implement them.

**Related:** [Cross-Platform Lesson Runtime](./cross-platform-lesson-runtime.md), [Monorepo & Textbook Architecture](./monorepo-and-textbook.md), [Learning Philosophy](./learning-experience-philosophy.md), [Typed Content](./git-first-typed-content.md), [Locales & Access](./internationalization-and-accessibility.md), [Offline](./offline-first-and-device-compatibility.md), [Notes](./lesson-notes.md).
