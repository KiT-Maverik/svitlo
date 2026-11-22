# Svitlo — Architecture & Product Principles

**Purpose:** canonical, cross-cutting rules for content authors, educational specialists, Coding Agents, textbook applications, Engine and UI Kit. These documents explain **what Svitlo must be**, without pretending that every required capability has been implemented.

**Status vocabulary used throughout:**

- **Product invariant / decision:** expected of current work and future architecture; cannot be silently traded away.
- **Observed in code:** verified behavior in the named repository source files. Recheck when implementing.
- **Planned / proposed:** target behavior; no assumption of a completed runtime contract.
- **Open:** an architectural decision or implementation mechanism still to be designed.

## Typed-production integration boundary (22 November 2026)

- **Course:** `CourseWorkflowStage1/2/3` and `CourseWorkflowMaterializerInput` are defined in parent #775. The reviewed Stage 3 feeds Stage 5 **only when a real typed orchestrator exists**. Course Stage 5 should hand a new Lesson its UUID-addressed `index.ts satisfies LessonWorkflowStage1`, **not** a full Lesson, Section, new Lesson PR or assessment bank. Existing Lessons remain verified references.
- **Lesson:** #782 owns staged Lesson types, methodology/Screenwriter work, reviews in Stages 3–5 and later authorized Stage 6 full Lesson/Section/Block source materialization. The staged Lesson is **not** a `Lesson_Configurator` or runnable `defineLesson` source.
- **Questions and Flashcards:** #783/#784 own their staged bank types, independent review and seven-stage flows. A child `questions/index.ts` or `flashcards/index.ts` Stage 1 is a handoff, **not** a finished bank. Stage 5 conversion must preserve the reviewed SHA and safely replace the Stage 1 entrypoint; parent #775 owns that orchestration.
- **Live legacy callers:** `lessonBuilder`, `questionsBuilder`, `flashcardBuilder`, `finalizeLesson`, `generateYamlSchemas`, and trusted `/lesson`, `/questions`, `/flashcards materialize` still require YAML. Do not retire them before proven typed replacements; source converters, Props/resource publishers, review generators and Scenes have distinct consumers. See [the boundary audit](./yaml-config-scaffolding.md).

## Required reading by responsibility

| Document                                                                               | Why it matters                                                                                                                                                                                                           |
| -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Learning Experience Philosophy](./learning-experience-philosophy.md)                  | Interactive learning ecosystem, depth of learning, separation of Lesson/Program, educational role ownership                                                                                                              |
| [Skill Taxonomy Workflow](../../skills/skill-taxonomy-workflow/README.md)              | Review, Code promotion, safe Markdown retirement and localized Markdown regeneration                                                                                                                                     |
| [Git-First Typed Content & AI Authoring](./git-first-typed-content.md)                 | Git as the authoring source of truth, `*.data.ts` conventions, review, validation and AI-assisted scale                                                                                                                  |
| [Internationalization & Inclusive Access](./internationalization-and-accessibility.md) | Broad locale coverage, semantic LTR/RTL, disability-aware accessibility as a default requirement                                                                                                                         |
| [Offline-First & Device Compatibility](./offline-first-and-device-compatibility.md)    | Cross-platform offline learning objective; PWA optional, media and state storage, capability trade-offs                                                                                                                  |
| [Lesson Notes](./lesson-notes.md)                                                      | Planned concise recall notes revealed during a lesson and assembled into a learner's revision sheet                                                                                                                      |
| [UUID Entity Addressing](./entity-uuid-addressing.md)                                  | One Engine resolver for immutable UUID-based Lesson paths; Skills remain hierarchical                                                                                                                                    |
| [Quest Section](../entities/quest.md)                                                  | Build-only Quest structure, media/accessibility requirements and pending runtime integration                                                                                                                             |
| [EducationStandard](../entities/education-standard.md)                                 | Immutable original-language standard definition, English methodology and complete short standard-locale descriptions; Course alignment remains separate future work                                                      |
| [Create Course Flow](../../skills/course-workflow/create-course-flow.skill.md)         | Seven-stage typed Course authoring, independent corrective Stage 4 review, entity PR, authorized materialization and translation gates                                                                                                 |
| [Create Lesson Flow](../../skills/lesson-workflow/create-lesson-flow.skill.md)         | Ten-stage Lesson PR; Stage 6.1 scaffolds, 6.2 completes typed resources, 6.3 implements/tests/registers Scenes; Stages 7/8 banks, 9/10 locales                                                                           |
| [Lesson, Content, Section & Course](../entities/lesson.md)                             | Read entity definitions at [Lesson](../entities/lesson.md), [Lesson Content](../entities/lesson-content.md), [Section](../entities/section.md) and [Course](../entities/course.md) before authoring                      |
| [Translation Workflow](../../skills/translation-workflow/README.md)                    | Same entity-owned PR for translation and independent review context; Markdown/source-SHA checks and historical Issue evidence remain                                     |
| [Typed production / legacy YAML boundary](./yaml-config-scaffolding.md)                 | Staged TypeScript contracts versus **still-live** YAML editor, builder and trusted CI dependencies; safe retirement gates                                                 |
| [Separate Lesson Assessment Banks](./lesson-assessment-bank-separation.md)             | Independent banks versus Quiz/Flashcards Sections; existing YAML tooling is legacy, staged bank replacements pending sibling PR integration                              |
| [Assessment Section Scaffolding](./lesson-required-assessment-section-scaffolding.md)  | Legacy YAML assessment-Section draft handoff; typed Lesson Stage 6 owns later Section materialization, not Course Stage 5 or bank Stage 1                             |
| [Lesson Resource Readiness](./lesson-resource-readiness.md)                            | Observed Config, Props, publication and review boundaries; proposed authoring-only readiness assessment and unresolved API decisions                                                                                     |
| [Legacy Lesson YAML draft scaffolder](./lesson-yaml-builder.md)                       | Existing create-only YAML → TypeScript draft conversion, not the new staged Lesson editorial workflow or Props publication                                                 |
| [Carousel Image/Scene Slides](./carousel-image-scene-slides.md)                        | Typed Carousel children, Scene rendering and recursive Lesson asset handoff                                                                                                                                              |
| [Lesson Generated Source Layout](./lesson-generated-source-layout.md)                  | **Stage 1 design contract** and immutable PR #557 source snapshots for the proposed modular Lesson/asset handoff; not yet implemented                                                                                    |
| [Lesson Editorial Artifacts](./lesson-editorial-document.md)                           | Legacy single-YAML evidence and the forthcoming typed Lesson source owned by #782; `methodology.md` is derived, not a second editable source                            |
| [System Boundaries & Roadmap](./system-boundaries.md)                                  | Lesson vs Program, progress vs assessment, injection/events, IDs and planned registries/sync                                                                                                                             |
| [Coding Agent Specializations](./coding-agent-specializations.md)                      | Existing specialized Skills (including Remotion) and prioritized future ones; specialist subskills supplement one Coding Agent Persona                                                                                   |
| [CI and branch policy](../../rules/ci-workflow.md)                                     | Development and production validation, quiet agent logs, required checks and release promotion                                                                                                                           |
| [Monorepo & Standalone Textbook Architecture](./monorepo-and-textbook.md)              | Current `apps/` / `content/` / `backend/` / `shared/` / `studio/` workspaces, package graph and extraction constraints                                                                                                   |
| [Cross-Platform Lesson Runtime](./cross-platform-lesson-runtime.md)                    | **Target**: reusable client Lesson UI, build-time textbook/Scene composition, Web/Capacitor/Electron adapters and session lifecycle                                                                                      |

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
