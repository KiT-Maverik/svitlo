# Svitlo — Architecture & Product Principles

**Purpose:** canonical, cross-cutting rules for content authors, educational specialists, Coding Agents, textbook applications, Engine and UI Kit. These documents explain **what Svitlo must be**, without pretending that every required capability has been implemented.

**Status vocabulary used throughout:**

- **Product invariant / decision:** expected of current work and future architecture; cannot be silently traded away.
- **Observed in code:** verified behavior in the named repository source files. Recheck when implementing.
- **Planned / proposed:** target behavior; no assumption of a completed runtime contract.
- **Open:** an architectural decision or implementation mechanism still to be designed.

## Typed production and publication boundaries

- **Course:** One `CourseWorkflowStage1/2/3` TypeScript `draft.ts` source, SHA-pinned independent Stage 4 review and trusted Stage 5 source materialization. New Lessons receive minimal UUID-addressed Stage 1 `draft.ts` handoffs; mandatory Stage 8 human QA follows translation review and verifies the integrated Course; existing Lessons are imported and contextually patched without rewriting standalone source.
- **Episode:** Course Stage 5 allocates a typed handoff at the reviewed slot. The separate Episode workflow owns Stage 1/2 scenario/content, independent Stage 3 and Stage 4 review, trusted atomic Stage 5, resources/locales and human Media Generation/QA. See [Episode](../entities/episode.md).
- **Lesson:** Typed Stage 1/2 source followed by independent Stages 3–5 review and trusted Stage 6.1 Section/Block/Scene source handoff. Resource completion (6.2), executable Scenes (6.3), independent banks and locales are separate gates.
- **Questions/Flashcards:** Separate seven-stage typed bank sources and reviewed Stage 5 Git transactions. The full bank is independent of optional selected Quiz/Flashcards Sections; only genuine reviewed Configurator IDs may be published.
- **Source vs publication:** Concrete type-specific source renderers and root orchestrators consume the reviewed editorial draft, emit valid modular TypeScript and delete the consumed draft atomically. Git history preserves review evidence. Historical YAML is provenance, not an executable authoring input.
- **Deployment boundary:** Typed trusted GitHub workflows must be present on default `develop` and exercised on safe reviewed PRs before claiming live availability. A successful integration PR test does not establish deployed command functionality. Preserve SHA/reviewer proof, branch-lease, no-clobber, path safety and fail-closed production guards.

## Required reading by responsibility

| Document                                                                               | Why it matters                                                                                                                                                                                      |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Learning Experience Philosophy](./learning-experience-philosophy.md)                  | Interactive learning ecosystem, depth of learning, separation of Lesson/Program, educational role ownership                                                                                         |
| [Skill Taxonomy Workflow](../../skills/skill-taxonomy-workflow/README.md)              | Review, Code promotion, safe Markdown retirement and localized Markdown regeneration                                                                                                                |
| [Git-First Typed Content & AI Authoring](./git-first-typed-content.md)                 | Git as the authoring source of truth, `*.data.ts` conventions, review, validation and AI-assisted scale                                                                                             |
| [Internationalization & Inclusive Access](./internationalization-and-accessibility.md) | Broad locale coverage, semantic LTR/RTL, disability-aware accessibility as a default requirement                                                                                                    |
| [Offline-First & Device Compatibility](./offline-first-and-device-compatibility.md)    | Cross-platform offline learning objective; PWA optional, media and state storage, capability trade-offs                                                                                             |
| [Lesson Notes](./lesson-notes.md)                                                      | Planned concise recall notes revealed during a lesson and assembled into a learner's revision sheet                                                                                                 |
| [UUID Entity Addressing](./entity-uuid-addressing.md)                                  | One Engine resolver for immutable UUID-based Lesson paths; Skills remain hierarchical                                                                                                               |
| [Quest Section](../entities/quest.md)                                                  | Build-only Quest structure, media/accessibility requirements and pending runtime integration                                                                                                        |
| [EducationStandard](../entities/education-standard.md)                                 | Immutable original-language standard definition, English methodology and complete short standard-locale descriptions; Course alignment remains separate future work                                 |
| [Create Course Flow](../../skills/course-workflow/create-course-flow.skill.md)         | Eight-stage typed Course authoring with final human QA, independent corrective Stage 4 review, entity PR, authorized materialization and translation gates                                          |
| [Create Episode Flow](../../skills/episode-workflow/create-episode-flow.skill.md)      | Ten-stage Course-owned narrative production, independent content/locale review, human Media Generation and QA; verify trusted materializer and host support before use                              |
| [Create Lesson Flow](../../skills/lesson-workflow/create-lesson-flow.skill.md)         | Ten-stage Lesson PR; Stage 6.1 scaffolds, 6.2 completes typed resources, 6.3 implements/tests/registers Scenes; Stages 7/8 banks, 9/10 locales                                                      |
| [Lesson, Content, Section & Course](../entities/lesson.md)                             | Read entity definitions at [Lesson](../entities/lesson.md), [Lesson Content](../entities/lesson-content.md), [Section](../entities/section.md) and [Course](../entities/course.md) before authoring |
| [Translation Workflow](../../skills/translation-workflow/README.md)                    | Same entity-owned PR for translation and independent review context; Markdown/source-SHA checks and historical Issue evidence remain                                                                |
| [Typed production and historical YAML](./typed-production-materialization.md)          | Canonical TypeScript stage source, trusted materialization and archived YAML provenance                                                                                                             |
| [Separate Lesson Assessment Banks](./lesson-assessment-bank-separation.md)             | Independent banks versus Quiz/Flashcards Sections; typed banks are independently materialized and published                                                                                         |
| [Lesson Resource Readiness](./lesson-resource-readiness.md)                            | Observed Config, Props, publication and review boundaries; proposed authoring-only readiness assessment and unresolved API decisions                                                                |
| [Carousel Image/Scene Slides](./carousel-image-scene-slides.md)                        | Typed Carousel children, Scene rendering and recursive Lesson asset handoff                                                                                                                         |
| [Lesson Generated Source Layout](./lesson-generated-source-layout.md)                  | Canonical typed modular Lesson layout, with historical prototype Git commit references                                                                                                              |
| [Lesson Editorial Artifacts](./lesson-editorial-document.md)                           | Typed editorial Lesson source, source-derived methodology and historical evidence; `methodology.md` is derived, not a second editable source                                                        |
| [System Boundaries & Roadmap](./system-boundaries.md)                                  | Lesson vs Program, progress vs assessment, injection/events, IDs and planned registries/sync                                                                                                        |
| [Coding Agent Specializations](./coding-agent-specializations.md)                      | Existing specialized Skills (including Remotion) and prioritized future ones; specialist subskills supplement one Coding Agent Persona                                                              |
| [CI and branch policy](../../rules/ci-workflow.md)                                     | Development and production validation, quiet agent logs, required checks and release promotion                                                                                                      |
| [Monorepo & Standalone Textbook Architecture](./monorepo-and-textbook.md)              | Current `apps/` / `content/` / `backend/` / `shared/` / `studio/` workspaces, package graph and extraction constraints                                                                              |
| [Cross-Platform Lesson Runtime](./cross-platform-lesson-runtime.md)                    | **Target**: reusable client Lesson UI, build-time textbook/Scene composition, Web/Capacitor/Electron adapters and session lifecycle                                                                 |

## Reviewer constitutions

- [Development Constitution](../development-constitution.md) — reserved for future development rules; **currently intentionally empty** beyond its title.
- [Quality Constitution](../quality-constitution.md) — reserved for future quality/testing rules; **currently intentionally empty** beyond its title.
- [Development Reviewer](../../personas/development-reviewer.persona.md) evaluates code and PRs against written architecture/Development Constitution; [Quality Assurance Reviewer](../../personas/quality-assurance-reviewer.persona.md) evaluates test effectiveness and quality evidence. **No unwritten constitutional rules may be inferred** from an empty placeholder.

## Planned Product Feature Backlog

The [Studio To Do index](../../To%20Do/README.md) catalogs **proposed or deferred product features in individual Markdown files**—including optional web/PWA installation and offline downloads, audio language availability, accessibility-based Question selection, GitHub feedback, multi-profile accounts, quizzes, Notes, Programs, teacher tools and sponsorship. **An entry is not an approved API or implemented feature**. Consult this backlog when identifying future work, not as a reason to silently change current runtime contracts.

## Document precedence

1. **Current real runtime and TypeScript contracts** are the source of truth for **what has been implemented**. Always inspect actual code before coding.
2. These architecture documents are the canonical reference for **cross-cutting product intent and invariants**. Existing code that falls short is a gap, **not permission to lower the intended architecture**.
3. Approved Methodologist briefs, Screenwriter specifications, Assessment specifications and textbook-specific editorial assets define **what to author** within the agreed scope.
4. Role-specific `studio/personas/` and `studio/skills/` define _who performs the work_ and _how to perform it_.
5. [Long Chat Overture](../../Long%20Chat%20Overture.md) and [Roles Proposition](../../Roles%20Proposition.md) preserve historical decisions and background, including later superseded paths and snapshots; they are **not** current runtime documentation.

When intent and implementation differ, report both and request the required technical decision rather than silently creating unsupported APIs. A _decision_ is not the same thing as an _implemented feature_.

## Project boundaries

Svitlo is a broad, international, **AI-assisted, accessible, offline-capable interactive learning ecosystem**. Its textbooks are currently standalone Next.js applications; the target architecture is independently extractable content-and-Scene packages composed into shared Web, Mobile and Desktop hosts. Both models must avoid app-to-app source dependencies during migration. Source content belongs in version control; learner-specific state belongs in local and/or synchronized runtime data stores, not in the Git authoring repository.

These principles must be read **before** choosing a lesson design, introducing educational entities, implementing interactive scenes, changing localization, or defining persistence/offline behavior.

**Maintenance rule:** when a product decision changes, update the relevant focused document and its implementation status. Do not rewrite the historical Overture as if it were a mutable live specification.
